export default async function handler(req, res) {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  if (!process.env.RAPIDAPI_KEY) {
    return res.status(500).json({ error: 'Missing RapidAPI key' });
  }

  try {
    const response = await fetch(
      `https://filmot-tube-metadata-archive.p.rapidapi.com/searchSubtitles?query=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'filmot-tube-metadata-archive.p.rapidapi.com',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      return res.status(response.status).json({ error: 'Filmot API error', details: errorData });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
}

