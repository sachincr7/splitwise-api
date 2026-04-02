import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, Version } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { AuthService } from '../auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(LocalAuthGuard)
  handle(@Request() req) {
    return this.authService.login(req.user);
  }
}
