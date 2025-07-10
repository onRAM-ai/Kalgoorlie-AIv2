/* app/layout.tsx --------------------------------------------------------- */
import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ThemeProvider } from './hooks/useTheme';

export const metadata: Metadata = {
  metadataBase: new URL('https://kalgoorlie.ai'),
  title: {
    default: 'Kalgoorlie AI - Empower Your Business with AI',
    template: '%s | Kalgoorlie AI',
  },
  description:
    'Transform your business with AI solutions. Expert AI consulting, custom AI agents, workflow automation, and AI training workshops in Kalgoorlie.',
  keywords: [
    'AI consulting',
    'artificial intelligence',
    'machine learning',
    'business automation',
    'AI training',
    'Kalgoorlie',
    'Western Australia',
  ],
  authors: [{ name: 'Kalgoorlie AI' }],
  creator: 'Kalgoorlie AI',
  publisher: 'Kalgoorlie AI',
  formatDetection: { email: false, address: false, telephone: false },

  /* ---------- FAVICONS (now with explicit MIME type) ---------- */
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#42D4B3' },
    ],
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

  /* ---------- SOCIAL META ---------- */
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://kalgoorlie.ai',
    siteName: 'Kalgoorlie AI',
    title: 'Kalgoorlie AI - Empower Your Business with AI',
    description:
      'Transform your business with AI solutions. Expert AI consulting, custom AI agents, workflow automation, and AI training workshops in Kalgoorlie.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kalgoorlie AI - Empower Your Business with AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalgoorlie AI - Empower Your Business with AI',
    description:
      'Transform your business with AI solutions. Expert AI consulting, custom AI agents, workflow automation, and AI training workshops in Kalgoorlie.',
    images: ['/og-image.jpg'],
    creator: '@kalgoorlieai',
  },

  verification: { google: 'your-google-site-verification' },
  alternates: { canonical: 'https://kalgoorlie.ai' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ---------- FAVICON LINKS (explicit) ---------- */}
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#42D4B3"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#42D4B3" />

        {/* ---------- GOOGLE TAG MANAGER (HEAD) ---------- */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NC56TCB4');
            `,
          }}
        />

        {/* ---------- GOOGLE ANALYTICS (GA4) ---------- */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-CCT34W9N19" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CCT34W9N19', { page_path: window.location.pathname });
            `,
          }}
        />

        {/* ---------- FONTS & ICONS ---------- */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* ---------- STRUCTURED DATA ---------- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Kalgoorlie AI',
              url: 'https://kalgoorlie.ai',
              logo: 'https://kalgoorlie.ai/icon.svg',
              description:
                'Transform your business with AI solutions. Expert AI consulting, custom AI agents, workflow automation, and AI training workshops in Kalgoorlie.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Kalgoorlie',
                addressRegion: 'WA',
                addressCountry: 'AU',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                email: 'contact@kalgoorlie.ai',
              },
              sameAs: [
                'https://twitter.com/kalgoorlieai',
                'https://linkedin.com/company/kalgoorlie-ai',
              ],
            }),
          }}
        />
      </head>

      <body>
        {/* ---------- GOOGLE TAG MANAGER (BODY) ---------- */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NC56TCB4"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />

        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
