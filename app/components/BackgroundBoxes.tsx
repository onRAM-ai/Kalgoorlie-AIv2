"use client";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

function cn(...c: (string | undefined)[]) { return c.filter(Boolean).join(" "); }

// 50% smaller squares
const CELL = 32; // px -> Tailwind w-8 h-8
const ROT_DEG = -12; // slight slant
const ROT_RAD = (Math.PI / 180) * ROT_DEG;
const COS = Math.cos(-ROT_RAD); // inverse rotation
const SIN = Math.sin(-ROT_RAD);

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

  // grid from measured size
  const COLS = Math.max(1, Math.ceil(size.w / CELL));
  const ROWS = Math.max(1, Math.ceil(size.h / CELL));
  const rows = useMemo(() => new Array(ROWS).fill(0), [ROWS]);
  const cols = useMemo(() => new Array(COLS).fill(0), [COLS]);

  // map cursor into unrotated grid space (inverse rotate around top-left)
  const xr = mouse.x * COS - mouse.y * SIN;
  const yr = mouse.x * SIN + mouse.y * COS;

  const hiCol = Math.max(0, Math.min(COLS - 1, Math.floor(xr / CELL)));
  const hiRow = Math.max(0, Math.min(ROWS - 1, Math.floor(yr / CELL)));
  const hiIdx = hiRow * COLS + hiCol;

  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 z-0 pointer-events-none", className)}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{ transform: `rotate(${ROT_DEG}deg)`, transformOrigin: "0 0" }}
      >
        {rows.map((_, i) => (
          <div key={`r${i}`} className="flex">
            {cols.map((_, j) => {
              const idx = i * COLS + j;
              const isHot = idx === hiIdx;
              return (
                <motion.div
                  key={`c${i}-${j}`}
                  className="w-8 h-8" // squares, no borders
                  animate={{ backgroundColor: isHot ? COLORS[idx % COLORS.length] : "transparent" }}
                  transition={{ duration: 0.08 }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export const BackgroundBoxes = memo(BackgroundBoxesCore);
export default BackgroundBoxes;
