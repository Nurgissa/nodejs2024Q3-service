import { isUUID } from 'class-validator';

export class Track {
  #id: string;
  #name: string;
  #artistId: string | null;
  #albumId: string | null;
  #duration: number;
  #liked: boolean;

  constructor(
    id: string,
    name: string,
    duration: number,
    artistId: string | null,
    albumId: string | null,
    liked?: boolean,
  ) {
    this.#id = id;
    this.#name = name;
    this.#artistId = artistId;
    this.#albumId = albumId;
    this.#duration = duration;
    this.#liked = liked || false;
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
    liked,
  }: {
    name?: string;
    duration?: number;
    artistId?: string;
    albumId?: string;
    liked?: boolean;
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

    if (liked !== undefined) {
      this.#liked = liked;
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

  static toEntity({
    id,
    name,
    duration,
    artistId,
    albumId,
    liked,
  }: {
    id: string;
    name: string;
    duration: number;
    artistId: string | null;
    albumId: string | null;
    liked?: boolean;
  }) {
    return new Track(id, name, duration, artistId, albumId, liked);
  }
}
