export interface IService<T> {
  create(obj: unknown): Promise<T>;
  read(): Promise<T[]>;
  readOne(id: string): Promise<T | null>;
}