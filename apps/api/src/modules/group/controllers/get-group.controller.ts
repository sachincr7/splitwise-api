import { Controller, Get, Param, ParseIntPipe, UseGuards, Version } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GroupService } from '../group.service';

@Controller('groups')
export class GetGroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get(':id')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  async handle(@Param('id', ParseIntPipe) id: number) {
    return this.groupService.getGroup(id);
  }
}
