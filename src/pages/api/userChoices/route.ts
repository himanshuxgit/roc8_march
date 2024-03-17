/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    // const { id } = await JSON.parse(req.body);
    const id = parseInt(req.query.id as string);
    console.log(id, "ididididididid");
    
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

  //   POST method
  else if (req.method === "POST") {
    const { id, categories } = await JSON.parse(req.body);

    console.log(id, categories);

    const userCategory = await prisma.userCategory.create({
      data: {
        userId: parseInt(id),
        categoryId: categories,
      },
    });

    console.log(userCategory);

    if (!userCategory) {
      return res.status(400).send({ message: "Categories not found" });
    }

    res.status(200).json({ res: userCategory });
  }

  //   DELETE method
  else if (req.method === "DELETE") {
    const { id, categories } = await JSON.parse(req.body);
    const userCategory = await prisma.userCategory.deleteMany({
      where: {
        userId: parseInt(id),
        categoryId: categories,
      },
    });
    console.log(userCategory);

    if (!userCategory) {
      return res.status(400).send({ message: "Categories not found" });
    }
    res.status(200).json({ res: userCategory });
  }
}
