import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, CheckCircle } from "lucide-react";
import UTMTracker from "@/lib/utm-tracker";
import UniversalTracking from "@/lib/universal-tracking";
import trackingConfig, { trackingEvents, leadSources } from "@/lib/enhanced-tracking-config";
import { initializeHubSpot } from "@/lib/hubspot";
import { useRouter } from "next/navigation";

export default function ChecklistPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Initialize UTM tracking for checklist page
    UTMTracker.initialize();

    // Track checklist page view
    if (typeof window !== "undefined") {
      if (window.gtag) {
        window.gtag("event", "page_view", {
          page_title: "MVP Checklist Page",
          page_location: window.location.href,
          ...UTMTracker.getAttributionForGA(),
        });
      }

      if (window.fbq) {
        window.fbq("track", "PageView", {
          content_name: "MVP Checklist Page",
          ...UTMTracker.getAttributionForMetaPixel(),
        });
      }
    }
  }, []);

  const handleChecklistDownload = () => {
    // Require email before download
    if (!email || email.trim() === "") {
      alert("Please enter your email to download the checklist.");
      return;
    }

    setIsSubmitting(true);

    (async () => {
      try {
        // Track checklist download with Universal Tracking
        UniversalTracking.trackEvent({
          event_type: "pdf_download",
          file_name: "MVP-Checklist-4Blocks.pdf",
          lead_source: leadSources.checklist_download,
          download_type: "checklist",
        });

            // Google Analytics (gtag) event for file download with UTM attribution
            if (typeof window !== "undefined" && (window as any).gtag) {
              try {
                (window as any).gtag("event", "file_download", {
                  event_category: "engagement",
                  event_label: "MVP-Checklist-4Blocks.pdf",
                  value: 1,
                  file_name: "MVP-Checklist-4Blocks.pdf",
                  download_type: "checklist",
                  lead_source: leadSources.checklist_download,
                  // include UTM attribution for GA
                  ...(UTMTracker.getAttributionForGA() || {}),
                });
              } catch (err) {
                console.warn("gtag event failed", err);
              }
            }

            // Google Tag Manager / dataLayer push with UTM fields
            if (typeof window !== "undefined") {
              try {
                (window as any).dataLayer = (window as any).dataLayer || [];
                (window as any).dataLayer.push({
                  event: "pdf_download",
                  file_name: "MVP-Checklist-4Blocks.pdf",
                  download_type: "checklist",
                  lead_source: leadSources.checklist_download,
                  // include attribution fields for GTM/meta
                  ...(UTMTracker.getAttributionForMetaPixel() || {}),
                });
              } catch (err) {
                console.warn("dataLayer push failed", err);
              }
            }

        // Submit email to HubSpot (use primary form to consolidate contacts)
        const hubspot = initializeHubSpot(
          trackingConfig.hubspot.portalId,
          trackingConfig.hubspot.form1Id,
          trackingConfig.hubspot.form2Id
        );

        const success = await hubspot.submitLead({
          name: "",
          email: email.trim(),
          form_type: "Form 1",
          lead_source: leadSources.checklist_download,
        });

        if (!success) {
          console.warn("HubSpot submission failed for checklist download");
        }

        // Trigger actual download regardless of hubspot success
        const link = document.createElement("a");
        link.href = "/mvp-checklist.pdf"; // Ensure the file exists in public/
        link.download = "MVP-Checklist-4Blocks.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Redirect to thank you page
        router.push("/thank-you?type=checklist");
      } catch (err) {
        console.error("Error during checklist download flow:", err);
        // Still attempt download and redirect
        const link = document.createElement("a");
        link.href = "/mvp-checklist.pdf";
        link.download = "MVP-Checklist-4Blocks.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        router.push("/thank-you?type=checklist");
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  const updateHubSpotProperty = async (property: string, value: string) => {
    // This would update HubSpot contact properties
    // Implementation depends on HubSpot API setup
    console.log(`Updating HubSpot property ${property} to ${value}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <section className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-5xl font-bold text-black mb-4">
            Your <span className="text-[#9ED95D]">MVP Checklist</span> is Ready!
          </h1>
          <p className="text-lg text-black mb-6">
            The essential checklist to validate your MVP idea and ensure
            successful launch
          </p>
        </div>

        {/* Checklist Preview */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-black mb-4">
              What&apos;s Inside:
            </h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-[#9ED95D]" />
                <span className="text-black">Market Validation Checklist</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-[#9ED95D]" />
                <span className="text-black">
                  Technical Requirements Planning
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-[#9ED95D]" />
                <span className="text-black">Budget & Timeline Estimation</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-[#9ED95D]" />
                <span className="text-black">Launch Strategy Framework</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-[#9ED95D]" />
                <span className="text-black">Performance Metrics Setup</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Card className="p-6 shadow-xl border-2 border-[#9ED95D] bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-0 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-[#9ED95D] rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                  MVP Checklist
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your step-by-step validation guide
                </p>
                <div className="mb-4">
                  <Input
                    id="checklist-email"
                    type="email"
                    placeholder="Enter your email to download"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mb-3 focus:outline-none text-base border-[#9ED95D] border"
                  />
                </div>
                <Button
                  onClick={handleChecklistDownload}
                  disabled={isSubmitting}
                  className="bg-[#9ED95D] hover:bg-[#8bc94a] text-black font-bold px-6 py-3 text-base"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isSubmitting ? "SENDING..." : "DOWNLOAD CHECKLIST"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Use This Checklist */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-black mb-4 text-center">
            Why This Checklist is Essential
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-[#9ED95D] rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-black">1</span>
              </div>
              <h3 className="font-bold text-black mb-2">
                Avoid Common Pitfalls
              </h3>
              <p className="text-sm text-gray-600">
                Skip the mistakes that kill 90% of MVP projects before they
                launch
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-[#9ED95D] rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-black">2</span>
              </div>
              <h3 className="font-bold text-black mb-2">Save Time & Money</h3>
              <p className="text-sm text-gray-600">
                Validate your idea properly before investing months of
                development
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-[#9ED95D] rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-black">3</span>
              </div>
              <h3 className="font-bold text-black mb-2">
                Launch with Confidence
              </h3>
              <p className="text-sm text-gray-600">
                Know exactly what to build and how to measure success
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">
            Ready to Validate Your MVP Idea?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Download the checklist and start building something people actually
            want
          </p>
          <Button
            onClick={handleChecklistDownload}
            className="bg-[#9ED95D] hover:bg-[#8bc94a] text-black font-bold px-8 py-4 text-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            GET YOUR CHECKLIST NOW
          </Button>
        </div>
      </section>
    </div>
  );
}
