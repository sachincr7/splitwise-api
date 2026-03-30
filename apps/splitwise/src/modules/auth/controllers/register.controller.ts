import { Body, Controller, Post, Version } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { RegisterDto } from '../dto/register.dto';

@Controller('auth')
export class RegisterController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Version('1')
  async handle(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password);
  }
}
