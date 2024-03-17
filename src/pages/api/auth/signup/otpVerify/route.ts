import { PrismaClient } from "@prisma/client";
const nodemailer = require("nodemailer");

const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method === "POST") {
    const { email, otp, name, password } = await JSON.parse(req.body);
    console.log("email", email, "otp", otp);

    try {
      const existingUser = await prisma.emailOtp.findUnique({
        where: {
          email,
          otp,
        },
      });

      if (existingUser) {
        console.log("Otp verified", existingUser);

        res.status(200).json({ message: "Otp verified" });
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password,
          },
        });
        res.redirect("/login");
      } else {
        res.status(400).json({ message: "Invalid Otp" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to verify otp" });
    }
  }
}
