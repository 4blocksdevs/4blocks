"use client";

import { ReactNode, useEffect } from "react";
import UTMTracker from "@/lib/utm-tracker";
import UniversalTracking from "@/lib/universal-tracking";

declare global {
  interface Window {
    gtag: any;
    fbq: any;
    dataLayer: any;
  }
}

interface ClientLayoutProps {
  children: ReactNode;
  trackingData?: {
    pageTitle: string;
    leadSource: string;
  };
}

export default function ClientLayout({
  children,
  trackingData,
}: ClientLayoutProps) {
  useEffect(() => {
    // Initialize UTM tracking
    UTMTracker.initialize();

    if (trackingData) {
      // Track page view
      UniversalTracking.trackEvent({
        event_type: "page_view",
        lead_source: trackingData.leadSource,
        page_title: trackingData.pageTitle,
      });

      if (typeof window !== "undefined") {
        // Google Analytics
        if (window.gtag) {
          window.gtag("config", "G-CC9W51TKC8", {
            page_title: trackingData.pageTitle,
            page_location: window.location.href,
            ...UTMTracker.getAttributionForGA(),
          });
        }

        // Meta Pixel
        if (window.fbq) {
          window.fbq(
            "track",
            "PageView",
            UTMTracker.getAttributionForMetaPixel()
          );
        }
      }
    }
  }, [trackingData]);

  return <>{children}</>;
}
