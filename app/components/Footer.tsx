import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div>
          <Image src="/brand/onram-logo-light.svg" alt="onram AI" width={150} height={98} />
          <p>Practical AI for better business.</p>
          <span className="footer-former">Formerly Kalgoorlie AI</span>
        </div>
        <div className="footer-links">
          <a href="/#services">Services</a>
          <a href="/#approach">Approach</a>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} onram AI</span>
        <span>Better Tools. Better Business.</span>
      </div>
    </footer>
  );
}
