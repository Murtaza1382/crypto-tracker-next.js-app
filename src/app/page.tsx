import Converter from "../components/Converter";
import CryptoList from "../components/CryptoList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with subtle animations */}
        <div className="text-center mb-10 md:mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-3">
            Digital Currency Dashboard
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Real-time cryptocurrency prices and converter
          </p>
        </div>

        {/* Main content with staggered loading effect */}
        <div className="space-y-8 md:space-y-12">
          <CryptoList />
          <Converter />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Data provided by CoinGecko API</p>
          <p className="mt-1">Updated in real-time</p>
        </footer>
      </div>

      {/* Add CSS for animations in a style tag since this is a client component in app router */}
    </main>
  );
}
