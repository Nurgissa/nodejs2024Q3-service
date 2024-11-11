import { getRandomId } from '../../utils';
import { isUUID } from 'class-validator';

export class Track {
  #id: string;
  #name: string;
  #artistId: string | null;
  #albumId: string | null;
  #duration: number;
  #liked: boolean;

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
    this.#liked = false;
  }

  getId() {
    return this.#id;
  }

  getArtistId() {
    return this.#artistId;
  }

  getAlbumId() {
    return this.#albumId;
  }

  update({
    name,
    duration,
    artistId,
    albumId,
  }: {
    name?: string;
    duration?: number;
    artistId?: string;
    albumId?: string;
  }) {
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

  unlinkArtist() {
    this.#artistId = null;
  }

  unlinkAlbum() {
    this.#albumId = null;
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
