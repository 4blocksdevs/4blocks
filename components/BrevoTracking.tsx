"use client";
import { useEffect } from "react";
import Script from "next/script";
import UTMTracker from "@/lib/utm-tracker";

/**
 * BrevoTracking
 * Loads Brevo SDK and listens for UniversalTracking custom events to forward
 * PDF download + form submission + other events with UTM enrichment.
 * Assumptions about Brevo API (adjust if official docs differ):
 *  - Initialization: Brevo.push(["init", { client_key }])
 *  - Event tracking: Brevo.push(["track", eventName, payload])
 *  - UTM association: included inside payload per event
 */
declare global { interface Window { Brevo: any[]; } }

interface BrevoTrackingProps { clientKey?: string; }

const DEFAULT_KEY = process.env.NEXT_PUBLIC_BREVO_CLIENT_KEY || "94c7pgy9zfdaxjkryfs7m0lj";

const BrevoTracking = ({ clientKey = DEFAULT_KEY }: BrevoTrackingProps) => {
  useEffect(() => {
    // Listener to forward universal events to Brevo if SDK present
    const handler = (e: Event) => {
      const detail: any = (e as CustomEvent).detail;
      if (!detail || typeof window === "undefined" || !Array.isArray(window.Brevo)) return;
      try {
        const { event_type } = detail;
        // Map internal event_type directly; rename if needed
        window.Brevo.push(["track", event_type, detail]);
      } catch (err) {
        console.warn("Brevo forwarding failed", err);
      }
    };
    window.addEventListener("universal-tracking-event", handler as EventListener);
    return () => window.removeEventListener("universal-tracking-event", handler as EventListener);
  }, []);

  // On mount (after init) push a synthetic UTM capture event so Brevo has attribution early
  useEffect(() => {
    if (typeof window === "undefined") return;
    const utm = UTMTracker.getAttribution();
    if (utm && Array.isArray(window.Brevo)) {
      window.Brevo.push(["track", "utm_session", utm]);
    }
  }, []);

  return (
    <>
      <Script src="https://cdn.brevo.com/js/sdk-loader.js" strategy="afterInteractive" />
      <Script id="brevo-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `window.Brevo = window.Brevo || [];window.Brevo.push(["init", { client_key: "${clientKey}" }]);`
      }} />
    </>
  );
};

export default BrevoTracking;
