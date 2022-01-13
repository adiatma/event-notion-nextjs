import { getPage } from "../../../notion/notion";

// GET /api/pages/:id
// example api/pages/4f9eda31-882a-4b5a-b944-3752be650dc4
export default async function handler(req, res) {
  // @see https://developers.notion.com/reference/database
  const results = await getPage(req.query.id);
  res.status(200).json(results);
}
