import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserService } from '../user/user.service';
import { getBcryptHash, isSamePassword } from './utils';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async registerUser(dto: AuthCredentialsDto) {
    const existingUser = await this.userService.findOneByUsername(dto.login);

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const passwordHash = await getBcryptHash(dto.password);
    return this.userService.create({
      login: dto.login,
      password: passwordHash,
    });
  }

  async authenticateUser(dto: AuthCredentialsDto) {
    const existingUser = await this.userService.findOneByUsername(dto.login);

    if (!existingUser) {
      throw new UnauthorizedException(`User does not exist`);
    }

    const isSame = await isSamePassword(
      dto.password,
      existingUser.getPassword(),
    );

    if (!isSame) {
      throw new ForbiddenException(`Incorrect user credentials`);
    }

    const payload = {
      sub: existingUser.getId(),
      userId: existingUser.getId(),
      login: dto.login,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.refreshSecret,
        expiresIn: jwtConstants.refreshTokenExpireTime,
      }),
    };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      const { userId, iat, exp, login } = await this.jwtService.verifyAsync<{
        userId: string;
        login: string;
        iat: number;
        exp: number;
      }>(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });
      const now = Date.now();

      console.log({
        now,
        iat,
        exp,
        login,
      });
      if (iat * 1000 >= now || exp * 1000 <= now) {
        throw new Error('Refresh token expired');
      }

      const existingUser = await this.userService.findOne(userId);

      if (existingUser.login !== login) {
        throw new Error('User does not exist');
      }

      const payload = {
        sub: userId,
        userId,
        login,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
        refresh_token: await this.jwtService.signAsync(payload, {
          secret: jwtConstants.refreshSecret,
          expiresIn: jwtConstants.refreshTokenExpireTime,
        }),
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
  }
}
