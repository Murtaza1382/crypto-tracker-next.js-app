"use client";

import { useState, useEffect, useRef } from "react";

export default function Converter() {
  const [coinsList, setCoinsList] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("bitcoin");
  const [to, setTo] = useState("ethereum");
  const [result, setResult] = useState<number | null>(null);
  const [loadingCoins, setLoadingCoins] = useState(true);
  const [loadingConvert, setLoadingConvert] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const converterRef = useRef<HTMLDivElement>(null);

  // Fetch coin list once
  useEffect(() => {
    async function getCoins() {
      setLoadingCoins(true);
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
        const data = await res.json();
        setCoinsList(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load coins list");
      } finally {
        setLoadingCoins(false);
      }
    }
    getCoins();
  }, []);

  // Convert function
  async function convert() {
    if (!from || !to) return;
    setLoadingConvert(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${from},${to}&vs_currencies=usd`,
      );
      const data = await res.json();

      if (!data[from] || !data[to]) {
        setError("Invalid coin selected");
        return;
      }

      const fromPrice = data[from].usd;
      const toPrice = data[to].usd;
      setResult((amount * fromPrice) / toPrice);
    } catch (err) {
      console.error(err);
      setError("Conversion failed");
    } finally {
      setLoadingConvert(false);
    }
  }

  return (
    <div
      ref={converterRef}
      className="bg-gray-900 p-6 rounded-xl mt-10 text-white max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Crypto Converter</h2>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Amount input */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="px-4 py-2 rounded bg-gray-800 w-full md:w-24 text-white placeholder-gray-400"
        />

        {/* From coin */}
        <div className="relative w-full md:w-1/3">
          {loadingCoins ? (
            <div className="flex items-center justify-center px-4 py-2 bg-gray-800 rounded w-full text-white">
              <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-blue-500 mr-2 rounded-full"></div>
              Loading coins...
            </div>
          ) : (
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              onFocus={() =>
                converterRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                })
              }
              className="px-4 py-2 rounded bg-gray-800 w-full text-white"
            >
              {coinsList.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* To coin */}
        <div className="relative w-full md:w-1/3">
          {loadingCoins ? (
            <div className="flex items-center justify-center px-4 py-2 bg-gray-800 rounded w-full text-white">
              <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-blue-500 mr-2 rounded-full"></div>
              Loading coins...
            </div>
          ) : (
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onFocus={() =>
                converterRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                })
              }
              className="px-4 py-2 rounded bg-gray-800 w-full text-white"
            >
              {coinsList.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Convert button */}
        <button
          onClick={convert}
          disabled={loadingConvert || loadingCoins}
          className={`px-6 py-2 rounded w-full md:w-auto transition ${
            loadingConvert
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loadingConvert ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
              Converting...
            </div>
          ) : (
            "Convert"
          )}
        </button>
      </div>

      {/* Result / Error */}
      <div className="mt-6 text-center">
        {error && <p className="text-red-500">{error}</p>}
        {result !== null && !loadingConvert && !error && (
          <p className="text-lg font-semibold">
            {amount} {from} ≈ {result.toFixed(6)} {to}
          </p>
        )}
      </div>
    </div>
  );
}
