import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // const { pageNumber } = await JSON.parse(req.body);

  const categories = await prisma.category.findMany({});

  console.log(categories);

  if (!categories) {
    return res.status(400).send({ message: "Categories not found" });
  }

  res.status(200).json({ res: categories });
}
