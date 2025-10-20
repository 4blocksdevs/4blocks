"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { isValidEmail, sanitizeEmail } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Clock } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import UniversalTracking from "@/lib/universal-tracking";
import trackAndDownloadPDF from "@/lib/download-tracking";

declare global {
  interface Window {
    gtag: any;
    fbq: any;
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      closePopupWidget?: () => void;
    };
  }
}

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const type =
    searchParams.get("type") === "checklist" ? "checklist" : "roadmap";
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({ email: "" });
  const [calendlyUrl, setCalendlyUrl] = useState<string>(
    "https://calendly.com/4blocksdevs/30min?primary_color=9ED95D"
  );

  useEffect(() => {
    // Initialize Universal Tracking
    UniversalTracking.initialize();

    // Track thank you page view
    UniversalTracking.trackEvent({
      event_type: "page_view",
      lead_source: "thank_you_page",
      page_title: "Thank You - MVP Roadmap",
    });
  }, []);

  // Build Calendly URL with UTMs from current URL
  useEffect(() => {
    if (typeof window === "undefined") return;
    const loc = new URL(window.location.href);
    const params = new URLSearchParams();
    // preserve existing primary color
    params.set("primary_color", "9ED95D");
    // Copy UTM parameters if present
    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "utm_id",
    ].forEach((k) => {
      const v = loc.searchParams.get(k);
      if (v) params.set(k, v);
    });

    const query = params.toString();
    setCalendlyUrl(
      `${
        process.env.NEXT_PUBLIC_CALENDLY_URL ||
        "https://calendly.com/4blocksdevs/30min"
      }${query ? `?${query}` : ""}`
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const calendlyScheduledHandler = (event: MessageEvent) => {
      const data = event.data;

      if (
        typeof data === "object" &&
        data !== null &&
        "event" in data &&
        (data as { event?: string }).event === "calendly.event_scheduled"
      ) {
        // Track calendar booking completion with Universal Tracking
        UniversalTracking.trackCalendarBooking("calendly", {
          event_details: data,
          booking_source: "thank_you_page_embedded",
        });
      }
    };

    window.addEventListener("message", calendlyScheduledHandler);

    return () => {
      window.removeEventListener("message", calendlyScheduledHandler);
    };
  }, []);

  const triggerPdfDownload = (source: string) => {
    trackAndDownloadPDF({
      filePath: "/mvp-roadmap.pdf",
      fileName: "MVP-Roadmap-4Blocks.pdf",
      leadSource: source,
      downloadType: "mvp_roadmap",
      autoClick: true,
    });
  };

  const handleSecondaryDownload = async () => {
    // Send email with PDF; tracking will fire only if fallback download occurs
    try {
      const response = await fetch("/api/send-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Optionally track secondary success event
        UniversalTracking.trackPDFDownload(
          "MVP-Roadmap-4Blocks.pdf",
          "thank_you_page_secondary_email_sent",
          "mvp_roadmap"
        );
        alert("PDF sent successfully to your email!");
      } else {
        throw new Error("Failed to send PDF");
      }
    } catch (error) {
      console.error("Error sending PDF:", error);
      // Fallback to direct download with tracking
      triggerPdfDownload("thank_you_page_secondary_fallback");
    }
  };

  const handleBookCall = () => {
    // Track Calendly booking intent with Universal Tracking
    UniversalTracking.trackBookCallClick("thank_you_page_button");

    if (
      window.Calendly &&
      typeof window.Calendly.initPopupWidget === "function"
    ) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
      window.open(calendlyUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleDirectDownload = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sanitizedEmail = sanitizeEmail(formData.email);
    if (!isValidEmail(sanitizedEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    triggerPdfDownload("thank_you_page_direct");
    setFormData({ email: "" });
  };

  const handleRoadmapDownload = () => {
    triggerPdfDownload("thank_you_page_main_button");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Track Calendly bookings via postMessage */}
      {/* CalendlyThankYouTracker dynamic import as a component */}
      {(() => {
        const CalendlyThankYouTracker = dynamic(
          () => import("@/components/CalendlyThankYouTracker"),
          { ssr: false }
        );
        return <CalendlyThankYouTracker />;
      })()}
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />

      {/* Thank You Section */}
      <section className="container mx-auto px-2 py-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl lg:text-5xl font-bold text-black mb-2">
            Thank You!
            <br />
            Your{" "}
            <span className="text-[#9ED95D] font-semibold">
              {type === "checklist" ? "Founder's MVP Checklist" : "MVP Roadmap"}
            </span>{" "}
            is on its way 🚀
          </h1>
          <p className="text-black mb-4 text-base">
            Check your inbox,
            <br />
            your roadmap will arrive within a few minutes.
          </p>

          {/* Email Icon */}
          <div className="mb-8">
            <div className="w-14 h-14 flex items-center justify-center mx-auto mb-2">
              <Image src="/arrow.svg" alt="Arrow" width={48} height={48} />
            </div>
            <div className="w-16 h-16 relative flex items-center justify-center mx-auto mb-2">
              <Image src="/email.svg" alt="Email" width={60} height={60} />
              <div className="absolute bottom-1 -right-1 w-7 h-7  flex items-center justify-center ">
                <Image src="/check.svg" alt="Check" width={28} height={28} />
              </div>
            </div>
          </div>

          <Button
            id="roadmapDownloadButton"
            type="button"
            onClick={handleRoadmapDownload}
            className="bg-[#9ED95D] hover:bg-[#9ED95D] text-black font-bold px-4 py-4 mb-8 uppercase text-base"
          >
            DOWNLOAD{" "}
            {type === "checklist" ? " Founder's MVP Checklist" : "MVP ROADMAP"}{" "}
            PDF
          </Button>
        </div>
      </section>

      {/* Rest of the components as is */}
      {/* Consultation CTA Section */}
      <section className="container mx-auto px-2 py-8">
        {/* Same content as before */}
      </section>

      {/* Value Proposition Banner */}
      <div className="bg-[#9ED95D] container mx-auto rounded-md max-w-xl p-6 m-8">
        {/* Same content as before */}
      </div>
    </div>
  );
}
