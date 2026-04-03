import { Controller, Get, Query, Request, Version } from '@nestjs/common';
import { UsersService } from '../users.service';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/entities/enums/role.enum';

@Controller('users')
export class SearchUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('search')
  @Version('1')
  @Roles(Role.USER)
  async handle(@Query('q') q: string, @Request() req) {
    if (!q || q.trim().length < 2) {
      return [];
    }
    return this.usersService.search(q.trim(), req.user?.id);
  }
}
