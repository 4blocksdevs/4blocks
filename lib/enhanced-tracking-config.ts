// Enhanced Tracking Configuration with Lead Source Management
// Centralized configuration for complete funnel tracking

export const trackingConfig = {
  hubspot: {
    portalId:
      process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ||
      process.env.HUBSPOT_PORTAL_ID ||
      "146982667",
    form1Id:
      process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID ||
      process.env.HUBSPOT_FORM_ID ||
      "3a3fb4e1-de3c-40ad-a09e-d0cd988cebc3",
    form2Id:
      process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID_2 ||
      process.env.HUBSPOT_FORM_ID_2 ||
      "d2217c9d-3259-4524-a5a3-0ef6a7a3b2fe",
  },
  metaPixel: {
    pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "4277236155853060",
  },
  googleAnalytics: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-CC9W51TKC8",
  },
  googleTagManager: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-5N39QMDC",
  },
  isDevelopment:
    typeof window !== "undefined" && window.location.hostname === "localhost",
};

// Lead Source Definitions - Step 0
export const leadSources = {
  hero_form: "hero_form",
  cta_form: "cta_form",
  thankyou_download: "thankyou_download",
  checklist_download: "checklist_download",
} as const;

export type LeadSource = (typeof leadSources)[keyof typeof leadSources];

// Enhanced tracking events with lead sources
export const trackingEvents = {
  // Form 1 (Hero Section) - Step 1
  form1: {
    leadSource: leadSources.hero_form,
    metaPixel: {
      event: "Lead",
      parameters: {
        lead_source: leadSources.hero_form,
        content_name: "MVP Roadmap Primary Form",
        content_category: "Lead Generation",
      },
    },
    googleAnalytics: {
      event: "generate_lead",
      parameters: {
        event_category: "Form",
        event_label: "Form 1 Submission - Hero",
        lead_source: leadSources.hero_form,
      },
    },
  },

  // Form 2 (Lower CTA) - Step 1
  form2: {
    leadSource: leadSources.cta_form,
    metaPixel: {
      event: "Lead",
      parameters: {
        lead_source: leadSources.cta_form,
        content_name: "MVP Roadmap Secondary Form",
        content_category: "Lead Generation",
      },
    },
    googleAnalytics: {
      event: "generate_lead",
      parameters: {
        event_category: "Form",
        event_label: "Form 2 Submission - CTA",
        lead_source: leadSources.cta_form,
      },
    },
  },

  // Thank You Page Download Button - Step 2
  thankYouDownload: {
    leadSource: leadSources.thankyou_download,
    metaPixel: {
      // Using custom Meta event via fbq('trackCustom','DownloadPDF')
      event: "DownloadPDF",
      parameters: {
        lead_source: leadSources.thankyou_download,
        content_name: "MVP Roadmap PDF",
        content_type: "product",
        value: 0,
        currency: "USD",
      },
    },
    googleAnalytics: {
      event: "file_download",
      parameters: {
        event_category: "PDF",
        event_label: "Thank You Page Download",
        lead_source: leadSources.thankyou_download,
        file_name: "mvp-roadmap.pdf",
      },
    },
  },

  // Thank You Page Secondary Form - Step 2
  thankYouForm: {
    leadSource: leadSources.thankyou_download,
    metaPixel: {
      event: "Lead",
      parameters: {
        lead_source: leadSources.thankyou_download,
        content_name: "MVP Roadmap Thank You Form",
        content_category: "Secondary Lead Capture",
      },
    },
    googleAnalytics: {
      event: "generate_lead",
      parameters: {
        event_category: "Form",
        event_label: "Thank You Page Form",
        lead_source: leadSources.thankyou_download,
      },
    },
  },

  // Checklist Download from PDF - Step 3
  checklistFromPDF: {
    leadSource: leadSources.checklist_download,
    metaPixel: {
      // Custom checklist event; delivered via trackCustom('DownloadChecklist') if used directly
      event: "DownloadChecklist",
      parameters: {
        lead_source: leadSources.checklist_download,
        content_name: "MVP Checklist",
        content_category: "Bonus Content",
      },
    },
    googleAnalytics: {
      event: "file_download",
      parameters: {
        event_category: "Checklist",
        event_label: "Checklist from PDF Link",
        lead_source: leadSources.checklist_download,
        file_name: "mvp-checklist.pdf",
      },
    },
  },

  // Checklist Page Download - Step 4
  checklistPageDownload: {
    leadSource: leadSources.checklist_download,
    metaPixel: {
      event: "DownloadChecklist",
      parameters: {
        lead_source: leadSources.checklist_download,
        content_name: "MVP Checklist Direct",
        content_category: "Bonus Content",
      },
    },
    googleAnalytics: {
      event: "file_download",
      parameters: {
        event_category: "Checklist",
        event_label: "Checklist Page Download",
        lead_source: leadSources.checklist_download,
        file_name: "mvp-checklist.pdf",
      },
    },
  },
};

// HubSpot Property Mapping
export const hubspotProperties = {
  lead_source_detail: "lead_source_detail",
  utm_source: "utm_source",
  utm_medium: "utm_medium",
  utm_campaign: "utm_campaign",
  utm_content: "utm_content",
  utm_term: "utm_term",
  pdf_downloaded: "pdf_downloaded",
  checklist_downloaded: "checklist_downloaded",
  hs_analytics_source: "hs_analytics_source",
  hs_analytics_first_url: "hs_analytics_first_url",
};

export default trackingConfig;
