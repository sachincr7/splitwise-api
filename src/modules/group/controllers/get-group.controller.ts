import { Controller, Get, Param, ParseIntPipe, Version } from '@nestjs/common';
import { GroupService } from '../group.service';

@Controller('groups')
export class GetGroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get(':id')
  @Version('1')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return this.groupService.getGroup(id);
  }
}
