import { Module } from '@nestjs/common';
import { FavoriteAlbumController } from './favorite-album.controller';
import { FavoriteModule } from '../favorite.module';

@Module({
  controllers: [FavoriteAlbumController],
  imports: [FavoriteModule],
})
export class FavoriteAlbumModule {}
