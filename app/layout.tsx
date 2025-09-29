import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Footer from '../components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://4blocks.xyz'),
  title: 'Free MVP Roadmap PDF - 7 Steps to Launch Successfully | 4Blocks',
  description: 'Download your free MVP roadmap PDF. Learn the proven 7-step guide to launch a successful MVP without wasting time and money. Created by 4Blocks Italian software experts.',
  keywords: 'MVP roadmap, startup guide, product development, software development, 4Blocks, Italian software solutions, minimum viable product, startup strategy',
  authors: [{ name: '4Blocks', url: 'https://4blocks.xyz' }],
  creator: '4Blocks',
  publisher: '4Blocks',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://4blocks.xyz'
  },
  openGraph: {
    title: 'Free MVP Roadmap PDF - 7 Steps to Launch Successfully | 4Blocks',
    description: 'Download your free MVP roadmap PDF. Learn the proven 7-step guide to launch a successful MVP without wasting time and money.',
    url: 'https://4blocks.xyz',
    siteName: '4Blocks',
    images: [
      {
        url: '/og-image.jpg', // You'll need to add this image
        width: 1200,
        height: 630,
        alt: '4Blocks MVP Roadmap PDF',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free MVP Roadmap PDF - 7 Steps to Launch Successfully | 4Blocks',
    description: 'Download your free MVP roadmap PDF. Learn the proven 7-step guide to launch a successful MVP without wasting time and money.',
    creator: '@4blocks',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
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
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXX');`, // Replace GTM-XXXXXX with your GTM ID
          }}
        />

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script
          id="ga4-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID', {
                anonymize_ip: true,
                cookie_expires: 63072000
              });
            `, // Replace GA_MEASUREMENT_ID with your actual GA4 ID
          }}
        />

        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID'); // Replace with your actual Pixel ID
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* Schema.org structured data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "4Blocks",
              "url": "https://4blocks.xyz",
              "logo": "https://4blocks.xyz/logo.png",
              "description": "Italian Software Solutions for Businesses",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "info@4blocks.xyz",
                "contactType": "Customer Service"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IT"
              },
              "sameAs": [
                "https://linkedin.com/company/4blocks",
                "https://twitter.com/4blocks"
              ]
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
  <Footer />
      </body>
    </html>
  );
}
