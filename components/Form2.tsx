// TEMPORARILY COMMENTED OUT - Can be restored if needed
/*
"use client";

import React, { useState, useRef, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { isValidEmail, sanitizeEmail } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { initializeHubSpot, type LeadData } from "@/lib/hubspot";
import UTMTracker from "@/lib/utm-tracker";
import UniversalTracking from "@/lib/universal-tracking";
import trackAndDownloadPDF from "@/lib/download-tracking";
import { trackingConfig, leadSources } from "@/lib/enhanced-tracking-config";
import { subscribeToBrevo } from "@/lib/brevo-client";
import { Download } from "lucide-react";*/

/*interface Form2Props {
  className?: string;
  onSubmissionSuccess?: () => void;
  showDownloadButton?: boolean;
}*/

// Temporarily commented out - can be restored if needed
export default function Form2() {
  return null; // Return null while component is disabled
  /*
  Original component implementation below:
  ({
  className = "",
  onSubmissionSuccess,
  showDownloadButton = true,
}: Form2Props) => {*/
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
      trackingConfig.hubspot.portalId !== "146982667" &&
      trackingConfig.hubspot.form2Id !==
        "3a3fb4e1-de3c-40ad-a09e-d0cd988cebc3" &&
      hubspotContainerRef.current
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
        // Submit to the same HubSpot form as the hero (use Form 1 submission)
        form_type: "Form 1",
        // Hidden fields as per funnel plan
        lead_source: leadSources.cta_form,
        ...attribution,
      };

      // Track form submission events with Universal Tracking
      UniversalTracking.trackFormSubmission(
        "Form 2",
        leadSources.cta_form,
        leadData
      );

      // Google Analytics event with standard UTM fields
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "lead", {
          event_category: "engagement",
          event_label: "MVP Roadmap Download CTA",
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
          lead_source: leadSources.cta_form,
          tags: ["mvp_roadmap"],
        }),
      ]);

      const success = hubspotOk;

      if (success) {
        // Track successful conversion
        UTMTracker.trackCampaignEvent("form_2_conversion", {
          email: formData.email,
        });

        // Call success callback
        onSubmissionSuccess?.();

        // Redirect to thank you page (do not download PDF here)
        if (typeof window !== "undefined") {
          window.location.href = "/thank-you?type=roadmap";
        }
      } else {
        throw new Error("HubSpot submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);

      // On error, still redirect to thank-you for consistent UX
      if (typeof window !== "undefined") {
        window.location.href = "/thank-you?type=roadmap";
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackFormSubmission = () => {
    // This function is now replaced by UniversalTracking.trackFormSubmission
    // Keeping for backward compatibility, but it's called above
  };

  const triggerPDFDownload = () => {
    trackAndDownloadPDF({
      filePath: "/mvp-roadmap.pdf",
      fileName: "MVP-Roadmap-4Blocks.pdf",
      leadSource: leadSources.cta_form,
      downloadType: "mvp_roadmap",
      autoClick: true,
    });
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
  // Temporarily commented out - can be restored if needed
  return null;
  /*
  Original JSX implementation:
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
              className="bg-white text-black hover:bg-gray-50 font-semibold px-4 py-3 text-base whitespace-nowrap transition-all duration-200 hover:shadow-lg hover:scale-105 border border-gray-200 hover:border-[#9ED95D]"
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
  */
}
