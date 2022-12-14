import { Router } from 'express';
import CarController from '../controllers/car.controller';
import CarService from '../services/car.service';
import CarModel from '../models/car.model';

const router = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

router.post('/', (req, res) => carController.create(req, res));
router.get('/', (req, res) => carController.read(req, res));
router.get('/:id', (req, res) => carController.readOne(req, res));
router.put('/:id', (req, res) => carController.update(req, res));
router.delete('/:id', (req, res) => carController.delete(req, res));

export default router;