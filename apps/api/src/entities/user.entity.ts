import { Exclude } from 'class-transformer';
import { BaseEntityClass } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ExpenseGroupEntity } from './expense-group.entity';
import { Role } from './enums/role.enum';

@Entity('users')
export class UserEntity extends BaseEntityClass {
  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Exclude()
  @OneToMany(() => ExpenseGroupEntity, (group) => group.owner)
  groups: ExpenseGroupEntity[];
}
