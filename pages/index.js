import { useState } from "react";
import Head from "next/head";
import SearchForm from "../components/SearchForm";
import ResultCard from "../components/ResultCard";

export default function Home() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  async function handleSearch(word, channel) {
    setIsLoading(true);
    setSearchWord(word);
    const params = new URLSearchParams({ word });
    if (channel) {
      params.append("channel", channel);
    }
    const res = await fetch(`/api/search?${params.toString()}`);
    const data = await res.json();
    setResults(data.results || []);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>ClipSearch - Find Words in YouTube Videos</title>
      </Head>

      <main className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">ClipSearch</h1>

        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {isLoading && <p className="text-center mt-8">Searching...</p>}

        {!isLoading && results.length > 0 && (
          <div className="mt-8 space-y-6">
            {results.map((video) => (
              <ResultCard key={video.id} video={video} />
            ))}
          </div>
        )}

        {!isLoading && searchWord && results.length === 0 && (
          <p className="text-center mt-8">No results found for "{searchWord}"</p>
        )}
      </main>
    </div>
  );
}
