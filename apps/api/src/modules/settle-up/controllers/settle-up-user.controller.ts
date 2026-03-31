import { Controller, Get, Param, ParseIntPipe, Version } from '@nestjs/common';
import { SettleUpService } from '../settle-up.service';

@Controller('settle-up')
export class SettleUpUserController {
  constructor(private readonly settleUpService: SettleUpService) {}

  @Get('user/:userId')
  @Version('1')
  async handle(@Param('userId', ParseIntPipe) userId: number) {
    return this.settleUpService.settleUpUser(userId);
  }
}
