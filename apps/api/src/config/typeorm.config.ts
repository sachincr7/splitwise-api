import { ConfigService } from '@nestjs/config';
import {
  BaseEntityClass,
  ExpenseGroupEntity,
  ExpenseEntity,
  SplitEntity,
  UserEntity,
} from 'apps/api/src/entities';

export const typeOrmConfig = (configService: ConfigService) => ({
  type: 'postgres' as const,
  host: configService.get<string>('database.host'),
  port: configService.get<number>('database.port'),
  username: configService.get<string>('database.user'),
  password: configService.get<string>('database.password'),
  database: configService.get<string>('database.name'),
  entities: [BaseEntityClass, ExpenseGroupEntity, ExpenseEntity, SplitEntity, UserEntity],
  synchronize: false,
});
