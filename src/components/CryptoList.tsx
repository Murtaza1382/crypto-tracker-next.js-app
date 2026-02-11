"use client";

import { useEffect, useState } from "react";
import { fetchCrypto } from "../lib/fetchCrypto";
import { Crypto } from "../types/crypto";
import CryptoCard from "./CryptoCard";
import SearchBar from "./SearchBar";

export default function CryptoList() {
  const [coins, setCoins] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCrypto()
      .then((data) => setCoins(data))
      .finally(() => setLoading(false));
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />

      {filteredCoins.length === 0 ? (
        <p className="text-center text-gray-400">No coins found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredCoins.map((coin) => (
            <CryptoCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </>
  );
}
