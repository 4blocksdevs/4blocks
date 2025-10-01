"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { initializeHubSpot, type LeadData } from "@/lib/hubspot";
import UTMTracker from "@/lib/utm-tracker";
import {
  trackingConfig,
  trackingEvents,
  leadSources,
  hubspotProperties,
} from "@/lib/enhanced-tracking-config";
import { Download } from "lucide-react";

interface Form2Props {
  className?: string;
  onSubmissionSuccess?: () => void;
  showDownloadButton?: boolean;
}

export default function Form2({
  className = "",
  onSubmissionSuccess,
  showDownloadButton = true,
}: Form2Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useHubSpotEmbed, setUseHubSpotEmbed] = useState(false);
  const hubspotContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize UTM tracking
    UTMTracker.initialize();

    // Try to load HubSpot embed form
    if (
      trackingConfig.hubspot.portalId !== "YOUR_PORTAL_ID" &&
      trackingConfig.hubspot.form2Id !== "FORM_2_ID"
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

        await hubspot.createForm2("hubspot-form-2");
        setUseHubSpotEmbed(true);
      }
    } catch (error) {
      console.warn("Failed to load HubSpot form, using fallback:", error);
      setUseHubSpotEmbed(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Get attribution data
      const attribution = UTMTracker.getAttributionForHubSpot();

      // Prepare lead data with hidden fields
      const leadData: LeadData = {
        name: formData.name,
        email: formData.email,
        form_type: "Form 2",
        // Hidden fields as per funnel plan
        lead_source: leadSources.cta_form,
        ...attribution,
      };

      // Track form submission events
      trackFormSubmission();

      // Submit to HubSpot
      const hubspot = initializeHubSpot(
        trackingConfig.hubspot.portalId,
        trackingConfig.hubspot.form1Id,
        trackingConfig.hubspot.form2Id
      );

      const success = await hubspot.submitLead(leadData);

      if (success) {
        // Track successful conversion
        UTMTracker.trackCampaignEvent("form_2_conversion", {
          email: formData.email,
        });

        // Trigger PDF download
        triggerPDFDownload();

        // Call success callback
        onSubmissionSuccess?.();
      } else {
        throw new Error("HubSpot submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);

      // Even on error, trigger download for better UX
      triggerPDFDownload();
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackFormSubmission = () => {
    const attribution = UTMTracker.getAttributionForMetaPixel();
    const gaAttribution = UTMTracker.getAttributionForGA();

    // Meta Pixel tracking with lead_source
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", trackingEvents.form2.metaPixel.event, {
        ...trackingEvents.form2.metaPixel.parameters,
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
      window.gtag("event", trackingEvents.form2.googleAnalytics.event, {
        ...trackingEvents.form2.googleAnalytics.parameters,
        ...gaAttribution,
      });
    }
  };

  const triggerPDFDownload = () => {
    // Track download event
    const attribution = UTMTracker.getAttributionForMetaPixel();
    const gaAttribution = UTMTracker.getAttributionForGA();

    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "DownloadPDF", {
        lead_source: leadSources.cta_form,
        content_name: "MVP Roadmap PDF",
        content_type: "product",
        value: 0,
        currency: "USD",
        ...attribution,
      });
    }

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "file_download", {
        event_category: "PDF",
        event_label: "Form 2 PDF Download",
        file_name: "mvp-roadmap.pdf",
        lead_source: leadSources.cta_form,
        ...gaAttribution,
      });
    }

    // Create and trigger download
    const link = document.createElement("a");
    link.href = "/mvp-roadmap.pdf";
    link.download = "MVP-Roadmap-4Blocks.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If HubSpot embed is working, show the embedded form
  if (useHubSpotEmbed) {
    return (
      <div className={className}>
        <div id="hubspot-form-2" ref={hubspotContainerRef} />
      </div>
    );
  }

  // Fallback custom form
  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Input
            id="email-form2"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="focus:outline-none text-base border-[#9ED95D] border"
          />

          <Input
            id="name-form2"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="focus:outline-none text-base border-[#9ED95D] border md:max-w-[200px]"
          />

          {showDownloadButton && (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black hover:bg-gray-100 font-semibold px-4 py-3 text-base whitespace-nowrap"
            >
              <Download className="w-4 h-4 mr-1" />
              {isSubmitting ? "SENDING..." : "DOWNLOAD PDF"}
            </Button>
          )}
        </div>

        {!showDownloadButton && (
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#9ED95D] hover:bg-[#9ED95D] text-black font-semibold px-6 py-2 text-base"
            >
              {isSubmitting ? "SUBMITTING..." : "GET ACCESS"}
            </Button>
          </div>
        )}
      </form>

      <p className="text-xs text-gray-500 mt-2 text-center">
        Free download • No spam • Unsubscribe anytime
      </p>
    </div>
  );
}
