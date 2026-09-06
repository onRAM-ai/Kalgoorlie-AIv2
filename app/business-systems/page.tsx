import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'AI Business Systems for Service Businesses',
  description: 'Connect Microsoft 365, ChatGPT and the tools you already use into practical workflows that reduce admin, missed follow-ups and owner dependence.',
  alternates: { canonical: '/business-systems' },
  openGraph: { url: '/business-systems' },
};

export default function BusinessSystems() {
  return (
    <>
      <Navbar />
      <main className="service-detail-page" id="main-content">
        <section className="detail-hero" aria-labelledby="detail-title">
          <div className="shell detail-hero-inner">
            <p className="eyebrow">AI business systems</p>
            <h1 id="detail-title">Connect the tools.<br />Organise the work.<br />Rely less on the owner.</h1>
            <p>Onram helps owner-led service businesses turn Microsoft 365, ChatGPT and existing software into practical management workflows—without adding another place to check.</p>
            <Link className="button button-primary" href="/contact">Find your biggest bottleneck</Link>
          </div>
        </section>

        <section className="detail-section detail-section-light" aria-labelledby="fit-title">
          <div className="shell detail-grid">
            <div>
              <p className="eyebrow">When this fits</p>
              <h2 id="fit-title">The business has software. You still have to hold it together.</h2>
            </div>
            <div className="detail-list">
              <div><span>01</span><p>Important work is scattered across emails, meeting notes, spreadsheets and people’s heads.</p></div>
              <div><span>02</span><p>Follow-ups depend on someone remembering—or the owner checking.</p></div>
              <div><span>03</span><p>Information is copied between systems, creating repeated admin and avoidable errors.</p></div>
              <div><span>04</span><p>Tools overlap, sit underused or create more places for the team to look.</p></div>
            </div>
          </div>
        </section>

        <section className="detail-section detail-section-dark" aria-labelledby="work-title">
          <div className="shell">
            <p className="eyebrow">Typical workflows</p>
            <h2 id="work-title">Start with one piece of work that repeatedly costs time or attention.</h2>
            <div className="detail-card-grid">
              <article><h3>Emails and meetings to action</h3><p>Capture decisions, assign responsibility and make due dates and follow-ups visible.</p></article>
              <article><h3>Business information people can find</h3><p>Organise approved knowledge so owners and teams can get answers without searching everywhere.</p></article>
              <article><h3>Client and internal handovers</h3><p>Standardise what must be captured, who owns the next step and when an exception returns to management.</p></article>
              <article><h3>Recurring management administration</h3><p>Simplify repetitive preparation, checking and reporting before deciding what should be automated.</p></article>
            </div>
          </div>
        </section>

        <section className="detail-section detail-section-orange" aria-labelledby="method-title">
          <div className="shell detail-grid">
            <div>
              <p className="eyebrow">Plan. Prepare. Provide.</p>
              <h2 id="method-title">A useful workflow before a bigger technology project.</h2>
            </div>
            <div>
              <p className="detail-lead">We map the current work, choose one high-value bottleneck, configure the simplest suitable workflow and teach the people responsible for using it.</p>
              <p>Every improvement should earn its place through time saved, fewer missed actions, faster handoffs, better consistency or fewer interruptions reaching the owner.</p>
              <Link className="button button-light" href="/contact">Discuss one workflow</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
