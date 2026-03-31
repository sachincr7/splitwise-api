import { Controller, Get, Request, Res, UseGuards, Version } from '@nestjs/common';
import { Response } from 'express';
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
  async googleCallback(@Request() req, @Res() res: Response) {
    const { email, displayName } = req.user;
    const result = await this.authService.validateGoogleUser({
      email: email ?? req.user.emails?.[0]?.value,
      name: displayName,
    });
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${result.access_token}`);
  }
}
