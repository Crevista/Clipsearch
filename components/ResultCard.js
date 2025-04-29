export default function ResultCard({ video }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold mb-2">{video.title}</h2>
      <p className="text-sm text-gray-500 mb-2">{video.channelTitle}</p>
      <img src={video.thumbnail} alt={video.title} className="w-full rounded mb-4" />

      <div className="space-y-2">
        {video.matches.map((match, idx) => (
          <a
            key={idx}
            href={`https://www.youtube.com/watch?v=${video.id}&t=${Math.floor(match.timestamp)}s`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-100 p-2 rounded hover:bg-gray-200"
          >
            ⏱ {Math.floor(match.timestamp)}s - {match.context.slice(0, 50)}...
          </a>
        ))}
      </div>
    </div>
  );
}
