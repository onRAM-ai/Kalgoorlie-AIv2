'use client';
import { useState } from 'react';
import FooterLogo from './FooterLogo';
import Link from 'next/link';
import { supabase } from '../utils/supabase';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      // Validate email
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Invalid email format');
      }

      // Insert subscriber directly into Supabase
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        // Handle unique constraint violation
        if (error.code === '23505') {
          throw new Error('This email is already subscribed');
        }
        throw error;
      }

      setStatus('success');
      setMessage('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe');
    }
  };

  return (
    <footer className="relative bg-[#121722]">
      {/* Gradient Line */}
      <div className="h-px w-full bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                  {status === 'loading' ? (
                    <i className="fas fa-spinner fa-spin" />
                  ) : (
                    'Subscribe'
                  )}
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