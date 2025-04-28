// pages/api/search.js

export default async function handler(req, res) {
  const { q, channelId } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const apiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyC2fuJMXHfsHiX4sTPopHoR2V_luSVFRn4'; // Use your API key
    let searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(q)}&key=${apiKey}`;

    if (channelId) {
      searchUrl += `&channelId=${channelId.replace('@', '')}`;
    }

    const response = await fetch(searchUrl);
    const data = await response.json();

    if (!response.ok) {
      console.error('YouTube API error:', data);
      return res.status(500).json({ error: 'Failed to fetch data', details: data });
    }

    const videos = data.items.map((item) => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.default.url,
    }));

    res.status(200).json({ videos });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
