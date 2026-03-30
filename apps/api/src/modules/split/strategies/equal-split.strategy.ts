import { BadRequestException, Injectable } from '@nestjs/common';
import { SplitStrategy } from '../interfaces/split-strategy.interface';
import { ExpenseEntity, SplitEntity, UserEntity } from 'src/entities';

@Injectable()
export class EqualSplitStrategy implements SplitStrategy {
  calculateSplits(
    expense: ExpenseEntity,
    users: UserEntity[],
    paidMap: Map<number, number>,
  ): SplitEntity[] {
    if (users.length === 0) {
      throw new BadRequestException('At least one user is required');
    }

    const totalAmount = expense.getTotalAmount();
    const equalShare = totalAmount / users.length;

    const splits = users.map((user) => {
      const split = new SplitEntity();
      const paid = paidMap.get(user.id) ?? 0;

      split.expense = expense;
      split.user = user;
      split.paid = paid;
      split.owed = equalShare;
      return split;
    });
    
    return splits;
  }
}
