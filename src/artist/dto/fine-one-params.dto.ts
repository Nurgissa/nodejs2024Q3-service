import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneParams {
  @ApiProperty({
    type: String,
    description: 'Required property',
  })
  @IsUUID()
  id: string;
}
