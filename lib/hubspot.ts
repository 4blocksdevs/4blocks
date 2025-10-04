// HubSpot Integration Utility
// This file handles HubSpot form creation, tracking, and lead submission

export interface HubSpotFormConfig {
  portalId: string;
  formId: string;
  target: string;
  onFormReady?: (form: any) => void;
  onFormSubmit?: (form: any) => void;
  onFormSubmitted?: (form: any) => void;
}

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  form_type: "Form 1" | "Form 2";
  lead_source?: string;
}

declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (config: HubSpotFormConfig) => void;
      };
    };
    fbq: any;
    gtag: any;
  }
}

class HubSpotTracker {
  private portalId: string;
  private form1Id: string;
  private form2Id: string;

  constructor(portalId: string, form1Id: string, form2Id: string) {
    this.portalId = portalId;
    this.form1Id = form1Id;
    this.form2Id = form2Id;
  }

  // Load HubSpot script if not already loaded
  private loadHubSpotScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.hbspt) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "//js.hsforms.net/forms/v2.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load HubSpot script"));
      document.head.appendChild(script);
    });
  }

  // Create Form 1 (Primary Lead Form)
  async createForm1(targetElementId: string): Promise<void> {
    await this.loadHubSpotScript();

    window.hbspt.forms.create({
      portalId: this.portalId,
      formId: this.form1Id,
      target: `#${targetElementId}`,
      onFormReady: (form) => {
        console.log("HubSpot Form 1 ready");
      },
      onFormSubmit: (form) => {
        // Fire Meta Pixel Lead event
        if (window.fbq) {
          window.fbq("track", "Lead", {
            form_type: "Form 1",
            content_name: "MVP Roadmap Primary Form",
            content_category: "Lead Generation",
          });
        }

        // Fire Google Analytics event
        if (window.gtag) {
          window.gtag("event", "generate_lead", {
            event_category: "Form",
            event_label: "Form 1 Submission",
            form_type: "primary",
          });
        }
      },
      onFormSubmitted: (form) => {
        // Additional tracking after successful submission
        console.log("Form 1 submitted successfully");

        // Redirect to thank you page
        setTimeout(() => {
          window.location.href = "/thank-you";
        }, 1000);
      },
    });
  }

  // Create Form 2 (Secondary CTA Form)
  async createForm2(targetElementId: string): Promise<void> {
    await this.loadHubSpotScript();

    window.hbspt.forms.create({
      portalId: this.portalId,
      formId: this.form2Id,
      target: `#${targetElementId}`,
      onFormReady: (form) => {
        console.log("HubSpot Form 2 ready");
      },
      onFormSubmit: (form) => {
        // Fire Meta Pixel Lead event
        if (window.fbq) {
          window.fbq("track", "Lead", {
            form_type: "Form 2",
            content_name: "MVP Roadmap Secondary Form",
            content_category: "Lead Generation",
          });
        }

        // Fire Google Analytics event
        if (window.gtag) {
          window.gtag("event", "generate_lead", {
            event_category: "Form",
            event_label: "Form 2 Submission",
            form_type: "secondary",
          });
        }
      },
      onFormSubmitted: (form) => {
        console.log("Form 2 submitted successfully");

        // Trigger PDF download
        this.triggerPDFDownload();
      },
    });
  }

  // Fallback form submission for custom forms
  async submitLead(data: LeadData): Promise<boolean> {
    try {
      const utmParams = this.getUTMParameters();
      const enrichedData = { ...data, ...utmParams };

      // Submit to HubSpot using Forms API
      const formData = new FormData();
      formData.append("email", enrichedData.email);
      formData.append("firstname", enrichedData.name);
      if (enrichedData.phone) formData.append("phone", enrichedData.phone);
      if (enrichedData.company)
        formData.append("company", enrichedData.company);
      if (enrichedData.utm_source)
        formData.append("utm_source", enrichedData.utm_source);
      if (enrichedData.utm_medium)
        formData.append("utm_medium", enrichedData.utm_medium);
      if (enrichedData.utm_campaign)
        formData.append("utm_campaign", enrichedData.utm_campaign);
      if (enrichedData.utm_content)
        formData.append("utm_content", enrichedData.utm_content);
      if (enrichedData.utm_term)
        formData.append("utm_term", enrichedData.utm_term);

      const formId = data.form_type === "Form 1" ? this.form1Id : this.form2Id;
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${this.portalId}/${formId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // Fire tracking events
        this.trackFormSubmission(data.form_type);
        return true;
      }
      return false;
    } catch (error) {
      console.error("HubSpot submission error:", error);
      return false;
    }
  }

  // Track form submissions manually
  private trackFormSubmission(formType: "Form 1" | "Form 2"): void {
    // Meta Pixel tracking
    if (window.fbq) {
      window.fbq("track", "Lead", {
        form_type: formType,
        content_name: "MVP Roadmap",
        content_category: "Lead Generation",
      });
    }

    // Google Analytics tracking
    if (window.gtag) {
      window.gtag("event", "generate_lead", {
        event_category: "Form",
        event_label: `${formType} Submission`,
        form_type: formType.toLowerCase().replace(" ", "_"),
      });
    }
  }

  // Get current UTM parameters from URL or localStorage
  private getUTMParameters(): Record<string, string> {
    const params: Record<string, string> = {};

    // Try to get from localStorage first (for session persistence)
    const storedUTMs = localStorage.getItem("utm_params");
    if (storedUTMs) {
      return JSON.parse(storedUTMs);
    }

    // Get from current URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmKeys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ];

    utmKeys.forEach((key) => {
      const value = urlParams.get(key);
      if (value) {
        params[key] = value;
      }
    });

    // Store in localStorage for session persistence
    if (Object.keys(params).length > 0) {
      localStorage.setItem("utm_params", JSON.stringify(params));
    }

    return params;
  }

  // Trigger PDF download
  private triggerPDFDownload(): void {
    // Track download event
    if (window.fbq) {
      window.fbq("track", "DownloadPDF", {
        content_name: "MVP Roadmap PDF",
        content_type: "product",
        pdf_type: "roadmap",
      });
    }

    if (window.gtag) {
      window.gtag("event", "file_download", {
        event_category: "PDF",
        event_label: "MVP Roadmap Download",
        file_name: "mvp-roadmap.pdf",
      });
    }

    // Create download link
    const link = document.createElement("a");
    link.href = "/mvp-roadmap.pdf";
    link.download = "MVP-Roadmap-4Blocks.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Export singleton instance
let hubspotTracker: HubSpotTracker | null = null;

export const initializeHubSpot = (
  portalId: string,
  form1Id: string,
  form2Id: string
): HubSpotTracker => {
  if (!hubspotTracker) {
    hubspotTracker = new HubSpotTracker(portalId, form1Id, form2Id);
  }
  return hubspotTracker;
};

export const getHubSpotTracker = (): HubSpotTracker | null => {
  return hubspotTracker;
};

export default HubSpotTracker;
