"use client";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

function cn(...cls: (string | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

// 50% smaller: Tailwind w-8 h-4 => 32×16 px
const CELL_W = 32;
const CELL_H = 16;

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
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Measure footer area
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.max(0, r.width), h: Math.max(0, r.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Derive grid from measured size
  const COLS = Math.max(1, Math.ceil(size.w / CELL_W));
  const ROWS = Math.max(1, Math.ceil(size.h / CELL_H));

  const rows = useMemo(() => new Array(ROWS).fill(0), [ROWS]);
  const cols = useMemo(() => new Array(COLS).fill(0), [COLS]);

  // Single hovered cell
  const hiCol = Math.max(0, Math.min(COLS - 1, Math.floor(mouse.x / CELL_W)));
  const hiRow = Math.max(0, Math.min(ROWS - 1, Math.floor(mouse.y / CELL_H)));
  const hiIdx = hiRow * COLS + hiCol;

  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 z-0 pointer-events-none", className)}
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
                className="w-8 h-4 border-r border-t border-slate-700"
                animate={{ backgroundColor: isHot ? COLORS[idx % COLORS.length] : "transparent" }}
                transition={{ duration: 0.08 }}
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
