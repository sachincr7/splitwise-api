import { Controller, Get, Param, ParseIntPipe, Version } from '@nestjs/common';
import { SettleUpService } from '../settle-up.service';

@Controller('settle-up')
export class SettleUpGroupController {
  constructor(private readonly settleUpService: SettleUpService) {}

  @Get('group/:groupId')
  @Version('1')
  async handle(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.settleUpService.settleUpGroup(groupId);
  }
}
