import { BaseEntityClass } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ExpenseGroupEntity } from './expense-group.entity';

@Entity('users')
export class UserEntity extends BaseEntityClass {
  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  phone: string;

  @Column()
  password: string;

  @OneToMany(() => ExpenseGroupEntity, (group) => group.owner)
  groups: ExpenseGroupEntity[];
}
