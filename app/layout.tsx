import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ThemeProvider } from './hooks/useTheme';

export const metadata: Metadata = {
  metadataBase: new URL('https://kalgoorlie.ai'),
  title: {
    default: 'Kalgoorlie AI - Empowering Your Business with AI',
    template: '%s | Kalgoorlie AI'
  },
  description: 'Transform your business with AI solutions. Expert AI consulting, custom AI agents, workflow automation, and AI training workshops in Kalgoorlie.',
  keywords: ['AI consulting', 'artificial intelligence', 'machine learning', 'business automation', 'AI training', 'Kalgoorlie', 'Western Australia'],
  authors: [{ name: 'Kalgoorlie AI' }],
  creator: 'Kalgoorlie AI',
  publisher: 'Kalgoorlie AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#42D4B3' }
    ]
  },
  manifest: '/site.webmanifest',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#42D4B3',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://kalgoorlie.ai',
    siteName: 'Kalgoorlie AI',
    title: 'Kalgoorlie AI - Empowering Your Business with AI',
    description: 'Transform your business with AI solutions. Expert AI consulting, custom AI agents, workflow automation, and AI training workshops in Kalgoorlie.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kalgoorlie AI - Empowering Your Business with AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalgoorlie AI - Empowering Your Business with AI',
    description: 'Transform your business with AI solutions. Expert AI consulting, custom AI agents, workflow automation, and AI training workshops in Kalgoorlie.',
    images: ['/og-image.jpg'],
    creator: '@kalgoorlieai',
  },
  verification: {
    google: 'your-google-site-verification',
  },
  alternates: {
    canonical: 'https://kalgoorlie.ai',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts - Manual Load */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* FontAwesome */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" 
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Kalgoorlie AI",
              "url": "https://kalgoorlie.ai",
              "logo": "https://kalgoorlie.ai/icon.svg",
              "description": "Transform your business with AI solutions. Expert AI consulting, custom AI agents, workflow automation, and AI training workshops in Kalgoorlie.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kalgoorlie",
                "addressRegion": "WA",
                "addressCountry": "AU"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "contact@kalgoorlie.ai"
              },
              "sameAs": [
                "https://twitter.com/kalgoorlieai",
                "https://linkedin.com/company/kalgoorlie-ai"
              ]
            })
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
