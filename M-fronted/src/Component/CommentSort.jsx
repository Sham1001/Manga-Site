import React from "react";

/**
 * Sorting now happens server-side (getComments accepts ?sort=new|old|best),
 * so this component just tracks the selected mode — the parent refetches
 * on change instead of re-sorting an already-fetched array.
 */
export const CommentSort = ({ value, onChange }) => (
  <div className="flex gap-2 mb-4">
    {[
      { key: "new", label: "New" },
      { key: "old", label: "Old" },
      { key: "best", label: "Best" },
    ].map((opt) => (
      <button
        key={opt.key}
        onClick={() => onChange(opt.key)}
        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
          value === opt.key
            ? "bg-[#8b3fd6] text-white"
            : "bg-transparent border border-[#3d2456] text-[#8a7a9c]"
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
);