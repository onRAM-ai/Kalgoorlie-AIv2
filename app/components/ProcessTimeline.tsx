'use client';
import { motion } from 'framer-motion';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export default function ProcessTimeline() {
  const steps: ProcessStep[] = [
    {
      number: 1,
      title: "Discovery",
      description: "We analyse your business needs and identify opportunities for AI integration",
      icon: "fas fa-search"
    },
    {
      number: 2,
      title: "Strategy Development",
      description: "Create a tailored roadmap for implementing AI solutions",
      icon: "fas fa-sitemap"
    },
    {
      number: 3,
      title: "Implementation",
      description: "Deploy and integrate AI solutions into your workflow",
      icon: "fas fa-rocket"
    },
    {
      number: 4,
      title: "Optimisation",
      description: "Continuously monitor and improve performance",
      icon: "fas fa-chart-line"
    }
  ];

  return (
    <div className="relative">
      {/* Animated dots */}
      <motion.div
        className="absolute top-[2.75rem] left-0 right-0 h-0.5 bg-gradient-to-r from-secondary to-primary opacity-20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            {/* Number Circle */}
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              <span className="text-primary font-bold">{step.number}</span>
            </div>

            {/* Icon */}
            <div className="text-3xl mb-4 text-center">
              <i className={`${step.icon} text-gradient`} />
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-white/90">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}