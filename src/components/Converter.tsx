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

  useEffect(() => {
    async function getCoins() {
      setLoadingCoins(true);
      try {
        const cached = localStorage.getItem("coinsList");
        if (cached) {
          setCoinsList(JSON.parse(cached));
        } else {
          const res = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1",
          );
          const data = await res.json();
          const topCoins = data.map((coin: any) => ({
            id: coin.id,
            name: coin.name,
          }));
          setCoinsList(topCoins);
          localStorage.setItem("coinsList", JSON.stringify(topCoins));
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load coins list");
      } finally {
        setLoadingCoins(false);
      }
    }
    getCoins();
  }, []);

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
      setError("Conversion failed. Please try again.");
    } finally {
      setLoadingConvert(false);
    }
  }

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
    if (result !== null) {
      setResult(1 / result);
    }
  };

  return (
    <div
      ref={converterRef}
      className="glass-effect rounded-3xl p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Crypto Converter
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Convert between any cryptocurrency instantly
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Amount Input */}
        <div className="bg-gray-800/30 rounded-2xl p-4 sm:p-5">
          <label className="block text-gray-400 text-sm mb-2 font-medium">
            Amount
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              min="0"
              step="0.00000001"
              className="w-full px-4 py-3 sm:px-5 sm:py-3.5 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white text-base sm:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
              placeholder="Enter amount"
            />
          </div>
        </div>

        {/* Converter Box */}
        <div className="bg-gray-800/30 rounded-2xl p-4 sm:p-5 md:p-6">
          {/* Currency Selection Area */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 md:mb-8">
            {/* From Currency */}
            <div className="w-full sm:w-5/12 space-y-2 sm:space-y-3">
              <label className="block text-gray-400 text-sm font-medium">
                From
              </label>
              <div className="relative">
                {loadingCoins ? (
                  <div className="flex items-center justify-center px-4 py-3 sm:py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl animate-pulse">
                    <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mr-2 sm:mr-3"></div>
                    <span className="text-gray-400 text-sm">
                      Loading coins...
                    </span>
                  </div>
                ) : (
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full px-4 py-3 sm:py-3.5 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent cursor-pointer text-sm sm:text-base"
                  >
                    {coinsList.map((coin) => (
                      <option key={coin.id} value={coin.id}>
                        {coin.name}
                      </option>
                    ))}
                  </select>
                )}
                <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 text-xs sm:text-sm">
                  ▼
                </div>
              </div>
            </div>

            {/* Swap Button - Position changes based on screen size */}
            <div className="flex justify-center items-center w-full sm:w-auto my-2 sm:my-0">
              <button
                onClick={swapCurrencies}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0"
                aria-label="Swap currencies"
              >
                <span className="text-white text-lg sm:text-xl">⇄</span>
              </button>
            </div>

            {/* To Currency */}
            <div className="w-full sm:w-5/12 space-y-2 sm:space-y-3">
              <label className="block text-gray-400 text-sm font-medium">
                To
              </label>
              <div className="relative">
                {loadingCoins ? (
                  <div className="flex items-center justify-center px-4 py-3 sm:py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl animate-pulse">
                    <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mr-2 sm:mr-3"></div>
                    <span className="text-gray-400 text-sm">
                      Loading coins...
                    </span>
                  </div>
                ) : (
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full px-4 py-3 sm:py-3.5 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent cursor-pointer text-sm sm:text-base"
                  >
                    {coinsList.map((coin) => (
                      <option key={coin.id} value={coin.id}>
                        {coin.name}
                      </option>
                    ))}
                  </select>
                )}
                <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 text-xs sm:text-sm">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Convert Button */}
          <div className="mt-6 md:mt-8">
            <button
              onClick={convert}
              disabled={loadingConvert || loadingCoins}
              className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 ${
                loadingConvert || loadingCoins
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl"
              }`}
            >
              {loadingConvert ? (
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  <span className="text-sm sm:text-base">Converting...</span>
                </div>
              ) : (
                "Convert Now"
              )}
            </button>
          </div>

          {/* Result / Error */}
          <div className="mt-6 md:mt-8">
            {error && (
              <div className="text-center py-3 sm:py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm sm:text-base">
                {error}
              </div>
            )}

            {result !== null && !loadingConvert && !error && (
              <div className="text-center py-4 sm:py-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 animate-fade-in">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                  {amount} {from} =
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent break-words px-2">
                  {result.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 8,
                  })}{" "}
                  {to}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3">
                  1 {from} = {(result / amount).toFixed(6)} {to}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        @media (max-width: 640px) {
          .glass-effect {
            margin: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
