"use client";
import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";

function cn(...cls: (string | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

// cell sizes roughly match Tailwind w-16 h-8
const CELL_W = 64;
const CELL_H = 32;
const ROWS = 80;   // reduce for performance
const COLS = 60;
const RADIUS = 140;

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

export type Mouse = { x: number; y: number };

export const BackgroundBoxesCore = ({
  className,
  mouse,
}: {
  className?: string;
  mouse: Mouse;
}) => {
  const rows = useMemo(() => new Array(ROWS).fill(0), []);
  const cols = useMemo(() => new Array(COLS).fill(0), []);
  const palette = useMemo(
    () =>
      Array.from({ length: ROWS * COLS }, () => {
        return COLORS[(Math.random() * COLORS.length) | 0];
      }),
    []
  );

  const transform =
    "translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)";

  return (
    <div
      style={{ transform }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className
      )}
      aria-hidden
    >
      {rows.map((_, i) => (
        <div key={`r${i}`} className="flex">
          {cols.map((_, j) => {
            const cx = j * CELL_W + CELL_W / 2;
            const cy = i * CELL_H + CELL_H / 2;
            const dx = mouse.x - cx;
            const dy = mouse.y - cy;
            const within = dx * dx + dy * dy < RADIUS * RADIUS;
            return (
              <motion.div
                key={`c${i}-${j}`}
                className="w-16 h-8 border-r border-t border-slate-700 relative"
                animate={{
                  backgroundColor: within
                    ? palette[i * COLS + j]
                    : "transparent",
                }}
                transition={{ duration: 0.15 }}
              >
                {j % 2 === 0 && i % 2 === 0 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                )}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const BackgroundBoxes = memo(BackgroundBoxesCore);
export default BackgroundBoxes;
