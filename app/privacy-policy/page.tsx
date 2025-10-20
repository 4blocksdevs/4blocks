import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - 4Blocks",
  description: "Privacy policy for 4Blocks services and website.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-2 py-4">
        <div className="max-w-2xl mx-auto prose prose-sm">
          <h1 className="text-2xl font-bold text-black mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-4 text-xs">Last updated: 27/07/2025</p>
          <p className="text-gray-700 leading-relaxed mb-4 text-xs">
            4blocks.xyz ("we," "our," "us") values your privacy. This Privacy
            Policy explains how we collect, use, and protect your information
            when you use our websites and services.
          </p>
          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-3 text-gray-700 space-y-1 text-xs">
              <li>
                Personal Information: Name, email, company details (when you
                sign up, contact us, or subscribe).
              </li>
              <li>Usage Data: Pages visited, browser type, device info.</li>
              <li>
                Tracking Data: Via Google Analytics, Meta Pixel, and HubSpot.
              </li>
            </ul>
          </section>
          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">
              2. How We Use Your Data
            </h2>
            <ul className="list-disc pl-3 text-gray-700 space-y-1 text-xs">
              <li>Provide and improve our services.</li>
              <li>
                Send updates, marketing, and educational content (via HubSpot,
                with your consent).
              </li>
              <li>Deliver targeted advertising (via Meta Pixel).</li>
              <li>Analyze site performance (via Google Analytics).</li>
            </ul>
          </section>
          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">
              3. Legal Bases (GDPR / EU)
            </h2>
            <ul className="list-disc pl-3 text-gray-700 space-y-1 text-xs">
              <li>Consent: marketing emails, analytics, advertising.</li>
              <li>Contract: providing requested services.</li>
              <li>Legitimate interest: site functionality, security.</li>
            </ul>
          </section>
          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">
              4. Your Rights
            </h2>
            <ul className="list-disc pl-3 text-gray-700 space-y-1 text-xs">
              <li>
                Under GDPR (EU/UK): You may request access, correction,
                deletion, restriction, or transfer of your data. You may
                withdraw consent at any time.
              </li>
              <li>
                Under CCPA/CPRA (California): You may request:
                <ul className="list-disc pl-3">
                  <li>
                    Disclosure of categories of personal information we collect.
                  </li>
                  <li>Deletion of your personal information.</li>
                  <li>
                    Opt-out of the "sale" or "sharing" of your data (see "Do Not
                    Sell or Share My Personal Information" link). We will not
                    discriminate against you for exercising your rights.
                  </li>
                </ul>
              </li>
            </ul>
          </section>
          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">
              5. Data Sharing
            </h2>
            <ul className="list-disc pl-3 text-gray-700 space-y-1 text-xs">
              <li>We share limited data with service providers such as:</li>
              <li>HubSpot (email, CRM, automation).</li>
              <li>Meta (advertising).</li>
              <li>Google (analytics).</li>
            </ul>
          </section>
          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">
              6. Data Retention
            </h2>
            <p className="text-gray-700 leading-relaxed text-xs">
              We keep personal data only as long as necessary for the purposes
              described above or as required by law.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">
              7. Security
            </h2>
            <p className="text-gray-700 leading-relaxed text-xs">
              We use industry-standard measures to protect your information, but
              no online system is 100% secure.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">
              8. International Transfers
            </h2>
            <p className="text-gray-700 leading-relaxed text-xs">
              If you access our site from outside the U.S., your data may be
              transferred and processed in the U.S.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">9. Updates</h2>
            <p className="text-gray-700 leading-relaxed text-xs">
              We may revise this Privacy Policy. Changes will be posted on this
              page.
            </p>
          </section>
          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">
              10. Contact
            </h2>
            <div className="bg-gray-50 p-2 rounded-lg mt-2">
              <p className="text-gray-700 text-xs">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:info@4blocks.xyz"
                  className="text-green-700 underline"
                >
                  info@4blocks.xyz
                </a>
                <br />
                <strong>Company:</strong> 4Blocks
                <br />
                <strong>Address:</strong> Italy
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}