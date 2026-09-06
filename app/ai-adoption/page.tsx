import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Practical AI Adoption and Training',
  description: 'Role-specific AI training and adoption support for service businesses, built around real work, approved tools and measurable 30-day follow-through.',
  alternates: { canonical: '/ai-adoption' },
  openGraph: { url: '/ai-adoption' },
};

export default function AiAdoption() {
  return (
    <>
      <Navbar />
      <main className="service-detail-page" id="main-content">
        <section className="detail-hero" aria-labelledby="detail-title">
          <div className="shell detail-hero-inner">
            <p className="eyebrow">Practical AI adoption</p>
            <h1 id="detail-title">Training is not adoption.</h1>
            <p>Your team does not need another generic AI demonstration. They need approved ways to use AI in the work they already do—with a manager, a workflow and a reason to keep using it.</p>
            <Link className="button button-primary" href="/contact">Improve team adoption</Link>
          </div>
        </section>

        <section className="detail-section detail-section-light" aria-labelledby="adoption-fit-title">
          <div className="shell detail-grid">
            <div>
              <p className="eyebrow">The adoption gap</p>
              <h2 id="adoption-fit-title">People have access to AI. Everyday work has not changed.</h2>
            </div>
            <div className="detail-list">
              <div><span>01</span><p>Staff have attended training but cannot see a useful application in their role.</p></div>
              <div><span>02</span><p>There is no clear guidance about approved tools, information or human review.</p></div>
              <div><span>03</span><p>Useful experiments never become a shared workflow or documented way of working.</p></div>
              <div><span>04</span><p>Management measures attendance or licences—not whether time, quality or consistency improved.</p></div>
            </div>
          </div>
        </section>

        <section className="detail-section detail-section-dark" aria-labelledby="adoption-work-title">
          <div className="shell">
            <p className="eyebrow">What changes</p>
            <h2 id="adoption-work-title">Move from AI awareness to repeatable capability.</h2>
            <div className="detail-card-grid">
              <article><h3>Role-specific workflows</h3><p>Use real emails, meetings, documents and responsibilities rather than generic prompt examples.</p></article>
              <article><h3>Clear boundaries</h3><p>Define what information and tools are approved, where human review is required and who owns exceptions.</p></article>
              <article><h3>Manager-led follow-through</h3><p>Give each workflow an accountable manager and revisit it after the workshop instead of leaving adoption to chance.</p></article>
              <article><h3>Useful measurement</h3><p>Track time saved, turnaround, rework, missed actions and sustained use—not prompt counts.</p></article>
            </div>
          </div>
        </section>

        <section className="detail-section detail-section-orange" aria-labelledby="adoption-method-title">
          <div className="shell detail-grid">
            <div>
              <p className="eyebrow">A practical engagement</p>
              <h2 id="adoption-method-title">One workflow. Real work. Thirty days of follow-through.</h2>
            </div>
            <div>
              <p className="detail-lead">Start with a frequent task where AI can genuinely help, teach the approved method and review whether people are still using it after the initial enthusiasm fades.</p>
              <p>If the workflow does not improve the work, change it or stop it. The goal is better operations—not more AI activity.</p>
              <Link className="button button-light" href="/contact">Discuss your team</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
