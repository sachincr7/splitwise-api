import { BaseEntityClass } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntityClass {
  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  phone: string;

  @Column()
  password: string;
}
