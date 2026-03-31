import { Body, Controller, Param, ParseIntPipe, Post, Version } from '@nestjs/common';
import { GroupService } from '../group.service';
import { GroupMemberDto } from '../dto/group-member.dto';

@Controller('groups')
export class AddMemberController {
  constructor(private readonly groupService: GroupService) {}

  @Post(':group_id/add')
  @Version('1')
  async handle(
    @Param('group_id', ParseIntPipe) group_id: number,
    @Body() dto: GroupMemberDto,
  ) {
    const { creator_id, member_id } = dto;
    return this.groupService.addMember(group_id, creator_id, member_id);
  }
}
