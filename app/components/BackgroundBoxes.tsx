"use client";
import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";

function cn(...cls: (string | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

// Match Tailwind w-16 h-8 => 64×32 px cells
const CELL_W = 64;
const CELL_H = 32;
const ROWS = 60;   // tune for perf/coverage
const COLS = 80;
const RADIUS = 140;

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
  const palette = useMemo(
    () => Array.from({ length: ROWS * COLS }, () => COLORS[(Math.random() * COLORS.length) | 0]),
    []
  );

  return (
    <div
      className={cn(
        // Fill the footer area; no skew/rotate so coverage is predictable
        "absolute inset-0 z-0 pointer-events-none", // pointer-events off so top UI is clickable
        className
      )}
      aria-hidden
    >
      {/* Top-left origin grid */}
      {rows.map((_, i) => (
        <div key={`r${i}`} className="flex">
          {cols.map((_, j) => {
            // Cell center in footer coordinates
            const cx = j * CELL_W + CELL_W / 2;
            const cy = i * CELL_H + CELL_H / 2;
            const dx = mouse.x - cx;
            const dy = mouse.y - cy;
            const within = dx * dx + dy * dy < RADIUS * RADIUS;

            return (
              <motion.div
                key={`c${i}-${j}`}
                className="w-16 h-8 border-r border-t border-slate-700"
                animate={{ backgroundColor: within ? palette[i * COLS + j] : "transparent" }}
                transition={{ duration: 0.12 }}
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
