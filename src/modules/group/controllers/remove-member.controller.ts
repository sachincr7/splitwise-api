import { Body, Controller, Delete, Version } from '@nestjs/common';
import { GroupService } from '../group.service';
import { GroupMemberDto } from '../dto/group-member.dto';

@Controller('groups')
export class RemoveMemberController {
  constructor(private readonly groupService: GroupService) {}

  @Delete('members')
  @Version('1')
  async handle(@Body() dto: GroupMemberDto) {
    const { group_id, creator_id, member_id } = dto;
    return this.groupService.removeMember(group_id, creator_id, member_id);
  }
}
