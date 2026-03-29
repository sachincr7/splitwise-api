import { Injectable, NotFoundException } from '@nestjs/common';
import { ExpenseGroupEntity, ExpenseEntity, SplitEntity, UserEntity } from 'src/entities';
import { SplitType } from 'src/entities/enums/split-type.enum';
import { SplitStrategy } from 'src/modules/split/interfaces/split-strategy.interface';
import { EqualSplitStrategy } from 'src/modules/split/strategies/equal-split.strategy';
import { PercentageSplitStrategy } from 'src/modules/split/strategies/percentage-split.strategy';
import { DataSource, In, Repository } from 'typeorm';
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

  constructor(private readonly dataSource: DataSource) {
    this.groupRepo = this.dataSource.getRepository(ExpenseGroupEntity);
    this.expenseRepo = this.dataSource.getRepository(ExpenseEntity);
    this.splitRepo = this.dataSource.getRepository(SplitEntity);
    this.userRepo = this.dataSource.getRepository(UserEntity);

    this.strategyMap = new Map<SplitType, SplitStrategy>([
      [SplitType.EQUAL, new EqualSplitStrategy()],
      [SplitType.PERCENTAGE, new PercentageSplitStrategy()],
    ]);
  }

  async createExpense(dto: AddExpenseDto) {
    const users = await this.userRepo.find({ where: { id: In(dto.user_ids) } });
    if (users.length !== dto.user_ids.length) {
      throw new NotFoundException('One or more users not found');
    }

    const createdBy = await this.userRepo.findOneBy({ id: dto.created_by });
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
    await this.expenseRepo.save(expense);

    const paidMap = this.buildPaidMap(dto.paid_by);
    const percentageMap = this.buildPercentageMap(dto.percentages || []);

    return this.addExpenseWithStrategy(expense, paidMap, percentageMap);
  }

  private buildPaidMap(paid_by: PaidByEntryDto[]): Map<number, number> {
    return new Map<number, number>(
      paid_by.map((entry) => [entry.user_id, entry.amount]),
    );
  }

  private buildPercentageMap(
    percentages: PercentageEntryDto[],
  ): Map<number, number> {
    return percentages
      ? new Map<number, number>(
          percentages.map((entry) => [entry.user_id, entry.percentage]),
        )
      : new Map<number, number>();
  }

  private async saveSplits(splits: SplitEntity[], savedExpense: ExpenseEntity) {
    for (const split of splits) {
      split.expense = savedExpense;
    }
    return this.splitRepo.save(splits);
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

    const savedExpense = await this.expenseRepo.save(expense);

    savedExpense.splits = await this.saveSplits(splits, savedExpense);
    return savedExpense;
  }

  getUserExpenses(userId: number) {
    return this.expenseRepo.find({
      where: { users: { id: userId } },
      relations: ['users', 'splits'],
    });
  }
}
