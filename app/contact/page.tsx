import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Tell Onram where your service business still depends on you. Find the simplest practical next step using the tools you already have.',
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact' },
};

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="contact-page" id="main-content">
        <section className="contact-hero" aria-labelledby="contact-title">
          <div className="shell contact-grid">
            <div>
              <p className="eyebrow">Find your biggest bottleneck</p>
              <h1 id="contact-title">Where does the business still depend on you?</h1>
              <p>Tell us about one recurring task, handoff, follow-up or decision that keeps landing back on your desk. We’ll help you work out whether the answer is a clearer process, better use of your existing tools, practical AI—or no new technology at all.</p>
              <div className="contact-options">
                <div><span>01</span><strong>AI Business Systems</strong></div>
                <div><span>02</span><strong>Practical AI Adoption</strong></div>
              </div>
            </div>
            <div className="contact-form-card"><ContactForm /></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
