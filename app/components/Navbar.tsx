'use client';

import { useEffect, useId, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const links = [
  { label: 'Business systems', href: '/business-systems' },
  { label: 'AI adoption', href: '/ai-adoption' },
  { label: 'How it works', href: '/#about' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigationId = useId();

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell nav-inner">
        <Link className="brand" href="/" aria-label="onram AI home">
          <Image src="/brand/onram-logo-light.svg" alt="onram AI — Better Tools. Better Business." width={190} height={123} priority />
        </Link>
        <div className="former-tag">Formerly Kalgoorlie AI</div>
        <nav id={navigationId} className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
          {links.map((link) => <Link key={link.label} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <Link className="nav-cta" href="/contact" onClick={() => setOpen(false)}>Find your biggest bottleneck</Link>
        </nav>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-controls={navigationId} aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}>
          <span /><span />
        </button>
      </div>
    </header>
  );
}
