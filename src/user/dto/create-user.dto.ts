import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Required property',
  })
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    type: String,
    description: 'Required property',
  })
  @IsNotEmpty()
  password: string;
}
