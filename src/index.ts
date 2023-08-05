require('dotenv').config();

import { dataSource } from './configs/DBConfig';
import { app } from './app';
import { Logger } from '../logger';

dataSource
    .initialize()
    .then(async () => {
        Logger.info('Database connecting');
        const port = process.env.PORT || 5000;
        // Start the Server
        app.listen(port, () => {
            Logger.info(`Environment set to "${process.env.NODE_ENV}".`);
            Logger.info(`App running on port http://localhost:${port}`);
        });
    })
    .catch((error) => {
        Logger.error('Failed to connect to database', error);
    });
