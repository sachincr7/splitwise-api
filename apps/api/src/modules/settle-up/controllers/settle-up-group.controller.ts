import { Controller, Get, Param, ParseIntPipe, UseGuards, Version } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { SettleUpService } from '../settle-up.service';

@Controller('settle-up')
export class SettleUpGroupController {
  constructor(private readonly settleUpService: SettleUpService) {}

  @Get('group/:groupId')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  async handle(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.settleUpService.settleUpGroup(groupId);
  }
}
