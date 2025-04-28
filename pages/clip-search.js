import { useState } from "react";

export default function ClipSearch() {
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, channel }),
      });
      const data = await response.json();
      // Just simulate results for now
      setResults([
        {
          title: `Found 1 clip about "${query}" from channel ${channel}`,
          link: "#",
        },
      ]);
    } catch (error) {
      console.error(error);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Clip Search</h1>
      <input
        type="text"
        placeholder="Enter search term"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
      />
      <input
        type="text"
        placeholder="Enter channel username (optional)"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>

      <div style={{ marginTop: "2rem" }}>
        {results.map((result, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <a href={result.link} target="_blank" rel="noopener noreferrer">
              {result.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
