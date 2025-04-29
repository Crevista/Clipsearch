import { searchYouTubeVideos, getCaptions, findWordInCaptions } from "../../lib/youtube";

export default async function handler(req, res) {
  const { word, channel } = req.query;

  if (!word) {
    return res.status(400).json({ error: "Missing word" });
  }

  try {
    const videos = await searchYouTubeVideos(word, channel);

    const results = [];
    for (const video of videos) {
      const captions = await getCaptions(video.id);
      if (!captions) continue;

      const matches = findWordInCaptions(captions, word);
      if (matches.length > 0) {
        results.push({
          ...video,
          matches,
        });
      }
    }

    res.status(200).json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to search" });
  }
}
