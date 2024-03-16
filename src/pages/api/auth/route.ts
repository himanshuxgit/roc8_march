import { NextApiRequest, NextApiResponse } from "next";
import db from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Basic validation (replace with more robust validation)
  if (!id) {
    return res.status(400).json({ error: "Missing required parameter: id" });
  }

  try {
    // Replace "YourModel" with the actual model name and adjust the query as needed
    const data = await db.yourModel.findUnique({
      where: { id: parseInt(id as string) },
    });

    if (!data) {
      return res.status(404).json({ error: "No data found for the provided ID" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
}
