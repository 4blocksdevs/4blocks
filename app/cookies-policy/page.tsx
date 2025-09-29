export default function CookiesPolicy() {
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

      {/* Cookies Policy Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookies Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            This Cookies Policy explains how 4Blocks ("we," "our," "us") uses cookies and similar 
            technologies on our website and applications built with Next.js.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cookies are small text files placed on your device when you visit our site. They help us 
              operate our site, analyze usage, and personalize content and ads.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Cookies contain information that is transferred to your device's hard drive and help us 
              recognize you when you return to our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Essential Cookies</h3>
                <p className="text-gray-700 leading-relaxed">
                  Required for site functionality (e.g., login, security, form submissions). 
                  These cookies are necessary for our website to function properly and cannot be disabled.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                  <li>Session management</li>
                  <li>Security features</li>
                  <li>Cookie consent preferences</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Analytics Cookies</h3>
                <p className="text-gray-700 leading-relaxed">
                  We use Google Analytics to measure traffic and understand how visitors use our website. 
                  These cookies help us improve our website's performance and user experience.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                  <li>Page views and user sessions</li>
                  <li>Traffic sources and user behavior</li>
                  <li>Website performance metrics</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Marketing Cookies</h3>
                <p className="text-gray-700 leading-relaxed">
                  We use Meta Pixel and other tracking technologies to deliver targeted ads and measure 
                  campaign effectiveness. These cookies help us show you relevant advertisements.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                  <li>Ad targeting and retargeting</li>
                  <li>Conversion tracking</li>
                  <li>Campaign performance measurement</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Third-Party Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Third parties (e.g., Google, Meta, HubSpot) may place cookies on your device when you 
              interact with our services. These cookies are governed by the respective third parties' 
              privacy policies.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Third-Party Services We Use:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Google Analytics:</strong> Website analytics and performance measurement</li>
                <li><strong>Meta Pixel:</strong> Facebook and Instagram advertising and retargeting</li>
                <li><strong>Calendly:</strong> Appointment scheduling functionality</li>
                <li><strong>CRM Platforms:</strong> Lead management and email marketing</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Legal Basis for Cookies (GDPR / EU Users)</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <span className="text-blue-600 text-sm font-medium">✓</span>
                </div>
                <div>
                  <p className="text-gray-700"><strong>Essential cookies:</strong> Legitimate interest.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <span className="text-green-600 text-sm font-medium">⚠</span>
                </div>
                <div>
                  <p className="text-gray-700"><strong>Analytics & marketing cookies:</strong> Consent.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Managing Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can manage or disable cookies in your browser settings. For EU users, we provide a 
              cookie banner to obtain consent before placing non-essential cookies.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-gray-700">
                <strong>Note:</strong> Disabling certain cookies may affect the functionality of our website.
              </p>
            </div>

            <h3 className="text-xl font-medium text-gray-800 mb-3">Browser Settings</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">Opt-out Links</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" 
                   className="text-green-600 hover:underline">
                  Opt-out of Google Analytics
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer" 
                   className="text-green-600 hover:underline">
                  Opt-out of Meta Ads
                </a>
              </li>
              <li>
                <a href="https://legal.hubspot.com/cookie-policy" target="_blank" rel="noopener noreferrer" 
                   className="text-green-600 hover:underline">
                  HubSpot cookie information
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. California Residents (CCPA/CPRA)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you are a California resident, you may opt out of the "sale" or "sharing" of your personal 
              information by clicking "Do Not Sell or Share My Personal Information" at the bottom of our site.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Your California Privacy Rights:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                <li>Right to know what personal information is collected</li>
                <li>Right to delete personal information</li>
                <li>Right to opt-out of sale/sharing</li>
                <li>Right to non-discrimination</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookie Duration</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700 font-semibold">Cookie Type</th>
                    <th className="px-4 py-2 text-left text-gray-700 font-semibold">Duration</th>
                    <th className="px-4 py-2 text-left text-gray-700 font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-gray-700">Essential</td>
                    <td className="px-4 py-2 text-gray-700">Session / 1 year</td>
                    <td className="px-4 py-2 text-gray-700">Website functionality</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-700">Analytics</td>
                    <td className="px-4 py-2 text-gray-700">2 years</td>
                    <td className="px-4 py-2 text-gray-700">Usage analytics</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-700">Marketing</td>
                    <td className="px-4 py-2 text-gray-700">30-90 days</td>
                    <td className="px-4 py-2 text-gray-700">Advertising and retargeting</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Cookies Policy from time to time. Updates will be posted here with a 
              new "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Cookies Policy or our use of cookies, please contact us:
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
                <a href="/terms-conditions" className="block text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
                <a href="/cookies-policy" className="block text-green-400">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}