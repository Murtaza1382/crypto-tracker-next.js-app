interface Props {
  currency: string;
  setCurrency: (value: string) => void;
}

export default function CurrencySelector({ currency, setCurrency }: Props) {
  return (
    <div className="flex justify-center mb-6">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="px-4 py-2 rounded bg-gray-800 text-white"
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="gbp">GBP</option>
      </select>
    </div>
  );
}
