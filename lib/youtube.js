const API_KEY = process.env.YOUTUBE_API_KEY;

export async function searchYouTubeVideos(query, channelUsername = "", maxResults = 5) {
  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}`;

  if (channelUsername) {
    const channelId = await fetchChannelId(channelUsername);
    if (channelId) {
      url += `&channelId=${channelId}`;
    }
  }

  const res = await fetch(url);
  const data = await res.json();
  return data.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium.url,
  }));
}

async function fetchChannelId(username) {
  if (!username.startsWith("@")) username = `@${username}`;
  const url = `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${username}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.items && data.items.length > 0) {
    return data.items[0].id;
  }
  return null;
}

export async function getCaptions(videoId) {
  try {
    const res = await fetch(`https://video.google.com/timedtext?lang=en&v=${videoId}`);
    const text = await res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");
    const texts = Array.from(xml.getElementsByTagName("text")).map((node) => ({
      start: parseFloat(node.getAttribute("start")),
      dur: parseFloat(node.getAttribute("dur")),
      text: node.textContent || "",
    }));
    return texts;
  } catch (error) {
    console.error("Failed to fetch captions", error);
    return null;
  }
}

export function findWordInCaptions(captions, word) {
  const lower = word.toLowerCase();
  return captions
    .filter((c) => c.text.toLowerCase().includes(lower))
    .map((c) => ({
      timestamp: c.start,
      context: c.text,
    }));
}
