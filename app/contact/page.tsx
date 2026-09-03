import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Find the right AI opportunity for your service business with practical consulting, training and workshops from onram AI.',
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
              <p className="eyebrow">Your next step</p>
              <h1 id="contact-title">Find your AI opportunity.</h1>
              <p>Tell us what you want to improve. We’ll help you identify where AI could make the most useful difference.</p>
              <div className="contact-options">
                <div><span>01</span><strong>AI Consulting</strong></div>
                <div><span>02</span><strong>AI Training &amp; Workshops</strong></div>
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
