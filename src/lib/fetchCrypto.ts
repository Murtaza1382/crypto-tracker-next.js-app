import { Crypto } from "@/types/crypto";

export async function fetchCrypto(): Promise<Crypto[]> {
  const res = await fetch("/api/crypto");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
