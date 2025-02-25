'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Example {
  title: string;
  description: string;
  outcome: string;
}

interface ServiceExamplesProps {
  examples: Example[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function ServiceExamples({ examples, isOpen, onToggle }: ServiceExamplesProps) {
  return (
    <div className="mt-6">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors group"
        aria-expanded={isOpen}
        aria-controls="examples-content"
      >
        <span className="text-sm font-medium">View Examples</span>
        <motion.svg
          className="w-5 h-5 text-primary"
          animate={{ rotate: isOpen ? 180 : 0 }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="examples-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-4">
              {examples.map((example, index) => (
                <div
                  key={index}
                  className="bg-primary/5 border border-primary/10 rounded-lg p-4"
                >
                  <h4 className="font-medium mb-2 text-white/90">{example.title}</h4>
                  <p className="text-sm text-text-secondary mb-2">{example.description}</p>
                  <p className="text-sm font-medium text-primary">
                    Outcome: {example.outcome}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}