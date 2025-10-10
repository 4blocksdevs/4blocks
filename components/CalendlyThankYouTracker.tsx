"use client";

import { useEffect } from "react";

export default function CalendlyThankYouTracker() {
  useEffect(() => {
    const getUTMs = () => {
      const s = new URLSearchParams(window.location.search);
      return {
        utm_source: s.get("utm_source") ?? "",
        utm_medium: s.get("utm_medium") ?? "",
        utm_campaign: s.get("utm_campaign") ?? "",
        utm_content: s.get("utm_content") ?? "",
      };
    };

    const onMessage = (e: MessageEvent<any>) => {
      const data = e?.data as any;
      if (!data || data.event !== "calendly.event_scheduled") return;

      const utms = getUTMs();
      const email =
        data.payload?.invitee?.email ?? data.invitee?.email ?? "";

      // GTM
      try {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "calendly_booked",
          source: "calendly",
          email,
          ...utms,
        });
      } catch {}

      // Meta Pixel
      try {
        const fbqAny = (window as any).fbq;
        if (typeof fbqAny === "function") {
          fbqAny("track", "CompleteRegistration", {
            content_name: "Calendly Booking",
            email,
            ...utms,
          });
          fbqAny("trackCustom", "CalendlyBooked", { email, ...utms });
        }
      } catch {}

      // Brevo custom event
      try {
        (window as any)._brevo = (window as any)._brevo || [];
        (window as any)._brevo.push([
          "track",
          "calendly_booked",
          { email },
          { data: { ...utms } },
        ]);
      } catch {}
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}
