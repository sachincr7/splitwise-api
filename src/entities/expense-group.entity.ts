import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('expense_groups')
export class ExpenseGroupEntity extends BaseEntityClass {
  @Column()
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.groups)
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;
}
