import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth.jwtPayload';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates user credentials by checking email and password
   * @param email - User's email address
   * @param password - User's plain text password
   * @returns User object without sensitive data if validation succeeds
   * @throws UnauthorizedException if user not found or password invalid
   */
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  /**
   * Logs in a user and generates an access token
   * @param userId - User's ID
   * @returns Access token
   */
  login(userId: UserEntity['id']) {
    const payload: AuthJwtPayload = {
      sub: userId,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }

  /**
   * Registers a new user with hashed password
   * @param email - User's email address
   * @param password - User's plain text password
   * @returns Created user object
   */
  async register(email: string, password: string) {
    const hashedPassword = await hash(password, 10);
    return this.usersService.create({ email, password: hashedPassword });
  }
}
