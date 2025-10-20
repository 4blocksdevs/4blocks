// Tracking Configuration
// Centralized configuration for all tracking services
// Update these values with your actual tracking IDs

export const trackingConfig = {
  hubspot: {
    portalId: "146982667", // Replace with your HubSpot Portal ID
    form1Id: "3a3fb4e1-de3c-40ad-a09e-d0cd988cebc3", // Replace with your Form 1 ID
    form2Id: "3a3fb4e1-de3c-40ad-a09e-d0cd988cebc3", // Replace with your Form 2 ID
  },
  metaPixel: {
    pixelId: "4277236155853060", // Replace with your Meta Pixel ID
  },
  googleAnalytics: {
    measurementId: "G-CC9W51TKC8", // Google Analytics 4 Measurement ID
  },
  googleTagManager: {
    gtmId: "GTM-XXXXXX", // Replace with your GTM Container ID
  },
  isDevelopment:
    typeof window !== "undefined" && window.location.hostname === "localhost",
};

// Form submission tracking events
export const trackingEvents = {
  form1: {
    metaPixel: {
      event: "Lead",
      parameters: {
        form_type: "Form 1",
        content_name: "MVP Roadmap Primary Form",
        content_category: "Lead Generation",
      },
    },
    googleAnalytics: {
      event: "generate_lead",
      parameters: {
        event_category: "Form",
        event_label: "Form 1 Submission",
        form_type: "primary",
      },
    },
  },
  form2: {
    metaPixel: {
      event: "Lead",
      parameters: {
        form_type: "Form 2",
        content_name: "MVP Roadmap Secondary Form",
        content_category: "Lead Generation",
      },
    },
    googleAnalytics: {
      event: "generate_lead",
      parameters: {
        event_category: "Form",
        event_label: "Form 2 Submission",
        form_type: "secondary",
      },
    },
  },
  pdfDownload: {
    metaPixel: {
      event: "DownloadPDF",
      parameters: {
        content_name: "MVP Roadmap PDF",
        content_type: "product",
        pdf_type: "roadmap",
      },
    },
    googleAnalytics: {
      event: "file_download",
      parameters: {
        event_category: "PDF",
        event_label: "MVP Roadmap Download",
        file_name: "mvp-roadmap.pdf",
      },
    },
  },
};

export default trackingConfig;
