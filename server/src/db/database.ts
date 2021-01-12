// @ts-check
require('dotenv').config();

// import { UserModel } from '../models/user';

const Sequelize = require('sequelize');

export const database = new Sequelize('postgres://madmonsieur:B@b@082020Yaga!@localhost:5432/open_project',
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

// console.log(process.env.DATABASE)
// database.authenticate()
// .then( console.dir('Database connection established.') )
// .catch(err => console.error('An error happened during DB connection : ', err)); 

// const connectDb = (err => {
    // if (err) console.error("Error db :", err);
    // sequelize.authenticate();
// })

// const test = connectDb;