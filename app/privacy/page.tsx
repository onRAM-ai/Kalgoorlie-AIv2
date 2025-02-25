import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-block mb-8 text-primary hover:text-primary/80 transition-colors"
        >
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 text-gradient">Privacy Policy</h1>
        
        <div className="prose prose-invert prose-primary max-w-none">
          <p className="text-text-secondary mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-text-secondary">
              This Privacy Policy explains how Kalgoorlie AI ("we", "our", or "us") collects, uses, and protects your personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Collection of Personal Information</h2>
            <p className="text-text-secondary mb-4">
              We collect personal information that is reasonably necessary for our business functions. This may include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-text-secondary">
              <li>Name and contact details</li>
              <li>Email address for newsletter subscriptions</li>
              <li>Business information</li>
              <li>Website usage data</li>
              <li>Communication preferences</li>
            </ul>
            <p className="text-text-secondary">
              We collect this information through:
            </p>
            <ul className="list-disc pl-6 text-text-secondary">
              <li>Direct communications with you</li>
              <li>Website forms and subscriptions</li>
              <li>Analytics and cookies</li>
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
              We take reasonable steps to protect your personal information from misuse, interference, loss, unauthorized access, modification, or disclosure. Your personal information is stored securely and accessed only by authorized personnel.
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
              If you believe we have breached the Australian Privacy Principles, you can lodge a complaint with us by contacting our Privacy Officer. We will investigate and respond within 30 days. If you're not satisfied with our response, you can contact the Office of the Australian Information Commissioner (OAIC).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Overseas Disclosure</h2>
            <p className="text-text-secondary">
              We may disclose personal information to overseas recipients for cloud storage and other business operations. We take reasonable steps to ensure overseas recipients handle your personal information in accordance with Australian privacy laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-text-secondary">
              For privacy-related inquiries, please contact our Privacy Officer at:
              <br />
              <a href="mailto:marno@kalgoorlie.ai" className="text-primary hover:text-primary/80 transition-colors">
                marno@kalgoorlie.ai
              </a>
              <br />
              Phone: 0409 913 694
              <br />
              Address: 140 Hannan Street, Kalgoorlie 6430 WA
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
