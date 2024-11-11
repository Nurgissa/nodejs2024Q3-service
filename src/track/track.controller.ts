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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FindOneParams } from '../artist/dto/fine-one-params.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto).toDto();
  }

  @Get()
  findAll() {
    return this.trackService.findAll().map((track) => track.toDto());
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.trackService.findOne(params.id).toDto();
  }

  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(params.id, updateTrackDto).toDto();
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams) {
    return this.trackService.remove(params.id);
  }
}
