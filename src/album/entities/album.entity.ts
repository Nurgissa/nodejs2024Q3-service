import { getRandomId } from '../../utils';
import { isUUID } from 'class-validator';

export class Album {
  readonly #id: string;
  #name: string;
  #year: number;
  #artistId: string | null;
  #liked: boolean;

  constructor(name: string, year: number, artistid: string) {
    this.#id = getRandomId();
    this.#name = name;
    this.#year = year;
    this.#artistId = artistid;
    this.#liked = false;
  }

  getId() {
    return this.#id;
  }

  getArtistId() {
    return this.#artistId;
  }

  update({
    name,
    year,
    artistId,
  }: {
    name?: string;
    year?: number;
    artistId?: string;
  }) {
    if (name) {
      this.#name = name;
    }
    if (year) {
      this.#year = year;
    }

    if (artistId) {
      if (!isUUID(artistId)) {
        throw new Error('Not valid artistId');
      }
      this.#artistId = artistId;
    }
  }

  unlinkArtist() {
    this.#artistId = null;
  }

  like() {
    this.#liked = true;
  }

  unlike() {
    this.#liked = false;
  }

  isLiked() {
    return this.#liked;
  }

  toDto(): AlbumDto {
    return {
      id: this.#id,
      name: this.#name,
      year: this.#year,
      artistId: this.#artistId,
    };
  }
}
