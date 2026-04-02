import { Controller, Get, Param, ParseIntPipe, Version } from '@nestjs/common';
import { GroupService } from '../group.service';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/entities/enums/role.enum';

@Controller('groups')
export class GetGroupController {
  constructor(private readonly groupService: GroupService) {}

  @Roles(Role.USER)
  @Get(':id')
  @Version('1')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return this.groupService.getGroup(id);
  }
}
