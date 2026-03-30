import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { GroupModule } from './modules/group/group.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { SettleUpModule } from './modules/settle-up/settle-up.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    GroupModule,
    ExpenseModule,
    SettleUpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
