import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

interface CreateUserDto {
  login: string;
  password: string;
}

interface UpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

@Controller('user')
export class UserController {
  @Get()
  findAll(): string {
    return 'findAll';
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    return `findOne: ${id}`;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): string {
    return `create ${JSON.stringify(createUserDto)}`;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() upddatePasswordDto: UpdatePasswordDto,
  ): string {
    return `update: ${id} - ${JSON.stringify(upddatePasswordDto)}`;
  }

  @Delete(':id')
  delete(@Param('id') id: string): any {
    return `delete: ${id}`;
  }
}
