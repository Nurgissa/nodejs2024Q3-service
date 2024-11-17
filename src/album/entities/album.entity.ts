import { isUUID } from 'class-validator';

export class Album {
  #id: string;
  #name: string;
  #year: number;
  #artistId: string | null;
  #liked: boolean;

  constructor(
    id: string,
    name: string,
    year: number,
    artistId: string,
    liked?: boolean,
  ) {
    this.#id = id;
    this.#name = name;
    this.#year = year;
    this.#artistId = artistId;
    this.#liked = liked || false;
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

  toDto() {
    return {
      id: this.#id,
      name: this.#name,
      year: this.#year,
      artistId: this.#artistId,
      liked: this.#liked,
    };
  }

  static toEntity({
    id,
    name,
    year,
    artistId,
    liked,
  }: {
    id: string;
    name: string;
    year: number;
    artistId: string;
    liked?: boolean;
  }) {
    return new Album(id, name, year, artistId, liked);
  }
}
