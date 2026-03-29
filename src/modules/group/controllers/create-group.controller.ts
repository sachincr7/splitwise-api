import { Body, Controller, Post, Version } from '@nestjs/common';
import { GroupService } from '../group.service';
import { CreateGroupDto } from '../dto/create-group.dto';

@Controller('groups')
export class CreateGroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @Version('1')
  async handle(@Body() createGroupDto: CreateGroupDto) {
    const { name, creatorId, memberIds } = createGroupDto;
    return this.groupService.createGroup(name, creatorId, memberIds);
  }
}
