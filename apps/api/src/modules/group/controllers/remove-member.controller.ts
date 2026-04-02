import { Body, Controller, Delete, Param, ParseIntPipe, Version } from '@nestjs/common';
import { GroupService } from '../group.service';
import { GroupMemberDto } from '../dto/group-member.dto';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/entities/enums/role.enum';

@Controller('groups')
export class RemoveMemberController {
  constructor(private readonly groupService: GroupService) {}

  @Roles(Role.USER)
  @Delete(':group_id/remove')
  @Version('1')
  async handle(
    @Param('group_id', ParseIntPipe) group_id: number,
    @Body() dto: GroupMemberDto,
  ) {
    const { creator_id, member_id } = dto;
    return this.groupService.removeMember(group_id, creator_id, member_id);
  }
}
