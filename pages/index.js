import { useState } from "react"; import Head from "next/head";

export default function Home() { const [query, setQuery] = useState(""); const [channelId, setChannelId] = useState(""); const [results, setResults] = useState([]); const [loading, setLoading] = useState(false); const [error, setError] = useState(null);

const handleSearch = async () => { setLoading(true); setError(null); try { const res = await fetch( /api/search?q=${encodeURIComponent(query)}${ channelId ? &channelId=${encodeURIComponent(channelId)} : "" } ); const data = await res.json(); if (res.ok) { setResults(data.results); } else { setError(data.error || "Unknown error"); } } catch (err) { setError("API error"); } setLoading(false); };

return ( <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 text-gray-800 px-4 py-6"> <Head> <title>ClipSearch</title> </Head> <main className="max-w-4xl mx-auto"> <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">ClipSearch</h1> <div className="flex flex-col sm:flex-row gap-3 mb-8"> <input className="flex-1 p-3 rounded-xl border border-blue-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search term (e.g. Vitamin D)" value={query} onChange={(e) => setQuery(e.target.value)} /> <input className="flex-1 p-3 rounded-xl border border-blue-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Optional YouTube Channel ID" value={channelId} onChange={(e) => setChannelId(e.target.value)} /> <button
onClick={handleSearch}
className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-all"
> Search </button> </div> {loading && <p className="text-center text-blue-600">Loading...</p>} {error && <p className="text-center text-red-500">{error}</p>} <div className="space-y-6"> {results.map((item, idx) => ( <div
key={idx}
className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all"
> <h2 className="text-lg font-semibold mb-2">{item.title}</h2> <div className="aspect-video mb-2"> <iframe width="100%" height="100%" src={https://www.youtube.com/embed/${item.id}?start=${Math.floor( item.timestamp || 0 )}} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe> </div> <p className="text-gray-700 text-sm italic mb-2">{item.transcript || ""}</p> <a href={https://www.youtube.com/watch?v=${item.id}&t=${Math.floor( item.timestamp || 0 )}s} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" > Watch on YouTube </a> </div> ))} </div> </main> </div> ); }

