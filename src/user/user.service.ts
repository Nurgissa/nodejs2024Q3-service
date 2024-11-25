import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto) {
    try {
      const created = await this.userRepository.create(
        new User('dummy-id', dto.login, dto.password),
      );
      return created.toDto();
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async findOne(id: string) {
    const found = await this.#findUser(id);
    return found.toDto();
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOneByUsername(username);
  }

  async findAll() {
    const list = await this.userRepository.findAll();
    return list.map((user) => user.toDto());
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const user = await this.#findUser(id);

    try {
      user.updatePassword(dto.oldPassword, dto.newPassword);
      const updated = await this.userRepository.update(id, user);
      return updated.toDto();
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async delete(id: string) {
    try {
      const found = await this.#findUser(id);
      const deleted = await this.userRepository.delete(found.getId());
      return deleted.toDto();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async #findUser(id: string) {
    try {
      return await this.userRepository.findOne(id);
    } catch (error) {
      throw new NotFoundException(`User with id:${id} not found`);
    }
  }
}
