import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  #map = new Map<string, Album>();

  create(dto: CreateAlbumDto) {
    const album = new Album(dto.name, dto.year, dto.artistId);
    this.#map.set(album.getId(), album);
    return album;
  }

  findAll() {
    return Array.from(this.#map.values());
  }

  findOne(id: string) {
    const album = this.#map.get(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  update(id: string, dto: UpdateAlbumDto) {
    const album = this.#map.get(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    try {
      album.update(dto.name, dto.year, dto.artistId);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return album;
  }

  remove(id: string) {
    const album = this.#map.get(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return this.#map.delete(id);
  }
}
