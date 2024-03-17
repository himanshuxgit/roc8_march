/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

// type ResponseData = {
//   message: string;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, password } = await JSON.parse(req.body);

  const user = await prisma.user.findUnique({
    where: {
      email: email,
      // password: password,
    },
  });

  if (user) {
    const hash = user.password;
    bcrypt.compare(password, hash, function (err: any, result: any) {
      if (result === true) {
        res.status(200).json({ message: { id: user.id, name: user.name } });
      } else {
        return res.status(400).send({ message: "User not found" });
      }
    });
    console.log("11111111111", user);
  } 

  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }
}