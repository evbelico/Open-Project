// @ts-check
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

import { UserAttributes, UserCreationAttributes, UserErrorAttributes, UserLoginAttributes } from '../models/user';
import { TokenAttributes, TokenCreationAttributes } from '../models/tokens';
import { checkPasswordFormat, UserFuncsPayload } from '../utils/userModelFuncs';
import { MailingFuncsPayload, sendRegistrationMail } from '../utils/mailingFuncs';
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
      userExists: async (parent, email: string, { models }): Promise<boolean> => {
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
      // Account creation mutation
      register: async (parent, args, { models }): Promise<UserCreationAttributes | UserErrorAttributes | UserFuncsPayload> => {
        console.log("Signup : ", args);

        let userErrors: UserErrorAttributes | UserFuncsPayload | MailingFuncsPayload = { val: 0, message: ''};
        try {
          console.log('Hello new registration ??');
          const passwordCheck = await checkPasswordFormat(args.password);
          const doesUserExist: boolean = await resolvers.Mutation.userExists(parent, args.email, { models });
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
            
              const sendmail: MailingFuncsPayload = await sendRegistrationMail(args.email, tokenHash);
              if (sendmail.returnValue == -1) {
                userErrors.val = -1;
                userErrors.message = `Error happened with mailer : ${sendmail.message}`;
              }
              console.log("Sending mail :", sendmail);
  
              return userData;
            } else {
              return
            }
          } else {
            userErrors.val = -1;
            userErrors.message = "User exists";
            return userErrors;
          }   
        } catch(error) {
          console.error("Error in user creation SEQUELIZE :", error);
        }
      },
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
      login: async(parent, args: UserLoginAttributes, { models }): Promise<UserLoginAttributes | UserErrorAttributes> => {
        let loginErrors: UserErrorAttributes = {};

        if (args.email !== '' && args.password !== '') {
          console.log("Login args :", args);

          const userData: any = await models.User.findOne({ where: { email: args.email }});
          console.log("User exists ? :", userData);
          if (userData !== null) {
            console.log("HELLLOOOO");
            const userPwd = await bcrypt.compare(args.password, userData.password);
            console.log("Comparing password :", userPwd);
            if (userPwd) {
              console.log("Login successful !");
              console.log("process env :", process.env);
              const userJwt: any = await jwt.sign(
                { userId: userData.id },
                process.env.SECRET,
                { expiresIn: "1h" },
              );

              console.log("Jwt token :", userJwt);
            }
          }
          else {
            loginErrors.message = "Invalid password";
            loginErrors.val = -1;
            return loginErrors;
          }
        } else {
          loginErrors.message = "Empty args";
          loginErrors.val = -1;
          return loginErrors;
        }
      },
    },
  };

// module.exports = resolvers;