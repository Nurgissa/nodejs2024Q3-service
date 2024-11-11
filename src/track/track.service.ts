import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
      track.update(dto.name, dto.duration, dto.artistId, dto.albumId);
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
}
