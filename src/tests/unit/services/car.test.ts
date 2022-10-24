import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/car.model';
import CarService from '../../../services/car.service';
import { ZodError } from 'zod';
import { carMock, carMockWithId } from '../../mocks/car.mock';
const { expect } = chai;

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(CarModel.prototype, 'create').resolves(carMockWithId);
  });

  after(async () => {
    sinon.restore();
  });

  describe('creating a car', () => {
    it('should create a car', async () => {
      const car = await carService.create(carMock);
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('should throw a ZodError', async () => {
      let error;
      try {
        await carService.create({});
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });
});
