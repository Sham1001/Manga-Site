import React from 'react'

const PaginationPage = ({page,totalPage,onChange}) => {
    // if(totalPage <= 1) return null

  const getPagination = () => {
  const pages = [];
  const siblingCount = 2; // pages left & right of current

  const left = Math.max(page - siblingCount, 1);
  const right = Math.min(page + siblingCount, totalPage);

  // Always show first page
  if (left > 1) {
    pages.push(1);
  }

  // Left dots
  if (left > 2) {
    pages.push("...");
  }

  // Middle pages
  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  // Right dots
  if (right < totalPage - 1) {
    pages.push("...");
  }

  // Always show last page
  if (right < totalPage) {
    pages.push(totalPage);
  }

  return pages;
};


  return (
    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
        <button
    disabled={page === 1}
    onClick={() => onChange((prev) => prev - 1)}
    className={`px-4 py-2 rounded-xl font-semibold ${
      page === 1
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-gray-700 text-white hover:bg-gray-800"
    }`}
  >
    Prev
  </button>

  {/* Numbers */}
  {getPagination().map((item, index) =>
    item === "..." ? (
      <span key={`dots-${index}`} className="px-2 text-gray-500 font-bold">
        ...
      </span>
    ) : (
      <button
        key={item}
        onClick={() => onChange(item)}
        className={`min-w-[42px] h-[42px] flex items-center justify-center
          rounded-full font-semibold transition
          ${
            page === item
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white border border-gray-400 hover:bg-gray-100"
          }`}
      >
        {item}
      </button>
    )
  )}

  {/* Next */}
  <button
    disabled={page === totalPage}
    onClick={() => onChange((prev) => prev + 1)}
    className={`px-4 py-2 rounded-xl font-semibold ${
      page === totalPage
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-gray-700 text-white hover:bg-gray-800"
    }`}
  >
    Next
  </button>
    </div>
  )
}

export default PaginationPage