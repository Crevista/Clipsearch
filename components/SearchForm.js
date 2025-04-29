import { useState } from "react";

export default function SearchForm({ onSearch, isLoading }) {
  const [word, setWord] = useState("");
  const [channel, setChannel] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(word.trim(), channel.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Word to search (e.g., magnesium)"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="(Optional) Channel username e.g., @joerogan"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
