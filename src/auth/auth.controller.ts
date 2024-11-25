import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { TokenRefreshDto } from './dto/token-refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUpUser(@Body() dto: AuthCredentialsDto) {
    return this.authService.registerUser(dto);
  }

  @Post('/login')
  logInUser(@Body() dto: AuthCredentialsDto) {
    return this.authService.authenticateUser(dto);
  }

  @Post('/refresh')
  refreshToken(@Body() dto: TokenRefreshDto) {
    return dto;
  }
}
