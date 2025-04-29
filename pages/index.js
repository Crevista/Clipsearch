import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [channelId, setChannelId] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const params = new URLSearchParams({ q: query });
      if (channelId) {
        params.append('channelId', channelId);
      }

      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Unknown error');
      setResults(data.result || []);
    } catch (err) {
      setError('API error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '32px' }}>ClipSearch</h1>
      <input
        type="text"
        placeholder="Search YouTube subtitles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <input
        type="text"
        placeholder="Optional YouTube channel ID"
        value={channelId}
        onChange={(e) => setChannelId(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {results.length > 0 && (
        <ul style={{ marginTop: '20px', paddingLeft: '0' }}>
          {results.map((item, index) => (
            <li key={index} style={{ listStyle: 'none', marginBottom: '20px' }}>
              <strong>{item.title}</strong><br />
              <a
                href={`https://www.youtube.com/watch?v=${item.id}&t=${Math.floor(
                  item.hits[0]?.start || 0
                )}s`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Clip
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
