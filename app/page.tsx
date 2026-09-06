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
              <p className="eyebrow">AI business systems for service-business owners</p>
              <h1 id="hero-title">Stop being<br />the system.</h1>
              <p className="hero-intro">
                You already pay for the software. But the emails, meeting notes, follow-ups and decisions are still scattered—and the business still relies on you to hold it together. Onram turns the tools you already have into a practical management system your team can actually use.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/contact">Find your biggest bottleneck <Arrow /></Link>
                <a className="button button-quiet" href="#services">See how Onram helps <Arrow /></a>
              </div>
              <ul className="fit-line" aria-label="Who and where Onram serves">
                <li>Owner-led service businesses</li>
                <li>Microsoft 365 + ChatGPT</li>
                <li>Kalgoorlie, Western Australia</li>
              </ul>
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
              <h2 id="services-title">Make the tools you already own earn their place.</h2>
            </div>
            <div className="service-grid">
              <article className="service-card service-card-orange" id="consulting">
                <div className="service-number">01</div>
                <div>
                  <p className="service-label">AI Business Systems</p>
                  <h3>Build a business that relies less on you.</h3>
                  <p>We map the work, find the recurring bottleneck and implement one useful workflow at a time—using Microsoft 365, ChatGPT and the systems already in your business.</p>
                </div>
                <Link href="/business-systems" className="service-link">Explore AI business systems <Arrow /></Link>
              </article>

              <article className="service-card service-card-dark" id="training">
                <div className="service-number">02</div>
                <div>
                  <p className="service-label">Practical AI Adoption</p>
                  <h3>Make AI part of the work—not another unused tool.</h3>
                  <p>Role-specific training and follow-through built around your team’s real emails, meetings, documents and responsibilities.</p>
                </div>
                <Link href="/ai-adoption" className="service-link">Explore practical AI adoption <Arrow /></Link>
              </article>
            </div>
          </div>
        </section>

        <section className="possibility" id="about" aria-labelledby="possibility-title">
          <div className="shell possibility-grid">
            <div>
              <p className="eyebrow">Why onram</p>
              <h2 id="possibility-title">A working management system.<br />Not another app.</h2>
            </div>
            <div className="possibility-copy">
              <p className="lead">Onram starts with the work—not the technology.</p>
              <p>We plan around the outcome, prepare the people and information, then provide a practical workflow with clear ownership and human review. Success is measured in time saved, fewer missed follow-ups, faster handoffs and fewer interruptions reaching the owner.</p>
              <div className="outcome-list" aria-label="How Onram works">
                <div><span>01</span><strong>Plan the outcome and choose one costly bottleneck</strong></div>
                <div><span>02</span><strong>Prepare the process, information, tools and safeguards</strong></div>
                <div><span>03</span><strong>Provide the workflow, training and adoption follow-through</strong></div>
              </div>
            </div>
          </div>
          <div className="shell answer-grid" aria-label="Common business problems Onram helps solve">
            <article>
              <h3>How do I stop being the bottleneck?</h3>
              <p>Make recurring decisions, responsibilities and escalation rules visible, then move routine work out of the owner’s head.</p>
            </article>
            <article>
              <h3>How do I reduce admin without another hire?</h3>
              <p>Map the repetitive work first, then simplify and automate the right handoffs using the systems you already pay for.</p>
            </article>
            <article>
              <h3>How do I turn meetings into action?</h3>
              <p>Connect meeting notes to assigned actions, due dates and follow-ups so commitments do not disappear after the conversation.</p>
            </article>
            <article>
              <h3>How do I make AI adoption stick?</h3>
              <p>Train people on their actual work, define safe-use rules and follow up until the new workflow becomes part of normal operations.</p>
            </article>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="cta-title">
          <div className="shell final-cta-inner">
            <p className="eyebrow">Your next step</p>
            <h2 id="cta-title">Where does the business still depend on you?</h2>
            <p>Bring one recurring task, decision or follow-up that keeps landing back on your desk. We’ll help you find the simplest practical way forward.</p>
            <Link className="button button-light" href="/contact">Find your biggest bottleneck <Arrow /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
