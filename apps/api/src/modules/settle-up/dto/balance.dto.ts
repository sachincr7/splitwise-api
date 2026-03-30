import { UserEntity } from 'apps/api/src/entities/user.entity';

export class BalanceDto {
  from: UserEntity;
  to: UserEntity;
  amount: number;

  constructor(from: UserEntity, to: UserEntity, amount: number) {
    this.from = from;
    this.to = to;
    this.amount = amount;
  }
}
