export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing search query" });
  }

  const url = `https://filmot-tube-metadata-archive.p.rapidapi.com/getsearchsubtitles?query=${encodeURIComponent(q)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'filmot-tube-metadata-archive.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      return res.status(response.status).json({ error: "Filmot API error", details: errorDetails });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("API call failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
