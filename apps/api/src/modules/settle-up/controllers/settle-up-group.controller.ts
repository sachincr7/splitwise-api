import { Controller, Get, Param, ParseIntPipe, Version } from '@nestjs/common';
import { SettleUpService } from '../settle-up.service';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/entities/enums/role.enum';

@Controller('settle-up')
export class SettleUpGroupController {
  constructor(private readonly settleUpService: SettleUpService) {}

  @Roles(Role.USER)
  @Get('group/:groupId')
  @Version('1')
  async handle(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.settleUpService.settleUpGroup(groupId);
  }
}
