'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const links = [
  { label: 'Services', href: '/#services' },
  { label: 'Approach', href: '/#approach' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell nav-inner">
        <Link className="brand" href="/" aria-label="onram AI home">
          <Image src="/brand/onram-logo-light.svg" alt="onram AI — Better Tools. Better Business." width={190} height={123} priority />
        </Link>
        <div className="former-tag">Formerly Kalgoorlie AI</div>
        <nav className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
          {links.map((link) => <Link key={link.label} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <Link className="nav-cta" href="/contact" onClick={() => setOpen(false)}>Talk about your business</Link>
        </nav>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}>
          <span /><span />
        </button>
      </div>
    </header>
  );
}
