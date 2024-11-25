import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { TokenRefreshDto } from './dto/token-refresh.dto';
import { PublicRoute } from './decorators/public-route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @Post('/signup')
  signUpUser(@Body() dto: AuthCredentialsDto) {
    return this.authService.registerUser(dto);
  }

  @PublicRoute()
  @Post('/login')
  logInUser(@Body() dto: AuthCredentialsDto) {
    return this.authService.authenticateUser(dto);
  }

  @PublicRoute()
  @Post('/refresh')
  refreshToken(@Body() dto: TokenRefreshDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }
}
