import { useState } from 'react';

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/filmot-search?query=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();

      if (res.ok) {
        setResults(data.results || []);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Failed to fetch results.');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search YouTube subtitles..."
          style={{ padding: '0.5rem', width: '80%' }}
        />
        <button type="submit" style={{ padding: '0.5rem' }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {results.map((item, idx) => (
          <li key={idx} style={{ marginTop: '1rem' }}>
            <a
              href={`https://www.youtube.com/watch?v=${item.videoId}&t=${item.start}s`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.title || 'View Clip'} (at {item.start}s)
            </a>
            <p>{item.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
