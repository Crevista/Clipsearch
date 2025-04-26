import { useState } from "react";

export default function ClipSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    const res = await fetch(`/api/transcript?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.matches || []);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Clip Search Tool</h1>
      <input
        type="text"
        placeholder="Enter a product or keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "0.5rem", width: "300px", marginRight: "0.5rem" }}
      />
      <button onClick={handleSearch} style={{ padding: "0.5rem 1rem" }}>
        Search
      </button>

      {loading && <p>Searching...</p>}

      {results.length > 0 && (
        <ul style={{ marginTop: "1rem" }}>
          {results.map((match, idx) => (
            <li key={idx}>
              <a
                href={`https://www.youtube.com/watch?v=${match.videoId}&t=${Math.floor(match.start / 1000)}s`}
                target="_blank"
                rel="noopener noreferrer"
              >
                [{(match.start / 1000).toFixed(0)}s] {match.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
