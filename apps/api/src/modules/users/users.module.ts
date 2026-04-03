import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SearchUsersController } from './controllers/search-users.controller';

@Module({
  controllers: [SearchUsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
