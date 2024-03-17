import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const categories = await prisma.user.findMany({});

  console.log("SPIN UP DB")

  if (!categories) {
    return res.status(400).send({ message: "Db Spin Up Unsuccessful" });
  }

  res.status(200).json({ res: "Db Spin Up Successful" });
}
