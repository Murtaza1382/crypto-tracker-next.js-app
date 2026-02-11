interface Props {
  page: number;
  setPage: (value: number) => void;
  maxPage?: number;
}

export default function Pagination({ page, setPage, maxPage = 50 }: Props) {
  const pagesToShow = 5;
  const startPage = Math.max(1, page - Math.floor(pagesToShow / 2));
  const endPage = Math.min(maxPage, startPage + pagesToShow - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-gray-800/50">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 sm:gap-2">
        {/* Previous Button - Full width on mobile, auto width on larger screens */}
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="w-full sm:w-auto px-3 sm:px-4 py-2.5 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 order-1 sm:order-none"
        >
          <span className="text-lg">←</span>
          <span className="text-sm sm:text-base">Previous</span>
        </button>

        {/* Page Numbers - Centered and scrollable on mobile */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 order-3 sm:order-none w-full sm:w-auto overflow-x-auto py-2 sm:py-0">
          <div className="flex items-center gap-1 sm:gap-1 mx-2">
            {/* Show first page button on mobile when not in view */}
            {startPage > 1 && (
              <>
                <button
                  onClick={() => setPage(1)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                    page === 1
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "bg-gray-800/30 text-gray-400 hover:bg-gray-700/50 hover:text-white"
                  }`}
                >
                  1
                </button>
                {startPage > 2 && (
                  <span className="text-gray-500 px-1 sm:px-2 text-sm">
                    ...
                  </span>
                )}
              </>
            )}

            {pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-all duration-300 text-sm sm:text-base ${
                  page === num
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                    : "bg-gray-800/30 text-gray-400 hover:bg-gray-700/50 hover:text-white"
                }`}
              >
                {num}
              </button>
            ))}

            {endPage < maxPage && (
              <>
                {endPage < maxPage - 1 && (
                  <span className="text-gray-500 px-1 sm:px-2 text-sm">
                    ...
                  </span>
                )}
                <button
                  onClick={() => setPage(maxPage)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-all duration-300 text-sm sm:text-base ${
                    page === maxPage
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "bg-gray-800/30 text-gray-400 hover:bg-gray-700/50 hover:text-white"
                  }`}
                >
                  {maxPage}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Next Button - Full width on mobile, auto width on larger screens */}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === maxPage}
          className="w-full sm:w-auto px-3 sm:px-4 py-2.5 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 order-2 sm:order-none"
        >
          <span className="text-sm sm:text-base">Next</span>
          <span className="text-lg">→</span>
        </button>
      </div>

      {/* Page Info - Always centered */}
      <div className="text-gray-400 text-xs sm:text-sm text-center order-4">
        Page {page} of {maxPage} • {maxPage * 100} coins total
      </div>

      {/* Mobile Page Jumper - Optional but helpful for mobile users */}
      <div className="flex items-center gap-2 sm:hidden order-5">
        <span className="text-gray-400 text-sm">Go to:</span>
        <div className="relative">
          <input
            type="number"
            min="1"
            max={maxPage}
            value={page}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value >= 1 && value <= maxPage) {
                setPage(value);
              }
            }}
            className="w-16 px-2 py-1 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-center text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
          />
        </div>
      </div>

      <style jsx>{`
        /* Hide scrollbar but keep functionality */
        .overflow-x-auto {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }

        /* Ensure page numbers container doesn't break layout */
        @media (max-width: 640px) {
          .order-1 {
            order: 1;
          }
          .order-2 {
            order: 2;
          }
          .order-3 {
            order: 3;
          }
          .order-4 {
            order: 4;
          }
          .order-5 {
            order: 5;
          }
        }
      `}</style>
    </div>
  );
}
