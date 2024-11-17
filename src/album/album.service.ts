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
import { AlbumRepository } from './album.repository';

@Injectable()
export class AlbumService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumRepository: AlbumRepository,
  ) {}

  async create(dto: CreateAlbumDto) {
    const album = new Album(
      'dummy-id',
      dto.name,
      dto.year,
      dto.artistId,
      false,
    );
    const created = await this.albumRepository.create(album);
    return created.toDto();
  }

  async findAll() {
    const list = await this.albumRepository.findAll();
    return list.map((album) => album.toDto());
  }

  async findOne(id: string) {
    const found = await this.#findAlbum(id);
    return found.toDto();
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const album = await this.#findAlbum(id);
    try {
      album.update({
        name: dto.name,
        year: dto.year,
        artistId: dto.artistId,
        liked: dto.liked,
      });
      const updated = await this.albumRepository.update(id, album);
      return updated.toDto();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.albumRepository.delete(id);
      return deleted.toDto();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async favorite(id: string) {
    try {
      const found = await this.albumRepository.findOne(id);
      found.like();
      return this.update(id, { ...found.toDto(), liked: found.isLiked() });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async unfavorite(id: string) {
    try {
      const found = await this.albumRepository.findOne(id);
      found.unlike();
      return this.update(id, { ...found.toDto(), liked: found.isLiked() });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async getFavoriteAlbums() {
    const list = await this.albumRepository.findAllLiked();
    return list.map((album) => album.toDto());
  }

  async #findAlbum(id: string) {
    try {
      return this.albumRepository.findOne(id);
    } catch (error) {
      throw new NotFoundException(`album with id:${id} not found`);
    }
  }
}
