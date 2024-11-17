import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  #prisma = new PrismaClient();

  getClient() {
    return this.#prisma;
  }
}
