import * as sinon from 'sinon';
import { Request, Response } from 'express';
import chai from 'chai';
import CarModel from '../../../models/car.model';
import CarService from '../../../services/car.service';
import CarController from '../../../controllers/car.controller';
import { carMock, carMockWithId } from '../../mocks/car.mock';
const { expect } = chai;

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(async () => {
    sinon.restore();
  });

  describe('create a new Car', () => {
    beforeEach(async () => {
      sinon.stub(carService, 'create').resolves(carMockWithId);
    });
    it('should create a new Car', async () => {
      req.body = carMock;
      await carController.create(req, res);
      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;
      expect(statusStub.calledOnce).to.be.true;
      expect(statusStub.calledWith(201)).to.be.true;
      expect(jsonStub.calledOnce).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('get all Cars', () => {
    beforeEach(async () => {
      sinon.stub(carService, 'read').resolves([carMockWithId]);
    });
    it('should get all Cars', async () => {
      await carController.read(req, res);
      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;
      expect(statusStub.calledOnce).to.be.true;
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledOnce).to.be.true;
      expect(jsonStub.calledWith([carMockWithId])).to.be.true;
    });
  });

  describe('get a Car', () => {
    beforeEach(async () => {
      sinon.stub(carService, 'readOne').resolves(carMockWithId);
    });
    it('should get a Car', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);
      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;
      expect(statusStub.calledOnce).to.be.true;
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledOnce).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('update a Car', () => {
    beforeEach(async () => {
      sinon.stub(carService, 'update').resolves(carMockWithId);
    });
    it('should update a Car', async () => {
      req.params = { id: carMockWithId._id };
      req.body = carMock;
      await carController.update(req, res);
      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;
      expect(statusStub.calledOnce).to.be.true;
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledOnce).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('delete a Car', () => {
    beforeEach(async () => {
      sinon.stub(carService, 'delete').resolves(carMockWithId);
    });
    it('should delete a Car', async () => {
      req.params = { id: carMockWithId._id };
      await carController.delete(req, res);
      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;
      expect(statusStub.calledOnce).to.be.true;
      expect(statusStub.calledWith(204)).to.be.true;
      expect(jsonStub.calledOnce).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });
});
