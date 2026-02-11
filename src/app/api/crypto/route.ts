import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const currency = searchParams.get("currency") || "usd";
  const search = searchParams.get("search");

  try {
    // Handle search
    if (search && search.trim() !== "") {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_COINGECKO_API}/search?query=${search}`,
      );
      const data = await res.json();

      // Map to same structure as /coins/markets
      const coins = data.coins.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.thumb,
        current_price: null,
        market_cap: null,
        price_change_percentage_24h: null,
      }));

      return NextResponse.json(coins);
    }

    // Limit page to 50 max (CoinGecko free API)
    const maxPage = 50;
    const safePage = page > maxPage ? maxPage : page;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=12&page=${safePage}&sparkline=false`,
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("CoinGecko API error:", text);
      throw new Error("Failed to fetch crypto data");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API Route Error:", error.message);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
