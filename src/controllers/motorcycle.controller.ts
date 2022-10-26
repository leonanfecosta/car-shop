import { Response, Request } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleController {
  constructor(private _motorcycleService: IService<IMotorcycle>) {}

  public async create(req: Request, res: Response<IMotorcycle>) {
    const motorcycle = await this._motorcycleService.create(req.body);
    res.status(201).json(motorcycle);
  }

  public async read(req: Request, res: Response<IMotorcycle[]>) {
    const motorcycles = await this._motorcycleService.read();
    res.status(200).json(motorcycles);
  }

  public async readOne(req: Request, res: Response<IMotorcycle | null>) {
    const motorcycle = await this._motorcycleService.readOne(req.params.id);
    res.status(200).json(motorcycle);
  }

  public async update(req: Request, res: Response<IMotorcycle | null>) {
    const { id } = req.params;
    const motorcycle = await this._motorcycleService.update(id, req.body);
    res.status(200).json(motorcycle);
  }

  public async delete(req: Request, res: Response<IMotorcycle | null>) {
    const motorcycle = await this._motorcycleService.delete(req.params.id);
    res.status(204).json(motorcycle);
  }
}