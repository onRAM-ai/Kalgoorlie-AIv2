"use client";
import React, { useMemo } from "react";

// tiny cn
function cn(...cls: (string | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

// Tune for speed vs coverage. Original was 150×100.
const ROWS = 150;
const COLS = 100;

const COLORS = [
  "rgb(125 211 252)", // sky-300
  "rgb(249 168 212)", // pink-300
  "rgb(134 239 172)", // green-300
  "rgb(253 224 71)",  // yellow-300
  "rgb(252 165 165)", // red-300
  "rgb(216 180 254)", // purple-300
  "rgb(147 197 253)", // blue-300
  "rgb(165 180 252)", // indigo-300
  "rgb(196 181 253)", // violet-300
];

const rand = () => COLORS[(Math.random() * COLORS.length) | 0];

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = useMemo(() => new Array(ROWS).fill(0), []);
  const cols = useMemo(() => new Array(COLS).fill(0), []);

  const onEnter: React.MouseEventHandler<HTMLDivElement> = (e) => {
    (e.currentTarget as HTMLDivElement).style.backgroundColor = rand();
  };
  const onLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
    (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
  };

  return (
    <div
      style={{
        transform:
          "translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)",
      }}
      className={cn(
        // keep pointer events ON so hover works; place above footer content
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-20",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <div key={`row-${i}`} className="w-16 h-8 border-l border-slate-700 relative">
          {cols.map((_, j) => (
            <div
              key={`col-${j}`}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              className="w-16 h-8 border-r border-t border-slate-700 relative transition-colors duration-75"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const BackgroundBoxes = React.memo(BoxesCore);
export default BackgroundBoxes;
