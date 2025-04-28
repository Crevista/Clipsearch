import axios from 'axios';

const YOUTUBE_API_KEY = 'YOUR_API_KEY_HERE'; // replace this later with env variable

export default async function handler(req, res) {
  const { query, channelUsername } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    let channelId = '';

    // If channelUsername is provided, convert it to channelId
    if (channelUsername) {
      const channelResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels`,
        {
          params: {
            part: 'id',
            forUsername: channelUsername.replace('@', ''),
            key: YOUTUBE_API_KEY,
          },
        }
      );

      if (channelResponse.data.items.length > 0) {
        channelId = channelResponse.data.items[0].id;
      } else {
        return res.status(404).json({ error: 'Channel not found' });
      }
    }

    // Search videos
    const searchParams = {
      part: 'snippet',
      q: query,
      type: 'video',
      videoCaption: 'closedCaption', // only videos with subtitles
      maxResults: 10,
      key: YOUTUBE_API_KEY,
    };

    if (channelId) {
      searchParams.channelId = channelId;
    }

    const videoSearch = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      { params: searchParams }
    );

    const videos = await Promise.all(
      videoSearch.data.items.map(async (item) => {
        const captionsResponse = await axios.get(
          `https://video.google.com/timedtext?lang=en&v=${item.id.videoId}`
        );

        const captions = captionsResponse.data;
        const regex = new RegExp(query, 'i');

        if (regex.test(captions)) {
          return {
            title: item.snippet.title,
            videoId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.default.url,
          };
        }
        return null;
      })
    );

    const filteredVideos = videos.filter((v) => v !== null);

    res.status(200).json({ results: filteredVideos });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
