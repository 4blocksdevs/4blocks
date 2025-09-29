export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Cookies Policy Content */}
      <main className="container mx-auto px-2 py-4">
        <div className="max-w-2xl mx-auto prose prose-sm">
          <h1 className="text-2xl font-bold textblack mb-4">Cookies Policy</h1>
          <p className="text-gray-600 mb-4 text-xs">Last updated: {new Date().toLocaleDateString()}</p>

          <p className="text-gray-700 leading-relaxed mb-4 text-xs">
            This Cookies Policy explains how 4Blocks (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) uses cookies and similar 
            technologies on our website and applications built with Next.js.
          </p>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">1. What Are Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-2 text-xs">
              Cookies are small text files placed on your device when you visit our site. They help us 
              operate our site, analyze usage, and personalize content and ads.
            </p>
            <p className="text-gray-700 leading-relaxed text-xs">
              Cookies contain information that is transferred to your device&apos;s hard drive and help us 
              recognize you when you return to our website.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">2. Types of Cookies We Use</h2>
            <div className="space-y-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <h3 className="text-base font-medium text-gray-800 mb-1">Essential Cookies</h3>
                <p className="text-gray-700 leading-relaxed text-xs">
                  Required for site functionality (e.g., login, security, form submissions). 
                  These cookies are necessary for our website to function properly and cannot be disabled.
                </p>
                <ul className="list-disc pl-3 text-gray-700 mt-1 space-y-0.5 text-xs">
                  <li>Session management</li>
                  <li>Security features</li>
                  <li>Cookie consent preferences</li>
                </ul>
              </div>

              <div className="bg-green-50 p-2 rounded-lg">
                <h3 className="text-base font-medium text-gray-800 mb-1">Analytics Cookies</h3>
                <p className="text-gray-700 leading-relaxed text-xs">
                  We use Google Analytics to measure traffic and understand how visitors use our website. 
                  These cookies help us improve our website&apos;s performance and user experience.
                </p>
                <ul className="list-disc pl-3 text-gray-700 mt-1 space-y-0.5 text-xs">
                  <li>Page views and user sessions</li>
                  <li>Traffic sources and user behavior</li>
                  <li>Website performance metrics</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-2 rounded-lg">
                <h3 className="text-base font-medium text-gray-800 mb-1">Marketing Cookies</h3>
                <p className="text-gray-700 leading-relaxed text-xs">
                  We use Meta Pixel and other tracking technologies to deliver targeted ads and measure 
                  campaign effectiveness. These cookies help us show you relevant advertisements.
                </p>
                <ul className="list-disc pl-3 text-gray-700 mt-1 space-y-0.5 text-xs">
                  <li>Ad targeting and retargeting</li>
                  <li>Conversion tracking</li>
                  <li>Campaign performance measurement</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">3. Third-Party Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-2 text-xs">
              Third parties (e.g., Google, Meta, HubSpot) may place cookies on your device when you 
              interact with our services. These cookies are governed by the respective third parties&apos; 
              privacy policies.
            </p>
            
            <div className="bg-gray-50 p-2 rounded-lg">
              <h3 className="text-sm font-medium text-gray-800 mb-1">Third-Party Services We Use:</h3>
              <ul className="list-disc pl-3 text-gray-700 space-y-1 text-xs">
                <li><strong>Google Analytics:</strong> Website analytics and performance measurement</li>
                <li><strong>Meta Pixel:</strong> Facebook and Instagram advertising and retargeting</li>
                <li><strong>Calendly:</strong> Appointment scheduling functionality</li>
                <li><strong>CRM Platforms:</strong> Lead management and email marketing</li>
              </ul>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">4. Legal Basis for Cookies (GDPR / EU Users)</h2>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-600 text-xs font-medium">✓</span>
                </div>
                <div>
                  <p className="text-gray-700 text-xs"><strong>Essential cookies:</strong> Legitimate interest.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-green-600 text-xs font-medium">⚠</span>
                </div>
                <div>
                  <p className="text-gray-700 text-xs"><strong>Analytics & marketing cookies:</strong> Consent.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">5. Managing Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-2 text-xs">
              You can manage or disable cookies in your browser settings. For EU users, we provide a 
              cookie banner to obtain consent before placing non-essential cookies.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 mb-2">
              <p className="text-gray-700 text-xs">
                <strong>Note:</strong> Disabling certain cookies may affect the functionality of our website.
              </p>
            </div>

            <h3 className="text-base font-medium text-gray-800 mb-1">Browser Settings</h3>
            <ul className="list-disc pl-3 text-gray-700 space-y-1 mb-3 text-xs">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
            </ul>

            <h3 className="text-base font-medium text-gray-800 mb-1">Opt-out Links</h3>
            <ul className="list-disc pl-3 text-gray-700 space-y-1 text-xs">
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

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">6. California Residents (CCPA/CPRA)</h2>
            <p className="text-gray-700 leading-relaxed mb-2 text-xs">
              If you are a California resident, you may opt out of the &quot;sale&quot; or &quot;sharing&quot; of your personal 
              information by clicking &quot;Do Not Sell or Share My Personal Information&quot; at the bottom of our site.
            </p>
            <div className="bg-blue-50 p-2 rounded-lg">
              <p className="text-gray-700 text-xs">
                <strong>Your California Privacy Rights:</strong>
              </p>
              <ul className="list-disc pl-3 text-gray-700 mt-1 space-y-0.5 text-xs">
                <li>Right to know what personal information is collected</li>
                <li>Right to delete personal information</li>
                <li>Right to opt-out of sale/sharing</li>
                <li>Right to non-discrimination</li>
              </ul>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">7. Cookie Duration</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-1 text-left text-gray-700 font-semibold">Cookie Type</th>
                    <th className="px-2 py-1 text-left text-gray-700 font-semibold">Duration</th>
                    <th className="px-2 py-1 text-left text-gray-700 font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-2 py-1 text-gray-700">Essential</td>
                    <td className="px-2 py-1 text-gray-700">Session / 1 year</td>
                    <td className="px-2 py-1 text-gray-700">Website functionality</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-gray-700">Analytics</td>
                    <td className="px-2 py-1 text-gray-700">2 years</td>
                    <td className="px-2 py-1 text-gray-700">Usage analytics</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-gray-700">Marketing</td>
                    <td className="px-2 py-1 text-gray-700">30-90 days</td>
                    <td className="px-2 py-1 text-gray-700">Advertising and retargeting</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">8. Changes</h2>
            <p className="text-gray-700 leading-relaxed text-xs">
              We may update this Cookies Policy from time to time. Updates will be posted here with a 
              new &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold textblack mb-2">9. Contact</h2>
            <p className="text-gray-700 leading-relaxed text-xs">
              If you have any questions about this Cookies Policy or our use of cookies, please contact us:
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
