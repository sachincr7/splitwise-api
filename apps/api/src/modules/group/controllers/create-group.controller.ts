import { Body, Controller, Post, Version } from '@nestjs/common';
import { GroupService } from '../group.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/entities/enums/role.enum';

@Controller('groups')
export class CreateGroupController {
  constructor(private readonly groupService: GroupService) {}

  @Roles(Role.USER)
  @Post()
  @Version('1')
  async handle(@Body() createGroupDto: CreateGroupDto) {
    const { name, creator_id, member_ids } = createGroupDto;
    return this.groupService.createGroup(name, creator_id, member_ids);
  }
}
