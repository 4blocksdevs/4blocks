// Universal Event Tracking Service
// Centralized service to fire events to Meta Pixel and HubSpot simultaneously
// with proper attribution data and ad source tracking

import { trackingConfig, trackingEvents } from "./enhanced-tracking-config";
import UTMTracker, { type AttributionData } from "./utm-tracker";

// Event types for type safety
export type TrackingEventType =
  | "form_submission"
  | "pdf_download"
  | "book_call_click"
  | "calendar_booking"
  | "page_view"
  | "email_click"
  | "phone_click"
  | "social_click";

// Event data interface
export interface EventData {
  event_type: TrackingEventType;
  lead_source?: string;
  form_type?: string;
  file_name?: string;
  calendar_type?: string;
  contact_method?: string;
  [key: string]: any;
}

class UniversalTracking {
  private static isInitialized = false;
  private static debugMode = false; // Set to true for detailed logging

  /**
   * Enable/disable debug mode for testing
   */
  static setDebugMode(enabled: boolean): void {
    this.debugMode = enabled;
    if (enabled) {
      console.log("🔍 Universal Tracking Debug Mode ENABLED");
    }
  }

  /**
   * Initialize tracking service
   */
  static initialize(): void {
    if (typeof window === "undefined" || this.isInitialized) return;

    // Initialize UTM tracking first
    UTMTracker.initialize();

    this.isInitialized = true;
    console.log("Universal Tracking initialized");
  }

