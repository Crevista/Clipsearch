export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query missing' });
  }

  try {
    const response = await fetch(`https://filmot-com.p.rapidapi.com/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'filmot-com.p.rapidapi.com'
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Filmot API error:', error);
    res.status(500).json({ error: 'Failed to fetch from Filmot' });
  }
}
