// UTM Parameter Tracking Utility
// Handles capture, storage, and attribution of UTM parameters for marketing campaigns

export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_id?: string;
  gclid?: string; // Google Ads click ID
  fbclid?: string; // Facebook click ID
  // Facebook Ad specific tracking parameters
  ad_id?: string; // Individual ad ID
  adset_id?: string; // Ad set ID
  campaign_id?: string; // Campaign ID
}

export interface AttributionData extends UTMParameters {
  referrer?: string;
  landing_page?: string;
  timestamp?: string;
  session_id?: string;
}

class UTMTracker {
  private static readonly STORAGE_KEY = "utm_attribution";
  private static readonly SESSION_KEY = "session_attribution";
  private static readonly UTM_EXPIRY_DAYS = 30;

  // UTM parameter names to track
  private static readonly UTM_PARAMS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "utm_id",
    "gclid",
    "fbclid",
    // Facebook Ad specific parameters for campaign optimization
    "ad_id",
    "adset_id",
    "campaign_id",
  ];

  /**
   * Initialize UTM tracking on page load
   * Should be called on every page load to capture and persist UTM parameters
   */
  static initialize(): AttributionData | null {
    if (typeof window === "undefined") return null;

    const urlParams = this.getURLParameters();
    const hasUTMParams = Object.keys(urlParams).length > 0;

    if (hasUTMParams) {
      // New UTM parameters found, store them
      const attributionData: AttributionData = {
        ...urlParams,
        referrer: document.referrer || "direct",
        landing_page: window.location.href,
        timestamp: new Date().toISOString(),
        session_id: this.generateSessionId(),
      };

      this.storeAttribution(attributionData);
      this.storeSessionAttribution(attributionData);

      console.log("UTM Parameters captured:", attributionData);
      return attributionData;
    }

    // No new UTM params, return existing attribution if available
    return this.getStoredAttribution();
  }

  /**
   * Get current attribution data for form submissions
   */
  static getAttribution(): AttributionData | null {
    return this.getStoredAttribution() || this.getSessionAttribution();
  }

  /**
   * Get UTM parameters from current URL
   */
  private static getURLParameters(): UTMParameters {
    const urlParams = new URLSearchParams(window.location.search);
    const utmData: UTMParameters = {};

    this.UTM_PARAMS.forEach((param) => {
      const value = urlParams.get(param);
      if (value) {
        utmData[param as keyof UTMParameters] = value;
      }
    });

    return utmData;
  }

  /**
   * Store attribution data in localStorage with expiry
   */
  private static storeAttribution(data: AttributionData): void {
    try {
      const storageData = {
        attribution: data,
        expires: Date.now() + this.UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storageData));
    } catch (error) {
      console.warn("Failed to store UTM attribution:", error);
    }
  }

  /**
   * Store attribution data for current session only
   */
  private static storeSessionAttribution(data: AttributionData): void {
    try {
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn("Failed to store session attribution:", error);
    }
  }

  /**
   * Get stored attribution data from localStorage
   */
  private static getStoredAttribution(): AttributionData | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;

      const { attribution, expires } = JSON.parse(stored);

      // Check if expired
      if (Date.now() > expires) {
        localStorage.removeItem(this.STORAGE_KEY);
        return null;
      }

      return attribution;
    } catch (error) {
      console.warn("Failed to retrieve stored attribution:", error);
      return null;
    }
  }

  /**
   * Get session attribution data
   */
  private static getSessionAttribution(): AttributionData | null {
    try {
      const stored = sessionStorage.getItem(this.SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn("Failed to retrieve session attribution:", error);
      return null;
    }
  }

  /**
   * Generate a unique session ID
   */
  private static generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Clear all stored attribution data
   */
  static clearAttribution(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      sessionStorage.removeItem(this.SESSION_KEY);
    } catch (error) {
      console.warn("Failed to clear attribution data:", error);
    }
  }

  /**
   * Get attribution data formatted for HubSpot submission
   */
  static getAttributionForHubSpot(): Record<string, string> {
    const attribution = this.getAttribution();
    if (!attribution) return {};

    const hubspotData: Record<string, string> = {};

    // Map UTM parameters to HubSpot field names
    if (attribution.utm_source) hubspotData.utm_source = attribution.utm_source;
    if (attribution.utm_medium) hubspotData.utm_medium = attribution.utm_medium;
    if (attribution.utm_campaign)
      hubspotData.utm_campaign = attribution.utm_campaign;
    if (attribution.utm_content)
      hubspotData.utm_content = attribution.utm_content;
    if (attribution.utm_term) hubspotData.utm_term = attribution.utm_term;
    if (attribution.utm_id) hubspotData.utm_id = attribution.utm_id;
    if (attribution.gclid) hubspotData.gclid = attribution.gclid;
    if (attribution.fbclid) hubspotData.fbclid = attribution.fbclid;
    if (attribution.referrer)
      hubspotData.hs_analytics_source = attribution.referrer;
    if (attribution.landing_page)
      hubspotData.hs_analytics_first_url = attribution.landing_page;

    return hubspotData;
  }

  /**
   * Get attribution data formatted for Meta Pixel
   */
  static getAttributionForMetaPixel(): Record<string, any> {
    const attribution = this.getAttribution();
    if (!attribution) return {};

    return {
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_content: attribution.utm_content,
      utm_term: attribution.utm_term,
      fbclid: attribution.fbclid,
      referrer: attribution.referrer,
    };
  }

  /**
   * Get attribution data formatted for Google Analytics
   */
  static getAttributionForGA(): Record<string, any> {
    const attribution = this.getAttribution();
    if (!attribution) return {};

    return {
      campaign_source: attribution.utm_source,
      campaign_medium: attribution.utm_medium,
      campaign_name: attribution.utm_campaign,
      campaign_content: attribution.utm_content,
      campaign_term: attribution.utm_term,
      campaign_id: attribution.utm_id,
      gclid: attribution.gclid,
      referrer: attribution.referrer,
    };
  }

  /**
   * Track campaign performance metrics
   */
  static trackCampaignEvent(
    eventName: string,
    additionalData: Record<string, any> = {}
  ): void {
    const attribution = this.getAttribution();
    if (!attribution) return;

    // Send to Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, {
        ...this.getAttributionForGA(),
        ...additionalData,
      });
    }

    // Send to Meta Pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("trackCustom", eventName, {
        ...this.getAttributionForMetaPixel(),
        ...additionalData,
      });
    }
  }

  /**
   * Debug method to log current attribution state
   */
  static debug(): void {
    console.group("UTM Attribution Debug");
    console.log("Current URL params:", this.getURLParameters());
    console.log("Stored attribution:", this.getStoredAttribution());
    console.log("Session attribution:", this.getSessionAttribution());
    console.log("Active attribution:", this.getAttribution());
    console.log("HubSpot format:", this.getAttributionForHubSpot());
    console.groupEnd();
  }
}

export default UTMTracker;
