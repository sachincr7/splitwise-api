import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { UserEntity } from './user.entity';
import { ExpenseEntity } from './expense.entity';

@Entity('expense_splits')
export class SplitEntity extends BaseEntityClass {
  @ManyToOne(() => ExpenseEntity, (expense) => expense.splits)
  @JoinColumn({ name: 'expense_id' })
  expense: ExpenseEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'double precision', nullable: false })
  paid: number;

  @Column({ type: 'double precision', nullable: false })
  owed: number;
}
