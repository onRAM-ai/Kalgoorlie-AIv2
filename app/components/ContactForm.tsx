'use client';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

interface FormError {
  type: string;
  message: string;
}

export default function ContactForm() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<FormError | null>(null);

  const services = [
    "AI Agents",
    "Workflow Automation",
    "AI Workshop & Training"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
    } catch (err) {
      setError({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to send message'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const inputClasses = `w-full rounded-lg px-4 py-3 text-text placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors ${
    theme === 'light'
      ? 'bg-white border border-gray-200 focus:bg-white/80'
      : 'bg-[#1A1F2C] border border-white/10'
  }`;

  const labelClasses = `block text-sm font-medium mb-2 ${
    theme === 'light' ? 'text-gray-700' : 'text-white/90'
  }`;

  return (
    <div className="max-w-2xl mx-auto">
      {submitted ? (
        <div className={`text-center p-8 rounded-xl border ${
          theme === 'light'
            ? 'bg-primary/5 border-primary/20'
            : 'bg-primary/10 border-primary/20'
        }`}>
          <i className="fas fa-check-circle text-4xl text-primary mb-4"></i>
          <h3 className={`text-2xl font-semibold mb-2 ${
            theme === 'light' ? 'text-gray-800' : 'text-white'
          }`}>Thank You!</h3>
          <p className="text-text-secondary">
            We've received your message and will get back to you soon.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 text-primary hover:text-primary/80 transition-colors"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              <p>{error.message}</p>
            </div>
          )}

          <div>
            <label htmlFor="name" className={labelClasses}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="company" className={labelClasses}>
              Company (Optional)
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Your company name"
            />
          </div>

          <div>
            <label htmlFor="service" className={labelClasses}>
              Service
            </label>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className={`${inputClasses} appearance-none`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2342D4B3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option value="" disabled>Select a service</option>
              {services.map((service) => (
                <option 
                  key={service} 
                  value={service} 
                  className={theme === 'light' ? 'text-gray-800' : 'text-white bg-[#1A1F2C]'}
                >
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className={labelClasses}>
              How can we help?
            </label>
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`${inputClasses} resize-none`}
              placeholder="Tell us about your project or requirements"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary text-lg py-4 rounded-full flex items-center justify-center gap-2 group disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Sending...
              </>
            ) : (
              <>
                Send Message
                <svg 
                  className="w-5 h-5 transform transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}