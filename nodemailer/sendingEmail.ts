// import getEnvToVar from '@helpers/getEnvToVar';
// import nodemailer from 'nodemailer';
// import { SendingEmailProps } from './interface';

// /**
//  * First we setup a 'transporter' which contains our credentials.
//  * I'm sure there is a better way to protect this information but for
//  * now it's stuffed in environment variables
//  */

// const sendingEmail = (props: SendingEmailProps) => {
//   const { from, to, subject, text, html } = props;
//   const port = Number(getEnvToVar('NEXT_PUBLIC_EMAIL_PORT'));

//   const transporter = nodemailer.createTransport({
//     host: getEnvToVar('NEXT_PUBLIC_EMAIL_HOST'),
//     port: port,
//     secure: true,
//     auth: {
//       // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//       user: getEnvToVar('NEXT_PUBLIC_EMAIL_USER'),
//       pass: getEnvToVar('NEXT_PUBLIC_EMAIL_PASS'),
//     },
//   });

//   return new Promise((resolve, reject) => {
//     /**
//      * Then we can call the transporter.sendMail method, which will actually
//      * send the email. There are two options on sendMail, you can use a
//      * callbacak function, or if a callback is not specified, it returns
//      * a Promise.
//      */
//     transporter
//       .sendMail({
//         from, // sender address
//         to, // list of receivers
//         subject, // Subject line
//         text, // plain text body
//         html,
//       })
//       .then((response) => {
//         resolve(response);
//       })
//       .catch((error) => {
//         reject(new Error(error));
//       });
//   });
// };

// export default sendingEmail;
