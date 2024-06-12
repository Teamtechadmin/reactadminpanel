import axios from "axios";
import { MAKE } from "./endpoints";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const params = req.query;

  try {
    const response = await axios.get(MAKE, {
      params,
      headers: {
        "Cache-Control": "max-age=3600",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);

    res.status(500).json({ error: "Error fetching data" });
  }
}
