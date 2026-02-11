import { Crypto } from "../types/crypto";
import Image from "next/image";
interface Props {
  coin: Crypto;
  currency: string;
}

export default function CryptoCard({ coin, currency }: Props) {
  const currencySymbols: Record<string, string> = {
    usd: "$",
    eur: "€",
    gbp: "£",
  };

  const symbol = currencySymbols[currency] || "$";

  return (
    <div className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-5 hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        {/* Coin Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full" />
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700/50">
                <Image
                  src={coin.image || "/crypto-placeholder.png"}
                  alt={coin.name}
                  width={48}
                  height={48}
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/crypto-placeholder.png";
                  }}
                />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white truncate max-w-[120px]">
                {coin.name}
              </h2>
              <p className="text-gray-400 text-sm uppercase font-medium tracking-wider">
                {coin.symbol}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800/50 text-xs font-medium">
              #{coin.market_cap_rank || "N/A"}
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="space-y-3">
          <div>
            <p className="text-gray-400 text-sm mb-1">Current Price</p>
            <p className="text-2xl font-bold text-white truncate">
              {symbol}
              {coin.current_price?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: coin.current_price < 1 ? 8 : 2,
              }) || "N/A"}
            </p>
          </div>

          {/* 24h Change */}
          {coin.price_change_percentage_24h !== null && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
              <span className="text-gray-400 text-sm">24h Change</span>
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  coin.price_change_percentage_24h > 0
                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                }`}
              >
                {coin.price_change_percentage_24h > 0 ? (
                  <span className="text-lg">↗</span>
                ) : (
                  <span className="text-lg">↘</span>
                )}
                <span>
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
