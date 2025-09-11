"use client";
import React, { useMemo } from "react";

// mini cn
function cn(...c: (string | undefined)[]) { return c.filter(Boolean).join(" "); }

// Tunables
const ROWS = 70;           // ↓ from 150
const COLS = 50;           // ↓ from 100
const CELL_W = "w-8";      // 50% smaller than original (w-16)
const CELL_H = "h-4";      // 50% smaller than original (h-8)

const COLORS = [
  "rgb(125 211 252)", "rgb(249 168 212)", "rgb(134 239 172)", "rgb(253 224 71)",
  "rgb(252 165 165)", "rgb(216 180 254)", "rgb(147 197 253)", "rgb(165 180 252)", "rgb(196 181 253)"
];

export default function BackgroundBoxes({ className }: { className?: string }) {
  const rows = useMemo(() => new Array(ROWS).fill(0), []);
  const cols = useMemo(() => new Array(COLS).fill(0), []);

  const getRandomColor = () => COLORS[(Math.random() * COLORS.length) | 0];

  const handleEnter: React.MouseEventHandler<HTMLDivElement> = (e) => {
    (e.currentTarget as HTMLDivElement).style.backgroundColor = getRandomColor();
  };
  const handleLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
    (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
  };

  return (
    <div
      style={{ transform: "translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)" }}
      className={cn("absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-20", className)}
      aria-hidden
    >
      {rows.map((_, i) => (
        <div key={`r${i}`} className={cn(CELL_W, CELL_H, "border-l border-slate-700 relative")}>
          {cols.map((_, j) => (
            <div
              key={`c${j}`}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              className={cn(CELL_W, CELL_H, "border-r border-t border-slate-700 relative transition-colors duration-100")}
            >
              {(j % 2 === 0 && i % 2 === 0) && (
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
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
