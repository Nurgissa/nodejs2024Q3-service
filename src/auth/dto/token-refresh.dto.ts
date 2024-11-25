import { PartialType } from '@nestjs/swagger';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenRefreshDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
