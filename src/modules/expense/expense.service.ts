import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ExpenseGroupEntity,
  ExpenseEntity,
  SplitEntity,
  UserEntity,
} from 'src/entities';
import { SplitType } from 'src/entities/enums/split-type.enum';
import { SplitStrategy } from 'src/modules/split/interfaces/split-strategy.interface';
import { EqualSplitStrategy } from 'src/modules/split/strategies/equal-split.strategy';
import { PercentageSplitStrategy } from 'src/modules/split/strategies/percentage-split.strategy';
import { DataSource, EntityManager, In, Repository } from 'typeorm';
import { AddExpenseDto } from './dto/add-expense.dto';
import { PaidByEntryDto } from './dto/paid-by-entry.dto';
import { PercentageEntryDto } from './dto/percentage-entry.dto';

@Injectable()
export class ExpenseService {
  private groupRepo: Repository<ExpenseGroupEntity>;
  private expenseRepo: Repository<ExpenseEntity>;
  private splitRepo: Repository<SplitEntity>;
  private userRepo: Repository<UserEntity>;

  private strategyMap: Map<SplitType, SplitStrategy>;

  constructor(
    private readonly dataSource: DataSource,
    private readonly equalSplitStrategy: EqualSplitStrategy,
    private readonly percentageSplitStrategy: PercentageSplitStrategy,
  ) {
    this.groupRepo = this.dataSource.getRepository(ExpenseGroupEntity);
    this.expenseRepo = this.dataSource.getRepository(ExpenseEntity);
    this.splitRepo = this.dataSource.getRepository(SplitEntity);
    this.userRepo = this.dataSource.getRepository(UserEntity);

    this.strategyMap = new Map<SplitType, SplitStrategy>([
      [SplitType.EQUAL, this.equalSplitStrategy],
      [SplitType.PERCENTAGE, this.percentageSplitStrategy],
    ]);
  }

  async createExpense(dto: AddExpenseDto) {
    const users = await this.userRepo.find({ where: { id: In(dto.user_ids) } });
    if (users.length !== dto.user_ids.length) {
      throw new NotFoundException('One or more users not found');
    }

    const createdBy = users.find((u) => u.id === dto.created_by);
    if (!createdBy) {
      throw new NotFoundException('Creator user not found');
    }

    const group = await this.groupRepo.findOneBy({ id: dto.group_id });
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const expense = this.expenseRepo.create({
      description: dto.description,
      split_type: dto.split_type,
      expense: dto.expense,
      group: group,
      created_by: createdBy,
      users: users,
    });

    // Validate that paid_by amounts sum to expense total
    this.validatePaidTotal(dto.paid_by, dto.expense);

    const paidMap = this.buildPaidMap(dto.paid_by);
    const percentageMap = this.buildPercentageMap(dto.percentages || []);

    return this.addExpenseWithStrategy(expense, paidMap, percentageMap);
  }

  private validatePaidTotal(
    paid_by: PaidByEntryDto[],
    expenseTotal: number,
  ): void {
    const totalPaid = paid_by.reduce((sum, entry) => sum + entry.amount, 0);
    if (Math.abs(totalPaid - expenseTotal) > 0.01) {
      throw new BadRequestException(
        `paid_by amounts (${totalPaid}) must equal the expense total (${expenseTotal})`,
      );
    }
  }

  private buildPaidMap(paid_by: PaidByEntryDto[]): Map<number, number> {
    return new Map<number, number>(
      paid_by.map((entry) => [entry.user_id, entry.amount]),
    );
  }

  private buildPercentageMap(
    percentages: PercentageEntryDto[],
  ): Map<number, number> {
    return new Map<number, number>(
      percentages.map((entry) => [entry.user_id, entry.percentage]),
    );
  }

  private async saveSplits(
    splits: SplitEntity[],
    savedExpense: ExpenseEntity,
    manager: EntityManager,
  ) {
    for (const split of splits) {
      split.expense = savedExpense;
    }
    return manager.save(SplitEntity, splits);
  }

  private async addExpenseWithStrategy(
    expense: ExpenseEntity,
    paidMap: Map<number, number>,
    percentageMap: Map<number, number>,
  ) {
    const users: UserEntity[] = expense.users;

    const strategy = this.strategyMap.get(expense.split_type);
    if (!strategy) {
      throw new NotFoundException(
        `No strategy found for split type: ${expense.split_type}`,
      );
    }

    const splits = strategy.calculateSplits(
      expense,
      users,
      paidMap,
      percentageMap,
    );

    // Use transaction to ensure both expense and splits are saved together
    return this.dataSource.transaction(async (manager) => {
      const savedExpense = await manager.save(ExpenseEntity, expense);
      savedExpense.splits = await this.saveSplits(
        splits,
        savedExpense,
        manager,
      );
      return savedExpense;
    });
  }

  getUserExpenses(userId: number) {
    return this.expenseRepo.find({
      where: { users: { id: userId } },
      relations: ['users', 'splits'],
    });
  }
}
