"use client";

import { useEffect, useState } from "react";
import { fetchCrypto } from "@/lib/fetchCrypto";
import { Crypto } from "@/types/crypto";
import CryptoCard from "./CryptoCard";

export default function CryptoList() {
  const [coins, setCoins] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrypto()
      .then((data) => setCoins(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {coins.map((coin) => (
        <CryptoCard key={coin.id} coin={coin} />
      ))}
    </div>
  );
}
