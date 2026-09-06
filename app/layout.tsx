import './globals.css';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-J8RDEH64B5';
const googleAnalyticsEnabled = process.env.NODE_ENV === 'production';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.onram.ai'),
  title: {
    default: 'AI Business Systems for Service Businesses | onram AI',
    template: '%s | onram AI',
  },
  description: 'Onram helps owner-led service businesses reduce admin and owner dependence by connecting Microsoft 365, ChatGPT and the tools they already use.',
  keywords: ['AI business systems', 'AI operations consultant', 'service business systems', 'workflow automation', 'AI adoption', 'Microsoft 365 consulting', 'ChatGPT consulting', 'AI for management', 'Kalgoorlie', 'Western Australia'],
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
    title: 'Stop being the system | onram AI',
    description: 'Practical AI business systems for owner-led service businesses that already have the tools but still depend on the owner to hold everything together.',
    images: [{ url: '/brand/management-workshop.png', alt: 'Onram AI helps service-business owners turn existing tools into practical management systems.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stop being the system | onram AI',
    description: 'Turn Microsoft 365, ChatGPT and the tools you already own into a practical management system.',
    images: ['/brand/management-workshop.png'],
  },
  alternates: { canonical: 'https://www.onram.ai' },
};

const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'onram AI',
    alternateName: 'Kalgoorlie AI',
    url: 'https://www.onram.ai',
    logo: 'https://www.onram.ai/brand/onram-logo-dark.svg',
    image: 'https://www.onram.ai/brand/management-workshop.png',
    description: 'A Kalgoorlie-based AI consulting and training business helping owner-led service businesses use Microsoft 365, ChatGPT and existing software to organise management work, reduce administration and rely less on the owner.',
    telephone: '+61 409 913 694',
    serviceType: ['AI business systems consulting', 'Workflow automation consulting', 'AI adoption and training', 'Microsoft 365 and ChatGPT workflow consulting'],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Owners and managers of established service businesses',
    },
    areaServed: [
      { '@type': 'City', name: 'Kalgoorlie-Boulder' },
      { '@type': 'AdministrativeArea', name: 'Western Australia' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '74 Egan Street',
      addressLocality: 'Kalgoorlie',
      addressRegion: 'WA',
      postalCode: '6430',
      addressCountry: 'AU',
    },
    sameAs: ['https://au.linkedin.com/company/kalgoorlie-ai'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI business systems and adoption services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Business Systems Consulting',
            description: 'Map a management bottleneck and implement a practical workflow using Microsoft 365, ChatGPT and the systems already in the business.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Practical AI Adoption',
            description: 'Role-specific training and follow-through built around a team’s real work, approved tools and responsibilities.',
          },
        },
      ],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
        {googleAnalyticsEnabled ? <GoogleAnalytics gaId={googleAnalyticsId} /> : null}
      </body>
    </html>
  );
}
