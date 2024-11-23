import { forwardRef, Inject } from '@nestjs/common';
import { IRepository } from '../core/data-access/repository.inteface';
import { User } from './entities/user.entity';
import { PrismaService } from '../frameworks/data-services/prisma/prisma.service';
import { RecordNotFoundException } from '../frameworks/data-services/prisma/record-not-found-exception';
import { RecordAlreadyExistsException } from '../frameworks/data-services/prisma/record-already-exists-exception';

export class UserRepository implements IRepository<User> {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
  ) {}

  async create(entity: User): Promise<User> {
    const dto = entity.toDto();
    const found = await this.prismaService.user.findUnique({
      where: {
        login: dto.login,
      },
    });

    if (found) {
      throw new RecordAlreadyExistsException(
        `User with login: ${found.login} already exists`,
      );
    }

    const created = await this.prismaService.user.create({
      data: {
        login: dto.login,
        password: entity.getPassword(),
        version: dto.version,
      },
    });

    return User.toEntity(created);
  }

  async findAll(): Promise<User[]> {
    const list = await this.prismaService.user.findMany();
    return list.map((user) => User.toEntity(user));
  }

  findAllLiked(): Promise<User[]> {
    return Promise.resolve([]);
  }

  async findOne(id: string): Promise<User> {
    const found = await this.prismaService.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return User.toEntity(found);
  }

  async update(id: string, entity: User): Promise<User> {
    const dto = entity.toDto();
    const updated = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        password: entity.getPassword(),
        version: dto.version,
      },
    });
    if (!updated) {
      throw new RecordNotFoundException(`User with id:${id} cannot be found`);
    }
    return User.toEntity(updated);
  }

  async delete(id: string): Promise<User> {
    const deleted = await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
    if (!deleted) {
      throw new RecordNotFoundException(`User with id:${id} cannot be found`);
    }
    return User.toEntity(deleted);
  }
}
