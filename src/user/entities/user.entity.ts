import { ForbiddenException } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

export class User {
  #id: string;
  #login: string;
  #password: string;
  #version: number;
  #createdAt?: Date;
  #updatedAt?: Date;

  constructor(
    id: string,
    login: string,
    password: string,
    version?: number,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.#id = id;
    this.#login = login;
    this.#password = password;
    this.#version = version || 1;

    this.#createdAt = createdAt || new Date();
    this.#updatedAt = updatedAt || new Date();
  }

  getId(): string {
    return this.#id;
  }

  getPassword(): string {
    return this.#password;
  }

  updatePassword(oldPassword: string, newPassword: string) {
    if (this.#password !== oldPassword) {
      throw new ForbiddenException('Passwords do not match');
    }

    this.#version++;
    this.#password = newPassword;
  }

  toDto(): UserDto {
    return {
      id: this.#id,
      login: this.#login,
      version: this.#version,
      createdAt: this.#createdAt.getTime(),
      updatedAt: this.#updatedAt.getTime(),
    };
  }

  static toEntity({
    id,
    login,
    password,
    version,
    createdAt,
    updatedAt,
  }: {
    id: string;
    login: string;
    password: string;
    version: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return new User(id, login, password, version, createdAt, updatedAt);
  }
}
