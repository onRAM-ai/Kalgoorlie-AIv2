'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

export default function ServiceCard({ title, description, icon, features }: ServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isPrinciple = features.length === 0;

  // If it's a principle card, render a simpler version without flip functionality
  if (isPrinciple) {
    return (
      <motion.div
        className="p-8 rounded-xl relative overflow-hidden group transition-all duration-300 bg-[#1A1F2C] border border-primary/10"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="service-card-glow opacity-0 group-hover:opacity-5" />
        <div className="relative z-10">
          <div className="text-gradient mb-6 text-4xl">{icon}</div>
          <h3 className="text-xl font-semibold mb-4 text-white/90">
            {title}
          </h3>
          <p className="text-text-secondary leading-relaxed">{description}</p>
        </div>
      </motion.div>
    );
  }

  // For service cards, keep the flip functionality
  return (
    <div 
      className="h-[400px] perspective-1000"
      role="button"
      tabIndex={0}
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
      aria-label={`${title} - Click to ${isFlipped ? 'hide' : 'view'} features`}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="h-full p-8 rounded-xl bg-[#1A1F2C] border border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-full flex flex-col">
              <div className="text-gradient mb-6 text-4xl">{icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-white/90">
                {title}
              </h3>
              <p className="text-text-secondary leading-relaxed flex-grow">{description}</p>
              
              {/* Centered flip indicator */}
              <div className="mt-4 text-center text-primary/70 text-sm">
                click to learn more
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="h-full p-6 rounded-xl bg-[#1A1F2C] border border-primary/10 shadow-lg">
            <div className="relative h-full flex flex-col">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gradient">
                  {title}
                </h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  className="text-primary/70 hover:text-primary transition-colors"
                  aria-label="Close features"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="space-y-4 flex-grow">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className="text-primary flex-shrink-0 mt-1">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <p className="text-text-secondary leading-relaxed text-sm">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom indicator */}
              <div className="mt-3 text-center text-xs text-primary/70">
                click to flip back
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}