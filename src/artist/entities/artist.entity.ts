export class Artist {
  #id: string;
  #name: string;
  #hasWonGrammy: boolean;
  #liked: boolean;

  constructor(
    id: string,
    name: string,
    hasWonGrammy: boolean,
    liked?: boolean,
  ) {
    this.#id = id;
    this.#name = name;
    this.#hasWonGrammy = hasWonGrammy;
    this.#liked = liked || false;
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

  toDto() {
    return {
      id: this.#id,
      name: this.#name,
      grammy: this.#hasWonGrammy,
    };
  }

  static toEntity({
    id,
    name,
    grammy,
    liked,
  }: {
    id: string;
    name: string;
    grammy: boolean;
    liked?: boolean;
  }) {
    return new Artist(id, name, grammy, liked);
  }
}
