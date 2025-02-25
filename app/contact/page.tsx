import ContactForm from '../components/ContactForm';
import ParticlesBackground from '../components/ParticlesBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 md:pt-32">
        <section className="py-20 overflow-hidden" aria-labelledby="contact-heading">
          <ParticlesBackground />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 id="contact-heading" className="text-5xl font-bold mb-3 text-gradient">
                Start Your AI Journey
              </h1>
              <p className="text-xl text-text-secondary mb-6">
                Transform your business with cutting-edge AI solutions customised to your needs
              </p>
              {/* Call Bubble */}
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8">
                <i className="fas fa-phone-alt text-primary"></i>
                <a href="tel:0409913694" className="text-lg hover:text-primary transition-colors">
                  Give Marno a call: 0409 913 694
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}