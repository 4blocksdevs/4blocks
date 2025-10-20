"use client";

import { useEffect } from "react";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import UniversalTracking from "@/lib/universal-tracking";

export default function BookContent() {
  useEffect(() => {
    // Initialize tracking when component mounts
    UniversalTracking.initialize();

    // Track page view
    UniversalTracking.trackEvent({
      event_type: "page_view",
      lead_source: "book_meeting_page",
      page_title: "Book a Meeting - MVP Strategy Session",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-black text-center mb-6">
            Book Your{" "}
            <span className="text-[#9ED95D]">Free MVP Strategy Session</span>
          </h1>
          <p className="text-center text-gray-700 mb-8">
            Pick a time that works best for you to discuss your MVP and get
            expert guidance.
          </p>

          {/* Calendly Embed */}
          <div className="rounded-lg overflow-hidden shadow-xl border border-[#9ED95D]">
            <CalendlyEmbed />
          </div>
        </div>
      </div>
    </div>
  );
}
