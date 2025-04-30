import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [channelId, setChannelId] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchClips = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}${channelId ? `&channelId=${channelId}` : ""}`);
      const data = await res.json();

      if (!res.ok) {
        setError("API error: " + data?.error);
      } else {
        setResults(data?.results || []);
      }
    } catch (err) {
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 text-gray-900 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-900">ClipSearch</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search phrase (e.g. Vitamin D)"
            className="w-full px-4 py-3 border rounded-xl shadow focus:outline-none focus:ring focus:ring-blue-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <input
            type="text"
            placeholder="Optional YouTube channel ID"
            className="w-full px-4 py-3 border rounded-xl shadow focus:outline-none focus:ring focus:ring-blue-300"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
          />
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow transition"
            onClick={searchClips}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="text-red-600 mt-6">{error}</p>}

        <div className="mt-10 space-y-10">
          {results.map((clip, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl shadow-md transition hover:shadow-lg">
              <h2 className="text-lg font-bold mb-2">{clip.title}</h2>
              <div className="relative pb-[56.25%] mb-3">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-md"
                  src={`https://www.youtube.com/embed/${clip.videoId}?start=${Math.floor(clip.timestamp)}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-gray-700 text-sm italic mb-2">
                "...{clip.before}{" "}
                <strong className="text-blue-600">{query}</strong>{" "}
                {clip.after}..."
              </p>
              <a
                href={`https://youtube.com/watch?v=${clip.videoId}&t=${Math.floor(clip.timestamp)}s`}
                className="text-blue-600 font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
