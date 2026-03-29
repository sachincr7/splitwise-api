import {
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { UserEntity } from './user.entity';
import { ExpenseGroupEntity } from './expense-group.entity';
import { SplitType } from './enums/split-type.enum';
import { SplitEntity } from './split.entity';

@Entity('expenses')
export class ExpenseEntity extends BaseEntityClass {
  @Column()
  description: string;

  @Column({ type: 'enum', enum: SplitType })
  split_type: SplitType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  expense: number;

  @ManyToOne(() => ExpenseGroupEntity)
  @JoinColumn({ name: 'group_id' })
  group: ExpenseGroupEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  created_by: UserEntity;

  @OneToMany(() => SplitEntity, (split) => split.expense)
  splits: SplitEntity[];

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'expense_users',
    joinColumn: { name: 'expense_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: UserEntity[];

  getTotalAmount(): number {
    return this.expense;
  }

  getUserIds(): number[] {
    return this.users.map((user) => user.id);
  }
}
