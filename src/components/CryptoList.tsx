"use client";

import { useEffect, useState } from "react";
import { fetchCrypto } from "../lib/fetchCrypto";
import CryptoCard from "./CryptoCard";
import Pagination from "./Pagination";
import CurrencySelector from "./CurrencySelector";
import SearchBar from "./SearchBar";

export default function CryptoList() {
  const [coins, setCoins] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCrypto(page, currency, search).then((data) => {
      if (search && data.coins) {
        setCoins(data.coins);
      } else {
        setCoins(data);
      }
    });
  }, [page, currency, search]);

  return (
    <>
      <CurrencySelector currency={currency} setCurrency={setCurrency} />
      <SearchBar search={search} setSearch={setSearch} />

      <div className="grid md:grid-cols-3 gap-6">
        {coins?.map((coin: any) => (
          <CryptoCard key={coin.id} coin={coin} />
        ))}
      </div>

      {!search && <Pagination page={page} setPage={setPage} />}
    </>
  );
}
