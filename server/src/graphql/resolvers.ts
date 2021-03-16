// @ts-check
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const nodemailer = require('nodemailer');
const crypto = require('crypto');

<<<<<<< HEAD
import { UserAttributes, UserCreationAttributes } from '../models/user'
import { TokenAttributes, TokenCreationAttributes } from '../models/tokens'
=======
import { UserAttributes, UserCreationAttributes } from '../models/user';
import { TokenAttributes, TokenCreationAttributes } from '../models/tokens';
import { checkPasswordFormat } from '../utils/userModelFuncs';
import { sendRegistrationMail } from '../utils/mailingFuncs';
>>>>>>> 02ec876b145d6d31cbc9c2e0ca56dd9e3f07bd96
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
<<<<<<< HEAD
=======
      userExists: async (parent, email: string, { models }): Promise<any> => {
        // console.log("User exists args :", email);

        try {
          const userData = await models.User.findOne({ where: { email: email }});
          // console.log("User exists DATA :", userData);
          if (userData !== null) {
            return true;
          } else {
            return false;
          }
        } catch(error) {
          console.error('Error happened in finding if user exists :', error);
        }
      },
>>>>>>> 02ec876b145d6d31cbc9c2e0ca56dd9e3f07bd96
      // Account creation mutation
      register: async (parent, args, { models }): Promise<UserCreationAttributes> => {
        console.log("Signup : ", args);

        try {
<<<<<<< HEAD
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
=======
          const passwordCheck = await checkPasswordFormat(args.password);
          const doesUserExist = await resolvers.Mutation.userExists(parent, args.email, { models });
          // console.log("Does user exist ?", doesUserExist);

          if (doesUserExist === false) {
            if (passwordCheck.returnValue == 1) {
              const hash: string = await bcrypt.hash(args.password, saltRounds);
              const tokenHash: string = await crypto.randomBytes(46).toString('hex');
  
              const userData: UserCreationAttributes = await models.User.create({
                email: args.email,
                birthday: args.birthday,
                password: hash,
                token: tokenHash,
                tokenExpired: false,
              });
            
              const sendmail = await sendRegistrationMail(args.email, tokenHash);
              console.log("Sending mail :", sendmail);
  
              return userData;
            } else {
              throw new Error(`${passwordCheck.message}`);
            }
          } else {
            throw new Error(`User already exists : ${doesUserExist}`);
          }   
>>>>>>> 02ec876b145d6d31cbc9c2e0ca56dd9e3f07bd96
        } catch(error) {
          console.error("Error in user creation SEQUELIZE :", error);
        }
      },
<<<<<<< HEAD
      // Verify token created on account creation
      // registerToken: async (parent, args, { models }) => {

      // },
=======
      checkRegistrationToken: async (parent, sentToken: any, { models }): Promise<UserAttributes> => {
        // console.log("Sent token :", sentToken.sentToken);
        if (sentToken !== null) {
          try {
            console.log("Is it good ? :", sentToken.sentToken);
            // Finds user based on its token string and token status (expired or not expired)
            const userData: UserAttributes = await models.User.findOne({ where: {
              token: sentToken.sentToken,
              tokenExpired: false,
              validated: false,
            }});
            // console.log("Hello data ?? : ", userData);
            if (userData !== null) {
              console.log("Not null USER DATA : ", userData);
              const validateUser = await models.User.update({ 
                tokenExpired: true,
                validated: true,
              }, {
                where: {
                  email: userData.email,
                },
              });
              console.log("Verifying token + user data :", userData);
              console.log('Trying to validate USER :', validateUser);
              return userData;
            } else {
              throw new Error("Could not find user associated with token / token is expired / user is already validated");
            }
          } catch(error) {
            console.error("Error happened in token validation :", error);
          }
          
        } else {
          throw new Error(`No token sent. See : ${sentToken}`);
        }
      },
>>>>>>> 02ec876b145d6d31cbc9c2e0ca56dd9e3f07bd96
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