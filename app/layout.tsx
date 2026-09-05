import './globals.css';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-J8RDEH64B5';
const googleAnalyticsEnabled = process.env.NODE_ENV === 'production';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.onram.ai'),
  title: {
    default: 'onram AI | Make more possible',
    template: '%s | onram AI',
  },
  description: 'Practical AI consulting and hands-on training for owners and managers of service businesses. Formerly Kalgoorlie AI.',
  keywords: ['AI consulting', 'AI training', 'AI workshops', 'AI for management', 'Kalgoorlie', 'Western Australia'],
  authors: [{ name: 'onram AI' }],
  creator: 'onram AI',
  publisher: 'onram AI',
  manifest: '/site.webmanifest',
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }] },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.onram.ai',
    siteName: 'onram AI',
    title: 'onram AI | Make more possible',
    description: 'Practical AI consulting and hands-on training for owners and managers of service businesses.',
  },
  alternates: { canonical: 'https://www.onram.ai' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'onram AI',
          alternateName: 'Kalgoorlie AI',
          url: 'https://www.onram.ai',
          description: 'Practical AI consulting and AI training for owners and managers of service businesses.',
          telephone: '+61 409 913 694',
          areaServed: { '@type': 'AdministrativeArea', name: 'Western Australia' },
          address: {
            '@type': 'PostalAddress',
            streetAddress: '74 Egan Street',
            addressLocality: 'Kalgoorlie',
            addressRegion: 'WA',
            postalCode: '6430',
            addressCountry: 'AU',
          },
        }) }} />
        {googleAnalyticsEnabled ? <GoogleAnalytics gaId={googleAnalyticsId} /> : null}
      </body>
    </html>
  );
}
