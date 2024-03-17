/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

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
      host: process.env.EMAIL_HOST, 
      port: process.env.EMAIL_PORT, 
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });


    let mailOptions = {
      from: `"${process.env.EMAIL_FROM}" <${process.env.EMAIL_FROM_ADDRESS}>`, // e.g., "Your Name" <your email>
      to: `${email}`, 
      bcc: process.env.EMAIL_BCC,
      subject: process.env.EMAIL_SUBJECT, 
      text: `Here is your OTP: ${otp.toString()}`,
      html: `Here is your OTP: ${otp.toString()}`,
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



    res.status(200).json({ message: "Operations completed", databaseResult, emailResult });
  }
}
