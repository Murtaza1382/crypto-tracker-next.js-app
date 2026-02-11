export default function SkeletonCard() {
  return (
    <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-5 animate-pulse overflow-hidden">
      <div className="space-y-4">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-700/50 to-gray-800/50" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded" />
              <div className="h-3 w-16 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded" />
            </div>
          </div>
          <div className="h-6 w-10 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-full" />
        </div>

        {/* Price Skeleton */}
        <div className="space-y-2">
          <div className="h-3 w-16 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded" />
          <div className="h-8 w-32 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-lg" />
        </div>

        {/* Change Skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="h-3 w-20 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded" />
          <div className="h-8 w-24 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-full" />
        </div>
      </div>
    </div>
  );
}
