import { ExpenseEntity } from 'src/entities/expense.entity';
import { SplitEntity } from 'src/entities/split.entity';
import { UserEntity } from 'src/entities/user.entity';

export interface SplitStrategy {
  calculateSplits(
    expense: ExpenseEntity,
    users: UserEntity[],
    paidMap: Map<number, number>,
    amountMap?: Map<number, number>,
  ): SplitEntity[];
}
