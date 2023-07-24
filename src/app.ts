require('dotenv').config();
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { router } from './routes';
//const routes = require('./routes');

import { Logger } from '../logger';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/logs', (req: Request, res: Response) => {
    Logger.debug('Health-checking');
});

// Use the routes from routes.js
app.use('/', router);


app.all('*', (req: Request, res: Response, next: NextFunction) => {
    Logger.debug(`${req}`);
    next();
});

export { app };
