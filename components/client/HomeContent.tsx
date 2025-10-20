"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Download, Rocket, Users, Clock, Target } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CookieBanner from "@/components/CookieBanner";
import Form1 from "@/components/Form1";
// import Form2 from "@/components/Form2"; // Temporarily removed
import UTMTracker from "@/lib/utm-tracker";
import UniversalTracking from "@/lib/universal-tracking";
import { trackingEvents } from "@/lib/tracking-config";
import trackAndDownloadPDF from "@/lib/download-tracking";

declare global {
  interface Window {
    gtag: any;
    fbq: any;
    dataLayer: any;
  }
}

export default function HomeContent() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initialize UTM tracking
    UTMTracker.initialize();

    // Track page view
    if (typeof window !== "undefined") {
      // Google Analytics
      if (window.gtag) {
        window.gtag("config", "G-CC9W51TKC8", {
          page_title: "MVP Roadmap Landing Page",
          page_location: window.location.href,
          ...UTMTracker.getAttributionForGA(),
        });
      }

      // Meta Pixel
      if (window.fbq) {
        window.fbq(
          "track",
          "PageView",
          UTMTracker.getAttributionForMetaPixel()
        );
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mainForm = document.getElementById(
      "mainForm"
    ) as HTMLFormElement | null;
    const bottomForm = document.getElementById(
      "bottomForm"
    ) as HTMLFormElement | null;
    const pdfButton = document.getElementById("pdfDownloadButton");

    const leadHandler = () => {
      if (window.fbq) {
        window.fbq("track", "Lead");
      }
    };

    const downloadHandler = () => {
      trackAndDownloadPDF({
        filePath: "/mvp-roadmap.pdf",
        fileName: "MVP-Roadmap-4Blocks.pdf",
        leadSource: "main_page_bottom_form",
        downloadType: "mvp_roadmap",
        autoClick: false,
      });
    };

    const pdfDownloadHandler = () => {
      trackAndDownloadPDF({
        filePath: "/mvp-roadmap.pdf",
        fileName: "MVP-Roadmap-4Blocks.pdf",
        leadSource: "main_page_pdf_button",
        downloadType: "mvp_roadmap",
        autoClick: false,
      });
    };

    mainForm?.addEventListener("submit", leadHandler);
    bottomForm?.addEventListener("submit", downloadHandler);
    pdfButton?.addEventListener("click", pdfDownloadHandler);

    return () => {
      mainForm?.removeEventListener("submit", leadHandler);
      bottomForm?.removeEventListener("submit", downloadHandler);
      pdfButton?.removeEventListener("click", pdfDownloadHandler);
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Track lead event
      if (typeof window !== "undefined") {
        // Store email for attribution/tracking
        if (formData.email) {
          window.localStorage.setItem("lead_email", formData.email);
        }
        if (window.gtag) {
          window.gtag("event", "Lead", {
            event_category: "engagement",
            event_label: "MVP Roadmap Download",
            value: 1,
          });
        }

        if (window.fbq) {
          window.fbq("track", "Lead", {
            content_name: "MVP Roadmap PDF",
            content_category: "Lead Magnet",
          });
        }
      }

      // Debug logging
      console.log("Submitting form with data:", formData);
      console.log(
        "HubSpot Portal ID:",
        process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID
      );
      console.log("HubSpot Form ID:", process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID);

      const hubspotUrl = `https://forms.hubspot.com/uploads/form/v2/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}/${process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID}`;
      console.log("HubSpot URL:", hubspotUrl);

      const formBody = new URLSearchParams({
        email: formData.email,
        name: formData.name,
      });
      console.log("Form body:", formBody.toString());

      const response = await fetch(hubspotUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (response.ok) {
        console.log("Form submitted successfully");
        // Trigger Brevo workflow API
        try {
          await fetch("/api/addContactToWorkflow", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              firstName: formData.name,
              lastName: "", // Add if you collect last name
              workflowId: process.env.NEXT_PUBLIC_BREVO_WORKFLOW_ID || "2",
            }),
          });
        } catch (err) {
          console.warn("Brevo workflow trigger failed", err);
        }
        // Redirect to thank you page
        router.push("/thank-you?type=roadmap");
      } else {
        const errorText = await response.text();
        console.error("HubSpot response error:", errorText);
        throw new Error(
          `Form submission failed: ${response.status} - ${errorText}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show user-friendly error message
      alert(
        "There was an error submitting your information. You'll be redirected to the thank you page anyway."
      );
      // Still redirect to thank you page for better UX
      router.push("/thank-you?type=roadmap");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectDownload = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackAndDownloadPDF({
      filePath: "/mvp-roadmap.pdf",
      fileName: "MVP-Roadmap-4Blocks.pdf",
      leadSource: "main_page_direct_download",
      downloadType: "mvp_roadmap",
      autoClick: true,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <CookieBanner />

      {/* Hero Section */}
      <section className="container max-w-3xl mx-auto px-4 py-6 lg:py-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl lg:text-4xl font-bold text-black leading-tight">
            Download your free <span className="text-[#9ED95D]">MVP</span>
            <br />
            roadmap PDF
          </h1>
          <p className="text-base text-black leading-relaxed">
            The proven 7 step guide to launch a successful MVP
            <br />
            without wasting time and money
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 items-center mt-4">
          <div>
            {/* Primary Lead Form */}
            <Form1
              onSubmissionSuccess={() => {
                // Track successful form submission
                console.log("Form 1 submitted successfully");
              }}
            />
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <Image
                src="/roadmap.svg"
                alt="Roadmap"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white max-w-4xl container mx-auto py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-xl lg:text-2xl space-y-1 font-bold text-black mb-2">
              Your Shortcut to a Winning{" "}
              <span className="text-[#9ED95D]">MVP</span>
              <br />
              Designed by 4Blocks Experts
            </h2>
          </div>

          <div className="grid gap-4 mb-8">
            <Card className="p-4 shadow-2xl border-0 bg-white rounded-sm">
              <CardContent className="p-0">
                <div className="flex items-center py-2 space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/checkmark.svg"
                      alt="Roadmap"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg text-black mb-1">
                      Learn the exact 7 steps to a successful MVP launch
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-4 shadow-xl border-0 bg-white rounded-sm">
              <CardContent className="p-0">
                <div className="flex items-center py-2 space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/checkmark.svg"
                      alt="Roadmap"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg text-black mb-1">
                      Avoid the costliest founder mistakes (validated by
                      real-world projects)
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-4 shadow-xl border-0 bg-white rounded-sm">
              <CardContent className="p-0">
                <div className="flex items-center py-2 space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/checkmark.svg"
                      alt="Roadmap"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg text-black mb-1">
                      Discover how top startups test, iterate, and scale fast
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center my-12">
            <p className="text-base font-bold text-black italic mb-4 max-w-2xl mx-auto">
              &quot;Created by 4Blocks — the product studio behind dozens of
              successful SaaS, AI, and blockchain MVPs.&quot;
            </p>
          </div>

          <div className="grid md:grid-cols-3 max-w-4xl container mx-auto gap-8">
            <Card className="p-4 border border-[#e4ffc8] bg-white shadow-lg">
              <CardContent className="text-center p-0">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Image src="/task.svg" alt="Roadmap" width={40} height={40} />
                </div>
                <h3 className="font-bold text-black mb-1 text-base">
                  Clear Step-by-Step Guidance
                </h3>
                <p className="text-black text-sm">
                  Follow a proven roadmap from idea to launch with step-by-step
                  clarity.
                </p>
              </CardContent>
            </Card>

            <Card className="p-4 border border-[#e4ffc8] bg-white shadow-lg">
              <CardContent className="text-center p-0">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Image
                    src="/lightning.svg"
                    alt="Roadmap"
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className="font-bold text-black mb-1 text-base">
                  Actionable & Practical
                </h3>
                <p className="text-black text-sm">
                  Download and start applying actionable steps immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="p-4 border border-[#e4ffc8] bg-white shadow-lg">
              <CardContent className="text-center p-0">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Image
                    src="/fast-time.svg"
                    alt="Roadmap"
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className="font-bold text-black mb-1 text-base">
                  Time-Saving Insights
                </h3>
                <p className="text-black text-sm">
                  Skip months of trial-and-error with a roadmap that works.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section - Form2 temporarily removed
          <div className="bg-[#9ED95D] container mx-auto rounded-md max-w-xl p-6 m-8">
            <div className="text-center">
              <Form2
                className=""
                onSubmissionSuccess={() => {
                  console.log(
                    "Form 2 submitted successfully - PDF download triggered"
                  );
                }}
                showDownloadButton={true}
              />
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}
