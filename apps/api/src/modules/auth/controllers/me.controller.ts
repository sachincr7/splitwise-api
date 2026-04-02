import { Controller, Get, Request, Version } from '@nestjs/common';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/entities/enums/role.enum';

@Controller('auth')
export class MeController {
  @Roles(Role.USER)
  @Get('me')
  @Version('1')
  me(@Request() req) {
    return req.user;
  }
}
