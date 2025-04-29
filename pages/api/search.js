export default async function handler(req, res) {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  const url = `https://filmot-tube-metadata-archive.p.rapidapi.com/v1/searchSubtitles?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'filmot-tube-metadata-archive.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      return res.status(response.status).json({ error: 'Filmot API error', details: errorDetails });
    }

    const data = await response.json();
    res.status(200).json({ results: data });
  } catch (error) {
    console.error('API fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
