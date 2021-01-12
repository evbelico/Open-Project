// @ts-check
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT);

const nodemailer = require('nodemailer');
// const crypto = require('crypto');

import { UserInstance } from '../models/user'
import models from '../models';

export const resolvers = {
  // Message: {
  //   __resolveType: (obj, context, info) => {
  //     console.log('Message ??? : ', obj);
  //     if (obj.message && obj.messageCode) return "Token";
  //     return null;
  //   },
  // },
  // Queries, a.k.a Read operations (does not alter data)
    Query: {
      me: () => {
        return {
          firstName: 'Totocat',
        };
      },
      hello: () => {
        return 'Hello World !'
      },
    },
    // Mutations, a.k.a Create/Update/Delete operations
    Mutation: {
      sequelizeSignup: async (parent, args, { models }): Promise<UserInstance> => {
        console.log("Signup Sequelize args: ", args);
        console.log("Hello ?", { models });
        try {
          const hash: string = await bcrypt.hash(args.password, saltRounds);

          return await models.User.create({
            email: args.email,
            pseudonym: args.pseudonym,
            password: hash,
          });
        } catch(error) {
          console.error("Error in user creation SEQUELIZE :", error);
        }
      },
        signup: async (parent, args, ctx) => {
          console.log("Signup server args :", args);

            try {
              const data = args;

              const payload = await ctx.prisma.users.create({
                data: { args },
              });

              return payload;
            } catch (error) { console.error(error); }
        },
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
        // Function for sign-up token validation
        // verifySignupToken: async (parent, args, ctx) => {
        //   console.log(args);
        //   try {

        //   const sentToken = args.token;
        //   console.log('value :', sentToken);

        //   let messages = { message: 'Empty', messageCode: -1 };

        //   // Locate token in database
        //     const tokenLinked = await ctx.prisma.tokens.findOne({
        //       where: { token: sentToken },
        //     });
        //     // if (tokenLinked == null) throw new Error('Token not found.');
        //     if (!tokenLinked) messages = { message: 'Token not found.', messageCode: -1 };

        //     // If the token exists, proceed to verify if it is still valid (not expired)
        //     else {
        //       console.log("Token linked in else statement :", tokenLinked);

        //       // If token is invalid or has expired, throw error
        //       // if (tokenLinked.expired == 1) throw new Error('Token already validated or expired.');
        //       if (tokenLinked.expired == 1) messages = { message: 'Token already validated or expired.', messageCode: -1 };

        //       // If token is valid / has not yet expired, proceed to update its validity
        //       else if (tokenLinked.expired == 0) {
        //         const validateToken = await ctx.prisma.tokens.update({
        //           where: { id: tokenLinked.id },
        //           data: { expired: 1 },
        //         });
        //         // if (!validateToken) throw new Error('Could not validate token.');
        //         if (!validateToken) messages = { message: 'Could not validate token.', messageCode: -1 };
                
        //         // Then proceed to grant the user access to the forum
        //         const validateUser = await ctx.prisma.users.update({
        //           where: { id: tokenLinked.userId },
        //           data: { forumValidated: 1 },
        //         });
        //         // if (!validateUser) throw new Error('Could not validate user.');
        //         if (!validateUser) messages = { message: 'Could not validate user.', messageCode: -1 };

        //         console.log('Validate token in else stat. :', validateToken);
        //         console.log('Validate user in else :', validateUser);
        //       }
        //       console.log('Return token :', tokenLinked);
            
        //       return messages;
        //     }
            
        //   } catch (error) {
        //     console.error(error);
        //   }
        // }
    },
  };

// module.exports = resolvers;