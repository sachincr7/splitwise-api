import { Controller, Get, Request, UseGuards, Version } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { AuthService } from '../auth.service';
import { GoogleAuthGuard } from '../guards/google-auth.guard';

@Controller('auth')
export class GoogleController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/login')
  @Version('1')
  @Public()
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // Guard redirects to Google OAuth consent screen
  }

  @Get('google/callback')
  @Version('1')
  @Public()
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Request() req) {
    const { email, displayName } = req.user;
    return this.authService.validateGoogleUser({
      email: email ?? req.user.emails?.[0]?.value,
      name: displayName,
    });
  }
}
