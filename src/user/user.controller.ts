import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FindOneParams } from './dto/fine-one-params.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get user by id',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param() params: FindOneParams) {
    return this.userService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.update(params.id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() params: FindOneParams) {
    return this.userService.delete(params.id);
  }
}
