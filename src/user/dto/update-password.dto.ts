import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    type: String,
    description: 'Old password - Required property',
  })
  @IsNotEmpty()
  oldPassword: string; // previous password

  @ApiProperty({
    type: String,
    description: 'New password - Required property',
  })
  @IsNotEmpty()
  newPassword: string; // new password
}
