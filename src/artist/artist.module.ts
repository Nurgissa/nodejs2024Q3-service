import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { ArtistRepository } from './artist.respository';
import { PrismaModule } from '../frameworks/data-services/prisma/prisma.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
  exports: [ArtistService],
  imports: [AlbumModule, TrackModule, PrismaModule],
})
export class ArtistModule {}
