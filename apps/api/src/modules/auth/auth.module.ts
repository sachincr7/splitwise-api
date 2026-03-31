import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { RegisterController } from './controllers/register.controller';
import { LoginController } from './controllers/login.controller';
import { googleOauthConfig, jwtConfig } from 'src/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      inject: [jwtConfig.KEY],
      useFactory: (config: ConfigType<typeof jwtConfig>) => config,
    }),
    ConfigModule.forFeature(googleOauthConfig),
  ],
  controllers: [RegisterController, LoginController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
