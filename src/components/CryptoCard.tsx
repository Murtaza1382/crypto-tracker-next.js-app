import { Crypto } from "../types/crypto";

interface Props {
  coin: Crypto;
}

export default function CryptoCard({ coin }: Props) {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-md hover:scale-105 transition">
      <div className="flex items-center gap-4">
        <img src={coin.image} alt={coin.name} className="w-10 h-10" />
        <div>
          <h2 className="text-lg font-bold">{coin.name}</h2>
          <p className="text-gray-400 uppercase">{coin.symbol}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xl font-semibold">
          ${coin.current_price.toLocaleString()}
        </p>

        <p
          className={`mt-2 ${
            coin.price_change_percentage_24h > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
