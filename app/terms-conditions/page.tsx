export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 border-b">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">4</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">BLOCKS</span>
        </div>
      </header>

      {/* Terms & Conditions Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            Welcome to 4Blocks. These Terms and Conditions govern your use of our website and services.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing our site or using our services, you agree to be bound by these Terms. 
              If you do not agree, please do not use our site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Services</h2>
            <p className="text-gray-700 leading-relaxed">
              We provide software development and related services. Details and pricing may change at any time. 
              We reserve the right to modify or discontinue any service without prior notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content, code, designs, and trademarks on this site are owned by 4Blocks unless otherwise noted. 
              You may not copy, distribute, or use our materials without prior written permission.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>All website content, including text, graphics, logos, and images</li>
              <li>Software code and technical documentation</li>
              <li>Business processes and methodologies</li>
              <li>The 4Blocks name and logo</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Obligations</h2>
            <p className="text-gray-700 leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Misuse our services or website</li>
              <li>Attempt unauthorized access to our systems</li>
              <li>Infringe on intellectual property rights</li>
              <li>Use our services for any illegal or unauthorized purpose</li>
              <li>Transmit any harmful or malicious code</li>
              <li>Interfere with the operation of our website or services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use 
              of our website and services, to understand our practices regarding your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are not liable for any indirect, incidental, or consequential damages arising from your use 
              of our website or services. Our total liability will not exceed the amount you paid us in the 
              past 12 months.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This includes but is not limited to damages for loss of profits, data, or other intangible losses 
              resulting from your use or inability to use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Service Availability</h2>
            <p className="text-gray-700 leading-relaxed">
              While we strive to maintain continuous service availability, we do not guarantee that our website 
              or services will be available at all times. We may suspend or restrict access for maintenance, 
              updates, or other operational reasons.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Our site may link to third-party websites. We are not responsible for their content or policies. 
              Your interaction with third-party websites is governed by their own terms and privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to terminate or suspend your access to our services at any time, without 
              prior notice, for conduct that we believe violates these Terms or is harmful to other users, 
              us, or third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms are governed by the laws of Italy. Any disputes arising from these Terms or your 
              use of our services will be subject to the exclusive jurisdiction of the Italian courts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Severability</h2>
            <p className="text-gray-700 leading-relaxed">
              If any provision of these Terms is found to be unenforceable, the remaining provisions will 
              remain in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Updates</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these Terms at any time. Updates will be posted here with a new "Last updated" date. 
              Your continued use of our services after any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="text-gray-700">
                <strong>Email:</strong> info@4blocks.xyz<br />
                <strong>Company:</strong> 4Blocks<br />
                <strong>Address:</strong> Italy
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <span className="ml-2 text-xl font-bold">BLOCKS</span>
              </div>
              <p className="text-gray-400">Italian Software Solutions for Businesses</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">CONTACTS</h3>
              <p className="text-gray-400">info@4blocks.xyz</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">POLICIES</h3>
              <div className="space-y-2">
                <a href="/privacy-policy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms-conditions" className="block text-green-400">Terms & Conditions</a>
                <a href="/cookies-policy" className="block text-gray-400 hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}