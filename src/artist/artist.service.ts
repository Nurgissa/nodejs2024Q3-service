import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { getRandomId } from '../utils';
import { ArtistRepository } from './artist.respository';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async create(dto: CreateArtistDto) {
    const artist = new Artist(getRandomId(), dto.name, dto.grammy, false);
    const created = await this.artistRepository.create(artist);
    return created.toDto();
  }

  async findAll() {
    const artists = await this.artistRepository.findAll();
    return artists.map((artist) => artist.toDto());
  }

  async findOne(id: string) {
    const artist = await this.#findArtist(id);
    return artist.toDto();
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.#findArtist(id);

    try {
      console.log(artist.toDto());
      artist.update(dto.name, dto.grammy, dto.liked);
      console.log(dto.liked);
      console.log(artist.toDto());
      const updated = await this.artistRepository.update(id, artist);
      return updated.toDto();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const artist = await this.artistRepository.findOne(id);
      const artistId = artist.getId();

      const deletedArtist = await this.artistRepository.delete(artistId);
      return deletedArtist.toDto();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async favorite(id: string) {
    try {
      const artist = await this.#findArtist(id);
      artist.like();
      return this.update(id, { ...artist.toDto(), liked: artist.isLiked() });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async unfavorite(id: string) {
    try {
      const artist = await this.#findArtist(id);
      artist.unlike();
      return this.update(id, { ...artist.toDto(), liked: artist.isLiked() });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async getFavoriteArtist() {
    const list = await this.artistRepository.findAllLiked();
    return list.map((artist) => artist.toDto());
  }

  async #findArtist(id: string) {
    try {
      return await this.artistRepository.findOne(id);
    } catch (error) {
      throw new NotFoundException(`artist with id:${id} not found`);
    }
  }
}
