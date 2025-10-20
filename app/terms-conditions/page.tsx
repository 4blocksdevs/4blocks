import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - 4Blocks",
  description: "Terms and conditions for using 4Blocks services and website.",
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-2 py-4">
        <div className="max-w-2xl mx-auto prose prose-sm">
          <h1 className="text-2xl font-bold text-black mb-4">Terms and Conditions</h1>
          <p className="text-gray-600 mb-4 text-xs">Last updated: 27/07/2025</p>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">1. Acceptance of Terms</h2>
            <p className="text-gray-700 text-sm mb-4">
              By accessing and using 4blocks.xyz ("Website"), you agree to these terms and conditions.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">2. Services</h2>
            <p className="text-gray-700 text-sm mb-4">
              We provide software development, MVP development, and consulting services. Service specifics will be agreed upon in separate contracts.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">3. Intellectual Property</h2>
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-2">
              <li>Our content (text, images, code) is protected by copyright</li>
              <li>You may not use our content without permission</li>
              <li>Your intellectual property rights are respected per service agreements</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">4. User Conduct</h2>
            <p className="text-gray-700 text-sm mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-2">
              <li>Violate laws or regulations</li>
              <li>Interfere with website operation</li>
              <li>Attempt unauthorized access</li>
              <li>Share false or misleading information</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">5. Limitation of Liability</h2>
            <p className="text-gray-700 text-sm mb-4">
              We provide services "as is" without warranties. We're not liable for indirect damages from using our services.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">6. Privacy and Data</h2>
            <p className="text-gray-700 text-sm mb-4">
              See our Privacy Policy and Cookie Policy for data handling practices.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">7. Termination</h2>
            <p className="text-gray-700 text-sm mb-4">
              We may terminate service access for violations of these terms.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">8. Changes to Terms</h2>
            <p className="text-gray-700 text-sm mb-4">
              We may update these terms. Continued use after changes means acceptance.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">9. Governing Law</h2>
            <p className="text-gray-700 text-sm mb-4">
              These terms are governed by Italian law. Disputes will be resolved in Italian courts.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-2">10. Contact</h2>
            <p className="text-gray-700 text-sm">
              Questions about these terms? Contact us at{" "}
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