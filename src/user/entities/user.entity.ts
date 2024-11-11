import { getRandomId } from '../../utils';
import { ForbiddenException } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

export class User {
  private readonly id: string;
  private readonly login: string;
  private password: string;
  private version: number;
  private readonly createdAt: number;
  private updateAt: number;

  constructor(login: string, password: string) {
    this.id = getRandomId();
    this.login = login;
    this.password = password;
    this.version = 1;

    const now = Date.now();
    this.createdAt = now;
    this.updateAt = now;
  }

  getId(): string {
    return this.id;
  }

  updatePassword(oldPassword: string, newPassword: string) {
    if (this.password !== oldPassword) {
      // TODO: change to entity specific error
      throw new ForbiddenException('Passwords do not match');
    }

    this.password = newPassword;
    this.updateAt = Date.now();
    this.version++;
  }

  toDto(): UserDto {
    return {
      id: this.id,
      login: this.login,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updateAt,
    };
  }
}
