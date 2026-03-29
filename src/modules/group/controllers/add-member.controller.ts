import { Body, Controller, Post, Version } from '@nestjs/common';
import { GroupService } from '../group.service';
import { GroupMemberDto } from '../dto/group-member.dto';

@Controller('groups')
export class AddMemberController {
  constructor(private readonly groupService: GroupService) {}

  @Post('members')
  @Version('1')
  async handle(@Body() dto: GroupMemberDto) {
    const { group_id, creator_id, member_id } = dto;
    return this.groupService.addMember(group_id, creator_id, member_id);
  }
}
