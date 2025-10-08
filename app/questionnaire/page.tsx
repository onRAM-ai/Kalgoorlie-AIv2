'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';

export default function Questionnaire() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentAI: '',
    computerUsage: '',
    adminTime: '',
    frustrations: '',
    otherFrustrations: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = {
    currentAI: [
      "Newcomer - We don't use any AI or automation tools",
      'Early Adapter - We sometimes use ChatGPT and email rules',
      "Innovator - We use a combination of LLM's and automation tools",
    ],
    computerUsage: [
      'Essential – We need computers for most of our work.',
      'Useful – We use computers, but not for everything.',
      'Minimal – We rarely use computers',
    ],
    adminTime: ['0-2 hours per day', '2-4 hours per day', '4-6 hours per day'],
    frustrations: [
      'Manual data entry and paperwork',
      'Difficulty keeping track of information and tasks',
      'Repetitive work taking up too much time',
      'Attending meetings',
      'Other',
    ],
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent, isCalendly = false) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        currentAI: formData.currentAI,
        computerUsage: formData.computerUsage,
        adminTime: formData.adminTime,
        frustrations:
          formData.frustrations === 'Other'
            ? `Other: ${formData.otherFrustrations}`
            : formData.frustrations,
      };

      const res = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Failed to send email');
      }

      // Redirect or success message
      if (isCalendly) {
        window.location.href = 'https://calendly.com/kalgoorlie-ai/30min';
        return;
      }

      setFormData({
        name: '',
        email: '',
        phone: '',
        currentAI: '',
        computerUsage: '',
        adminTime: '',
        frustrations: '',
        otherFrustrations: '',
      });

      alert('Your assessment was submitted successfully!');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const selectClasses =
    'w-full rounded-lg px-4 py-3 bg-[#1A1F2C] border border-white/10 text-text placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors appearance-none';

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

              {/* Dynamic Dropdowns */}
              {[
                ['currentAI', 'What AI or automations do you currently use?', options.currentAI],
                [
                  'computerUsage',
                  'What role do computers play in your business operations?',
                  options.computerUsage,
                ],
                [
                  'adminTime',
                  'How much time do you and your team spend on repetitive admin work?',
                  options.adminTime,
                ],
                ['frustrations', 'What business process slows you down the most?', options.frustrations],
              ].map(([name, label, items]) => (
                <div key={name as string} className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                  <label className="block mb-4">
                    <span className="text-lg font-semibold block mb-2">{label as string}</span>
                    <div className="relative">
                      <select
                        name={name as string}
                        value={(formData as any)[name as string]}
                        onChange={handleChange}
                        className={selectClasses}
                        required
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2342D4B3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '1.5em 1.5em',
                        }}
                      >
                        <option value="">Select an option</option>
                        {(items as string[]).map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>

                  {name === 'frustrations' && formData.frustrations === 'Other' && (
                    <div className="mt-4">
                      <label className="block">
                        <span className="text-sm font-medium block mb-1">
                          Please specify your frustrations
                        </span>
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
              ))}

              {/* Submit Section */}
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
                    {isSubmitting ? 'Submitting...' : 'Book a Discovery Call'}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full border-2 border-primary text-primary hover:bg-primary/10 text-lg py-4 rounded-full flex items-center justify-center gap-2 group disabled:opacity-70 transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
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
