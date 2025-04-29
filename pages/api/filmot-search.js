// pages/api/filmot-search.js

export default async function handler(req, res) {
  const { query } = req.query;

  const response = await fetch(
    `https://filmot-tube-metadata-archive.p.rapidapi.com/getsearchsubtitles?query=${encodeURIComponent(query)}`,
    {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'filmot-tube-metadata-archive.p.rapidapi.com',
      },
    }
  );

  if (!response.ok) {
    return res.status(response.status).json({ error: 'API error' });
  }

  const data = await response.json();
  res.status(200).json(data);
}
