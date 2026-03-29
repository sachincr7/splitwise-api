import { Injectable, NotFoundException } from '@nestjs/common';
import { ExpenseGroupEntity } from 'src/entities/expense-group.entity';
import { ExpenseEntity } from 'src/entities/expense.entity';
import { SplitEntity } from 'src/entities/split.entity';
import { UserEntity } from 'src/entities/user.entity';
import { SplitType } from 'src/entities/enums/split-type.enum';
import { SplitStrategy } from 'src/modules/split/interfaces/split-strategy.interface';
import { EqualSplitStrategy } from 'src/modules/split/strategies/equal-split.strategy';
import { PercentageSplitStrategy } from 'src/modules/split/strategies/percentage-split.strategy';
import { DataSource, In, Repository } from 'typeorm';
import { AddExpenseDto } from './dto/add-expense.dto';

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

  async addExpenseWithStrategy(
    expense: ExpenseEntity,
    paidMap: Map<number, number>,
    percentageMap: Map<number, number>,
  ) {
    const users: UserEntity[] = expense.users;

    const strategy = this.strategyMap.get(expense.split_type);
    if (!strategy) {
      throw new NotFoundException(`No strategy found for split type: ${expense.split_type}`);
    }

    const splits = strategy.calculateSplits(expense, users, paidMap, percentageMap);

    const savedExpense = await this.expenseRepo.save(expense);

    for (const split of splits) {
      split.expense = savedExpense;
    }
    await this.splitRepo.save(splits);

    savedExpense.splits = splits;
    return savedExpense;
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

    const expense = new ExpenseEntity();
    expense.description = dto.description;
    expense.split_type = dto.split_type;
    expense.expense = dto.expense;
    expense.group = group;
    expense.created_by = createdBy;
    expense.users = users;

    const paidMap = new Map<number, number>(
      dto.paid_by.map((entry) => [entry.user_id, entry.amount]),
    );

    const percentageMap = dto.percentages
      ? new Map<number, number>(
          dto.percentages.map((entry) => [entry.user_id, entry.percentage]),
        )
      : new Map<number, number>();

    return this.addExpenseWithStrategy(expense, paidMap, percentageMap);
  }

  getUserExpenses(userId: number) {
    return this.expenseRepo.find({
      where: { users: { id: userId } },
      relations: ['users', 'splits'],
    });
  }
}
