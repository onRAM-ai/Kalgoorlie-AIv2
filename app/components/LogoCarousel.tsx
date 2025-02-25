'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const logos = [
  '/logos/microsoft.svg',
  '/logos/google.svg',
  '/logos/apple.svg',
  '/logos/amazon.svg',
  '/logos/meta.svg',
  '/logos/netflix.svg'
];

export default function LogoCarousel() {
  return (
    <div className="w-full overflow-hidden py-10">
      <motion.div
        className="flex space-x-16"
        animate={{
          x: [0, -1920],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-32 h-12 relative grayscale opacity-30 hover:opacity-50 transition-opacity duration-300"
          >
            <Image
              src={logo}
              alt="Company logo"
              fill
              className="object-contain brightness-200"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}