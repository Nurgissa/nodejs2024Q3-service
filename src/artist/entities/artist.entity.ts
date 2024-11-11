import { getRandomId } from '../../utils';

export class Artist {
  readonly #id: string;
  #name: string;
  #hasWonGrammy: boolean;
  #liked: boolean;

  constructor(name: string, hasWonGrammy: boolean) {
    this.#id = getRandomId();
    this.#name = name;
    this.#hasWonGrammy = hasWonGrammy;
    this.#liked = false;
  }

  getId(): string {
    return this.#id;
  }

  update(name?: string, hasWonGrammy?: boolean) {
    if (name) {
      this.#name = name;
    }
    if (hasWonGrammy !== undefined) {
      this.#hasWonGrammy = hasWonGrammy;
    }

    return this;
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

  toDto(): ArtistDto {
    return {
      id: this.#id,
      name: this.#name,
      grammy: this.#hasWonGrammy,
    };
  }
}
