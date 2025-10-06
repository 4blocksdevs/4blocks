"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { initializeHubSpot, type LeadData } from "@/lib/hubspot";
import UTMTracker from "@/lib/utm-tracker";
import UniversalTracking from "@/lib/universal-tracking";
import { trackingConfig, leadSources } from "@/lib/enhanced-tracking-config";
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
      console.warn("Failed to load HubSpot form (v2), trying embed fallback:", error);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
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

      const success = await hubspot.submitLead(leadData);

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
      router.push("/thank-you");
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
              {isSubmitting ? "PROCESSING..." : "GET INSTANT ACCESS"}
            </Button>
          </div>
        </form>

        <p className="text-xs text-gray-500 mt-2 text-center">
          By submitting this form, you agree to receive marketing communications
          from 4Blocks.
        </p>
      </CardContent>
    </Card>
  );
}
