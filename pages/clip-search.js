import { useState } from 'react';

export default function ClipSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [channelName, setChannelName] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm) return;

    const response = await fetch(`/api/transcript?query=${searchTerm}&channel=${channelName}`);
    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Clip Search</h1>
      <input
        type="text"
        placeholder="Enter search term..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
      />
      <input
        type="text"
        placeholder="Enter YouTube channel (@name)..."
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
      />
      <button onClick={handleSearch} style={{ marginBottom: '2rem' }}>
        Search
      </button>

      {/* Result section */}
      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Result:</h2>
          {result?.text ? (
            <p>{result.text}</p>
          ) : (
            <p>No result found. Try a different search term or channel.</p>
          )}
        </div>
      )}
    </div>
  );
}
