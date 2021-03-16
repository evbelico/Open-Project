// @ts-check
require('dotenv').config();

// import { UserModel } from '../models/user';

const Sequelize = require('sequelize');

export const database = new Sequelize('postgres://postgres:B@b@082020Yaga!@localhost:5432/open_project',
    // new Sequelize('postgres://op_admin:B@b@082020Yaga!@op_db:5432/open_project',
    // (process.env.DATABASE),
    // (process.env.DATABASE_USER),
    // (process.env.DATABASE_PASSWORD), {
        // port: Number(process.env.DATABASE_PORT) || 54320,
        // host: process.env.DATABASE_HOST || "localhost",
        // dialect: "postgres",
        // pool: {
        //     min: 0,
        //     max: 5,
        //     acquire: 30000,
        //     idle: 10000,
        // },
);

// database.authenticate()
// .then( console.dir('Database connection established.') )
// .catch(err => console.error('An error happened during DB connection : ', err)); 