"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Clock } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
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

const initialFormData = { email: "" };

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const type =
    searchParams.get("type") === "checklist" ? "checklist" : "roadmap";

  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [calendlyUrl, setCalendlyUrl] = useState<string>(
    "https://calendly.com/4blocksdevs/30min?primary_color=9ED95D"
  );

  const baseCalendly = useMemo(() => {
    return (
      process.env.NEXT_PUBLIC_CALENDLY_URL ||
      "https://calendly.com/4blocksdevs/30min"
    );
  }, []);

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
    setCalendlyUrl(`${baseCalendly}${query ? `?${query}` : ""}`);
  }, [baseCalendly]);

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

    triggerPdfDownload("thank_you_page_direct");
    setFormData(initialFormData);
  };

  const handleRoadmapDownload = () => {
    triggerPdfDownload("thank_you_page_main_button");
  };

  return (
    <div className="min-h-screen bg-white">
      {/** Track Calendly bookings via postMessage */}
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
              {type === "checklist" ? "Founder’s MVP Checklist" : "MVP Roadmap"}
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
            className="bg-[#9ED95D] hover:bg-[#9ED95D] text-black font-bold px-4 py-4 mb-8 text-base"
          >
            DOWNLOAD MVP ROADMAP
          </Button>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="container mx-auto px-2 py-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-2">
            Turn Your{" "}
            <span className="text-[#9ED95D]">
              {type === "checklist" ? "Founder’s MVP Checklist" : "MVP"}
            </span>{" "}
            Roadmap
            <br />
            Into Reality With a Free Consultation
          </h2>
          <p className="text-base my-6 text-black max-w-2xl mx-auto">
            Book a one-on-one strategy call with Mirko, our CEO,
            <br />
            gain practical insights to move your project forward.
          </p>
        </div>
        <div className="text-center mb-6">
          <h2 className="text-xl lg:text-3xl font-bold text-black mb-2">
            Your Shortcut to a Winning{" "}
            <span className="text-[#9ED95D]">MVP</span>
            <br />
            Designed by 4Blocks Experts
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid max-w-3xl mx-auto grid-cols-1 gap-3 mb-6">
          <Card className="p-3 shadow-lg border-0 bg-white">
            <CardContent className="p-0">
              <div className="flex items-center py-2 space-x-4">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/tools.svg"
                    alt="Roadmap"
                    width={20}
                    height={20}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-black text-base mb-1">
                    Free Mini-Audit of Your MVP Idea
                  </h3>
                  <p className="text-sm text-black">
                    Get a quick audit of your MVP idea with recommendations to
                    improve success.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-3 shadow-lg border-0 bg-white">
            <CardContent className="p-0">
              <div className="flex items-center py-2 space-x-4">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-white rounded-lg">
                  <Image
                    src="/clock.svg"
                    alt="Roadmap"
                    width={20}
                    height={20}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-black text-base mb-1">
                    Real Cost & Timeline Estimates
                  </h3>
                  <p className="text-sm text-black">
                    Understand realistic costs, timelines, and development
                    phases, no surprises
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-3 shadow-lg border-0 bg-white">
            <CardContent className="p-0">
              <div className="flex items-center py-2 space-x-4">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-white rounded-lg">
                  <Image
                    src="/rocket.svg"
                    alt="Rocket"
                    width={20}
                    height={20}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-black text-base mb-1">
                    Growth Strategy Blueprint
                  </h3>
                  <p className="text-sm text-black">
                    We&apos;ll outline how to scale your MVP after launch
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-3 shadow-lg border-0 bg-white">
            <CardContent className="p-0">
              <div className="flex items-center py-2 space-x-4">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-white rounded-lg">
                  <Image src="/key.svg" alt="Key" width={20} height={20} />
                </div>
                <div>
                  <h3 className="font-bold text-black text-base mb-1">
                    Exclusive Free Slots
                  </h3>
                  <p className="text-sm text-black">
                    Only 10 free consultations available this month, secure
                    yours now.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-3 shadow-lg border-0 bg-white">
            <CardContent className="p-0">
              <div className="flex items-center py-2 space-x-4">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-white rounded-lg">
                  <Image
                    src="/italia.svg"
                    alt="Italia"
                    width={20}
                    height={20}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-black text-base mb-1">
                    Built with Italian Precision
                  </h3>
                  <p className="text-sm text-black">
                    Our team in Italy has delivered dozens of successful
                    software projects for startups & enterprises.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center my-4">
          <p className="text-base font-bold text-black italic mb-4 max-w-xl mx-auto">
            &quot;Projects without proper planning fail 80% of the time. Our
            roadmap and consultation reduce that risk dramatically.&quot;
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // Track book call click with Universal Tracking
              UniversalTracking.trackBookCallClick("thank_you_page_cta_link");

              if (
                window.Calendly &&
                typeof window.Calendly.initPopupWidget === "function"
              ) {
                window.Calendly.initPopupWidget({
                  url: "https://calendly.com/4blocksdevs/30min",
                });
              } else {
                window.open(
                  "https://calendly.com/4blocksdevs/30min",
                  "_blank",
                  "noopener,noreferrer"
                );
              }
            }}
            className="inline-block bg-[#9ED95D] hover:bg-[#7fc84a] text-black font-semibold px-6 py-3 mb-4 text-base rounded-lg shadow transition-colors"
          >
            BOOK YOUR FREE STRATEGY CALL
          </a>
        </div>

        {/* Calendly Embed */}
        <div className="max-w-xl mx-auto">
          <Card className="p-0 shadow-xl border-0 bg-gradient-to-br from-[#f8fff0] to-[#e9f7e0] rounded-xl relative overflow-visible">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
              <span className="bg-[#9ED95D] text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md border border-[#b6e89a]">
                FREE CONSULTATION
              </span>
            </div>
            <CardContent className="p-0">
              <div className="bg-white/80 rounded-xl p-5 pt-8 text-center border border-[#e5e7eb]">
                <h3 className="text-lg font-extrabold text-black mb-2 tracking-tight flex items-center justify-center gap-1">
                  <Clock className="w-5 h-5 text-[#9ED95D] mr-1" />
                  30 Minute Meeting
                </h3>
                <div className="grid gap-4 items-center ">
                  <div className="text-left space-y-2">
                    {/* <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#9ED95D]" />
                      <span className="text-black font-semibold text-sm">30 min</span>
                    </div> */}
                    <div className="text-xs text-center text-black/80 leading-relaxed">
                      <p>
                        Book a personalized online product vision call with
                        Mirko, our CEO.
                      </p>
                      <p className="mt-1">
                        Available:{" "}
                        <span className="font-semibold">9:30–21:30 CET</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-full">
                    {/* Calendly Inline Widget - more sizeable and responsive */}
                    <iframe
                      src={calendlyUrl}
                      width="90%"
                      height="500"
                      frameBorder="0"
                      title="Book a 30 Minute Meeting with 4Blocks"
                      style={{
                        width: "100%",
                        minWidth: "320px",
                        maxWidth: "600px",
                        minHeight: "700px",
                        maxHeight: "90vh",
                        borderRadius: "0.75rem",
                        border: "1px solid #9ED95D",
                        boxShadow: "0 4px 24px 0 #b6e89a33",
                        resize: "both",
                        overflow: "auto",
                        background: "#fff",
                      }}
                      allow="camera; microphone; fullscreen; display-capture"
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* CTA Section */}
      <div className="bg-[#9ED95D] container mx-auto rounded-md max-w-xl p-6 m-8">
        <div className="text-center">
          <form onSubmit={handleDirectDownload} className="space-y-2">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="focus:outline-none text-base border-[#9ED95D] border"
              />
              <Button
                type="submit"
                className="bg-white text-black hover:bg-gray-100 font-semibold px-4 py-3 text-base"
              >
                <Download className="w-4 h-4 mr-1" />
                DOWNLOAD PDF
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
