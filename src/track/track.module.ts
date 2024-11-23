import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { PrismaModule } from '../frameworks/data-services/prisma/prisma.module';
import { TrackRepository } from './track.repository';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackRepository],
  exports: [TrackService],
  imports: [PrismaModule],
})
export class TrackModule {}