  /**
   * Track events across all platforms (Meta, HubSpot, GA)
   */
  static trackEvent(eventData: EventData): void {
    if (typeof window === "undefined") return;

    const attribution = UTMTracker.getAttribution();
    const enrichedData = this.enrichEventData(eventData, attribution);

    if (this.debugMode) {
      console.group(`🎯 TRACKING EVENT: ${eventData.event_type}`);
      console.log("📝 Original Event Data:", eventData);
      console.log("🏷️ Attribution Data:", attribution);
      console.log("✨ Enriched Event Data:", enrichedData);
    }

    // Fire events to all platforms
    this.trackMetaPixelEvent(enrichedData);
    this.trackHubSpotEvent(enrichedData);
    this.trackGoogleAnalyticsEvent(enrichedData);

    // Push to GTM dataLayer for additional tags (if present)
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: enrichedData.event_type,
        event_type: enrichedData.event_type,
        file_name: enrichedData.file_name,
        form_type: enrichedData.form_type,
        lead_source: enrichedData.lead_source,
        download_type: enrichedData.download_type,
        page_url: enrichedData.page_url,
        page_title: enrichedData.page_title,
        timestamp: enrichedData.timestamp,
        // UTM / attribution
        utm_source: enrichedData.utm_source,
        utm_medium: enrichedData.utm_medium,
        utm_campaign: enrichedData.utm_campaign,
        utm_content: enrichedData.utm_content,
        utm_term: enrichedData.utm_term,
        fbclid: enrichedData.fbclid,
        gclid: enrichedData.gclid,
        ad_id: enrichedData.ad_id,
        adset_id: enrichedData.adset_id,
        campaign_id: enrichedData.campaign_id,
      });
    } catch (e) {
      if (this.debugMode) console.warn("dataLayer push failed", e);
    }

    // Dispatch a DOM CustomEvent so other integrations (e.g., Brevo) can listen without tight coupling
    try {
      const evt = new CustomEvent("universal-tracking-event", { detail: enrichedData });
      window.dispatchEvent(evt);
    } catch (e) {
      if (this.debugMode) console.warn("CustomEvent dispatch failed", e);
    }

    if (this.debugMode) {
      console.log("✅ Event sent to all platforms");
      console.groupEnd();
    } else {
      console.log(`🎯 Event tracked: ${eventData.event_type} →`, enrichedData);
    }
  }

  /**
   * Enrich event data with attribution information
   */
  private static enrichEventData(
    eventData: EventData,
    attribution: AttributionData | null
  ): EventData {
    const enriched = { ...eventData };

    if (attribution) {
      // Add UTM and attribution data
      enriched.utm_source = attribution.utm_source;
      enriched.utm_medium = attribution.utm_medium;
      enriched.utm_campaign = attribution.utm_campaign;
      enriched.utm_content = attribution.utm_content;
      enriched.utm_term = attribution.utm_term;
      enriched.utm_id = attribution.utm_id;
      enriched.gclid = attribution.gclid;
      enriched.fbclid = attribution.fbclid;
      enriched.referrer = attribution.referrer;
      enriched.landing_page = attribution.landing_page;
      enriched.session_id = attribution.session_id;

      // Facebook Ad specific parameters
      enriched.ad_id = attribution.ad_id;
      enriched.adset_id = attribution.adset_id;
      enriched.campaign_id = attribution.campaign_id;
    }

    // Add timestamp
    enriched.timestamp = new Date().toISOString();
    enriched.page_url = window.location.href;
    enriched.page_title = document.title;

    return enriched;
  }

  /**
   * Track Meta Pixel events with proper event mapping
   */
  private static trackMetaPixelEvent(eventData: EventData): void {
    if (!window.fbq) {
      if (this.debugMode) {
        console.warn("⚠️ Meta Pixel (fbq) not found - event not sent to Meta");
      }
      return;
    }

  const { event_type } = eventData;
  let metaEvent: string | null = "Lead"; // Default for mappable standard events
  const params: any = {};

    // Map event types to Meta Pixel events
    switch (event_type) {
      case "form_submission":
        metaEvent = "Lead";
        params.content_name = eventData.form_type || "Form Submission";
        params.content_category = "Lead Generation";
        params.lead_source = eventData.lead_source;
        break;

      case "pdf_download":
        // For custom events, Meta recommends using trackCustom ONLY.
        // We'll still populate params and later call trackCustom('DownloadPDF', params).
        metaEvent = null; // prevents non-standard fbq('track', 'DownloadPDF') usage
        params.content_name = eventData.file_name || "PDF Download";
        params.content_type = "free_resource";
        params.download_type = eventData.download_type || "pdf";
        params.lead_source = eventData.lead_source;
        break;

      case "book_call_click":
        metaEvent = "ScheduleCallClick";
        params.content_name = "Book Call Button";
        params.content_category = "Calendar Intent";
        params.button_location = eventData.button_location;
        break;

      case "calendar_booking":
        metaEvent = "CompleteRegistration";
        params.content_name = "Calendar Appointment";
        params.content_category = "Conversion";
        params.value = 100; // Assign value for actual conversions
        params.currency = "USD";
        break;

      case "email_click":
        metaEvent = "ContactEmail";
        params.content_name = "Email Click";
        params.contact_method = "email";
        params.contact_location = eventData.lead_source;
        break;

      case "phone_click":
        metaEvent = "ContactPhone";
        params.content_name = "Phone Click";
        params.contact_method = "phone";
        params.contact_location = eventData.lead_source;
        break;
    }

    // Add attribution data
    if (eventData.utm_source) params.utm_source = eventData.utm_source;
    if (eventData.utm_medium) params.utm_medium = eventData.utm_medium;
    if (eventData.utm_campaign) params.utm_campaign = eventData.utm_campaign;
    if (eventData.utm_content) params.utm_content = eventData.utm_content;
    if (eventData.fbclid) params.fbclid = eventData.fbclid;

    // Facebook Ad specific parameters for campaign optimization
    if (eventData.ad_id) params.ad_id = eventData.ad_id;
    if (eventData.adset_id) params.adset_id = eventData.adset_id;
    if (eventData.campaign_id) params.campaign_id = eventData.campaign_id;

    if (this.debugMode) {
      console.log(`📱 META PIXEL EVENT: ${metaEvent}`, params);
    }

    // Fire Meta Pixel standard event only if metaEvent is a recognized standard event.
    if (metaEvent) {
      window.fbq("track", metaEvent, params);
      if (this.debugMode) {
        console.log(`📱 META PIXEL EVENT (standard): ${metaEvent}`, params);
      }
    }

    // Always send the intended custom event for PDF downloads & other custom granularity
    // pdf_download -> 'DownloadPDF'
    if (event_type === "pdf_download") {
      window.fbq("trackCustom", "DownloadPDF", params);
      if (this.debugMode) {
        console.log("📱 META CUSTOM EVENT: DownloadPDF", params);
      }
    } else {
      // Maintain custom names for other events for detailed diagnostics
      const customEventName = `Custom_${event_type}`;
      const customParams = {
        ...params,
        custom_event_type: event_type,
        page_url: eventData.page_url,
        timestamp: eventData.timestamp,
      };
      window.fbq("trackCustom", customEventName, customParams);
      if (this.debugMode) {
        console.log(`📱 META CUSTOM EVENT: ${customEventName}`, customParams);
      }
    }
  }

  /**
   * Track HubSpot events and update contact properties
   */
  private static trackHubSpotEvent(eventData: EventData): void {
    // HubSpot tracking via custom events and form submissions
    // This will be used when submitting forms or creating contacts
    const hubspotData = this.formatForHubSpot(eventData);

    // Store for later use in form submissions
    this.storeHubSpotEventData(eventData.event_type, hubspotData);

    // If HubSpot forms API is available, fire event
    if (window.hbspt && window.hbspt.forms) {
      // HubSpot doesn't have direct event tracking like GA/Meta
      // Events are tracked through form submissions and contact property updates
      console.log("HubSpot event data prepared:", hubspotData);
    }
  }

  /**
   * Track Google Analytics events
   */
  private static trackGoogleAnalyticsEvent(eventData: EventData): void {
    if (!window.gtag) return;

    const { event_type } = eventData;
    let gaEvent = "custom_event";
    const params: any = {
      event_category: "User Interaction",
      event_label: event_type,
    };

    // Map event types to GA events
    switch (event_type) {
      case "form_submission":
        gaEvent = "generate_lead";
        params.event_category = "Form";
        params.event_label = eventData.form_type || "Form Submission";
        params.lead_source = eventData.lead_source;
        break;

      case "pdf_download":
        gaEvent = "file_download";
        params.event_category = "Download";
        params.file_name = eventData.file_name;
        break;

      case "book_call_click":
        gaEvent = "click";
        params.event_category = "CTA";
        params.event_label = "Book Call Button";
        break;

      case "calendar_booking":
        gaEvent = "conversion";
        params.event_category = "Calendar";
        params.event_label = "Appointment Booked";
        params.value = 1;
        break;

      case "email_click":
      case "phone_click":
        gaEvent = "click";
        params.event_category = "Contact";
        params.event_label = eventData.contact_method;
        break;
    }

    // Add attribution data
    if (eventData.utm_source) params.campaign_source = eventData.utm_source;
    if (eventData.utm_medium) params.campaign_medium = eventData.utm_medium;
    if (eventData.utm_campaign) params.campaign_name = eventData.utm_campaign;
    if (eventData.utm_content) params.campaign_content = eventData.utm_content;
    if (eventData.utm_term) params.campaign_term = eventData.utm_term;
    if (eventData.gclid) params.gclid = eventData.gclid;

    // Fire GA event
    window.gtag("event", gaEvent, params);
  }

  /**
   * Format event data for HubSpot contact properties
   */
  private static formatForHubSpot(
    eventData: EventData
  ): Record<string, string> {
    const hubspotData: Record<string, string> = {};

    // Standard UTM parameters
    if (eventData.utm_source) hubspotData.utm_source = eventData.utm_source;
    if (eventData.utm_medium) hubspotData.utm_medium = eventData.utm_medium;
    if (eventData.utm_campaign)
      hubspotData.utm_campaign = eventData.utm_campaign;
    if (eventData.utm_content) hubspotData.utm_content = eventData.utm_content;
    if (eventData.utm_term) hubspotData.utm_term = eventData.utm_term;

    // Additional attribution
    if (eventData.gclid) hubspotData.gclid = eventData.gclid;
    if (eventData.fbclid) hubspotData.fbclid = eventData.fbclid;
    if (eventData.referrer)
      hubspotData.hs_analytics_source = eventData.referrer;
    if (eventData.landing_page)
      hubspotData.hs_analytics_first_url = eventData.landing_page;

    // Lead source and event-specific data
    if (eventData.lead_source)
      hubspotData.lead_source_detail = eventData.lead_source;

    // Event-specific properties
    switch (eventData.event_type) {
      case "pdf_download":
        hubspotData.pdf_downloaded = "true";
        hubspotData.last_pdf_download =
          eventData.timestamp || new Date().toISOString();
        break;
      case "calendar_booking":
        hubspotData.calendar_booking_attempted = "true";
        hubspotData.last_booking_attempt =
          eventData.timestamp || new Date().toISOString();
        break;
      case "book_call_click":
        hubspotData.book_call_clicked = "true";
        hubspotData.last_book_call_click =
          eventData.timestamp || new Date().toISOString();
        break;
    }

    return hubspotData;
  }

  /**
   * Store HubSpot event data for later form submission
   */
  private static storeHubSpotEventData(
    eventType: string,
    data: Record<string, string>
  ): void {
    try {
      const stored = JSON.parse(
        sessionStorage.getItem("hubspot_events") || "{}"
      );
      stored[eventType] = {
        ...data,
        timestamp: new Date().toISOString(),
      };
      sessionStorage.setItem("hubspot_events", JSON.stringify(stored));
    } catch (error) {
      console.warn("Failed to store HubSpot event data:", error);
    }
  }

  /**
   * Get stored HubSpot event data for form submissions
   */
  static getHubSpotEventData(): Record<string, any> {
    try {
      const stored = sessionStorage.getItem("hubspot_events");
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn("Failed to retrieve HubSpot event data:", error);
      return {};
    }
  }

  /**
   * Track form submission with all attribution data
   */
  static trackFormSubmission(
    formType: string,
    leadSource: string,
    formData?: any
  ): void {
    this.trackEvent({
      event_type: "form_submission",
      form_type: formType,
      lead_source: leadSource,
      ...formData,
    });
  }

  /**
   * Track PDF download with specific download type
   */
  static trackPDFDownload(
    fileName: string,
    downloadSource: string,
    downloadType: string = "mvp_roadmap"
  ): void {
    this.trackEvent({
      event_type: "pdf_download",
      file_name: fileName,
      lead_source: downloadSource,
      download_type: downloadType,
    });
  }

  /**
   * Track book a call button click
   */
  static trackBookCallClick(location: string): void {
    this.trackEvent({
      event_type: "book_call_click",
      lead_source: location,
      button_location: location,
    });
  }

  /**
   * Track calendar booking completion
   */
  static trackCalendarBooking(calendarType: string, meetingData?: any): void {
    this.trackEvent({
      event_type: "calendar_booking",
      calendar_type: calendarType,
      lead_source: "calendar_booking",
      ...meetingData,
    });
  }

  /**
   * Track contact method clicks (email, phone)
   */
  static trackContactClick(method: "email" | "phone", location: string): void {
    this.trackEvent({
      event_type: method === "email" ? "email_click" : "phone_click",
      contact_method: method,
      lead_source: location,
    });
  }

  /**
   * Get current attribution summary for debugging
   */
  static getAttributionSummary(): any {
    const attribution = UTMTracker.getAttribution();
    const hubspotEvents = this.getHubSpotEventData();

    return {
      attribution,
      hubspotEvents,
      isInitialized: this.isInitialized,
    };
  }

  /**
   * Debug method to test tracking
   */
  static debug(): void {
    console.group("Universal Tracking Debug");
    console.log("Attribution Summary:", this.getAttributionSummary());
    console.log("Available tracking scripts:");
    console.log("- Meta Pixel:", !!window.fbq);
    console.log("- Google Analytics:", !!window.gtag);
    console.log("- HubSpot:", !!window.hbspt);
    console.groupEnd();
  }

  /**
   * Test all tracking events (for development/testing)
   */
  static testAllEvents(): void {
    if (!this.debugMode) {
      console.warn(
        "⚠️ Enable debug mode first: UniversalTracking.setDebugMode(true)"
      );
      return;
    }

    console.group("🧪 TESTING ALL TRACKING EVENTS");

    console.log("🧪 Testing Form Submission...");
    this.trackFormSubmission("Test Form", "test_source", {
      email: "test@example.com",
    });

    console.log("🧪 Testing PDF Download...");
    this.trackPDFDownload("test-file.pdf", "test_download", "mvp_roadmap");

    console.log("🧪 Testing Book Call Click...");
    this.trackBookCallClick("test_button");

    console.log("🧪 Testing Calendar Booking...");
    this.trackCalendarBooking("test_calendar", { test: true });

    console.log("🧪 Testing Contact Clicks...");
    this.trackContactClick("email", "test_location");
    this.trackContactClick("phone", "test_location");

    console.groupEnd();
    console.log(
      "✅ Test complete! Check Events Manager in Facebook to see if events appeared."
    );
  }
}

export default UniversalTracking;
