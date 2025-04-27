import { useState } from 'react';

export default function ClipSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(`https://yt.lemnoslife.com/noKey/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Clip Search</h1>
      <input
        type="text"
        placeholder="Search YouTube transcripts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button onClick={handleSearch} style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      <div style={{ marginTop: '2rem' }}>
        {results.map((result, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <a href={`https://www.youtube.com/watch?v=${result.id.videoId}`} target="_blank" rel="noopener noreferrer">
              {result.snippet.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
