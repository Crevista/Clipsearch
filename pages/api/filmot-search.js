export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { query } = req.body;

  const url = `https://filmot-tube-metadata-archive.p.rapidapi.com/getsearchsubtitles?query=${encodeURIComponent(query)}&searchManualSubs=1`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'filmot-tube-metadata-archive.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ message: errorData.message || 'API error' });
    }

    const data = await response.json();

    // Map the results to simplify response to frontend
    const results = data.items?.map((item) => ({
      videoId: item.videoId,
      title: item.title,
      start: item.startTime,
      snippet: item.text,
    })) || [];

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
