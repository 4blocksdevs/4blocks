export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-white">
     

      {/* Terms & Conditions Content */}
      <main className="container mx-auto px-2 py-4">
        <div className="max-w-2xl mx-auto prose prose-sm">
          <h1 className="text-2xl font-bold textblack mb-4">Terms and Conditions</h1>
          <p className="text-gray-600 mb-4 text-xs">Last updated: {new Date().toLocaleDateString()}</p>

          <p className="text-gray-700 leading-relaxed mb-4 text-xs">
            Welcome to 4Blocks. These Terms and Conditions govern your use of our website and services.
          </p>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">1. Acceptance</h2>
            <p className="text-gray-700 leading-relaxed text-xs">
              By accessing our site or using our services, you agree to be bound by these Terms. 
              If you do not agree, please do not use our site.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">2. Services</h2>
            <p className="text-gray-700 leading-relaxed text-xs">
              We provide software development and related services. Details and pricing may change at any time. 
              We reserve the right to modify or discontinue any service without prior notice.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">3. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-2 text-xs">
              All content, code, designs, and trademarks on this site are owned by 4Blocks unless otherwise noted. 
              You may not copy, distribute, or use our materials without prior written permission.
            </p>
            <ul className="list-disc pl-3 text-gray-700 space-y-1 text-xs">
              <li>All website content, including text, graphics, logos, and images</li>
              <li>Software code and technical documentation</li>
              <li>Business processes and methodologies</li>
              <li>The 4Blocks name and logo</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">4. User Obligations</h2>
            <p className="text-gray-700 leading-relaxed mb-2 text-xs">You agree not to:</p>
            <ul className="list-disc pl-3 text-gray-700 space-y-1 text-xs">
              <li>Misuse our services or website</li>
              <li>Attempt unauthorized access to our systems</li>
              <li>Infringe on intellectual property rights</li>
              <li>Use our services for any illegal or unauthorized purpose</li>
              <li>Transmit any harmful or malicious code</li>
              <li>Interfere with the operation of our website or services</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">5. Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed text-xs">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use 
              of our website and services, to understand our practices regarding your personal information.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">6. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-2 text-xs">
              We are not liable for any indirect, incidental, or consequential damages arising from your use 
              of our website or services. Our total liability will not exceed the amount you paid us in the 
              past 12 months.
            </p>
            <p className="text-gray-700 leading-relaxed text-xs">
              This includes but is not limited to damages for loss of profits, data, or other intangible losses 
              resulting from your use or inability to use our services.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">7. Service Availability</h2>
            <p className="text-gray-700 leading-relaxed text-xs">
              While we strive to maintain continuous service availability, we do not guarantee that our website 
              or services will be available at all times. We may suspend or restrict access for maintenance, 
              updates, or other operational reasons.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">8. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed text-xs">
              Our site may link to third-party websites. We are not responsible for their content or policies. 
              Your interaction with third-party websites is governed by their own terms and privacy policies.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">9. Termination</h2>
            <p className="text-gray-700 leading-relaxed text-xs">
              We reserve the right to terminate or suspend your access to our services at any time, without 
              prior notice, for conduct that we believe violates these Terms or is harmful to other users, 
              us, or third parties.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">10. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed text-xs">
              These Terms are governed by the laws of Italy. Any disputes arising from these Terms or your 
              use of our services will be subject to the exclusive jurisdiction of the Italian courts.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">11. Severability</h2>
            <p className="text-gray-700 leading-relaxed text-xs">
              If any provision of these Terms is found to be unenforceable, the remaining provisions will 
              remain in full force and effect.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">12. Updates</h2>
            <p className="text-gray-700 leading-relaxed text-xs">
              We may update these Terms at any time. Updates will be posted here with a new &quot;Last updated&quot; date. 
              Your continued use of our services after any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">13. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed text-xs">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-gray-50 p-2 rounded-lg mt-2">
              <p className="text-gray-700 text-xs">
                <strong>Email:</strong> info@4blocks.xyz<br />
                <strong>Company:</strong> 4Blocks<br />
                <strong>Address:</strong> Italy
              </p>
            </div>
          </section>
        </div>
      </main>

      
    </div>
  );
}
