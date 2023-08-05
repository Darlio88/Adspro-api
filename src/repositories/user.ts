import {User} from '../models/user';
import { dataSource } from '../configs/DBConfig';

export const UserRepository = dataSource.getRepository(User).extend({});
