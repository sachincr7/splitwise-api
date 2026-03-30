import { Injectable } from '@nestjs/common';
import { SplitEntity } from 'src/entities/split.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { BalanceDto } from './dto/balance.dto';

@Injectable()
export class SettleUpService {
  private splitRepo: Repository<SplitEntity>;
  private userRepo: Repository<UserEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.splitRepo = this.dataSource.getRepository(SplitEntity);
    this.userRepo = this.dataSource.getRepository(UserEntity);
  }

  async settleUpUser(userId: number) {
    const splits = await this.splitRepo.find({
      relations: ['user', 'expense', 'expense.created_by'],
    });

    const filtered = splits.filter(
      (s) =>
        s.user.id === userId || s.expense.created_by.id === userId,
    );

    return this.getTransactionsToSettle(filtered);
  }

  async settleUpGroup(groupId: number) {
    const splits = await this.splitRepo.find({
      where: {
        expense: {
          group: {
            id: groupId,
          },
        },
      },
      relations: ['user', 'expense', 'expense.group'],
    });

    return this.getTransactionsToSettle(splits);
  }

  private async getTransactionsToSettle(
    splits: SplitEntity[],
  ) {
    // Calculate net balance per user (paid - owed)
    const netMap = new Map<number, number>();
    for (const split of splits) {
      const userId = split.user.id;
      const net = split.paid - split.owed;
      netMap.set(userId, (netMap.get(userId) ?? 0) + net);
    }

    console.log(netMap);

    // // Separate into debtors (negative net) and creditors (positive net)
    // const debtors: Array<{ userId: number; amount: number }> = [];
    // const creditors: Array<{ userId: number; amount: number }> = [];

    // for (const [userId, net] of netMap.entries()) {
    //   if (net < 0) debtors.push({ userId, amount: net });
    //   else if (net > 0) creditors.push({ userId, amount: net });
    // }

    // // Sort: debtors by amount ascending (most debt first), creditors by amount descending
    // debtors.sort((a, b) => a.amount - b.amount);
    // creditors.sort((a, b) => b.amount - a.amount);

    // const txns: BalanceDto[] = [];
    // let i = 0;
    // let j = 0;

    // while (i < debtors.length && j < creditors.length) {
    //   const debtor = debtors[i];
    //   const creditor = creditors[j];

    //   const settled = Math.min(-debtor.amount, creditor.amount);

    //   const fromUser = await this.userRepo.findOneByOrFail({ id: debtor.userId });
    //   const toUser = await this.userRepo.findOneByOrFail({ id: creditor.userId });

    //   txns.push(new BalanceDto(fromUser, toUser, settled));

    //   debtor.amount += settled;
    //   creditor.amount -= settled;

    //   if (debtor.amount >= 0) i++;
    //   if (creditor.amount <= 0) j++;
    // }

    // return txns;
  }
}
