import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
    const album = new Album('dummy-id', dto.name, dto.year, dto.artistId);
    const created = await this.albumRepository.create(album);
    return created.toDto();
  }

  async findAll() {
    const list = await this.albumRepository.findAll();
    return list.map((album) => album.toDto());
  }

  async findOne(id: string) {
    try {
      const album = await this.albumRepository.findOne(id);
      return album.toDto();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, dto: UpdateAlbumDto) {
    let album: Album;
    try {
      album = await this.albumRepository.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }

    try {
      album.update({ name: dto.name, year: dto.year, artistId: dto.artistId });
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return album.toDto();
  }

  async remove(id: string) {
    try {
      const deleted = await this.albumRepository.delete(id);
      this.trackService.unlinkTracksByAlbum(deleted.getId());
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  unlinkAlbums(artistId: string) {
    // for (const album of this.#map.values()) {
    //   if (artistId === album.getArtistId()) {
    //     album.unlinkArtist();
    //   }
    // }
  }

  favorite(id: string) {
    // const album = this.#map.get(id);
    // if (!album) {
    //   throw new UnprocessableEntityException('Album not found');
    // }
    // album.like();
  }

  unfavorite(id: string) {
    // const album = this.#map.get(id);
    // if (!album) {
    //   throw new UnprocessableEntityException('Album not found');
    // }
    // album.unlike();
  }

  getFavoriteAlbums() {
    return [];
    // return Array.from(this.#map.values()).filter((album) => album.isLiked());
  }
}
