import { Controller, Delete, HttpCode, Param, Post } from '@nestjs/common';
import { FindOneParams } from '../../artist/dto/fine-one-params.dto';
import { FavoriteService } from '../favorite.service';

@Controller()
export class FavoriteArtistController {
  constructor(
    // @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
  ) {}

  @Post(':id')
  favoriteArtist(@Param() params: FindOneParams) {
    return this.favoriteService.favoriteArtist(params.id);
  }

  @Delete(':id')
  @HttpCode(204)
  unfavoriteArtist(@Param() params: FindOneParams) {
    return this.favoriteService.unfavoriteArtist(params.id);
  }
}
