'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';
import { supabase } from '../utils/supabase';

export default function Questionnaire() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentAI: '',
    computerUsage: '',
    adminTime: '',
    frustrations: '',
    otherFrustrations: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = {
    currentAI: [
      "Newcomer - We don't use any AI or automation tools",
      "Early Adopter - We sometimes use ChatGPT and email rules",
      "Innovator - We use a combination of LLM's and automation tools"
    ],
    computerUsage: [
      "Essential – We need computers for most of our work.",
      "Useful – We use computers, but not for everything.",
      "Minimal – We rarely use computers"
    ],
    adminTime: [
      "0-2 hours per day",
      "2-4 hours per day",
      "4-6 hours per day",
    ],
    frustrations: [
      "Manual data entry and paperwork",
      "Difficulty keeping track of information and tasks",
      "Repetitive work taking up too much time",
      "Attending meetings",
      "Other"
    ]
  };

  const handleSubmit = async (e: React.FormEvent, isCalendly: boolean = false) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Insert data into Supabase
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          current_ai: formData.currentAI,
          computer_usage: formData.computerUsage,
          admin_time: formData.adminTime,
          frustrations: formData.frustrations === 'Other' 
            ? `Other: ${formData.otherFrustrations}`
            : formData.frustrations
        }]);

      if (supabaseError) throw supabaseError;

      // If successful and Calendly button was clicked, redirect to Calendly
      if (isCalendly) {
        window.location.href = 'https://calendly.com/marno-adaptiveit/30min';
      } else {
        // Clear form and show success message
        setFormData({
          name: '',
          email: '',
          phone: '',
          currentAI: '',
          computerUsage: '',
          adminTime: '',
          frustrations: '',
          otherFrustrations: ''
        });
        alert('Assessment submitted successfully!');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save assessment');
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

  const selectClasses = "w-full rounded-lg px-4 py-3 bg-[#1A1F2C] border border-white/10 text-text placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors appearance-none";

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 md:pt-32">
        <section className="py-20 overflow-hidden" aria-labelledby="questionnaire-heading">
          <ParticlesBackground />
          
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h1 id="questionnaire-heading" className="text-4xl font-bold mb-4 text-gradient">
                Business AI Readiness Assessment
              </h1>
              <p className="text-xl text-text-secondary">
                Let's understand your business needs better
              </p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium block mb-1">Name</span>
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg px-4 py-3 bg-[#1A1F2C] border border-white/10 text-text placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your full name"
                      required
                    />
                  </label>
                  
                  <label className="block">
                    <span className="text-sm font-medium block mb-1">Email</span>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg px-4 py-3 bg-[#1A1F2C] border border-white/10 text-text placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </label>
                  
                  <label className="block">
                    <span className="text-sm font-medium block mb-1">Phone</span>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg px-4 py-3 bg-[#1A1F2C] border border-white/10 text-text placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your phone number"
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <label className="block mb-4">
                  <span className="text-lg font-semibold block mb-2">What AI or automations do you currently use?</span>
                  <div className="relative">
                    <select
                      name="currentAI"
                      value={formData.currentAI}
                      onChange={handleChange}
                      className={selectClasses}
                      required
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2342D4B3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '1.5em 1.5em'
                      }}
                    >
                      <option value="">Select an option</option>
                      {options.currentAI.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <label className="block mb-4">
                  <span className="text-lg font-semibold block mb-2">What role do computers play in your business operations?</span>
                  <div className="relative">
                    <select
                      name="computerUsage"
                      value={formData.computerUsage}
                      onChange={handleChange}
                      className={selectClasses}
                      required
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2342D4B3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '1.5em 1.5em'
                      }}
                    >
                      <option value="">Select an option</option>
                      {options.computerUsage.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <label className="block mb-4">
                  <span className="text-lg font-semibold block mb-2">How much time do you and your team spend on repetitive admin work?</span>
                  <div className="relative">
                    <select
                      name="adminTime"
                      value={formData.adminTime}
                      onChange={handleChange}
                      className={selectClasses}
                      required
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2342D4B3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '1.5em 1.5em'
                      }}
                    >
                      <option value="">Select an option</option>
                      {options.adminTime.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <label className="block mb-4">
                  <span className="text-lg font-semibold block mb-2">What business process slows you down the most?</span>
                  <div className="relative">
                    <select
                      name="frustrations"
                      value={formData.frustrations}
                      onChange={handleChange}
                      className={selectClasses}
                      required
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2342D4B3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '1.5em 1.5em'
                      }}
                    >
                      <option value="">Select an option</option>
                      {options.frustrations.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </label>

                {formData.frustrations === 'Other' && (
                  <div className="mt-4">
                    <label className="block">
                      <span className="text-sm font-medium block mb-1">Please specify your frustrations</span>
                      <textarea
                        name="otherFrustrations"
                        value={formData.otherFrustrations}
                        onChange={handleChange}
                        className="w-full rounded-lg px-4 py-3 bg-[#1A1F2C] border border-white/10 text-text placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors resize-none"
                        placeholder="Tell us about your specific business process frustrations..."
                        rows={4}
                        required
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Ready to start section */}
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Ready to start <span className="text-gradient">doing more with less</span>?
                </h2>
                <div className="space-y-4">
                  <button 
                    type="button"
                    onClick={(e) => handleSubmit(e, true)}
                    disabled={isSubmitting}
                    className="w-full btn-primary text-lg py-4 rounded-full flex items-center justify-center gap-2 group disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Book a Discovery Call
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
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full border-2 border-primary text-primary hover:bg-primary/10 text-lg py-4 rounded-full flex items-center justify-center gap-2 group disabled:opacity-70 transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit 
                        <i className="fas fa-paper-plane transform transition-transform group-hover:translate-x-1"></i>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}