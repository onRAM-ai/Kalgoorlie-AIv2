'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLAnchorElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && 
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Focus trap
  const handleTabKey = useCallback((event: KeyboardEvent) => {
    if (!isOpen || !firstFocusableRef.current || !lastFocusableRef.current) return;

    const firstFocusable = firstFocusableRef.current;
    const lastFocusable = lastFocusableRef.current;

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [handleTabKey]);

  // Focus management when menu opens
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isOpen]);

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/#about-me-heading' },
    { name: 'FAQ', href: '/#faq-heading' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      {/* Logo in top left corner */}
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-50">
        <Link 
          href="/"
          className="hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md inline-block"
        >
          <Logo />
        </Link>
      </div>

      {/* Desktop and Tablet Navigation */}
      <nav 
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-40 rounded-full px-4 md:px-8 transition-all duration-300 hidden md:block ${
          isScrolled 
            ? 'bg-black/40 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/5'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-12 md:h-14">
          <div className="flex items-center space-x-6 lg:space-x-12">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link text-xs lg:text-sm min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <motion.div
          className="w-6 h-6 relative"
          animate={isOpen ? "open" : "closed"}
        >
          <motion.span
            className="absolute h-0.5 rounded-full bg-primary w-6 transform-gpu"
            style={{ top: "30%" }}
            variants={{
              open: { rotate: 45, y: 6 },
              closed: { rotate: 0, y: 0 }
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute h-0.5 rounded-full bg-primary w-6 top-1/2 -translate-y-1/2"
            variants={{
              open: { opacity: 0 },
              closed: { opacity: 1 }
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute h-0.5 rounded-full bg-primary w-6"
            style={{ bottom: "30%" }}
            variants={{
              open: { rotate: -45, y: -6 },
              closed: { rotate: 0, y: 0 }
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 backdrop-blur-sm z-40 md:hidden bg-black/60"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Slide-out Menu */}
      <motion.div
        ref={menuRef}
        id="mobile-menu"
        className="fixed top-0 right-0 w-4/5 h-full backdrop-blur-md z-40 md:hidden shadow-xl bg-[#212121]/95"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <nav className="space-y-1" role="navigation" aria-label="Mobile navigation">
            {navigationItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-4 px-4 text-text hover:text-primary transition-colors duration-200 min-h-[44px] text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                ref={index === 0 ? firstFocusableRef : undefined}
                tabIndex={isOpen ? 0 : -1}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="mt-8">
            <Link 
              href="/contact"
              className="w-full btn-primary text-lg py-4 px-6 rounded-full flex items-center justify-center gap-2 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              ref={lastFocusableRef}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
            >
              Get Started
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}