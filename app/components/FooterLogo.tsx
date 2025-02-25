'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface FooterLogoProps {
  className?: string;
}

export default function FooterLogo({ className = '' }: FooterLogoProps) {
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

      {/* Text Container */}
      <motion.div 
        className="overflow-hidden"
        variants={{
          initial: { width: "auto" },
          hover: { width: 0 }
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Text */}
        <motion.div 
          className="font-poppins font-semibold whitespace-nowrap"
          variants={{
            initial: { x: 0 },
            hover: { x: "100%" }
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <span className="text-gradient">Kalgoorlie AI</span>
        </motion.div>
      </motion.div>

      {/* Accessibility enhancement */}
      <span className="sr-only">Kalgoorlie AI - Home</span>
    </motion.div>
  );
}