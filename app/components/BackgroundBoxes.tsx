"use client";
import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";

function cn(...cls: (string | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

// Tailwind w-16 h-8 => 64×32 px
const CELL_W = 64;
const CELL_H = 32;
// Tune for coverage/perf
const ROWS = 60;
const COLS = 90;

const COLORS = [
  "rgb(125 211 252)","rgb(249 168 212)","rgb(134 239 172)","rgb(253 224 71)",
  "rgb(252 165 165)","rgb(216 180 254)","rgb(147 197 253)","rgb(165 180 252)","rgb(196 181 253)"
];

export type Mouse = { x: number; y: number };

const BackgroundBoxesCore = ({
  className,
  mouse,
}: {
  className?: string;
  mouse: Mouse;
}) => {
  const rows = useMemo(() => new Array(ROWS).fill(0), []);
  const cols = useMemo(() => new Array(COLS).fill(0), []);

  // Determine the single hovered cell index
  const hiCol = Math.max(0, Math.min(COLS - 1, Math.floor(mouse.x / CELL_W)));
  const hiRow = Math.max(0, Math.min(ROWS - 1, Math.floor(mouse.y / CELL_H)));
  const hiIdx = hiRow * COLS + hiCol;

  return (
    <div
      className={cn(
        "absolute inset-0 z-0 pointer-events-none", // fills footer; does not steal clicks
        className
      )}
      aria-hidden
    >
      {rows.map((_, i) => (
        <div key={`r${i}`} className="flex">
          {cols.map((_, j) => {
            const idx = i * COLS + j;
            const isHot = idx === hiIdx;

            return (
              <motion.div
                key={`c${i}-${j}`}
                className="w-16 h-8 border-r border-t border-slate-700"
                animate={{
                  backgroundColor: isHot ? COLORS[idx % COLORS.length] : "transparent",
                }}
                transition={{ duration: 0.1 }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const BackgroundBoxes = memo(BackgroundBoxesCore);
export default BackgroundBoxes;
