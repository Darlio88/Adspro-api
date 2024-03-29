import 'reflect-metadata';
import { DataSource } from 'typeorm';
//import { Ads } from '../models/user';
export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: `${process.env.DB_PASSWORD}`,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [`src/models/*.ts`, `src/models/*.js`],
    // entities: [`${__dirname}/models/*.ts`, `${__dirname}/models/*.js`],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: [],
});
