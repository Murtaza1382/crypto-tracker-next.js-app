"use client";
import { useState, useEffect } from "react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch }: Props) {
  const [input, setInput] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => setSearch(input), 500); // 500ms debounce
    return () => clearTimeout(handler);
  }, [input, setSearch]);

  return (
    <div className="mb-8 flex justify-center">
      <input
        type="text"
        placeholder="Search cryptocurrency..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full max-w-md px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
