"use client";

import { useEffect, useState } from "react";
import { fetchCrypto } from "../lib/fetchCrypto";
import CryptoCard from "./CryptoCard";
import Pagination from "./Pagination";
import CurrencySelector from "./CurrencySelector";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import NotFound from "./NotFound";

export default function CryptoList() {
  const [coins, setCoins] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchCrypto(page, currency, search)
      .then((data) => {
        if (!data || data.error) {
          setError(data?.error || "No data found");
          setCoins([]);
        } else {
          setCoins(data);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, currency, search]);

  if (loading) return <Loading />;
  if (error) return <NotFound message={error} />;
  if (!coins || coins.length === 0)
    return <NotFound message="No coins found" />;

  return (
    <>
      <CurrencySelector currency={currency} setCurrency={setCurrency} />
      <SearchBar search={search} setSearch={setSearch} />

      <div className="grid md:grid-cols-3 gap-6">
        {coins.map((coin) => (
          <CryptoCard key={coin.id} coin={coin} />
        ))}
      </div>

      {!search && <Pagination page={page} setPage={setPage} />}
    </>
  );
}
