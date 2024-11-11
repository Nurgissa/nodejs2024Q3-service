import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  #map = new Map<string, Track>();

  create(dto: CreateTrackDto) {
    const track = new Track(dto.name, dto.duration, dto.artistId, dto.albumId);
    this.#map.set(track.getId(), track);
    return track;
  }

  findAll() {
    return Array.from(this.#map.values());
  }

  findOne(id: string) {
    const track = this.#map.get(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  update(id: string, dto: UpdateTrackDto) {
    const track = this.#map.get(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    try {
      track.update({
        name: dto.name,
        duration: dto.duration,
        artistId: dto.artistId,
        albumId: dto.albumId,
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return track;
  }

  remove(id: string) {
    const track = this.#map.get(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return this.#map.delete(id);
  }

  unlinkTracksByArtist(id: string) {
    for (const track of this.#map.values()) {
      if (track.getArtistId() === id) {
        track.unlinkArtist();
      }
    }
  }

  unlinkTracksByAlbum(id: string) {
    for (const track of this.#map.values()) {
      if (track.getAlbumId() === id) {
        track.unlinkAlbum();
      }
    }
  }

  favorite(id: string) {
    const track = this.#map.get(id);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    track.like();
  }

  unfavorite(id: string) {
    const track = this.#map.get(id);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    track.unlike();
  }

  getFavoriteTracks() {
    return Array.from(this.#map.values()).filter((track) => track.isLiked());
  }
}
