import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  #map = new Map<string, Artist>();

  create(dto: CreateArtistDto) {
    const artist = new Artist(dto.name, dto.grammy);
    this.#map.set(artist.getId(), artist);
    return artist;
  }

  findAll() {
    return Array.from(this.#map.values());
  }

  findOne(id: string) {
    const artist = this.#map.get(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.#map.get(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    artist.update(updateArtistDto.name, updateArtistDto.grammy);
    return artist;
  }

  remove(id: string) {
    const artist = this.#map.get(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return this.#map.delete(id);
  }
}
