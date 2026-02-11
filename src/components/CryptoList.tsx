"use client";

import { useEffect, useState } from "react";
import { fetchCrypto } from "../lib/fetchCrypto";
import CryptoCard from "./CryptoCard";
import Pagination from "./Pagination";
import CurrencySelector from "./CurrencySelector";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import NotFound from "./NotFound";
import SkeletonCard from "./SkeletonCard";

export default function CryptoList() {
  const [coins, setCoins] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const data = await fetchCrypto(page, currency, search);
        if (!data || data.error) {
          setError(data?.error || "No data found");
          setCoins([]);
        } else {
          setCoins(data);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to fetch data");
        }
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(
      () => {
        fetchData();
      },
      search ? 300 : 0,
    );

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [page, currency, search, mounted]);

  // Show loading state until mounted
  if (!mounted) {
    return (
      <div className="glass-effect rounded-3xl p-6 md:p-8 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="mb-16">
      <div className="glass-effect rounded-3xl p-6 md:p-8 mb-10">
        <div className="max-w-4xl mx-auto">
          <CurrencySelector currency={currency} setCurrency={setCurrency} />
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        {loading ? (
          <div className="mt-8">
            <div className="flex items-center justify-center mb-8">
              <div className="text-gray-400 text-sm animate-pulse">
                Loading cryptocurrency data...
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {error ? (
              <NotFound message={error} />
            ) : coins.length === 0 ? (
              <NotFound message="No cryptocurrencies found. Try a different search term." />
            ) : (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">
                    {search ? "Search Results" : "Top Cryptocurrencies"}
                  </h2>
                  <span className="text-gray-400 text-sm">
                    Showing {coins.length}{" "}
                    {coins.length === 1 ? "result" : "results"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {coins.map((coin) => (
                    <CryptoCard key={coin.id} coin={coin} currency={currency} />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {!search && !loading && coins.length > 0 && (
          <Pagination page={page} setPage={setPage} maxPage={50} />
        )}
      </div>
    </section>
  );
}
