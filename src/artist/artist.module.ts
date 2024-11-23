import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './artist.respository';
import { PrismaModule } from '../frameworks/data-services/prisma/prisma.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
  exports: [ArtistService],
  imports: [PrismaModule],
})
export class ArtistModule {}
