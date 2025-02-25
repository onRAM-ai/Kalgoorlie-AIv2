'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className={`flex items-center gap-2 ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
    >
      {/* Logo Icon */}
      <div className="relative w-8 h-8">
        {/* Outer hexagon */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full border-2 border-primary/30 rounded-xl transform rotate-45" />
        </motion.div>
        
        {/* Inner circle with gradient */}
        <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-primary to-secondary opacity-80" />
      </div>

      {/* Text Container - Always visible */}
      <div className="font-poppins font-semibold whitespace-nowrap">
        <span className="text-gradient">Kalgoorlie AI</span>
      </div>

      {/* Accessibility enhancement */}
      <span className="sr-only">Kalgoorlie AI - Home</span>
    </motion.div>
  );
}