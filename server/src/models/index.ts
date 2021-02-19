// @ts-check

import { database } from '../db/database';
// import UserModel from './user';
// import TokenModel from './tokens';
import User from './user';
// import Token from './tokens'

const UserModelPath = __dirname + 'user.ts';
// const TokenModelPath = __dirname + 'tokens.ts';

console.log(UserModelPath);
// console.log(TokenModelPath);

const models = {
    User: User,
    // Token: Token,
    // User: database['import']('./user'),
    // User: database.import(__dirname + './user.ts'),
    // User: database.import(UserModelPath),
};

export default models;