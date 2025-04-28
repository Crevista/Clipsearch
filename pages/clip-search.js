import { useState } from "react";

export default function ClipSearch() {
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, channelUsername: channel }),
    });
    const data = await response.json();
    setResults(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Clip Search</h1>
      <input
        type="text"
        placeholder="Search keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <input
        type="text"
        placeholder="Enter YouTube channel (@username)..."
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <button onClick={handleSearch} style={{ padding: 10, width: "100%" }}>
        Search
      </button>

      <h2 style={{ marginTop: 30 }}>Results:</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div>
          {results.map((video) => (
            <div key={video.videoId} style={{ marginBottom: 20 }}>
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "black" }}
              >
                <img src={video.thumbnail} alt={video.title} />
                <p>{video.title}</p>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
