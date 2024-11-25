import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserService } from '../user/user.service';
import { getBcryptHash, isSamePassword } from './utils';
import { JwtService } from '@nestjs/jwt';

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

    const payload = { sub: existingUser.getId(), username: dto.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
