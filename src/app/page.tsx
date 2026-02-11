import CryptoList from "../components/CryptoList";
import Converter from "../components/Converter";

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Digital Currency Dashboard
      </h1>

      <CryptoList />
      <Converter />
    </main>
  );
}
