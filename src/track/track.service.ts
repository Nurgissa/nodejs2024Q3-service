import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TrackRepository } from './track.repository';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  async create(dto: CreateTrackDto) {
    const track = new Track(
      'dummy-id',
      dto.name,
      dto.duration,
      dto.artistId,
      dto.albumId,
      false,
    );
    const created = await this.trackRepository.create(track);
    return created.toDto();
  }

  async findAll() {
    const list = await this.trackRepository.findAll();
    return list.map((track) => track.toDto());
  }

  async findOne(id: string) {
    const found = await this.#findTrack(id);
    return found.toDto();
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.#findTrack(id);

    try {
      track.update({
        name: dto.name,
        duration: dto.duration,
        artistId: dto.artistId,
        albumId: dto.albumId,
        liked: dto.liked,
      });
      await this.trackRepository.update(id, track);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return track.toDto();
  }

  async remove(id: string) {
    try {
      const deleted = await this.trackRepository.delete(id);
      return deleted.toDto();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async favorite(id: string) {
    try {
      const track = await this.#findTrack(id);
      track.like();
      return this.update(id, { ...track.toDto(), liked: track.isLiked() });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async unfavorite(id: string) {
    try {
      const track = await this.#findTrack(id);
      track.unlike();
      return this.update(id, { ...track.toDto(), liked: track.isLiked() });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async getFavoriteTracks() {
    const list = await this.trackRepository.findAllLiked();
    return list.map((track) => track.toDto());
  }

  async #findTrack(id: string) {
    try {
      return await this.trackRepository.findOne(id);
    } catch (error) {
      throw new NotFoundException(`track with id: ${id} not found`);
    }
  }
}
