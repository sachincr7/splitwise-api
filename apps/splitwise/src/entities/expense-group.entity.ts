import { Column, Entity, ManyToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { BaseEntityClass } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('expense_groups')
export class ExpenseGroupEntity extends BaseEntityClass {
  @Column()
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.groups)
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'expense_group_members',
    joinColumn: { name: 'expense_group_id' },
    inverseJoinColumn: { name: 'member_id' },
  })
  members: UserEntity[];
}
