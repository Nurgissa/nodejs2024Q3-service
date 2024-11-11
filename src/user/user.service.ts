import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  #map = new Map<string, User>();

  create(dto: CreateUserDto) {
    const user = new User(dto.login, dto.password);
    this.#map.set(user.getId(), user);
    return user;
  }

  findOneId(id: string) {
    return this.#map.get(id);
  }

  findAll() {
    return Array.from(this.#map.values());
  }

  update(id: string, dto: UpdatePasswordDto) {
    const user = this.#map.get(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.updatePassword(dto.oldPassword, dto.newPassword);
    return user;
  }

  delete(id: string) {
    if (!this.#map.has(id)) {
      throw new NotFoundException('User not found');
    }
    return this.#map.delete(id);
  }
}
