import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") || "1";
  const currency = searchParams.get("currency") || "usd";
  const search = searchParams.get("search");

  try {
    let url = "";

    if (search) {
      url = `${process.env.NEXT_PUBLIC_COINGECKO_API}/search?query=${search}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=12&page=${page}&sparkline=false`;
    }

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
