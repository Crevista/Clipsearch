// pages/index.js import { useState } from "react";

export default function Home() { const [query, setQuery] = useState(""); const [results, setResults] = useState([]); const [loading, setLoading] = useState(false); const [error, setError] = useState(null);

const handleSearch = async () => { setLoading(true); setError(null); try { const res = await fetch("/api/search", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ query }), }); const data = await res.json(); if (!res.ok) throw new Error(data.error || "Search failed"); setResults(data.results); } catch (err) { setError(err.message); } finally { setLoading(false); } };

return ( <div style={{ padding: 40, fontFamily: "sans-serif" }}> <h1 style={{ fontSize: 32, fontWeight: 700 }}>ClipSearch</h1> <input type="text" placeholder="Search YouTube subtitles..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ padding: 10, fontSize: 16, width: "60%", marginRight: 8 }} /> <button onClick={handleSearch} style={{ padding: 10, fontSize: 16 }}>Search</button>

{loading && <p>Loading...</p>}
  {error && <p style={{ color: "red" }}>{error}</p>}

  <ul style={{ marginTop: 24 }}>
    {results.map((clip, i) => (
      <li key={i} style={{ marginBottom: 16 }}>
        <a
          href={`https://www.youtube.com/watch?v=${clip.videoId}&t=${clip.start}s`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 600 }}
        >
          {clip.text}
        </a>
        <div style={{ fontSize: 14, color: "gray" }}>{clip.channelTitle}</div>
      </li>
    ))}
  </ul>
</div>

); }

