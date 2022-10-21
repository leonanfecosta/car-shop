import express from 'express';
import errorHandler from './middlewares/erros';

const app = express();
app.use(express.json());
app.use(errorHandler);
export default app;
