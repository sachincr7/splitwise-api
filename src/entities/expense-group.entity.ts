import { Column } from 'typeorm';
import { BaseEntityClass } from './base.entity';

export class ExpenseGroupEntity extends BaseEntityClass {
  @Column()
  name: string;

  
}
