import { Router } from 'express';
import MotorcycleController from '../controllers/motorcycle.controller';
import MotorcycleService from '../services/motorcycle.service';
import MotorcycleModel from '../models/motorcycle.model';

const router = Router();

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

router.post('/', (req, res) => motorcycleController.create(req, res));
router.get('/', (req, res) => motorcycleController.read(req, res));
router.get('/:id', (req, res) => motorcycleController.readOne(req, res));
router.put('/:id', (req, res) => motorcycleController.update(req, res));
router.delete('/:id', (req, res) => motorcycleController.delete(req, res));

export default router;