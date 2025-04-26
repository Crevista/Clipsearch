export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query missing" });
  }

  // Simulate search results (for now - upgrade later!)
  const fakeResults = [
    {
      videoId: "dQw4w9WgXcQ", // famous test video haha
      start: 90,
      text: `Example match for "${query}"`,
    },
    {
      videoId: "dQw4w9WgXcQ",
      start: 210,
      text: `Another example mentioning "${query}"`,
    },
  ];

  res.status(200).json({ matches: fakeResults });
}
