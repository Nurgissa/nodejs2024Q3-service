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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FindOneParams } from './dto/fine-one-params.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto).toDto();
  }

  @Get()
  findAll() {
    return this.artistService.findAll().map((user) => user.toDto());
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.artistService.findOne(params.id).toDto();
  }

  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(params.id, updateArtistDto).toDto();
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams) {
    return this.artistService.remove(params.id);
  }
}
