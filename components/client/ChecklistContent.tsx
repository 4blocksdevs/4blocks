"use client";

import { useEffect } from "react";
import Form1 from "@/components/Form1";
import UniversalTracking from "@/lib/universal-tracking";
import Image from "next/image";

export default function ChecklistContent() {
  useEffect(() => {
    // Initialize tracking when component mounts
    UniversalTracking.initialize();

    // Track page view
    UniversalTracking.trackEvent({
      event_type: "page_view",
      lead_source: "checklist_page",
      page_title: "Founder's MVP Checklist - Free Download",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Get Your Free{" "}
              <span className="text-[#9ED95D]">Founder's MVP Checklist</span>
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Your essential guide to validate and launch your MVP successfully
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="relative">
                <Image
                  src="/checklist-preview.svg" // Make sure to add this image
                  alt="MVP Checklist Preview"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-black mb-4">
                  What's Inside:
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      40+ essential checkpoints for MVP success
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      Technical validation guidelines
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      Market research checklist
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      Launch readiness assessment
                    </span>
                  </li>
                </ul>
              </div>

              {/* Lead Form */}
              <Form1
                onSubmissionSuccess={() => {
                  console.log("Checklist form submitted successfully");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
