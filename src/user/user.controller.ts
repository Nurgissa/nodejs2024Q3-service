import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FindOneParams } from './dto/fine-one-params.dto';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): UserDto[] {
    return this.userService.findAll().map((user) => user.toDto());
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): UserDto {
    const user = this.userService.findOneId(params.id);
    if (!user) {
      throw new HttpException('NotFoundError', HttpStatus.NOT_FOUND);
    }

    return user.toDto();
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto): UserDto {
    const user = this.userService.create(createUserDto);
    return user.toDto();
  }

  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserDto {
    return this.userService.update(params.id, updatePasswordDto).toDto();
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() params: FindOneParams) {
    return this.userService.delete(params.id);
  }
}
