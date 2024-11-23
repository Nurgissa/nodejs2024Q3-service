export interface IRepository<T> {
  create(data: T): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  findAllLiked(): Promise<T[]>;
  update(id: string, data: T): Promise<T>;
  delete(id: string): Promise<T>;
}
