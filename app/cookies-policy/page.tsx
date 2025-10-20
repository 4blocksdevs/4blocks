import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - 4Blocks",
  description: "Cookie policy and usage information for 4Blocks website.",
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-2 py-4">
        <div className="max-w-2xl mx-auto prose prose-sm">
          <h1 className="text-2xl font-bold text-black mb-4">Cookie Policy</h1>
          <p className="text-gray-600 mb-4 text-xs">Last updated: 27/07/2025</p>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">What Are Cookies?</h2>
            <p className="text-gray-700 text-sm mb-4">
              Cookies are small text files stored on your device when you visit websites. 
              They are widely used to make websites work more efficiently and provide useful information to site owners.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">How We Use Cookies</h2>
            <p className="text-gray-700 text-sm mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Understand how you interact with our website</li>
              <li>Measure the effectiveness of our marketing campaigns</li>
              <li>Improve our website and services</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">Types of Cookies We Use</h2>
            
            <div className="mb-4">
              <h3 className="font-semibold text-black">Essential Cookies</h3>
              <p className="text-gray-700 text-sm">
                Required for the website to function. Cannot be disabled.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-black">Analytics Cookies</h3>
              <p className="text-gray-700 text-sm">
                Help us understand how visitors interact with our website (Google Analytics).
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-black">Marketing Cookies</h3>
              <p className="text-gray-700 text-sm">
                Used to track visitors across websites to display relevant advertisements (Meta Pixel).
              </p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">Third-Party Cookies</h2>
            <p className="text-gray-700 text-sm mb-4">
              We use services from these third parties that may set cookies:
            </p>
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-2">
              <li>Google Analytics</li>
              <li>Meta (Facebook) Pixel</li>
              <li>HubSpot</li>
              <li>Calendly</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">Managing Cookies</h2>
            <p className="text-gray-700 text-sm mb-4">
              You can control cookies through:
            </p>
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-2">
              <li>Our cookie consent banner</li>
              <li>Your browser settings</li>
              <li>Third-party opt-out tools</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">Contact Us</h2>
            <p className="text-gray-700 text-sm">
              If you have questions about our use of cookies, contact us at{" "}
              <a href="mailto:info@4blocks.xyz" className="text-green-600 underline">
                info@4blocks.xyz
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}