export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { searchTerm, channel } = req.body;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Missing search term' });
  }

  // Example dummy result (for now)
  const dummyResults = [
    { text: `Found "${searchTerm}" in a dummy transcript!`, timestamp: "00:01:23", videoId: "dQw4w9WgXcQ" }
  ];

  return res.status(200).json({ results: dummyResults });
}
