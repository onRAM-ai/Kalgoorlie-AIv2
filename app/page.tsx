import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy shell">
            <div className="hero-text">
              <p className="eyebrow">AI for management</p>
              <h1 id="hero-title">Make more<br />possible.</h1>
              <p className="hero-intro">
                We help owners and managers of service businesses use AI to save time, improve everyday work and build more capable teams.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/contact">Find your AI opportunity <Arrow /></Link>
                <a className="button button-quiet" href="#training">Train your team <Arrow /></a>
              </div>
            </div>

            <div className="hero-visual" aria-label="A management team working together around a practical workflow">
              <div className="hero-ring">
                <div className="hero-photo">
                  <Image
                    src="/brand/management-workshop.png"
                    alt="Business owners and managers planning work together"
                    fill
                    priority
                    sizes="(max-width: 900px) 88vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="services" id="services" aria-labelledby="services-title">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">What we do</p>
              <h2 id="services-title">Two practical ways to improve your business with AI.</h2>
            </div>
            <div className="service-grid">
              <article className="service-card service-card-orange" id="consulting">
                <div className="service-number">01</div>
                <div>
                  <p className="service-label">AI Consulting</p>
                  <h3>Improve the way your business works.</h3>
                  <p>Find where AI can save time or improve a process, then put the right solution into practice.</p>
                </div>
                <Link href="/contact" className="service-link">Explore AI consulting <Arrow /></Link>
              </article>

              <article className="service-card service-card-dark" id="training">
                <div className="service-number">02</div>
                <div>
                  <p className="service-label">AI Training &amp; Workshops</p>
                  <h3>Help your team use AI with confidence.</h3>
                  <p>Hands-on training built around the work your people already do.</p>
                </div>
                <Link href="/contact" className="service-link">Explore training <Arrow /></Link>
              </article>
            </div>
          </div>
        </section>

        <section className="possibility" id="about" aria-labelledby="possibility-title">
          <div className="shell possibility-grid">
            <div>
              <p className="eyebrow">Why onram</p>
              <h2 id="possibility-title">Better Tools.<br />Better Business.</h2>
            </div>
            <div className="possibility-copy">
              <p className="lead">AI should make everyday work easier.</p>
              <p>We focus on useful improvements your people can understand, adopt and keep using.</p>
              <div className="outcome-list" aria-label="What better looks like">
                <div><span>01</span><strong>Save time</strong></div>
                <div><span>02</span><strong>Improve everyday work</strong></div>
                <div><span>03</span><strong>Build team confidence</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="cta-title">
          <div className="shell final-cta-inner">
            <p className="eyebrow">Your next step</p>
            <h2 id="cta-title">Find the right place to start.</h2>
            <p>Tell us what you want to improve. We’ll help you identify where AI could make the most useful difference.</p>
            <Link className="button button-light" href="/contact">Find your AI opportunity <Arrow /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
