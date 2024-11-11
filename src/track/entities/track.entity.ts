import { getRandomId } from '../../utils';
import { isUUID } from 'class-validator';

export class Track {
  #id: string;
  #name: string;
  #artistId: string | null;
  #albumId: string | null;
  #duration: number;

  constructor(
    name: string,
    duration: number,
    artistId: string | null,
    albumId: string | null,
  ) {
    this.#id = getRandomId();
    this.#name = name;
    this.#artistId = artistId;
    this.#albumId = albumId;
    this.#duration = duration;
  }

  getId() {
    return this.#id;
  }

  update(
    name?: string,
    duration?: number,
    artistId?: string,
    albumId?: string,
  ) {
    if (name) {
      this.#name = name;
    }
    if (duration) {
      this.#duration = duration;
    }
    if (artistId) {
      if (!isUUID(artistId)) {
        throw new Error('artistId must be a UUID');
      }
      this.#artistId = artistId;
    }
    if (albumId) {
      if (!isUUID(albumId)) {
        throw new Error('albumId must be a UUID');
      }
      this.#albumId = albumId;
    }
  }

  toDto() {
    return {
      id: this.#id,
      name: this.#name,
      duration: this.#duration,
      artistId: this.#artistId,
      albumId: this.#albumId,
    };
  }
}
