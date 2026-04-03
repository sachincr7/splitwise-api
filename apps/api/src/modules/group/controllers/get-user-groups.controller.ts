import { Controller, Get, Param, ParseIntPipe, Version } from '@nestjs/common';
import { GroupService } from '../group.service';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/entities/enums/role.enum';

@Controller('groups')
export class GetUserGroupsController {
  constructor(private readonly groupService: GroupService) {}

  @Roles(Role.USER)
  @Get('user/:userId')
  @Version('1')
  async handle(@Param('userId', ParseIntPipe) userId: number) {
    return this.groupService.getUserGroups(userId);
  }
}
