"use client";

import { useEffect, useRef } from "react";
import UniversalTracking from "@/lib/universal-tracking";
import { usePathname, useSearchParams } from "next/navigation";
import UTMTracker from "@/lib/utm-tracker";

const TrackingInitializer = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialLoadRef = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Diagnostics for misconfiguration
    const gaId = "G-CC9W51TKC8";
    const gtmId = "GTM-5N39QMDC";
    if (!gaId) {
      console.warn("[Tracking] GA Measurement ID missing (NEXT_PUBLIC_GA_MEASUREMENT_ID)");
    }
    if (gtmId && gtmId.startsWith("G-")) {
      console.warn(
        `[Tracking] GTM ID '${gtmId}' looks like a GA4 Measurement ID. A valid GTM container ID should look like 'GTM-XXXXXXX'. If you are not using GTM, remove the GTM snippet.`
      );
    }

    // Initialize UTM attribution early
    UTMTracker.initialize();
    UniversalTracking.initialize();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = window.location.href;
    const title = document.title;
    const utm = UTMTracker.getAttribution() || {};
    const utmGA = UTMTracker.getAttributionForGA() || {};

    // GA4 page_view (explicit) on initial load + every route change
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_location: url,
        page_title: title,
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        utm_content: utm.utm_content,
        utm_term: utm.utm_term,
        ...utmGA,
      });
    } else if (initialLoadRef.current) {
      console.warn("[Tracking] window.gtag not available on initial route event.");
    }

    // dataLayer push for GTM if present
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "page_view",
      page_location: url,
      page_title: title,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      utm_content: utm.utm_content,
      utm_term: utm.utm_term,
    });

    // Universal internal tracker
    UniversalTracking.trackEvent({
      event_type: "page_view",
      page_title: title,
      page_location: url,
      lead_source: utm.utm_source || "direct",
    });

    initialLoadRef.current = false;
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
};

export default TrackingInitializer;
