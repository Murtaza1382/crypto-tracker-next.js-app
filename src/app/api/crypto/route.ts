import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch crypto data");
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
