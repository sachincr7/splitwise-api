import { Module } from '@nestjs/common';
import { SettleUpService } from './settle-up.service';
import { SettleUpUserController } from './controllers/settle-up-user.controller';
import { SettleUpGroupController } from './controllers/settle-up-group.controller';

@Module({
  controllers: [SettleUpUserController, SettleUpGroupController],
  providers: [SettleUpService],
})
export class SettleUpModule {}
