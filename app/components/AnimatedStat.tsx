'use client';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

interface AnimatedStatProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedStat({ value, label, prefix = '', suffix = '' }: AnimatedStatProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const duration = 2000; // 2 seconds animation

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;

        if (progress < 1) {
          setDisplayValue(Math.floor(value * progress));
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ y: 20, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="text-3xl font-bold font-poppins text-gradient mb-2">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-inter text-text-secondary">{label}</div>
    </motion.div>
  );
}