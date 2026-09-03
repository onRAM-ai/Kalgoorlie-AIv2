import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Image src="/brand/onram-logo-light.svg" alt="onram AI — Better Tools. Better Business." width={170} height={110} />
          <span className="footer-former">Formerly Kalgoorlie AI</span>
        </div>
        <div className="footer-links">
          <Link href="/#services">Services</Link>
          <Link href="/#approach">Approach</Link>
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
