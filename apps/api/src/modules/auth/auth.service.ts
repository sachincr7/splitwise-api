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
   * @param user - User object
   * @returns Access token
   */
  login(user: { id: UserEntity['id']; email: string; name: string }) {
    const payload: AuthJwtPayload = {
      sub: user.id,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  /**
   * Validates a Google OAuth user by finding or creating them
   * @param googleUser - Google profile data
   * @returns Login response with access token and user info
   */
  async validateGoogleUser(googleUser: { email: string; name: string }) {
    let user = await this.usersService.findOneByEmail(googleUser.email);

    if (!user) {
      user = await this.usersService.create({
        email: googleUser.email,
        name: googleUser.name,
        password: await hash(Math.random().toString(36), 10),
      });
    }

    return this.login({ id: user.id, email: user.email, name: user.name });
  }

  /**
   * Validates a JWT user by looking up the user from the decoded payload
   * @param payload - Decoded JWT payload containing user ID
   * @returns User object without sensitive data
   * @throws UnauthorizedException if user not found
   */
  async validateJwtUser(payload: AuthJwtPayload) {
    const user = await this.usersService.findOneById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  /**
   * Registers a new user with hashed password
   * @param data - Registration data containing name, email, phone, and password
   * @returns Created user object
   */
  async register(data: { name?: string; email: string; phone: string; password: string }) {
    const hashedPassword = await hash(data.password, 10);
    return this.usersService.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
    });
  }
}
