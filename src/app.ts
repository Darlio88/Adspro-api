require('dotenv').config();
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { Logger } from '../logger';
import { CommonRoutesConfig } from './configs/routes.config';
import { UserRoutes } from './api/routes';

const app: Application = express();
const routes: Array<CommonRoutesConfig> = [];

app.use(express.json());
app.use(cors());
app.use(helmet());

//Add Routes here (to routes array)
routes.push(new UserRoutes(app));


//Health check
app.get('/logs', (req: Request, res: Response) => {
    Logger.debug('Health-checking');
    res.status(200).json({
        status: 'OK',
        message: 'Application is running.'
    });
});


//for unhandled routes
app.all('*', (req: Request, res: Response) => {
    Logger.error(`Unhandled route: ${req.url}`);
    res.status(404).json({
        status: 'ERROR',
        message: `Route ${req.originalUrl} not found.`,
    });
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    Logger.debug(`${req}`);
    next();
});

export { app };
