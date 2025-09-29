'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Download, Mail, Rocket, Users, Clock, Target, Wrench, MapPin } from 'lucide-react';
import Link from 'next/link';

declare global {
  interface Window {
    gtag: any;
    fbq: any;
  }
}

export default function ThankYouPage() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Track thank you page view
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: 'Thank You - MVP Roadmap',
          page_location: window.location.href,
        });
      }
      
      if (window.fbq) {
        window.fbq('track', 'CompleteRegistration');
      }
    }
  }, []);

  const handleSecondaryDownload = async () => {
    // Track secondary download
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'Download', {
          event_category: 'engagement',
          event_label: 'Secondary Download - Thank You Page',
          value: 1
        });
      }
      
      if (window.fbq) {
        window.fbq('track', 'Purchase', {
          content_name: 'MVP Roadmap PDF Secondary',
          value: 0,
          currency: 'USD'
        });
      }
    }

    // Send email with PDF
    try {
      const response = await fetch('/api/send-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('PDF sent successfully to your email!');
      } else {
        throw new Error('Failed to send PDF');
      }
    } catch (error) {
      console.error('Error sending PDF:', error);
      // Fallback to direct download
      const link = document.createElement('a');
      link.href = '/mvp-roadmap.pdf';
      link.download = 'MVP-Roadmap-4Blocks.pdf';
      link.click();
    }
  };

  const handleBookCall = () => {
    // Track Calendly booking intent
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'Schedule', {
          event_category: 'engagement',
          event_label: 'Calendly Booking Clicked',
          value: 1
        });
      }
      
      if (window.fbq) {
        window.fbq('track', 'Schedule');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <Link href="/" className="flex items-center">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">4</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">BLOCKS</span>
        </Link>
      </header>

      {/* Thank You Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your <span className="text-green-500 font-semibold">MVP Roadmap</span> Is on Its Way 🚀
          </p>
          <p className="text-gray-500 mb-8">
            Check your inbox,<br />
            your roadmap will arrive within a few minutes.
          </p>

          {/* Email Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-12 h-12 text-green-500" />
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-5 h-5 text-white" />
            </div>
          </div>

          <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 mb-16">
            DOWNLOAD MVP ROADMAP
          </Button>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Turn Your <span className="text-green-500">MVP</span> Roadmap<br />
            Into Reality With a Free Consultation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book a one-on-one strategy call with Mirko, our CEO,<br />
            gain practical insights to move your project forward.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <Card className="p-4 shadow-md border-0 bg-white">
            <CardContent className="p-0 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Wrench className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Free Mini-Audit of Your MVP Idea</h3>
              <p className="text-xs text-gray-600">Get a quick audit of your MVP idea with recommendations to improve success.</p>
            </CardContent>
          </Card>

          <Card className="p-4 shadow-md border-0 bg-white">
            <CardContent className="p-0 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Real Cost & Timeline Estimates</h3>
              <p className="text-xs text-gray-600">Understand realistic costs, timelines, and development phases, no surprises</p>
            </CardContent>
          </Card>

          <Card className="p-4 shadow-md border-0 bg-white">
            <CardContent className="p-0 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Rocket className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Growth Strategy Blueprint</h3>
              <p className="text-xs text-gray-600">We'll outline how to scale your MVP after launch</p>
            </CardContent>
          </Card>

          <Card className="p-4 shadow-md border-0 bg-white">
            <CardContent className="p-0 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Exclusive Free Slots</h3>
              <p className="text-xs text-gray-600">Only 10 free consultations available this month, secure yours now.</p>
            </CardContent>
          </Card>

          <Card className="p-4 shadow-md border-0 bg-white">
            <CardContent className="p-0 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Built with Italian Precision</h3>
              <p className="text-xs text-gray-600">Our team in Italy has delivered dozens of successful software projects for startups & enterprises.</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 italic mb-8 max-w-3xl mx-auto">
            "Projects without proper planning fail 80% of the time. Our roadmap and consultation reduce that risk dramatically."
          </p>
          <Button 
            onClick={handleBookCall}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 mb-8"
          >
            BOOK YOUR FREE STRATEGY CALL
          </Button>
        </div>

        {/* Calendly Embed */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 shadow-lg border-0 bg-white">
            <CardContent className="p-0">
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">30 Minute Meeting</h3>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-left space-y-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600">30 min</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Book a personalized online product vision.</p>
                      <p>Call from 9:30-21:30 CET</p>
                    </div>
                  </div>
                  <div>
                    {/* Replace with actual Calendly embed */}
                    <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8">
                      <p className="text-gray-500 mb-4">Calendly Calendar Widget</p>
                      <p className="text-sm text-gray-400">
                        Replace this with your actual Calendly embed code
                      </p>
                      {/* Example Calendly iframe - replace with your actual Calendly URL */}
                      <div 
                        className="calendly-inline-widget" 
                        data-url="https://calendly.com/your-calendly-username/30min"
                        style={{minWidth: '320px', height: '400px'}}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Secondary Download */}
      <section className="bg-green-500 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Didn't receive the roadmap? Check your spam folder or<br />
              [click here to download again]
            </h3>
            <div className="flex gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white"
              />
              <Button
                onClick={handleSecondaryDownload}
                className="bg-white text-green-500 hover:bg-gray-100 font-semibold whitespace-nowrap"
              >
                DOWNLOAD PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
                <a href="/cookies-policy" className="block text-gray-400 hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Calendly Script */}
      <script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        type="text/javascript" 
        async
      ></script>
    </div>
  );
}