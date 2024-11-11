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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FindOneParams } from './dto/fine-one-params.dto';
import { UserDto } from './dto/user.dto';
// import { User } from "./entities/user.entity";

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(): UserDto[] {
    return this.userService.findAll().map((user) => user.toDto());
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get user by id',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
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
