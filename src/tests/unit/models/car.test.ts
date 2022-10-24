import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarModel from '../../../models/car.model';
import { carMock, carMockWithId } from '../../mocks/car.mock';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
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
});
