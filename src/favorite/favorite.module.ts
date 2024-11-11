import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],
  imports: [TrackModule, AlbumModule, ArtistModule],
})
export class FavoriteModule {}
