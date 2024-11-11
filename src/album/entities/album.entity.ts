import { getRandomId } from '../../utils';
import { isUUID } from 'class-validator';

export class Album {
  readonly #id: string;
  #name: string;
  #year: number;
  #artistId: string | null;

  constructor(name: string, year: number, artistid: string) {
    this.#id = getRandomId();
    this.#name = name;
    this.#year = year;
    this.#artistId = artistid;
  }

  getId() {
    return this.#id;
  }

  update(name?: string, year?: number, artistId?: string) {
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

  toDto(): AlbumDto {
    return {
      id: this.#id,
      name: this.#name,
      year: this.#year,
      artistId: this.#artistId,
    };
  }
}
