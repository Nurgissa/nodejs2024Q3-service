import { Controller, Get } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('favorite')
@Controller()
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }
}
