// @ts-check

import { database } from '../db/database';
import UserModel from './user';

const UserModelPath = __dirname + 'user.ts';

console.log(UserModelPath);

const models = {
    User: UserModel,
    // User: database['import']('./user'),
    // User: database.import(__dirname + './user.ts'),
    // User: database.import(UserModelPath),
};

export default models;