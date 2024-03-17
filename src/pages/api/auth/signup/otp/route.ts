/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { PrismaClient } from "@prisma/client";
// const nodemailer = require("nodemailer");

// const prisma = new PrismaClient();

// import type { NextApiRequest, NextApiResponse } from "next";

// type ResponseData = {
//   message: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>,
// ) {
//   if (req.method === "POST") {
//     const { email } = await JSON.parse(req.body);

//     // Generate a 6 digit OTP
//     const otp = Math.floor(10000000 + Math.random() * 90000000);
//     console.log("otp", otp, email);

//     try {
//       const existingUser = await prisma.emailOtp.findUnique({
//         where: { email },
//       });
//       console.log("existingUser", existingUser);

//       if (existingUser) {
//         await prisma.emailOtp.update({
//           where: { email },
//           data: { otp: otp.toString() },
//         });
//       } else {
//         await prisma.emailOtp.create({
//           data: {
//             email,
//             otp: otp.toString(),
//           },
//         });
//       }

//       // res.status(200).json({ message: "Otp Sent succesfully" });
//     } catch (error) {
//       console.log("error", error);

//       // res.status(500).json({ message: "Failed to end otp" });
//     }

//     try {
//       // Create a transporter for Outlook
//       let transporter = nodemailer.createTransport({
//         host: "smtp-mail.outlook.com",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//           user: "sonner121@outlook.com", // your Outlook email
//           pass: "Sonner@900", // your Outlook password
//         },
//         tls: {
//           ciphers: "SSLv3",
//         },
//       });

//       await new Promise((resolve, reject) => {
//         // verify connection configuration
//         transporter.verify(function (error: any, success: unknown) {
//             if (error) {
//                 console.log(error);
//                 reject(error);
//             } else {
//                 console.log("Server is ready to take our messages");
//                 resolve(success);
//             }
//         });
//     });
  
//       // Setup email data
//       let mailOptions = {
//         from: '"Himanshu-Roc8" <Sonner121@outlook.com>', // sender address
//         to: `hkashyap494@gmail.com, ${email}`, // list of receivers
//         subject: "Roc8 OTP", // Subject line
//         text: `Here is your OTP: . ${otp.toString()}`, // plain text body
//         html: `Here is your OTP: . ${otp.toString()}`, // html body
//       };
  
//       // Send the email
//       await new Promise((resolve, reject) => {

//       transporter.sendMail(
//         mailOptions,
//         (error: any, info: { messageId: any }) => {
//           if (error) {
//             return console.log(error);
//           }
//         },
//       );
//     });

//     //   await new Promise((resolve, reject) => {
//     //     // send mail
//     //     transporter.sendMail(mailData, (err, info) => {
//     //         if (err) {
//     //             console.error(err);
//     //             reject(err);
//     //         } else {
//     //             console.log(info);
//     //             resolve(info);
//     //         }
//     //     });
//     // });
//     } catch (error) {
//       console.log("Error sending mail", error);
//     }


//     // try {
//     //   const existingUser = await prisma.emailOtp.findUnique({
//     //     where: { email },
//     //   });
//     //   console.log("existingUser", existingUser);

//     //   if (existingUser) {
//     //     await prisma.emailOtp.update({
//     //       where: { email },
//     //       data: { otp: otp.toString() },
//     //     });
//     //   } else {
//     //     await prisma.emailOtp.create({
//     //       data: {
//     //         email,
//     //         otp: otp.toString(),
//     //       },
//     //     });
//     //   }

//     //   res.status(200).json({ message: "Otp Sent succesfully" });
//     // } catch (error) {
//     //   console.log("error", error);

//     //   res.status(500).json({ message: "Failed to end otp" });
//     // }

//     res.status(200).json({ message: "Otp Sent successfully" });
//   }
// }

import { PrismaClient } from "@prisma/client";
const nodemailer = require("nodemailer");
const prisma = new PrismaClient();

// Define async functions for both processes
async function updateOrCreateUser(email: any, otp: number) {
  try {
    const existingUser = await prisma.emailOtp.findUnique({
      where: { email },
    });
    console.log("existingUser", existingUser);

    if (existingUser) {
      await prisma.emailOtp.update({
        where: { email },
        data: { otp: otp.toString() },
      });
    } else {
      await prisma.emailOtp.create({
        data: {
          email,
          otp: otp.toString(),
        },
      });
    }
    return { success: true };
  } catch (error) {
    console.log("error", error);
    return { success: false, error };
  }
}

async function sendEmail(email: any, otp: number) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "sonner121@outlook.com", // your Outlook email
        pass: "Sonner@900", // your Outlook password
      },
      tls: {
        ciphers: "SSLv3",
      },
    });

    // await new Promise((resolve, reject) => {
    //   transporter.verify(function (error: any, success: unknown) {
    //     if (error) {
    //       console.log(error);
    //       reject(error);
    //     } else {
    //       console.log("Server is ready to take our messages");
    //       resolve(success);
    //     }
    //   });
    // });

    let mailOptions = {
      from: '"Himanshu-Roc8" <Sonner121@outlook.com>',
      to: `hkashyap494@gmail.com, ${email}`,
      subject: "Roc8 OTP",
      text: `Here is your OTP: . ${otp.toString()}`,
      html: `Here is your OTP: . ${otp.toString()}`,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error: any, info: unknown) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(info);
        }
      });
    });

    return { success: true };
  } catch (error) {
    console.log("Error sending mail", error);
    return { success: false, error };
  }
}

// Use Promise.allSettled() to run both processes in parallel
export default async function handler(req: { method: string; body: string; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; databaseResult: PromiseSettledResult<{ success: boolean; error?: undefined; } | { success: boolean; error: unknown; }>; emailResult: PromiseSettledResult<{ success: boolean; error?: undefined; } | { success: boolean; error: unknown; }>; }): void; new(): any; }; }; }) {
  if (req.method === "POST") {
    const { email } = JSON.parse(req.body);
    const otp = Math.floor(10000000 + Math.random() * 90000000);

    const results = await Promise.allSettled([
      updateOrCreateUser(email, otp),
      sendEmail(email, otp),
    ]);

    // Handle results
    const databaseResult = results[0];
    const emailResult = results[1];

    // You can check the status and result of each operation here
    // and send an appropriate response to the client

    res.status(200).json({ message: "Operations completed", databaseResult, emailResult });
  }
}
