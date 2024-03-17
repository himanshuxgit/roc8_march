/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from "@prisma/client";

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
      password: password,
    },
  });
  console.log("11111111111", user);
  

  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }

  res.status(200).json({ message: {"id": user.id, "name": user.name} });
}
