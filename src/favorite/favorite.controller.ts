import { Controller, Get } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller()
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }
}
