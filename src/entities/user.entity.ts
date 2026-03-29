import { BaseEntityClass } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntityClass {
  @Column()
  name: string;
}
