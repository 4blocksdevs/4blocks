"use client";

import React, { useState, useRef, useEffect } from "react";
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidEmail, sanitizeEmail } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { initializeHubSpot, type LeadData } from "@/lib/hubspot";
import UTMTracker from "@/lib/utm-tracker";
import UniversalTracking from "@/lib/universal-tracking";
import { trackingConfig, leadSources } from "@/lib/enhanced-tracking-config";
import { subscribeToBrevo } from "@/lib/brevo-client";
import { useRouter } from "next/navigation";

interface Form1Props {
  className?: string;
  onSubmissionSuccess?: () => void;
}

export default function Form1({
  className = "",
  onSubmissionSuccess,
}: Form1Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useHubSpotEmbed, setUseHubSpotEmbed] = useState(false);
  const hubspotContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Initialize UTM tracking
    UTMTracker.initialize();

    // Try to load HubSpot embed form
    if (
      trackingConfig.hubspot.portalId !== "YOUR_PORTAL_ID" &&
      trackingConfig.hubspot.form1Id !== "FORM_1_ID"
    ) {
      loadHubSpotForm();
    }
  }, []);

  const loadHubSpotForm = async () => {
    try {
      if (hubspotContainerRef.current) {
        const hubspot = initializeHubSpot(
          trackingConfig.hubspot.portalId,
          trackingConfig.hubspot.form1Id,
          trackingConfig.hubspot.form2Id
        );

        await hubspot.createForm1("hubspot-form-1");
        setUseHubSpotEmbed(true);
      }
    } catch (error) {
      console.warn(
        "Failed to load HubSpot form (v2), trying embed fallback:",
        error
      );
      setUseHubSpotEmbed(false);

      // Fallback: use HubSpot embed snippet (region eu1 by default)
      try {
        const portalId = trackingConfig.hubspot.portalId;
        const formId = trackingConfig.hubspot.form1Id;
        const region = "eu1";

        if (hubspotContainerRef.current) {
          // Insert the required div for the embed
          hubspotContainerRef.current.innerHTML = `
            <div class="hs-form-frame" data-region="${region}" data-form-id="${formId}" data-portal-id="${portalId}"></div>
          `;

          // Avoid loading the same embed script multiple times
          const existing = document.querySelector(
            `script[src*="hsforms.net/forms/embed/${portalId}.js"]`
          );

          if (!existing) {
            const script = document.createElement("script");
            script.src = `https://js-${region}.hsforms.net/forms/embed/${portalId}.js`;
            script.defer = true;
            script.onload = () => {
              console.log("HubSpot embed script loaded (fallback)");
              setUseHubSpotEmbed(true);
            };
            script.onerror = (e) => {
              console.warn("HubSpot embed script failed to load", e);
            };
            document.body.appendChild(script);
          } else {
            // If script already present, mark as embedded
            setUseHubSpotEmbed(true);
          }
        }
      } catch (embedError) {
        console.warn("HubSpot embed fallback also failed:", embedError);
        setUseHubSpotEmbed(false);
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate email
      const sanitizedEmail = sanitizeEmail(formData.email);
      if (!isValidEmail(sanitizedEmail)) {
        alert("Please enter a valid email address");
        setIsSubmitting(false);
        return;
      }
      // Get attribution data
      const attribution = UTMTracker.getAttributionForHubSpot();
      const utm = UTMTracker.getAttribution() || {};
      const utmGA = UTMTracker.getAttributionForGA() || {};

      // Prepare lead data with hidden fields
      const leadData: LeadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        form_type: "Form 1",
        // Hidden fields as per funnel plan
        lead_source: leadSources.hero_form,
        ...attribution,
      };

      // Track form submission events with Universal Tracking
      UniversalTracking.trackFormSubmission(
        "Form 1",
        leadSources.hero_form,
        leadData
      );

      // Google Analytics event with standard UTM fields
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "lead", {
          event_category: "engagement",
          event_label: "MVP Roadmap Download",
          value: 1,
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
          utm_content: utm.utm_content,
          utm_term: utm.utm_term,
          ...utmGA,
        });
      }

      // Submit to HubSpot
      const hubspot = initializeHubSpot(
        trackingConfig.hubspot.portalId,
        trackingConfig.hubspot.form1Id,
        trackingConfig.hubspot.form2Id
      );

      const [hubspotOk, brevoOk] = await Promise.all([
        hubspot.submitLead(leadData),
        subscribeToBrevo({
          email: formData.email,
          firstName: formData.name,
          company: formData.company || undefined,
          lead_source: leadSources.hero_form,
          tags: ["mvp_roadmap"],
        }),
      ]);

      const success = hubspotOk; // maintain existing redirect logic tied to HubSpot

      if (success) {
        // Track successful conversion
        UTMTracker.trackCampaignEvent("form_1_conversion", {
          email: formData.email,
          has_phone: !!formData.phone,
          has_company: !!formData.company,
        });

        // Call success callback
        onSubmissionSuccess?.();

        // Redirect to thank you page
        router.push("/thank-you");
      } else {
        throw new Error("HubSpot submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);

      // Even on error, redirect to thank you page for better UX
      router.push("/thank-you?type=roadmap");
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackFormSubmission = () => {
    // This function is now replaced by UniversalTracking.trackFormSubmission
    // Keeping for backward compatibility, but it's called above
  };

  // If HubSpot embed is working, show the embedded form
  if (useHubSpotEmbed) {
    return (
      <Card
        className={`p-4 mx-2 shadow-lg border bg-white border-[#9ED95D] ${className}`}
      >
        <CardContent className="p-0">
          <div className="mt-4">
            <div id="hubspot-form-1" ref={hubspotContainerRef} />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Fallback custom form
  return (
    <Card
      className={`p-4 mx-2 shadow-lg border bg-white border-[#9ED95D] ${className}`}
    >
      <CardContent className="p-0">
        <div className="mb-6 text-center">
          <h3 className="text-xl font-bold text-black mb-2">
            Get Your MVP Roadmap + €500 Strategy Session
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            Includes free technical consultation and cost estimation
          </p>
          <div className="flex justify-center items-center space-x-2 mb-2">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium">
              4.9/5 from 200+ Entrepreneurs
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-600">
            <span className="bg-gray-100 px-2 py-1 rounded-full">
              ✓ 100% Money-Back Guarantee
            </span>
            <span className="bg-gray-100 px-2 py-1 rounded-full">
              ✓ Trusted by 50+ Startups
            </span>
            <span className="bg-gray-100 px-2 py-1 rounded-full">
              ✓ Limited Time Offer
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mt-4">
            <Input
              id="name"
              type="text"
              placeholder="Full Name *"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="mt-1 focus:outline-none text-base border-[#9ED95D] border"
            />
          </div>

          <div className="mt-4">
            <Input
              id="email"
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="mt-1 focus:outline-none text-base border-[#9ED95D] border"
            />
          </div>

          <div className="mt-4">
            <Input
              id="phone"
              type="tel"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="mt-1 focus:outline-none text-base border-[#9ED95D] border"
            />
          </div>

          <div className="mt-4">
            <Input
              id="company"
              type="text"
              placeholder="Company Name (Optional)"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="mt-1 focus:outline-none text-base border-[#9ED95D] border"
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 bg-[#9ED95D] hover:bg-[#8BC34A] text-black font-semibold py-2 px-4 text-base transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              {isSubmitting
                ? "PROCESSING..."
                : "GET INSTANT ACCESS (Worth €500)"}
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-4 h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-gray-600">
                Instant Access to MVP Roadmap Template
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-4 h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-gray-600">
                Free €500 Strategy Session
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-4 h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-gray-600">
                Technical Consultation & Cost Estimation
              </p>
            </div>
          </div>

          <div className="mt-4 border-t pt-4">
            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to receive marketing
              communications from 4Blocks.
            </p>
            <p className="text-xs text-green-600 font-medium text-center mt-2">
              🔒 Your information is 100% secure and will never be shared
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
