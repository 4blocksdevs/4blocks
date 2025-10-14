"use client";

import Script from "next/script";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function buildUtmFromLocation(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ];
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = params.get(k) || "";
    if (v) out[k] = v;
  }
  return out;
}

export default function CalendlyEmbed() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const initializedRef = useRef(false);

  const baseCalendlyUrl = useMemo(() => {
    return (
      process.env.NEXT_PUBLIC_CALENDLY_URL ||
      "https://calendly.com/4blocksdevs/30min"
    );
  }, []);

  const utms = useMemo(() => buildUtmFromLocation(), []);

  const calendlyUrlWithUtms = useMemo(() => {
    const search = new URLSearchParams(utms).toString();
    if (!search) return baseCalendlyUrl;
    const sep = baseCalendlyUrl.includes("?") ? "&" : "?";
    return `${baseCalendlyUrl}${sep}${search}`;
  }, [baseCalendlyUrl, utms]);

  const initCalendly = useCallback(() => {
    if (initializedRef.current) return;
    if (!scriptReady) return;
    const CalendlyAny = (typeof window !== "undefined" ? (window as any).Calendly : undefined);
    if (!CalendlyAny) return;
    const parent = containerRef.current;
    if (!parent) return;

    // Initialize inline widget
    CalendlyAny.initInlineWidget({
      url: calendlyUrlWithUtms,
      parentElement: parent,
      prefill: {},
      utm: utms,
    });

    initializedRef.current = true;
  }, [scriptReady, calendlyUrlWithUtms, utms]);

  useEffect(() => {
    initCalendly();
  }, [initCalendly]);

  useEffect(() => {
    // Track successful booking
    const handler = (e: any) => {
      try {
        // Calendly embed event structure can vary; avoid assuming PII is present on client
        // Safely extract minimal payload
        const payload = e?.data?.payload || {};
        const eventType = payload?.event_type || payload?.event?.type || "";

        // Brevo custom event
        (window as any)._brevo = (window as any)._brevo || [];
        (window as any)._brevo.push([
          "track",
          "calendly_booked",
          {},
          {
            data: {
              event_type: eventType,
              ...utms,
            },
          },
        ]);

        // Meta Pixel custom event
        const fbqAny = (window as any).fbq;
        if (typeof fbqAny === "function") {
          fbqAny("trackCustom", "CalendlyBooked", {
            content_name: "MVP Strategy Call",
            value: 50,
            currency: "USD",
            ...utms,
          });
        }
      } catch (err) {
        // no-op
      }
    };

    window.addEventListener("calendly.event_scheduled", handler as EventListener);
    return () => {
      window.removeEventListener(
        "calendly.event_scheduled",
        handler as EventListener
      );
    };
  }, [utms]);

  return (
    <>
      {/* Calendly CSS */}
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <div
        id="calendly-embed"
        ref={containerRef}
        style={{ minHeight: 800 }}
        className="w-full"
      />
    </>
  );
}
