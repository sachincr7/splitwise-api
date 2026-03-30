import { ExpenseEntity } from 'apps/api/src/entities/expense.entity';
import { SplitEntity } from 'apps/api/src/entities/split.entity';
import { UserEntity } from 'apps/api/src/entities/user.entity';

export interface SplitStrategy {
  calculateSplits(
    expense: ExpenseEntity,
    users: UserEntity[],
    paidMap: Map<number, number>,
    amountMap?: Map<number, number>,
  ): SplitEntity[];
}
