import { getBlock } from "../../../notion/notion";

// GET /api/blocks/:id
// example /api/blocks/70b964ae-518b-4b4b-8146-895efbddb79d
export default async function handler(req, res) {
  // @see https://developers.notion.com/reference/get-block-children
  const results = await getBlock(req.query.id, req.query.limit);
  res.status(200).json(results);
}
