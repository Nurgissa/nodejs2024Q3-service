import { Module } from '@nestjs/common';
import { FavoriteArtistController } from './favorite-artist.controller';
import { FavoriteModule } from '../favorite.module';

@Module({
  controllers: [FavoriteArtistController],
  imports: [FavoriteModule],
})
export class FavoriteArtistModule {}
