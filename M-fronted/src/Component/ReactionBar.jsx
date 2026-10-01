import React from "react";

const EMOJIS = ["❤️", "😂", "😢", "😮", "🔥", "👍", "👎", "😡"];

export const ReactionBar = ({ reactions = {}, userReaction, onReact }) => {
  const total = Object.values(reactions).reduce((sum, n) => sum + n, 0);

  return (
    <div className="mb-6 pb-6 border-b border-[#241834]">
      {/* Reaction heading */}
      <div className="text-center mb-4">
        <p className="text-sm text-[#a99bb5]">
          What did you think?
        </p>

        {total > 0 && (
          <p className="text-xs text-[#6f627a] mt-1">
            <span className="text-[#d8c5e8] font-semibold">
              {total.toLocaleString()}
            </span>{" "}
            reactions
          </p>
        )}
      </div>

      {/* Reactions */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 sm:gap-2.5">
        {EMOJIS.map((emoji) => {
          const count = reactions[emoji] || 0;
          const active = userReaction === emoji;

          return (
            <button
              key={emoji}
              onClick={() => onReact?.(emoji)}
              className={`
                group relative
                flex flex-col items-center justify-center
                gap-1
                min-h-[64px] sm:min-h-[70px]
                rounded-xl
                border
                transition-all duration-200
                active:scale-95
                sm:hover:-translate-y-1
                ${
                  active
                    ? "bg-[#3d2456] border-[#9b4de8] shadow-[0_0_15px_rgba(155,77,232,0.25)]"
                    : "bg-[#160d20] border-[#2b1c38] hover:bg-[#21122d] hover:border-[#54346c]"
                }
              `}
            >
              {/* Emoji */}
              <span
                className={`
                  text-2xl sm:text-[26px]
                  leading-none
                  transition-transform duration-200
                  ${active ? "scale-110" : "group-hover:scale-110"}
                `}
              >
                {emoji}
              </span>

              {/* Count */}
              {count > 0 && (
                <span
                  className={`
                    text-[11px] font-semibold leading-none
                    ${
                      active
                        ? "text-[#c99aff]"
                        : "text-[#796b86]"
                    }
                  `}
                >
                  {count.toLocaleString()}
                </span>
              )}

              {/* Active indicator */}
              {active && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#b96cff]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};