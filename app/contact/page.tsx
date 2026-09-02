import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="contact-page">
        <section className="contact-hero" aria-labelledby="contact-title">
          <div className="shell contact-grid">
            <div>
              <p className="eyebrow">Start a conversation</p>
              <h1 id="contact-title">What would you like to make possible?</h1>
              <p>Tell us about the outcome you want. We’ll help you identify the most practical next step.</p>
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
