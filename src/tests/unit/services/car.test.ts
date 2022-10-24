import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/car.model';
import CarService from '../../../services/car.service';
import { ZodError } from 'zod';
import { carMock, carMockWithId } from '../../mocks/car.mock';
const { expect } = chai;
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon
      .stub(carModel, 'readOne')
      .onCall(0)
      .resolves(carMockWithId)
      .onCall(1)
      .resolves(null);
    sinon
      .stub(carModel, 'update')
      .onCall(0)
      .resolves(carMockWithId)
      .onCall(1)
      .resolves(null)
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

  describe('getting all cars', () => {
    it('should get all cars', async () => {
      const cars = await carService.read();
      expect(cars).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('getting a car', () => {
    it('should get a car', async () => {
      const car = await carService.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('should throw a Error', async () => {
      let error: any;
      try {
        await carService.readOne('invalidId');
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('updating a car', () => {
    it('should update a car', async () => {
      const car = await carService.update(carMockWithId._id, carMock);
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('should throw a ZodError', async () => {
      let error: any;
      try {
        await carService.update('any-id', { INVALID: 'OBJECT' });
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });

    it('should throw a Error', async () => {
      let error: any;
      try {
        await carService.update('invalidId', carMock);
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
    });
  });
});
