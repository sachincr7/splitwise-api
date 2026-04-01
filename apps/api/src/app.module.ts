import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '@/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { GroupModule } from './modules/group/group.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { SettleUpModule } from './modules/settle-up/settle-up.module';
import { AuthModule } from './modules/auth/auth.module';
import { redisConfig } from './config/redis.config';
import { CacheModule } from '@nestjs/cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    // Database configuration
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    // Redis cache configuration
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: redisConfig,
    }),
    GroupModule,
    ExpenseModule,
    SettleUpModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
