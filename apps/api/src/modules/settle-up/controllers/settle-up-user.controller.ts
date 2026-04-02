import { Controller, Get, Param, ParseIntPipe, Version } from '@nestjs/common';
import { SettleUpService } from '../settle-up.service';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/entities/enums/role.enum';

@Controller('settle-up')
export class SettleUpUserController {
  constructor(private readonly settleUpService: SettleUpService) {}

  @Roles(Role.USER)
  @Get('user/:userId')
  @Version('1')
  async handle(@Param('userId', ParseIntPipe) userId: number) {
    return this.settleUpService.settleUpUser(userId);
  }
}
