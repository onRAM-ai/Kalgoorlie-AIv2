import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that apply when working with onram AI.',
  alternates: { canonical: '/terms' },
  openGraph: { url: '/terms' },
};

export default function TermsOfService() {
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
        
        <p className="eyebrow">Working together</p>
        <h1>Terms of Service</h1>
        
        <div className="prose prose-invert prose-primary max-w-none">
          <p className="legal-date">Last updated: 2 September 2026</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-text-secondary">
              These Terms of Service are governed by the laws of Western Australia, Australia. By accessing or using onram AI&apos;s services, you agree to these terms and confirm that you have the legal capacity to enter into this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Consumer Guarantees</h2>
            <p className="text-text-secondary">
              Our services come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to a replacement or refund for a major failure and compensation for any other reasonably foreseeable loss or damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Services</h2>
            <p className="text-text-secondary mb-4">
              We provide AI consulting and AI training and workshops as described on our website. We will:
            </p>
            <ul className="list-disc pl-6 text-text-secondary">
              <li>Provide services with due care and skill</li>
              <li>Ensure services are fit for purpose</li>
              <li>Deliver services within a reasonable time</li>
              <li>Honor any specific warranties or guarantees provided</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="text-text-secondary">
              All intellectual property rights in our services, including software, designs, and documentation, remain our property or that of our licensors. You receive a limited license to use our services as permitted by these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="text-text-secondary">
              To the extent permitted by law, our liability for any breach of a consumer guarantee is limited to:
            </p>
            <ul className="list-disc pl-6 text-text-secondary">
              <li>Resupply of the services</li>
              <li>Payment of the cost of having the services supplied again</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
            <p className="text-text-secondary">
              We may terminate or suspend access to our services immediately, without prior notice or liability, for any reason, including breach of these Terms. All provisions of the Terms which by their nature should survive termination shall survive.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Dispute Resolution</h2>
            <p className="text-text-secondary">
              Any disputes will be resolved in accordance with Australian law. We encourage you to contact us first to resolve any disputes. If we cannot resolve the dispute, you may seek mediation or legal proceedings in the courts of Western Australia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-text-secondary">
              For legal inquiries, please use our{' '}
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
