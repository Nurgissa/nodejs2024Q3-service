import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  private readonly userMap = new Map<string, UserEntity>();

  create(dto: CreateUserDto) {
    const user = new UserEntity(dto.login, dto.password);
    this.userMap.set(user.getId(), user);
    return user;
  }

  findOneId(id: string) {
    return this.userMap.get(id);
  }

  findAll() {
    return Array.from(this.userMap.values());
  }

  update(id: string, dto: UpdatePasswordDto) {
    const user = this.userMap.get(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.updatePassword(dto.oldPassword, dto.newPassword);
    return user;
  }

  delete(id: string) {
    if (!this.userMap.has(id)) {
      throw new NotFoundException('User not found');
    }
    return this.userMap.delete(id);
  }
}
