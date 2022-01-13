// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getDatabase } from "../../notion/notion";

export default async function handler(_, res) {
  const results = await getDatabase(process.env.DATABASE_ID);
  res.status(200).json(results);
}
