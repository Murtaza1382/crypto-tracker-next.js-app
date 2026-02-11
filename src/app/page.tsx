import CryptoList from "@/components/CryptoList";

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Digital Currency Tracker
      </h1>

      <CryptoList />
    </main>
  );
}
