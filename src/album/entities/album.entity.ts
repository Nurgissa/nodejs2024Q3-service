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
    artistId: string | null,
    liked?: boolean,
  ) {
    this.#id = id;
    this.#name = name;
    this.#year = year;
    this.#artistId = artistId;
    this.#liked = liked || false;
  }

  update({
    name,
    year,
    artistId,
    liked,
  }: {
    name?: string;
    year?: number;
    artistId?: string;
    liked?: boolean;
  }) {
    if (name) {
      this.#name = name;
    }
    if (year) {
      this.#year = year;
    }

    console.log('liked', this.#liked, liked);
    if (liked !== undefined) {
      this.#liked = liked;
    }

    if (artistId) {
      if (!isUUID(artistId)) {
        throw new Error('Not valid artistId');
      }
      this.#artistId = artistId;
    }
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
    artistId: string | null;
    liked?: boolean;
  }) {
    return new Album(id, name, year, artistId, liked);
  }

  toString() {
    return this.#name;
  }
}
