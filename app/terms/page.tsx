import Link from 'next/link';

export default function TermsOfService() {
  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-block mb-8 text-primary hover:text-primary/80 transition-colors"
        >
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 text-gradient">Terms of Service</h1>
        
        <div className="prose prose-invert prose-primary max-w-none">
          <p className="text-text-secondary mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-text-secondary">
              These Terms of Service are governed by the laws of Western Australia, Australia. By accessing or using Kalgoorlie AI's services, you agree to these terms and confirm that you have the legal capacity to enter into this agreement.
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
              We provide AI consulting and implementation services as described on our website. We will:
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
              For legal inquiries, please contact us at:
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
