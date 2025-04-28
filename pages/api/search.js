// pages/api/search.js

export default async function handler(req, res) {
  const { searchTerm } = req.query;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Missing search term.' });
  }

  const API_KEY = "AIzaSyC2fuJMXHfsHiX4sTPopHoR2V_luSVFRn4";

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(searchTerm)}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const videos = data.items.map(item => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));

    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch YouTube videos.' });
  }
}
