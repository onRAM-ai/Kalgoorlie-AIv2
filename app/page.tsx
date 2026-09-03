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
                Practical AI consulting and hands-on training that helps owners and teams improve everyday work, build confidence and move the business forward.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/contact">Talk through what’s possible <Arrow /></Link>
                <a className="button button-quiet" href="#training">Explore team training <Arrow /></a>
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
              <p className="eyebrow">Two ways to move forward</p>
              <h2 id="services-title">Better work starts with the right next step.</h2>
            </div>
            <div className="service-grid">
              <article className="service-card service-card-orange" id="consulting">
                <div className="service-number">01</div>
                <div>
                  <p className="service-label">AI Consulting</p>
                  <h3>Improve how your business works.</h3>
                  <p>Find the right opportunity and turn it into a practical AI solution that supports the way your business actually runs.</p>
                </div>
                <Link href="/contact" className="service-link">Explore consulting <Arrow /></Link>
              </article>

              <article className="service-card service-card-dark" id="training">
                <div className="service-number">02</div>
                <div>
                  <p className="service-label">AI Training &amp; Workshops</p>
                  <h3>Build a more capable team.</h3>
                  <p>Give your people the confidence and practical skills to use AI well in the work they already do.</p>
                </div>
                <Link href="/contact" className="service-link">Explore team training <Arrow /></Link>
              </article>
            </div>
          </div>
        </section>

        <section className="possibility" id="about" aria-labelledby="possibility-title">
          <div className="shell possibility-grid">
            <div>
              <p className="eyebrow">Better tools. Better business.</p>
              <h2 id="possibility-title">AI should make work feel more possible.</h2>
            </div>
            <div className="possibility-copy">
              <p className="lead">Not more complicated. Not another system that sits unused.</p>
              <p>onram AI helps business owners and management teams turn useful technology into clearer work, stronger capability and practical progress.</p>
              <div className="outcome-list" aria-label="What better looks like">
                <div><span>01</span><strong>Clearer everyday work</strong></div>
                <div><span>02</span><strong>More confident people</strong></div>
                <div><span>03</span><strong>More ideas put into action</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section className="approach" id="approach" aria-labelledby="approach-title">
          <div className="shell">
            <div className="approach-heading">
              <div>
                <p className="eyebrow">A practical approach</p>
                <h2 id="approach-title">Plan. Prepare. Provide.</h2>
              </div>
              <p>Start with the outcome, prepare the right people and tools, then deliver something useful enough to become part of everyday work.</p>
            </div>
            <ol className="steps">
              <li><span>01</span><h3>Plan</h3><p>Choose the opportunity that will create the most useful progress.</p></li>
              <li><span>02</span><h3>Prepare</h3><p>Shape the solution around your people, systems and real work.</p></li>
              <li><span>03</span><h3>Provide</h3><p>Put it into practice and build the confidence to keep moving.</p></li>
            </ol>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="cta-title">
          <div className="shell final-cta-inner">
            <p className="eyebrow">Your next move</p>
            <h2 id="cta-title">What could your business make possible?</h2>
            <p>Bring the goal. We’ll help you find the practical next step.</p>
            <Link className="button button-light" href="/contact">Start a conversation <Arrow /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
