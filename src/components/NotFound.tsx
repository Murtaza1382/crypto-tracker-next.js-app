interface Props {
  message?: string;
}

export default function NotFound({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-6">
        <div className="text-6xl mb-4">🔍</div>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">
        No Results Found
      </h3>
      <p className="text-gray-400 max-w-md">
        {message ||
          "We couldn't find what you're looking for. Try adjusting your search or filters."}
      </p>
      <div className="mt-8 text-gray-500 text-sm">
        <p>Tips:</p>
        <ul className="mt-2 space-y-1">
          <li>• Check your spelling</li>
          <li>• Try different keywords</li>
          <li>• API might be temporarily unavailable</li>
        </ul>
      </div>
    </div>
  );
}
