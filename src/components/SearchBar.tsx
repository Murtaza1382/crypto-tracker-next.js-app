"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch }: Props) {
  const [input, setInput] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => setSearch(input), 500);
    return () => clearTimeout(handler);
  }, [input, setSearch]);

  return (
    <div className="mb-8 w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search cryptocurrency (e.g., Bitcoin, Ethereum)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-800/50 backdrop-blur-sm text-white border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-400 transition-all duration-300"
        />
        {input && (
          <button
            onClick={() => setInput("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        )}
      </div>
      <p className="text-gray-500 text-xs mt-2 text-center">
        Type to search from thousands of cryptocurrencies
      </p>
    </div>
  );
}
