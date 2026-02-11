interface Props {
  page: number;
  setPage: (value: number) => void;
  maxPage?: number; // optional max page limit
}

export default function Pagination({ page, setPage, maxPage = 50 }: Props) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-white">
        Page {page} of {maxPage}
      </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === maxPage}
        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
