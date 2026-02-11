export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-gray-700 border-t-blue-500 animate-spin"></div>
        <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-t-purple-500 animate-spin animation-delay-500"></div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-white text-lg font-medium">Loading Dashboard</p>
        <p className="text-gray-400 text-sm">
          Fetching latest cryptocurrency data...
        </p>
      </div>
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      <style jsx>{`
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}
