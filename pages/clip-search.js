import { useState } from 'react';

export default function ClipSearch() {
  const [query, setQuery] = useState('');
  const [channel, setChannel] = useState('@joerogan');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query || !channel) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}&channel=${encodeURIComponent(channel)}`);
      const data = await response.json();
      setResults(data.matches || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Clip Search</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter a keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '0.5rem', width: '300px', marginRight: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="YouTube channel username (e.g., @joerogan)"
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          style={{ padding: '0.5rem', width: '300px', marginRight: '0.5rem' }}
        />
        <button onClick={handleSearch} style={{ padding: '0.5rem 1rem' }}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {results.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          {results.map((match, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <a
                href={`https://www.youtube.com/watch?v=${match.videoId}&t=${Math.floor(match.timestamp)}s`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {match.title} — {Math.floor(match.timestamp)}s
              </a>
              <div>{match.snippet}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
