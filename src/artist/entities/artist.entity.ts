import { getRandomId } from '../../utils';

export class Artist {
  readonly #id: string;
  #name: string;
  #hasWonGrammy: boolean;

  constructor(name: string, hasWonGrammy: boolean) {
    this.#id = getRandomId();
    this.#name = name;
    this.#hasWonGrammy = hasWonGrammy;
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

  toDto(): ArtistDto {
    return {
      id: this.#id,
      name: this.#name,
      grammy: this.#hasWonGrammy,
    };
  }
}
