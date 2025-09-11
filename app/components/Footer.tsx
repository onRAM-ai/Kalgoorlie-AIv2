'use client';
import { useState, useMemo, memo } from 'react';
import FooterLogo from './FooterLogo';
import Link from 'next/link';
import { supabase } from '../utils/supabase';
import { motion } from 'framer-motion';

/* ===== Interaction-driven background that reacts under content ===== */
type Mouse = { x: number; y: number };
function cn(...c: (string | undefined)[]) { return c.filter(Boolean).join(' '); }

// Visual cell sizes that match Tailwind w-16 h-8 (≈64x32 px at 16px root)
const CELL_W = 64;
const CELL_H = 32;
// Density. Reduce if perf dips.
const ROWS = 80;
const COLS = 60;
// Radius for highlight around cursor
const RADIUS = 140;

const COLORS = [
  'rgb(125 211 252)','rgb(249 168 212)','rgb(134 239 172)','rgb(253 224 71)',
  'rgb(252 165 165)','rgb(216 180 254)','rgb(147 197 253)','rgb(165 180 252)','rgb(196 181 253)'
];

const BackgroundBoxes = memo(function BackgroundBoxes(
  { className, mouse }: { className?: string; mouse: Mouse }
) {
  const rows = useMemo(() => new Array(ROWS).fill(0), []);
  const cols = useMemo(() => new Array(COLS).fill(0), []);
  const palette = useMemo(
    () => Array.from({ length: ROWS * COLS }, () => COLORS[(Math.random() * COLORS.length) | 0]),
    []
  );

  const transform =
    'translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)';

  return (
    <div
      style={{ transform }}
      className={cn(
        'absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0',
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
                animate={{ backgroundColor: within ? palette[i * COLS + j] : 'transparent' }}
                transition={{ duration: 0.15 }}
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
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
});

/* ============================== Footer ============================== */
export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [mouse, setMouse] = useState<Mouse>({ x: -9999, y: -9999 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email format');
      const { error } = await supabase.from('newsletter_subscribers').insert([{ email }]);
      if (error) {
        if ((error as any).code === '23505') throw new Error('This email is already subscribed');
        throw error;
      }
      setStatus('success'); setMessage('Successfully subscribed to newsletter!'); setEmail('');
    } catch (error) {
      setStatus('error'); setMessage(error instanceof Error ? error.message : 'Failed to subscribe');
    }
  };

  const onMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <footer className="relative bg-[#121722] overflow-hidden" onMouseMove={onMove}>
      {/* Reactive background under content */}
      <BackgroundBoxes className="opacity-[0.12]" mouse={mouse} />

      {/* Gradient Line */}
      <div className="relative z-10 h-px w-full bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <FooterLogo />
            </div>
            <p className="text-text-secondary mb-8 max-w-sm">
              Empowering businesses to <span className="text-gradient">do more with less</span>.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Stay Updated</h3>
            <p className="text-text-secondary mb-4">
              Subscribe to our <span className="underline">upcoming newsletter</span> for AI insights and updates.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg px-4 py-3 text-text placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors bg-[#1A1F2C] border border-white/10"
                  required
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? <i className="fas fa-spinner fa-spin" /> : 'Subscribe'}
                </button>
              </div>
              {message && (
                <p className={`text-sm ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-secondary text-sm">
              © {new Date().getFullYear()} Kalgoorlie AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-text-secondary hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-text-secondary hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
