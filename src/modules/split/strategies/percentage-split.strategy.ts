import { BadRequestException, Injectable } from '@nestjs/common';
import { SplitStrategy } from '../interfaces/split-strategy.interface';
import { ExpenseEntity, SplitEntity, UserEntity } from 'src/entities';

@Injectable()
export class PercentageSplitStrategy implements SplitStrategy {
  calculateSplits(
    expense: ExpenseEntity,
    users: UserEntity[],
    paidMap: Map<number, number>,
    percentageMap?: Map<number, number>,
  ): SplitEntity[] {
    if (!percentageMap) {
      throw new BadRequestException('percentageMap is required for percentage split');
    }

    if (users.length === 0) {
      throw new BadRequestException('At least one user is required');
    }

    const totalPercentage = users.reduce(
      (sum, user) => sum + (percentageMap.get(user.id) ?? 0),
      0,
    );

    if (Math.abs(totalPercentage - 100) > 0.01) {
      throw new BadRequestException(
        `Percentages must add up to 100, got ${totalPercentage}`,
      );
    }

    const splits = users.map((user) => {
      const split = new SplitEntity();
      const paid = paidMap.get(user.id) ?? 0;

      const percentage = percentageMap.get(user.id) ?? 0;
      const owed = expense.getTotalAmount() * (percentage / 100);
      
      split.expense = expense;
      split.user = user;
      split.paid = paid;
      split.owed = owed;
      return split;
    });
    
    return splits;
  }
}
