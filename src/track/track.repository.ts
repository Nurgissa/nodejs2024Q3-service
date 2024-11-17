import { Injectable } from '@nestjs/common';
import { IRepository } from '../core/data-access/repository.inteface';
import { Track } from './entities/track.entity';
import { PrismaService } from '../frameworks/data-services/prisma/prisma.service';
import { RecordNotFoundException } from '../frameworks/data-services/prisma/record-not-found-exception';

@Injectable()
export class TrackRepository implements IRepository<Track> {
  constructor(private readonly prismaService: PrismaService) {}

  async create(entity: Track): Promise<Track> {
    const dto = entity.toDto();

    const created = await this.prismaService.track.create({
      data: {
        name: dto.name,
        duration: dto.duration,
        artistId: dto.artistId,
        albumId: dto.albumId,
        liked: entity.isLiked(),
      },
    });
    return Track.toEntity(created);
  }

  async findAll(): Promise<Track[]> {
    const foundTrackList = await this.prismaService.track.findMany();
    return foundTrackList.map((foundTrack) => Track.toEntity(foundTrack));
  }

  async findAllLiked(): Promise<Track[]> {
    const likedTrackList = await this.prismaService.track.findMany({
      where: {
        liked: true,
      },
    });
    return likedTrackList.map((likedTrack) => Track.toEntity(likedTrack));
  }

  async findOne(id: string): Promise<Track> {
    const found = await this.prismaService.track.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return Track.toEntity(found);
  }

  async update(id: string, entity: Track): Promise<Track> {
    const dto = entity.toDto();
    const updated = await this.prismaService.track.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
        duration: dto.duration,
        artistId: dto.artistId,
        albumId: dto.albumId,
        liked: entity.isLiked(),
      },
    });
    return Track.toEntity(updated);
  }

  async delete(id: string): Promise<Track> {
    const deleted = await this.prismaService.track.delete({
      where: {
        id: id,
      },
    });
    if (!deleted) {
      throw new RecordNotFoundException(`Track with id:${id} cannot be found`);
    }
    return Track.toEntity(deleted);
  }
}
