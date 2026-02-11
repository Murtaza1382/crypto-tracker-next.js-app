"use client";

import { useState } from "react";

export default function Converter() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("bitcoin");
  const [to, setTo] = useState("toncoin");
  const [result, setResult] = useState<number | null>(null);

  async function convert() {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${from},${to}&vs_currencies=usd`,
    );

    const data = await res.json();

    const fromPrice = data[from].usd;
    const toPrice = data[to].usd;

    const converted = (amount * fromPrice) / toPrice;
    setResult(converted);
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl mt-10 text-white">
      <h2 className="text-xl mb-4">Crypto Converter</h2>

      <div className="flex gap-4 flex-wrap">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="px-3 py-2 rounded bg-gray-800"
        />

        <input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800"
        />

        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800"
        />

        <button onClick={convert} className="px-4 py-2 bg-blue-600 rounded">
          Convert
        </button>
      </div>

      {result && (
        <p className="mt-4 text-lg">
          {amount} {from} = {result.toFixed(4)} {to}
        </p>
      )}
    </div>
  );
}
