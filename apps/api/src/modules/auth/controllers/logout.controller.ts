import { Controller, Post, Request, Version } from '@nestjs/common';
import type { Response } from 'express';
import { Res } from '@nestjs/common';

@Controller('auth')
export class LogoutController {
  @Post('logout')
  @Version('1')
  logout(@Request() req, @Res({ passthrough: true }) res: Response) {
    // Clear session if it exists (for OAuth)
    if (req.session) {
      req.session.destroy(() => {});
    }
    
    // Clear the session cookie
    res.clearCookie('connect.sid');
    
    return { message: 'Logged out successfully' };
  }
}
