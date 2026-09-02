import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://kalgoorlie.ai'),
  title: {
    default: 'onram AI | Make more possible',
    template: '%s | onram AI',
  },
  description: 'Practical AI consulting and hands-on AI training for business owners and management teams. Formerly Kalgoorlie AI.',
  keywords: ['AI consulting', 'AI training', 'AI workshops', 'AI for management', 'Kalgoorlie', 'Western Australia'],
  authors: [{ name: 'onram AI' }],
  creator: 'onram AI',
  publisher: 'onram AI',
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }] },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://kalgoorlie.ai',
    siteName: 'onram AI',
    title: 'onram AI | Make more possible',
    description: 'Practical AI consulting and hands-on AI training for business owners and management teams.',
  },
  alternates: { canonical: 'https://kalgoorlie.ai' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'onram AI',
          alternateName: 'Kalgoorlie AI',
          url: 'https://kalgoorlie.ai',
          description: 'Practical AI consulting and AI training for business owners and management teams.',
          areaServed: { '@type': 'AdministrativeArea', name: 'Western Australia' },
          address: { '@type': 'PostalAddress', addressLocality: 'Kalgoorlie-Boulder', addressRegion: 'WA', addressCountry: 'AU' },
        }) }} />
      </body>
    </html>
  );
}
