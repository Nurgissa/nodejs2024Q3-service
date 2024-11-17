import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from '../track/track.module';
import { AlbumRepository } from './album.repository';
import { PrismaModule } from '../frameworks/data-services/prisma/prisma.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumRepository, AlbumService],
  exports: [AlbumService],
  imports: [TrackModule, PrismaModule],
})
export class AlbumModule {}
