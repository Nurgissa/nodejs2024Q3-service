import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { getRandomId } from '../utils';
import { ArtistRepository } from './artist.respository';
import e from 'express';

@Injectable()
export class ArtistService {
  // #map = new Map<string, Artist>();

  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly artistRepository: ArtistRepository,
  ) {}

  async create(dto: CreateArtistDto) {
    const artist = new Artist(getRandomId(), dto.name, dto.grammy);
    const created = await this.artistRepository.create(artist);
    return created.toDto();
  }

  async findAll() {
    const artists = await this.artistRepository.findAll();
    return artists.map((artist) => artist.toDto());
  }

  async findOne(id: string) {
    try {
      const artist = await this.artistRepository.findOne(id);
      return artist.toDto();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      const artist = await this.artistRepository.findOne(id);

      artist.update(updateArtistDto.name, updateArtistDto.grammy);

      await this.artistRepository.update(id, artist);
      return artist.toDto();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const artist = await this.artistRepository.findOne(id);
      const artistId = artist.getId();

      this.albumService.unlinkAlbums(artistId);
      this.trackService.unlinkTracksByArtist(artistId);

      const deletedArtist = await this.artistRepository.delete(artistId);
      return deletedArtist.toDto();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  favorite(id: string) {
    // const artist = this.#map.get(id);
    // if (!artist) {
    //   throw new UnprocessableEntityException('Artist not found');
    // }
    // artist.like();
  }

  unfavorite(id: string) {
    // const artist = this.#map.get(id);
    // if (!artist) {
    //   throw new UnprocessableEntityException('Artist not found');
    // }
    // artist.unlike();
  }

  getFavoriteArtist() {
    return [];
    //return Array.from(this.#map.values()).filter((album) => album.isLiked());
  }
}
