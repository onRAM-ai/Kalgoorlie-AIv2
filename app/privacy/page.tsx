import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How onram AI collects, uses and protects personal information.',
  alternates: { canonical: '/privacy' },
  openGraph: { url: '/privacy' },
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="legal-page" id="main-content">
      <div className="legal-content">
        <Link 
          href="/" 
          className="inline-block mb-8 text-primary hover:text-primary/80 transition-colors"
        >
          ← Back to Home
        </Link>
        
        <p className="eyebrow">Your information</p>
        <h1>Privacy Policy</h1>
        
        <div className="prose prose-invert prose-primary max-w-none">
          <p className="legal-date">Last updated: 2 September 2026</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-text-secondary">
              This policy explains how onram AI, formerly Kalgoorlie AI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), collects, uses and protects personal information. Where applicable, we handle personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Collection of Personal Information</h2>
            <p className="text-text-secondary mb-4">
              We collect personal information that is reasonably necessary for our business functions. This may include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-text-secondary">
              <li>Name and contact details</li>
              <li>Email address and telephone number when you provide them</li>
              <li>Business information</li>
              <li>The information included in an enquiry or service conversation</li>
            </ul>
            <p className="text-text-secondary">
              We collect this information through:
            </p>
            <ul className="list-disc pl-6 text-text-secondary">
              <li>Direct communications with you</li>
              <li>Our website contact form</li>
              <li>Service delivery and direct business communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Use and Disclosure</h2>
            <p className="text-text-secondary mb-4">
              We use and disclose your personal information for:
            </p>
            <ul className="list-disc pl-6 text-text-secondary">
              <li>Providing our services</li>
              <li>Communicating about our services</li>
              <li>Marketing (with consent)</li>
              <li>Legal compliance</li>
              <li>Business operations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-text-secondary">
              We take reasonable steps to protect personal information from misuse, interference, loss, unauthorised access, modification or disclosure. Website enquiries are processed using our hosting and email service providers and are accessible only to people who need the information to respond or deliver services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Access and Correction</h2>
            <p className="text-text-secondary">
              You have the right to access and correct your personal information. To request access or corrections, please contact our Privacy Officer. We will respond to your request within 30 days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Complaints</h2>
            <p className="text-text-secondary">
              If you believe we have breached the Australian Privacy Principles, you can lodge a complaint with us by contacting our Privacy Officer. We will investigate and respond within 30 days. If you&apos;re not satisfied with our response, you can contact the Office of the Australian Information Commissioner (OAIC).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Overseas Disclosure</h2>
            <p className="text-text-secondary">
              Some technology providers we use may process or store information outside Australia. Where applicable, we take reasonable steps to ensure personal information is handled consistently with Australian privacy requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-text-secondary">
              For privacy-related inquiries, please use our{' '}
              <Link href="/contact" className="text-primary hover:text-primary/80 transition-colors">
                contact form
              </Link>.
            </p>
          </section>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
