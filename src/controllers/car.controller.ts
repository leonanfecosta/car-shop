import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarController {
  constructor(private _carService: IService<ICar>) {}

  public async create(req: Request, res: Response<ICar>) {
    const car = await this._carService.create(req.body);
    res.status(201).json(car);
  }

  public async read(req: Request, res: Response<ICar[]>) {
    const cars = await this._carService.read();
    res.status(200).json(cars);
  }

  public async readOne(req: Request, res: Response<ICar | null>) {
    const car = await this._carService.readOne(req.params.id);
    res.status(200).json(car);
  }

  public async update(req: Request, res: Response<ICar | null>) {
    const { id } = req.params;
    const car = await this._carService.update(id, req.body);
    res.status(200).json(car);
  }
}
