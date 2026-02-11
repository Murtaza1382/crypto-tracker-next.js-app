import { Crypto } from "../types/crypto";

export async function fetchCrypto(
  page: number,
  currency: string,
  search: string,
): Promise<any> {
  const res = await fetch(
    `/api/crypto?page=${page}&currency=${currency}&search=${search}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
