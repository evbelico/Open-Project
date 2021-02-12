// @ts-check
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const nodemailer = require('nodemailer');
const crypto = require('crypto');

import { UserAttributes, UserCreationAttributes } from '../models/user'
import { TokenAttributes, TokenCreationAttributes } from '../models/tokens'
import models from '../models';

export const resolvers = {
  // Queries, a.k.a Read operations (does not alter data)
    Query: {
      me: () => {
        return {
          firstName: 'Totocat',
        };
      },
      hello: () => {
        return 'Hello World !';
      },
      getAllUsers: async (parent, args, { models }): Promise<UserAttributes> => {
        return await models.User.findAll();
      },
      getAllTokens: async (parent, args, { models}): Promise<TokenAttributes> => {
        const bigTest = await models.Token.findAll();
        console.log("Get all tokens test:", bigTest);
        return bigTest;
      }
    },
    // Mutations, a.k.a Create/Update/Delete operations
    Mutation: {
      modifierNom: async (args, { models }) => {
        var toto = 1;
      },
      // Account creation mutation
      register: async (parent, args, { models }): Promise<UserCreationAttributes> => {
        console.log("Signup : ", args);
        console.log("Hello ?", { models });
        try {
          const hash: string = await bcrypt.hash(args.password, saltRounds);
          const tokenHash: string = await crypto.randomBytes(46).toString('hex');

          const userData: UserCreationAttributes = await models.User.create({
            email: args.email,
            birthday: args.birthday,
            password: hash,
            token: tokenHash,
            tokenExpired: false,
          });
          
          return userData;
        } catch(error) {
          console.error("Error in user creation SEQUELIZE :", error);
        }
      },
      // Verify token created on account creation
      // registerToken: async (parent, args, { models }) => {

      // },
        // Function for user creation tests purposes
        // Will need to be split in multiple functions later on
        testSignup: async (parent, args, ctx) => {
            console.log(args);

            try {
              const hashedPassword = await bcrypt.hash(args.password, saltRounds); // Hash input password
              // const newToken = await crypto.randomBytes(16).toString('hex'); // Generate validation token

              // Instantiate SMTP with testing inbox
              let transport = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "bd159a9a3a58bc",
                  pass: "9f33f8b9dcc241"
                }
              });

              // Create a new user using the provided data
              const signupPayload = await ctx.prisma.users.create({
                data: {
                  firstName: args.firstName,
                  lastName: args.lastName,
                  email: args.email,
                  password: hashedPassword,
                },
              });

              // Create the validation token inside the corresponding table
              const addToken = await ctx.prisma.tokens.create({
                data: {
                  // token: newToken,
                  user: {
                    // Connect the validation token to the new user
                    connect: { id: signupPayload.id },
                  },
                },
              });

              // Account verification mail
              const validationMail = {
                from: 'test@the-undefined-project.com', // Sender address
                to: signupPayload.email,         // List of recipients
                subject: 'Verify your account | The Undefined Project', // Subject line
                // text: `Click here in order to verify your email address and start navigating : http://localhost:8080/login/${newToken}`, // Plain text body
                // html: `<html><a href="http://localhost:8080/login?token=${newToken}">Click here</a>
                //   in order to verify your email address and start navigating !
                //   <br />
                //   If this does not work, just copy and paste this link in your favourite navigator : http://localhost:8080/login?token=${newToken} </html>`
              };

              // Send verification email to user email address
              transport.sendMail(validationMail, function(err, info) {
                if (err) {
                  console.log(err)
                } else {
                  console.log(info);
                }
              });

              // console.log("token baby :", newToken);
              console.log("test serv: ", signupPayload);
              console.log("add token :", addToken);

              // Return data to the client side
              return signupPayload;
            } catch(error) {
              console.error('Error :', error);
            }
        },
    },
  };

// module.exports = resolvers;