import { Injectable, NotFoundException } from '@nestjs/common';
import { IRepository } from '../core/data-access/repository.inteface';
import { PrismaService } from '../frameworks/data-services/prisma/prisma.service';
import { Artist } from './entities/artist.entity';
import { ArtistService } from './artist.service';
import { RecordNotFoundException } from '../frameworks/data-services/prisma/record-not-found-exception';

@Injectable()
export class ArtistRepository implements IRepository<Artist> {
  constructor(private readonly prismaService: PrismaService) {}

  async create(entity: Artist): Promise<Artist> {
    const dto = entity.toDto();
    const created = await this.prismaService.getClient().artist.create({
      data: {
        name: dto.name,
        grammy: dto.grammy,
      },
    });
    return Artist.toEntity(created);
  }

  async findAll(): Promise<Artist[]> {
    const list = await this.prismaService.getClient().artist.findMany();
    return list.map((record) => Artist.toEntity(record));
  }

  async findAllLiked(): Promise<Artist[]> {
    const list = await this.prismaService.getClient().artist.findMany({
      where: {
        liked: true,
      },
    });
    return list.map((record) => Artist.toEntity(record));
  }

  async findOne(id: string): Promise<Artist> {
    const found = await this.prismaService.getClient().artist.findUnique({
      where: {
        id: id,
      },
    });
    if (!found) {
      throw new RecordNotFoundException(`artist with id:${id} cannot be found`);
    }
    return Artist.toEntity(found);
  }

  async update(id: string, entity: Artist): Promise<Artist> {
    const dto = entity.toDto();
    const updated = await this.prismaService.getClient().artist.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
        grammy: dto.grammy,
      },
    });
    if (!updated) {
      throw new RecordNotFoundException(`artist with id:${id} cannot be found`);
    }
    return Artist.toEntity(updated);
  }

  async delete(id: string): Promise<Artist> {
    const deleted = await this.prismaService.getClient().artist.delete({
      where: {
        id: id,
      },
    });
    if (!deleted) {
      throw new RecordNotFoundException(`artist with id:${id} cannot be found`);
    }
    return Artist.toEntity(deleted);
  }
}
