import { IModel } from '../interfaces/IModel';
import { IMotorcycle, motorcycleSchema } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';
import { ErrorTypes } from '../errors/catalog';

export default class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;

  constructor(motorcycle: IModel<IMotorcycle>) {
    this._motorcycle = motorcycle;
  }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsedObj = motorcycleSchema.safeParse(obj);

    if (!parsedObj.success) {
      throw parsedObj.error;
    }

    return this._motorcycle.create(parsedObj.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._motorcycle.read();
  }

  public async readOne(id: string): Promise<IMotorcycle | null> {
    const motorcycle = await this._motorcycle.readOne(id);

    if (!motorcycle) {
      throw Error(ErrorTypes.EntityNotFound);
    }

    return motorcycle;
  }

  public async update(id: string, obj: unknown): Promise<IMotorcycle | null> {
    const parsedObj = motorcycleSchema.safeParse(obj);

    if (!parsedObj.success) {
      throw parsedObj.error;
    }

    const motorcycle = await this._motorcycle.update(id, parsedObj.data);

    if (!motorcycle) {
      throw Error(ErrorTypes.EntityNotFound);
    }

    return motorcycle;
  }

  public async delete(id: string): Promise<IMotorcycle | null> {
    const motorcycle = await this._motorcycle.delete(id);

    if (!motorcycle) {
      throw Error(ErrorTypes.EntityNotFound);
    }

    return motorcycle;
  }
}