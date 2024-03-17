import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    
    const id = parseInt(req.query.id as string);
    
    const userCategory = await prisma.userCategory.findMany({
      where: {
        userId: id,
      },
    });
    console.log(userCategory);
    if (!userCategory) {
      return res.status(400).send({ message: "Categories not found" });
    }
    res.status(200).json({ res: userCategory });
  }
}

