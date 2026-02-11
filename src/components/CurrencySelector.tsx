interface Props {
  currency: string;
  setCurrency: (value: string) => void;
}

export default function CurrencySelector({ currency, setCurrency }: Props) {
  const currencies = [
    { value: "usd", label: "USD", symbol: "$", color: "text-green-400" },
    { value: "eur", label: "EUR", symbol: "€", color: "text-blue-400" },
    { value: "gbp", label: "GBP", symbol: "£", color: "text-purple-400" },
  ];

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="inline-flex items-center gap-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-1 border border-gray-700/50">
        {currencies.map((curr) => (
          <button
            key={curr.value}
            onClick={() => setCurrency(curr.value)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
              currency === curr.value
                ? "bg-gray-700/50 text-white shadow-md"
                : "text-gray-400 hover:text-white hover:bg-gray-700/30"
            }`}
          >
            <span className={`text-lg font-semibold ${curr.color}`}>
              {curr.symbol}
            </span>
            <span className="font-medium">{curr.label}</span>
          </button>
        ))}
      </div>
      <p className="text-gray-500 text-sm mt-3">
        Select currency to view prices
      </p>
    </div>
  );
}
