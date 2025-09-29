"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  Download,
  Mail,
  Rocket,
  Users,
  Clock,
  Target,
  Wrench,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
      const link = document.createElement("a");
      link.href = "/mvp-roadmap.pdf";
      link.download = "MVP-Roadmap-4Blocks.pdf";
      link.click();
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
    }
  };

  const handleDirectDownload = (e: React.FormEvent) => {
    e.preventDefault();
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
    const link = document.createElement("a");
    link.href = "/mvp-roadmap.pdf";
    link.download = "MVP-Roadmap-4Blocks.pdf";
    link.click();
    setFormData(initialFormData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center">
          <div className="w-12 h-12  rounded-lg flex items-center justify-center">
            <Image src="/logo.svg" alt="4Blocks Logo" width={42} height={48} />
            {/* <span className="text-white font-bold text-sm">4</span> */}
          </div>
          <span className="ml-2 text-2xl font-bold text-black">BLOCKS</span>
        </div>
      </header>

      {/* Thank You Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Thank You!
            <br />
            Your{" "}
            <span className="text-[#9ED95D] font-semibold">MVP Roadmap</span> Is
            on Its Way 🚀
          </h1>
          <p className="text-black mb-8">
            Check your inbox,
            <br />
            your roadmap will arrive within a few minutes.
          </p>

          {/* Email Icon */}
          <div className="mb-8">
            <div className="w-16 h-16   flex items-center justify-center mx-auto mb-4">
              <Image src="/arrow.svg" alt="Arrow" width={100} height={100} />
            </div>
            <div className="w-24 h-24 relative flex items-center justify-center mx-auto mb-4">
              <Image src="/email.svg" alt="Email" width={100} height={100} />
              <div className="absolute bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <Image src="/check.svg" alt="Check" width={100} height={100} />
              </div>
            </div>
          </div>

          <Button className="bg-[#9ED95D] hover:bg-[#9ED95D] text-black font-bold px-8 py-8 mb-16">
            DOWNLOAD MVP ROADMAP
          </Button>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Turn Your <span className="text-[#9ED95D]">MVP</span> Roadmap
            <br />
            Into Reality With a Free Consultation
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto">
            Book a one-on-one strategy call with Mirko, our CEO,
            <br />
            gain practical insights to move your project forward.
          </p>
        </div>
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-black mb-4">
            Your Shortcut to a Winning{" "}
            <span className="text-[#9ED95D]">MVP</span>
            <br />
            Designed by 4Blocks Experts
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid max-w-5xl mx-auto grid-cols-1 gap-6 mb-12">
          <Card className="p-6 shadow-xl border-0 bg-white">
            <CardContent className="p-0">
              <div className="flex items-center py-2 space-x-4">
                <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                   <Image
                                        src="/tools.svg"
                                        alt="Roadmap"
                                        width={40}
                                        height={40}
                  
                                      />
                </div>
                <div>
                  <h3 className="font-bold text-black text-lg mb-2">
                    Free Mini-Audit of Your MVP Idea
                  </h3>
                  <p className="text-base text-black">
                    Get a quick audit of your MVP idea with recommendations to
                    improve success.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-xl border-0 bg-white">
            <CardContent className="p-0">
              <div className="flex items-center py-2 space-x-4">
                <div className="w-16 h-16 flex items-center justify-center flex-shrink-0 bg-white rounded-lg">
                  <Image
                    src="/clock.svg"
                    alt="Roadmap"
                    width={40}
                    height={40}

                  />
                </div>
                <div>
                  <h3 className="font-bold text-black text-lg mb-2">
                    Real Cost & Timeline Estimates
                  </h3>
                  <p className="text-base text-black">
                    Understand realistic costs, timelines, and development
                    phases, no surprises
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-xl border-0 bg-white">
            <CardContent className="p-0">
              <div className="flex items-center py-2 space-x-4">
                <div className="w-16 h-16 flex items-center justify-center flex-shrink-0 bg-white rounded-lg">
                  <Image
                    src="/rocket.svg"
                    alt="Rocket"
                    width={40}
                    height={40}

                  />
                </div>
                <div>
                  <h3 className="font-bold text-black text-lg mb-2">
                    Growth Strategy Blueprint
                  </h3>
                  <p className="text-base text-black">
                    We&apos;ll outline how to scale your MVP after launch
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-xl border-0 bg-white">
            <CardContent className="p-0">
              <div className="flex items-center py-2 space-x-4">
                <div className="w-16 h-16 flex items-center justify-center flex-shrink-0 bg-white rounded-lg">
                  <Image
                    src="/key.svg"
                    alt="Key"
                    width={40}
                    height={40}

                  />
                </div>
                <div>
                  <h3 className="font-bold text-black text-lg mb-2">
                    Exclusive Free Slots
                  </h3>
                  <p className="text-base text-black">
                    Only 10 free consultations available this month, secure
                    yours now.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-xl border-0 bg-white">
            <CardContent className="p-0">
              <div className="flex items-center py-2 space-x-4">
                <div className="w-16 h-16 flex items-center justify-center flex-shrink-0 bg-white rounded-lg">
                  <Image
                    src="/italia.svg"
                    alt="Italia"
                    width={40}
                    height={40}

                  />
                </div>
                <div>
                  <h3 className="font-bold text-black text-lg mb-2">
                    Built with Italian Precision
                  </h3>
                  <p className="text-base text-black">
                    Our team in Italy has delivered dozens of successful
                    software projects for startups & enterprises.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-8">
          <p className="text-lg font-bold text-black italic mb-8 max-w-3xl mx-auto">
            &quot;Projects without proper planning fail 80% of the time. Our
            roadmap and consultation reduce that risk dramatically.&quot;
          </p>
          <Button
            onClick={handleBookCall}
            className="bg-[#9ED95D] hover:bg-gray-300 text-black font-semibold px-8 py-8 mb-8"
          >
            BOOK YOUR FREE STRATEGY CALL
          </Button>
        </div>

        {/* Calendly Embed */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-0 shadow-2xl border-0 bg-gradient-to-br from-[#f8fff0] to-[#e9f7e0] rounded-2xl relative overflow-visible">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
              <span className="bg-[#9ED95D] text-black text-xs font-bold px-4 py-1 rounded-full shadow-md border border-[#b6e89a]">FREE CONSULTATION</span>
            </div>
            <CardContent className="p-0">
              <div className="bg-white/80 rounded-2xl p-10 pt-16 text-center border border-[#e5e7eb]">
                <h3 className="text-2xl font-extrabold text-black mb-4 tracking-tight flex items-center justify-center gap-2">
                  <Clock className="w-7 h-7 text-[#9ED95D] mr-2" />
                  30 Minute Meeting
                </h3>
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div className="text-left space-y-5">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-6 h-6 text-[#9ED95D]" />
                      <span className="text-black font-semibold text-lg">30 min</span>
                    </div>
                    <div className="text-base text-black/80 leading-relaxed">
                      <p>Book a personalized online product vision call with Mirko, our CEO.</p>
                      <p className="mt-1">Available: <span className="font-semibold">9:30–21:30 CET</span></p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    {/* Calendly Inline Widget */}
                    <iframe
                      src="https://calendly.com/your-calendly-username/30min"
                      width="100%"
                      height="420"
                      frameBorder="0"
                      title="Book a 30 Minute Meeting with 4Blocks"
                      style={{ minWidth: '320px', borderRadius: '1rem', border: '2px solid #9ED95D', boxShadow: '0 4px 32px 0 #b6e89a33' }}
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
      <div className="bg-[#9ED95D] container mx-auto rounded-xl max-w-2xl p-8 my-8">

        <div className="text-center">
          <form onSubmit={handleDirectDownload} className="space-y-4">
            <div className='flex items-center gap-4'>


              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="focus:outline-none  text-xl border-[#9ED95D] border"
              />


              <Button
                type='submit'
                className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-7 text-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                DOWNLOAD PDF
              </Button>
            </div>
          </form>
        </div>
        </div>
      
    </div>
  );
}
