import { BadRequestException, Injectable } from '@nestjs/common';
import { SplitStrategy } from '../interfaces/split-strategy.interface';
import { ExpenseEntity, SplitEntity, UserEntity } from 'apps/api/src/entities';

@Injectable()
export class PercentageSplitStrategy implements SplitStrategy {
  calculateSplits(
    expense: ExpenseEntity,
    users: UserEntity[],
    paidMap: Map<number, number>,
    amountMap?: Map<number, number>,
  ): SplitEntity[] {
    if (!amountMap) {
      throw new BadRequestException('amountMap is required for percentage split');
    }

    if (users.length === 0) {
      throw new BadRequestException('At least one user is required');
    }

    const splits = users.map((user) => {
      const split = new SplitEntity();
      const paid = paidMap.get(user.id) ?? 0;
      const amount = amountMap.get(user.id) ?? 0;

      split.expense = expense;
      split.user = user;
      split.paid = paid;
      split.owed = amount;
      return split;
    });

    return splits;
  }
}
