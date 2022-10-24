import { IModel } from '../interfaces/IModel';
import { ICar, carSchema } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';
import { ErrorTypes } from '../errors/catalog';

export default class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(car: IModel<ICar>) {
    this._car = car;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsedObj = carSchema.safeParse(obj);

    if (!parsedObj.success) {
      throw parsedObj.error;
    }

    return this._car.create(parsedObj.data);
  }

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }

  public async readOne(id: string): Promise<ICar | null> {
    const car = await this._car.readOne(id);

    if (!car) {
      throw Error(ErrorTypes.EntityNotFound);
    }

    return car;
  }
}
