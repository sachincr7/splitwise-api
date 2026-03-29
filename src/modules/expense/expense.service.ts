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
    let users: UserEntity[] = [];

    if (expense.group && expense.group.id) {
      const group = await this.groupRepo.findOne({
        where: { id: expense.group.id },
        relations: ['members'],
      });
      if (!group) {
        throw new NotFoundException('Group not found');
      }
      users = group.members;
    } else if (expense.users && expense.users.length > 0) {
      users = await this.userRepo.find({ where: { id: In(expense.getUserIds()) } });
    }

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

  getUserExpenses(userId: number) {
    return this.expenseRepo.find({
      where: { users: { id: userId } },
      relations: ['users', 'splits'],
    });
  }
}
