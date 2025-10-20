"use client";

import { Card, CardContent } from "@/components/ui/card";
import CookieBanner from "@/components/CookieBanner";
import Form1 from "@/components/Form1";
// import Form2 from "@/components/Form2"; // Temporarily removed
import Image from "next/image";

export default function LandingHero() {
  return (
    <>
      <CookieBanner />
      {/* Hero Section */}
      <section className="container max-w-3xl mx-auto px-4 py-6 lg:py-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl lg:text-4xl font-bold text-black leading-tight">
            Download your free <span className="text-[#9ED95D]">MVP</span>
            <br />
            roadmap PDF
          </h1>
          <p className="text-base text-black leading-relaxed">
            The proven 7 step guide to launch a successful MVP
            <br />
            without wasting time and money
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 items-center mt-4">
          <div>
            {/* Primary Lead Form */}
            <Form1
              onSubmissionSuccess={() => {
                console.log("Form 1 submitted successfully");
              }}
            />
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <Image
                src="/roadmap.svg"
                alt="Roadmap"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white max-w-4xl container mx-auto py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-xl lg:text-2xl space-y-1 font-bold text-black mb-2">
              Your Shortcut to a Winning{" "}
              <span className="text-[#9ED95D]">MVP</span>
              <br />
              Designed by 4Blocks Experts
            </h2>
          </div>

          <div className="grid gap-4 mb-8">
            <Card className="p-4 shadow-2xl border-0 bg-white rounded-sm">
              <CardContent className="p-0">
                <div className="flex items-center py-2 space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/checkmark.svg"
                      alt="Roadmap"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg text-black mb-1">
                      Learn the exact 7 steps to a successful MVP launch
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-4 shadow-xl border-0 bg-white rounded-sm">
              <CardContent className="p-0">
                <div className="flex items-center py-2 space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/checkmark.svg"
                      alt="Roadmap"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg text-black mb-1">
                      Avoid the costliest founder mistakes (validated by
                      real-world projects)
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-4 shadow-xl border-0 bg-white rounded-sm">
              <CardContent className="p-0">
                <div className="flex items-center py-2 space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/checkmark.svg"
                      alt="Roadmap"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg text-black mb-1">
                      Discover how top startups test, iterate, and scale fast
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center my-12">
            <p className="text-base font-bold text-black italic mb-4 max-w-2xl mx-auto">
              &quot;Created by 4Blocks — the product studio behind dozens of
              successful SaaS, AI, and blockchain MVPs.&quot;
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 max-w-4xl container mx-auto gap-8">
            <Card className="p-4 border border-[#e4ffc8] bg-white shadow-lg">
              <CardContent className="text-center p-0">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Image
                    src="/task.svg"
                    alt="Clear Step-by-Step"
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className="font-bold text-black mb-1 text-base">
                  Clear Step-by-Step Guidance
                </h3>
                <p className="text-black text-sm">
                  Follow a proven roadmap from idea to launch with step-by-step
                  clarity.
                </p>
              </CardContent>
            </Card>

            <Card className="p-4 border border-[#e4ffc8] bg-white shadow-lg">
              <CardContent className="text-center p-0">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Image
                    src="/lightning.svg"
                    alt="Actionable & Practical"
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className="font-bold text-black mb-1 text-base">
                  Actionable & Practical
                </h3>
                <p className="text-black text-sm">
                  Download and start applying actionable steps immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="p-4 border border-[#e4ffc8] bg-white shadow-lg">
              <CardContent className="text-center p-0">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <Image
                    src="/fast-time.svg"
                    alt="Time-Saving Insights"
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className="font-bold text-black mb-1 text-base">
                  Time-Saving Insights
                </h3>
                <p className="text-black text-sm">
                  Skip months of trial-and-error with a roadmap that works.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section - Form2 temporarily removed
          <div className="bg-[#9ED95D] container mx-auto rounded-md max-w-xl p-6 m-8">
            <div className="text-center">
              <Form2
                className=""
                onSubmissionSuccess={() => {
                  console.log(
                    "Form 2 submitted successfully - PDF download triggered"
                  );
                }}
                showDownloadButton={true}
              />
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}
