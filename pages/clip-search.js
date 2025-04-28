import { useState } from 'react';
import axios from 'axios';

export default function ClipSearch() {
  const [query, setQuery] = useState('');
  const [channel, setChannel] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setResults([]);

    try {
      const res = await axios.post('/api/search', {
        query,
        channelUsername: channel,
      });

      setResults(res.data.results);
    } catch (error) {
      console.error(error);
      alert('Error searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h1>Clip Search</h1>
      <input
        type="text"
        placeholder="Search word..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <input
        type="text"
        placeholder="Enter YouTube channel (@username)"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button
        onClick={handleSearch}
        style={{ width: '100%', padding: '0.75rem' }}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      <h2 style={{ marginTop: '2rem' }}>Results:</h2>
      {results.length === 0 && !loading && <p>No results found.</p>}
      {results.map((video) => (
        <div key={video.videoId} style={{ marginBottom: '1.5rem' }}>
          <a
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={video.thumbnail} alt={video.title} />
            <p>{video.title}</p>
          </a>
        </div>
      ))}
    </div>
  );
}
