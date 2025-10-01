"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Download,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Script from "next/script";

declare global {
  interface Window {
    gtag: any;
    fbq: any;
  }
}

const initialFormData = { email: "" };

export default function ThankYouPage() {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    // Track thank you page view
    if (typeof window !== "undefined") {
      if (window.gtag) {
        window.gtag("event", "page_view", {
          page_title: "Thank You - MVP Roadmap",
          page_location: window.location.href,
        });
      }

      if (window.fbq) {
        window.fbq("track", "CompleteRegistration");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const checklistButton = document.getElementById("checklistDownloadButton");

    const checklistHandler = () => {
      if (window.fbq) {
        window.fbq("track", "ChecklistDownload");
      }
    };

    checklistButton?.addEventListener("click", checklistHandler);

    return () => {
      checklistButton?.removeEventListener("click", checklistHandler);
    };
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
        if (window.fbq) {
          window.fbq("track", "BookedCall");
        }
      }
    };

    window.addEventListener("message", calendlyScheduledHandler);

    return () => {
      window.removeEventListener("message", calendlyScheduledHandler);
    };
  }, []);

  const triggerPdfDownload = () => {
    const link = document.createElement("a");
    link.href = "/mvp-roadmap.pdf";
    link.download = "MVP-Roadmap-4Blocks.pdf";
    link.click();
  };

  const handleSecondaryDownload = async () => {
    // Track secondary download
    if (typeof window !== "undefined") {
      if (window.gtag) {
        window.gtag("event", "Download", {
          event_category: "engagement",
          event_label: "Secondary Download - Thank You Page",
          value: 1,
        });
      }

      if (window.fbq) {
        window.fbq("track", "Purchase", {
          content_name: "MVP Roadmap PDF Secondary",
          value: 0,
          currency: "USD",
        });
      }
    }

    // Send email with PDF
    try {
      const response = await fetch("/api/send-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("PDF sent successfully to your email!");
      } else {
        throw new Error("Failed to send PDF");
      }
    } catch (error) {
      console.error("Error sending PDF:", error);
      // Fallback to direct download
      triggerPdfDownload();
    }
  };

  const handleBookCall = () => {
    // Track Calendly booking intent
    if (typeof window !== "undefined") {
      if (window.gtag) {
        window.gtag("event", "Schedule", {
          event_category: "engagement",
          event_label: "Calendly Booking Clicked",
          value: 1,
        });
      }

      if (window.fbq) {
        window.fbq("track", "Schedule");
      }

      window.open("https://calendly.com/4blocksdevs/30min", "_blank", "noopener,noreferrer");
    }
  };

  const handleDirectDownload = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Track download event
    if (typeof window !== "undefined") {
      if (window.gtag) {
        window.gtag("event", "Download", {
          event_category: "engagement",
          event_label: "Direct MVP Roadmap Download",
          value: 1,
        });
      }
      if (window.fbq) {
        window.fbq("track", "Purchase", {
          content_name: "MVP Roadmap PDF",
          content_type: "product",
          value: 0,
          currency: "USD",
        });
      }
    }
    // Trigger PDF download
    triggerPdfDownload();
    setFormData(initialFormData);
  };

  const handleChecklistDownload = () => {
    triggerPdfDownload();
  };

  return (
    <div className="min-h-screen bg-white">
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
            <span className="text-[#9ED95D] font-semibold">MVP Roadmap</span> Is
            on Its Way 🚀
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
            id="checklistDownloadButton"
            type="button"
            onClick={handleChecklistDownload}
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
            Turn Your <span className="text-[#9ED95D]">MVP</span> Roadmap
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
                  <Image
                    src="/key.svg"
                    alt="Key"
                    width={20}
                    height={20}
                  />
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
          <Button
            onClick={handleBookCall}
            className="bg-[#9ED95D] hover:bg-gray-300 text-black font-semibold px-4 py-4 mb-4 text-base"
          >
            BOOK YOUR FREE STRATEGY CALL
          </Button>
        </div>

        {/* Calendly Embed */}
        <div className="max-w-xl mx-auto">
          <Card className="p-0 shadow-xl border-0 bg-gradient-to-br from-[#f8fff0] to-[#e9f7e0] rounded-xl relative overflow-visible">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
              <span className="bg-[#9ED95D] text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md border border-[#b6e89a]">FREE CONSULTATION</span>
            </div>
            <CardContent className="p-0">
              <div className="bg-white/80 rounded-xl p-5 pt-8 text-center border border-[#e5e7eb]">
                <h3 className="text-lg font-extrabold text-black mb-2 tracking-tight flex items-center justify-center gap-1">
                  <Clock className="w-5 h-5 text-[#9ED95D] mr-1" />
                  30 Minute Meeting
                </h3>
                <div className="grid md:grid-cols-2 gap-4 items-center">
                  <div className="text-left space-y-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#9ED95D]" />
                      <span className="text-black font-semibold text-sm">30 min</span>
                    </div>
                    <div className="text-xs text-black/80 leading-relaxed">
                      <p>Book a personalized online product vision call with Mirko, our CEO.</p>
                      <p className="mt-1">Available: <span className="font-semibold">9:30–21:30 CET</span></p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    {/* Calendly Inline Widget */}
                    <iframe
                      src="https://calendly.com/4blocksdevs/30min"
                      width="100%"
                      height="310"
                      frameBorder="0"
                      title="Book a 30 Minute Meeting with 4Blocks"
                      style={{ minWidth: '160px', borderRadius: '0.5rem', border: '1px solid #9ED95D', boxShadow: '0 2px 16px 0 #b6e89a33' }}
                      allow="camera; microphone; fullscreen; display-capture"
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
            <div className='flex flex-col md:flex-row items-center gap-2'>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="focus:outline-none text-base border-[#9ED95D] border"
              />
              <Button
                type='submit'
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
