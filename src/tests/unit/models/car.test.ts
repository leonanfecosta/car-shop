import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarModel from '../../../models/car.model';
import { carMock, carMockWithId } from '../../mocks/car.mock';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
  });

  after(async () => {
    sinon.restore();
  });

  describe('creating a car', () => {
    it('should create a car', async () => {
      const car = await carModel.create(carMock);
      expect(car).to.be.deep.equal(carMockWithId);
    });
  });

  describe('getting all cars', () => {
    it('should get all cars', async () => {
      const cars = await carModel.read();
      expect(cars).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('getting a car', () => {
    it('should get a car', async () => {
      const car = await carModel.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('should throw an error if the id is invalid', async () => {
      let error: any;
      try {
        await carModel.readOne('invalidId');
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
    });
  });

  describe('updating a car', () => {
    it('should update a car', async () => {
      const car = await carModel.update(carMockWithId._id, carMock);
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('should throw an error if the id is invalid', async () => {
      let error: any;
      try {
        await carModel.update('invalidId', carMock);
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
    });
  });
});
