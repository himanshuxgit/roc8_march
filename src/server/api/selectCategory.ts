/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, categoryId } = req.body;

  // Check if user and category exist (implement validation as needed)
  const user = await db.user.findUnique({ where: { id: userId } });
  const category = await db.category.findUnique({ where: { id: categoryId } });

  if (!user || !category) {
    return res.status(400).json({ error: "Invalid user or category" });
  }

  // Create association in UserCategory table
  try {
    await db.userCategory.create({
      data: {
        userId,
        categoryId,
      },
    });
    res.status(200).json({ message: "Category selected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to select category" });
  }
}
