"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import UTMTracker from "@/lib/utm-tracker";
import { trackingEvents, leadSources } from "@/lib/enhanced-tracking-config";
import { initializeHubSpot, type LeadData } from "@/lib/hubspot";

interface ThankYouFormProps {
  className?: string;
  onSubmissionSuccess?: () => void;
}

export default function ThankYouForm({
  className = "",
  onSubmissionSuccess,
}: ThankYouFormProps) {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Get attribution data
      const attribution = UTMTracker.getAttributionForHubSpot();

      // Prepare lead data with thankyou_download source
      const leadData: LeadData = {
        name: "Thank You Page User", // Minimal data since this is secondary
        email: formData.email,
        form_type: "Form 2", // Reuse Form 2 type
        // Hidden fields as per funnel plan
        lead_source: leadSources.thankyou_download,
        ...attribution,
      };

      // Track form submission events
      trackFormSubmission();

      // Submit to HubSpot
      const hubspot = initializeHubSpot(
        "YOUR_PORTAL_ID", // Will be replaced with actual config
        "FORM_1_ID",
        "FORM_2_ID"
      );

      const success = await hubspot.submitLead(leadData);

      if (success) {
        // Track successful conversion
        UTMTracker.trackCampaignEvent("thankyou_form_conversion", {
          email: formData.email,
          source: "thank_you_page",
        });

        // Trigger PDF download
        triggerPDFDownload();

        // Mark PDF as downloaded in HubSpot
        updateHubSpotProperty("pdf_downloaded", "Yes");

        // Call success callback
        onSubmissionSuccess?.();
      } else {
        throw new Error("HubSpot submission failed");
      }
    } catch (error) {
      console.error("Thank you form submission error:", error);

      // Even on error, trigger download for better UX
      triggerPDFDownload();
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackFormSubmission = () => {
    const attribution = UTMTracker.getAttributionForMetaPixel();
    const gaAttribution = UTMTracker.getAttributionForGA();

    // Meta Pixel tracking with thankyou_download lead_source
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", trackingEvents.thankYouForm.metaPixel.event, {
        ...trackingEvents.thankYouForm.metaPixel.parameters,
        ...attribution,
        // Include UTM parameters as per plan
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
        utm_content: attribution.utm_content,
      });
    }

    // Google Analytics tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", trackingEvents.thankYouForm.googleAnalytics.event, {
        ...trackingEvents.thankYouForm.googleAnalytics.parameters,
        ...gaAttribution,
      });
    }
  };

  const triggerPDFDownload = () => {
    // Track download event with thankyou_download source
    const attribution = UTMTracker.getAttributionForMetaPixel();
    const gaAttribution = UTMTracker.getAttributionForGA();

    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", trackingEvents.thankYouDownload.metaPixel.event, {
        ...trackingEvents.thankYouDownload.metaPixel.parameters,
        ...attribution,
      });
    }

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag(
        "event",
        trackingEvents.thankYouDownload.googleAnalytics.event,
        {
          ...trackingEvents.thankYouDownload.googleAnalytics.parameters,
          ...gaAttribution,
        }
      );
    }

    // Create and trigger download
    const link = document.createElement("a");
    link.href = "/mvp-roadmap.pdf";
    link.download = "MVP-Roadmap-4Blocks.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateHubSpotProperty = async (property: string, value: string) => {
    // This would update HubSpot contact properties
    // Implementation depends on HubSpot API setup
    console.log(`Updating HubSpot property ${property} to ${value}`);
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Input
            id="email-thankyou"
            type="email"
            placeholder="Confirm your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="focus:outline-none text-base border-[#9ED95D] border"
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-black hover:bg-gray-100 font-semibold px-4 py-3 text-base whitespace-nowrap"
          >
            <Download className="w-4 h-4 mr-1" />
            {isSubmitting ? "SENDING..." : "DOWNLOAD PDF"}
          </Button>
        </div>
      </form>

      <p className="text-xs text-gray-500 mt-2 text-center">
        Confirm your email to receive the PDF • No spam • Unsubscribe anytime
      </p>
    </div>
  );
}
