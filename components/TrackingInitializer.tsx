"use client";

import { useEffect } from "react";
import UniversalTracking from "@/lib/universal-tracking";

const TrackingInitializer = () => {
  useEffect(() => {
    // Initialize Universal Tracking on page load
    UniversalTracking.initialize();

    // Track page view for all pages
    if (typeof window !== "undefined") {
      UniversalTracking.trackEvent({
        event_type: "page_view",
        lead_source: "direct_navigation",
        page_title: document.title,
      });
    }
  }, []);

  return null; // This component doesn't render anything
};

export default TrackingInitializer;
