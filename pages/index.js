import React, { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'API error');
      }

      setResults(data.results || []);
    } catch (err) {
      setError(err.message || 'Unexpected error');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>ClipSearch</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
        style={{ padding: '0.5rem', width: '300px', fontSize: '1rem' }}
      />
      <button onClick={handleSearch} style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ marginTop: '2rem' }}>
        {results.map((item, index) => (
          <li key={index}>
            <a href={`https://www.youtube.com/watch?v=${item.videoId}&t=${item.start}s`} target="_blank" rel="noopener noreferrer">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
