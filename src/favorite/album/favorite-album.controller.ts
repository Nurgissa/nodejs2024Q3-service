import { Controller, Delete, HttpCode, Param, Post } from '@nestjs/common';
import { FindOneParams } from '../../artist/dto/fine-one-params.dto';
import { FavoriteService } from '../favorite.service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@Controller()
export class FavoriteAlbumController {
  constructor(
    // @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
  ) {}

  @ApiCreatedResponse({ description: 'Favorited successfully' })
  @ApiUnprocessableEntityResponse({ description: 'Cannot be favorited' })
  @Post(':id')
  favoriteAlbum(@Param() params: FindOneParams) {
    return this.favoriteService.favoriteAlbum(params.id);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Unfavorited successfully' })
  @ApiUnprocessableEntityResponse({ description: 'Cannot be unfavorited' })
  unfavoriteAlbum(@Param() params: FindOneParams) {
    return this.favoriteService.unfavoriteAlbum(params.id);
  }
}
