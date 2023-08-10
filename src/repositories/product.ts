import {Product} from '../models/product';
import { dataSource } from '../configs/DBConfig';

export const ProductRepository = dataSource.getRepository(Product).extend({});
