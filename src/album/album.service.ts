import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  #map = new Map<string, Album>();

  constructor(private readonly trackService: TrackService) {}

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
      album.update({ name: dto.name, year: dto.year, artistId: dto.artistId });
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

    this.trackService.unlinkTracksByAlbum(id);

    return this.#map.delete(id);
  }

  unlinkAlbums(artistId: string) {
    for (const album of this.#map.values()) {
      if (artistId === album.getArtistId()) {
        album.unlinkArtist();
      }
    }
  }

  favorite(id: string) {
    const album = this.#map.get(id);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
    album.like();
  }

  unfavorite(id: string) {
    const album = this.#map.get(id);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
    album.unlike();
  }

  getFavoriteAlbums() {
    return Array.from(this.#map.values()).filter((album) => album.isLiked());
  }
}
