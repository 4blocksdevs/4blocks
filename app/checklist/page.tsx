'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import UTMTracker from '@/lib/utm-tracker';
import { trackingEvents, leadSources } from '@/lib/enhanced-tracking-config';

export default function ChecklistPage() {
  useEffect(() => {
    // Initialize UTM tracking for checklist page
    UTMTracker.initialize();
    
    // Track checklist page view
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: 'MVP Checklist Page',
          page_location: window.location.href,
          ...UTMTracker.getAttributionForGA()
        });
      }

      if (window.fbq) {
        window.fbq('track', 'PageView', {
          content_name: 'MVP Checklist Page',
          ...UTMTracker.getAttributionForMetaPixel()
        });
      }
    }
  }, []);

  const handleChecklistDownload = () => {
    // Track checklist download with checklist_download lead_source
    const attribution = UTMTracker.getAttributionForMetaPixel();
    const gaAttribution = UTMTracker.getAttributionForGA();

    // Meta Pixel tracking - Step 4
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', trackingEvents.checklistPageDownload.metaPixel.event, {
        ...trackingEvents.checklistPageDownload.metaPixel.parameters,
        ...attribution,
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
        utm_content: attribution.utm_content
      });
    }

    // Google Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', trackingEvents.checklistPageDownload.googleAnalytics.event, {
        ...trackingEvents.checklistPageDownload.googleAnalytics.parameters,
        ...gaAttribution
      });
    }

    // Update HubSpot property (if contact exists)
    updateHubSpotProperty('checklist_downloaded', 'Yes');

    // Trigger actual download
    const link = document.createElement('a');
    link.href = '/mvp-checklist.pdf'; // You'll need to create this file
    link.download = 'MVP-Checklist-4Blocks.pdf';
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <a href="/" className="block w-fit" tabIndex={0} aria-label="Go to homepage">
          <div className="flex items-center cursor-pointer">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="4Blocks Logo"
                width={42}
                height={48}
              />
            </div>
            <span className="ml-2 text-2xl font-bold text-black">BLOCKS</span>
          </div>
        </a>
      </header>

      {/* Main Content */}
      <section className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-5xl font-bold text-black mb-4">
            Your <span className="text-[#9ED95D]">MVP Checklist</span> is Ready!
          </h1>
          <p className="text-lg text-black mb-6">
            The essential checklist to validate your MVP idea and ensure successful launch
          </p>
        </div>

        {/* Checklist Preview */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-black mb-4">What's Inside:</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-[#9ED95D]" />
                <span className="text-black">Market Validation Checklist</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-[#9ED95D]" />
                <span className="text-black">Technical Requirements Planning</span>
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
                <h3 className="text-xl font-bold text-black mb-2">MVP Checklist</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your step-by-step validation guide
                </p>
                <Button
                  onClick={handleChecklistDownload}
                  className="bg-[#9ED95D] hover:bg-[#8bc94a] text-black font-bold px-6 py-3 text-base"
                >
                  <Download className="w-4 h-4 mr-2" />
                  DOWNLOAD CHECKLIST
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
              <h3 className="font-bold text-black mb-2">Avoid Common Pitfalls</h3>
              <p className="text-sm text-gray-600">
                Skip the mistakes that kill 90% of MVP projects before they launch
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-[#9ED95D] rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-black">2</span>
              </div>
              <h3 className="font-bold text-black mb-2">Save Time & Money</h3>
              <p className="text-sm text-gray-600">
                Validate your idea properly before investing months of development
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-[#9ED95D] rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-black">3</span>
              </div>
              <h3 className="font-bold text-black mb-2">Launch with Confidence</h3>
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
            Download the checklist and start building something people actually want
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