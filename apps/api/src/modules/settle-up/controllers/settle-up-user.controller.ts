import { Controller, Get, Param, ParseIntPipe, UseGuards, Version } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { SettleUpService } from '../settle-up.service';

@Controller('settle-up')
export class SettleUpUserController {
  constructor(private readonly settleUpService: SettleUpService) {}

  @Get('user/:userId')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  async handle(@Param('userId', ParseIntPipe) userId: number) {
    return this.settleUpService.settleUpUser(userId);
  }
}
