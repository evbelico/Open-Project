// @ts-check

require('dotenv').config();
const nodemailer = require('nodemailer');

export type MailingFuncsPayload = {
  message?: string,
  returnValue: number
};

export const sendRegistrationMail = async (userEmail: string, userRegistrationToken: string) : Promise<MailingFuncsPayload> => {
    let transport = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL_ADDR || 'scarabee.test@gmail.com',
          pass: process.env.MAIL_PWD || 'ScaraTest2021!',
        }
      });

    //   console.log("Hello TRANSPORT :", transport);

      const validationMail: object = {
        from: 'scarabee.test@gmail.com', // Sender address
        to: userEmail,         // List of recipients
        subject: 'Verify your account | Scarabee Platform', // Subject line
        text: `Click here in order to verify your email address and start navigating : http://127.0.0.1:8080/login/${userRegistrationToken}`, // Plain text body
        html: `<html>
        <h2>Hi, fellow scarabee ! :-)</h2>
        <br />
        <p><b><a href="http://localhost:8080/login?token=${userRegistrationToken}">Click here</a></b>
          in order to verify your email address and start navigating !</p>
          <br />
          If this does not work, just copy and paste this link in your favourite navigator : http://127.0.0.1:8080/login?token=${userRegistrationToken}
        </html>`
      };

      // Send verification email to user email address
      transport.sendMail(validationMail, function(err, info) {
        if (err) {
          console.log(err);
          return { message: `Could not send mail. ERR : ${err}`, returnValue: -1};
        } else {
          console.log(info);
          return { message: '', returnValue: 1};
        }
      });
      return transport;
}