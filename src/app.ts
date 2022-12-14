import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/erros';
import carRoutes from './routes/car.routes';
import motorcycleRoutes from './routes/motorcycle.routes';

const app = express();
app.use(express.json());
app.use('/cars', carRoutes);
app.use('/motorcycles', motorcycleRoutes);
app.use(errorHandler);
export default app;
