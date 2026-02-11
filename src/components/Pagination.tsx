interface Props {
  page: number;
  setPage: (value: number) => void;
}

export default function Pagination({ page, setPage }: Props) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-white">Page {page}</span>

      <button
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 bg-gray-700 text-white rounded"
      >
        Next
      </button>
    </div>
  );
}
