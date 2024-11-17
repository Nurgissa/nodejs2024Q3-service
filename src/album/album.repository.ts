import { Album } from './entities/album.entity';
import { IRepository } from '../core/data-access/repository.inteface';
import { RecordNotFoundException } from '../frameworks/data-services/prisma/record-not-found-exception';
import { PrismaService } from '../frameworks/data-services/prisma/prisma.service';
import { forwardRef, Inject } from '@nestjs/common';

export class AlbumRepository implements IRepository<Album> {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
  ) {}

  async create(entity: Album): Promise<Album> {
    const dto = entity.toDto();
    const created = await this.prismaService.album.create({
      data: {
        name: dto.name,
        year: dto.year,
        artistId: dto.artistId,
        liked: entity.isLiked(),
      },
    });
    return Album.toEntity(created);
  }

  async findAll(): Promise<Album[]> {
    const list = await this.prismaService.album.findMany();
    return list.map((record) => Album.toEntity(record));
  }

  async findAllLiked(): Promise<Album[]> {
    const list = await this.prismaService.album.findMany({
      where: {
        liked: true,
      },
    });
    return list.map((record) => Album.toEntity(record));
  }

  async findOne(id: string): Promise<Album> {
    const found = await this.prismaService.album.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return Album.toEntity(found);
  }

  async update(id: string, entity: Album): Promise<Album> {
    const dto = entity.toDto();
    console.log('inside repo', dto);
    const updated = await this.prismaService.album.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
        year: dto.year,
        artistId: dto.artistId,
        liked: entity.isLiked(),
      },
    });

    if (!updated) {
      throw new RecordNotFoundException(`album with id:${id} cannot be found`);
    }
    return Album.toEntity(updated);
  }

  async delete(id: string): Promise<Album> {
    const deleted = await this.prismaService.album.delete({
      where: {
        id: id,
      },
    });
    if (!deleted) {
      throw new RecordNotFoundException(`alnum with id:${id} cannot be found`);
    }
    return Album.toEntity(deleted);
  }
}
