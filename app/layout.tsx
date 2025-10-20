import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Footer from "../components/footer";
import Image from "next/image";
import TrackingInitializer from "../components/TrackingInitializer";
import PDFDownloadTracker from "../components/PDFDownloadTracker";
import BrevoTracking from "../components/BrevoTracking";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://4blocks.xyz"),
  title: "Free 4blocks MVP Roadmap Guide | Plan & Save on Development",
  description:
    "Download our free MVP Roadmap and learn how to validate ideas, plan smarter, and cut development costs. Build your product with clarity and confidence.",
  keywords:
    "MVP roadmap, startup guide, product development, software development, 4Blocks, Italian software solutions, minimum viable product, startup strategy",
  authors: [{ name: "4Blocks", url: "https://4blocks.xyz" }],
  creator: "4Blocks",
  publisher: "4Blocks",
  robots: "index, follow",
  alternates: {
    canonical: "https://4blocks.xyz",
  },
  openGraph: {
    title: "Free 4blocks MVP Roadmap Guide | Plan & Save on Development",
    description:
      "Download our free MVP Roadmap and learn how to validate ideas, plan smarter, and cut development costs. Build your product with clarity and confidence.",
    url: "https://4blocks.xyz",
    siteName: "4Blocks",
    images: [
      {
        url: "/og-image.jpg", // You'll need to add this image
        width: 1200,
        height: 630,
        alt: "4Blocks MVP Roadmap PDF",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free 4blocks MVP Roadmap Guide | Plan & Save on Development",
    description:
      "Download our free MVP Roadmap and learn how to validate ideas, plan smarter, and cut development costs. Build your product with clarity and confidence.",
    creator: "@4blocks",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code", 
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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5N39QMDC');`,
          }}
        />

        {/*Google Analytics 4 */}
         <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-CC9W51TKC8`}
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
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                anonymize_ip: true,
                cookie_expires: 63072000
              });
            `,
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
              fbq('init', '4277236155853060');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* HubSpot Tracking Script */}
        <Script
          src="//js.hsforms.net/forms/v2.js"
          strategy="afterInteractive"
        />

        {/* Schema.org structured data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "4Blocks",
              url: "https://4blocks.xyz",
              logo: "https://4blocks.xyz/logo.png",
              description: "Italian Software Solutions for Businesses",
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@4blocks.xyz",
                contactType: "Customer Service",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "IT",
              },
              sameAs: [
                "https://linkedin.com/company/4blocks",
                "https://twitter.com/4blocks",
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=GTM-5N39QMDC`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Meta Pixel (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1" alt="" />`,
          }}
        />
  <TrackingInitializer />
  <PDFDownloadTracker />
  <BrevoTracking />
        <div className="max-w-5xl mx-auto w-full">
          {/* Header */}
          <header className="container mx-auto px-4 py-6">
            <a
              href="/"
              className="block w-fit"
              tabIndex={0}
              aria-label="Go to homepage"
            >
              <div className="flex items-center cursor-pointer">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                  <Image
                    src="/logo.svg"
                    alt="4Blocks Logo"
                    width={42}
                    height={48}
                  />
                </div>
                <span className="ml-2 text-2xl font-bold text-black">
                  BLOCKS
                </span>
              </div>
            </a>
          </header>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
