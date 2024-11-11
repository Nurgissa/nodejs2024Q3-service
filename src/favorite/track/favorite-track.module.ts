import { Module } from '@nestjs/common';
import { FavoriteTrackController } from './favorite-track.controller';
import { FavoriteModule } from '../favorite.module';

@Module({
  controllers: [FavoriteTrackController],
  imports: [FavoriteModule],
})
export class FavoriteTrackModule {}
