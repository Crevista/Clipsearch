export default async function handler(req, res) {
  const { query, channelUsername } = req.body;
  const apiKey = "AIzaSyC2fuJMXHfsHiX4sTPopHoR2V_luSVFRn4";

  let channelId = "";

  if (channelUsername) {
    try {
      const channelResponse = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=id&forUsername=${channelUsername.replace('@', '')}&key=${apiKey}`
      );
      const channelData = await channelResponse.json();
      if (channelData.items && channelData.items.length > 0) {
        channelId = channelData.items[0].id;
      }
    } catch (error) {
      console.error("Error fetching channel ID:", error);
    }
  }

  let searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${apiKey}`;
  if (channelId) {
    searchUrl += `&channelId=${channelId}`;
  }

  try {
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (searchData.items) {
      const results = searchData.items.map(item => ({
        title: item.snippet.title,
        videoId: item.id.videoId,
        thumbnail: item.snippet.thumbnails.default.url
      }));
      res.status(200).json(results);
    } else {
      res.status(404).json({ error: "No videos found." });
    }
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
