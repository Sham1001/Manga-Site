import React from 'react'

const PaginationPage = ({ page, totalPage, onChange }) => {

  const getPagination = () => {
    const pages = [];
    const siblingCount = 2;

    const left = Math.max(page - siblingCount, 1);
    const right = Math.min(page + siblingCount, totalPage);

    if (left > 1) {
      pages.push(1);
    }

    if (left > 2) {
      pages.push("...");
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPage - 1) {
      pages.push("...");
    }

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
        className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
          page === 1
            ? "border-[#241834] text-[#4a4152] cursor-not-allowed"
            : "border-[#3d2456] text-[#e6d9f7] active:bg-[#8b3fd6] active:border-[#8b3fd6] active:text-white sm:hover:bg-[#1a0f26]"
        }`}
      >
        ← Prev
      </button>

      {getPagination().map((item, index) =>
        item === "..." ? (
          <span key={`dots-${index}`} className="px-1.5 text-[#4a4152] font-bold text-sm">
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`min-w-[38px] h-[38px] flex items-center justify-center
              rounded-full text-sm font-semibold transition-colors
              ${
                page === item
                  ? "bg-[#8b3fd6] text-white shadow-md shadow-[#8b3fd6]/30"
                  : "bg-transparent border border-[#3d2456] text-[#c9bcdb] active:bg-[#1a0f26] sm:hover:bg-[#1a0f26]"
              }`}
          >
            {item}
          </button>
        )
      )}

      <button
        disabled={page === totalPage}
        onClick={() => onChange((prev) => prev + 1)}
        className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
          page === totalPage
            ? "border-[#241834] text-[#4a4152] cursor-not-allowed"
            : "border-[#3d2456] text-[#e6d9f7] active:bg-[#8b3fd6] active:border-[#8b3fd6] active:text-white sm:hover:bg-[#1a0f26]"
        }`}
      >
        Next →
      </button>
    </div>
  )
}

export default PaginationPage