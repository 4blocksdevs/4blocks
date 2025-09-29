'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Download, Rocket, Users, Clock, Target } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CookieBanner from '@/components/CookieBanner';

declare global {
  interface Window {
    gtag: any;
    fbq: any;
    dataLayer: any;
  }
}

export default function LandingPage() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: 'MVP Roadmap Landing Page',
          page_location: window.location.href,
        });
      }
      
      // Meta Pixel
      if (window.fbq) {
        window.fbq('track', 'PageView');
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track lead event
      if (typeof window !== 'undefined') {
        if (window.gtag) {
          window.gtag('event', 'Lead', {
            event_category: 'engagement',
            event_label: 'MVP Roadmap Download',
            value: 1
          });
        }
        
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'MVP Roadmap PDF',
            content_category: 'Lead Magnet'
          });
        }
      }

      // Submit to CRM (replace with actual CRM integration)
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          source: 'MVP Roadmap Landing Page'
        }),
      });

      if (response.ok) {
        // Redirect to thank you page
        router.push('/thank-you');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectDownload = () => {
    // Track download event
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'Download', {
          event_category: 'engagement',
          event_label: 'Direct MVP Roadmap Download',
          value: 1
        });
      }
      
      if (window.fbq) {
        window.fbq('track', 'Purchase', {
          content_name: 'MVP Roadmap PDF',
          content_type: 'product',
          value: 0,
          currency: 'USD'
        });
      }
    }

    // Trigger PDF download
    const link = document.createElement('a');
    link.href = '/mvp-roadmap.pdf'; // Replace with actual PDF path
    link.download = 'MVP-Roadmap-4Blocks.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen bg-white">
      <CookieBanner />
      
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center">
          <div className="w-12 h-12  rounded-lg flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="4Blocks Logo"
              width={42}
              height={48}
            />
            {/* <span className="text-white font-bold text-sm">4</span> */}
          </div>
          <span className="ml-2 text-2xl font-bold text-gray-900">BLOCKS</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 lg:py-20">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Download your free{' '}
            <span className="text-[#9ED95D]">MVP</span>
            <br />
            roadmap PDF
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            The proven 7 step guide to launch a successful MVP
            <br />
            without wasting time and money
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            

            {/* Download Form */}
            <Card className="p-6 mx-4 shadow-lg border bg-white border-[#9ED95D]">
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className='mt-4'>
                    <Label htmlFor="name" className="text-gray-700 text-xl">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-1 focus:outline-none  text-xl border-[#9ED95D] border"
                    />
                  </div>
                  <div className='mt-4'>
                    <Label htmlFor="email" className="text-gray-700  text-xl">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-1  focus:outline-none  text-xl border-[#9ED95D] border"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="justify-end mt-4 place-items-end bg-[#9ED95D] hover:bg-[#9ED95D] text-black font-semibold py-3 text-lg"
                  >
                    {isSubmitting ? 'PROCESSING...' : 'GET INSTANT ACCESS'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <Image
                src="/roadmap.svg"
                alt="Roadmap"
                width={420}
                height={420}
             
              />
              {/* <div className="w-64 h-80 bg-gradient-to-br from-green-100 to-green-200 rounded-lg shadow-2xl transform rotate-3">
                <div className="absolute inset-4 bg-white rounded-lg shadow-inner flex flex-col justify-center items-center text-center p-6">
                  <h3 className="text-2xl font-bold text-green-600 mb-2">MVP Roadmap</h3>
                  <p className="text-sm text-gray-600 mb-4">7 Steps to launch faster & save thousands</p>
                  <Rocket className="w-8 h-8 text-green-500" />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Your Shortcut to a Winning <span className="text-[#9ED95D]">MVP</span>
              <br />
              Designed by 4Blocks Experts
            </h2>
          </div>

          <div className="grid gap-8 mb-12">
            <Card className="p-6 shadow-lg border-0 bg-white">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#9ED95D] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-[#ffffff]" />
                  </div>
                  <div>
                    <h3 className="font-2xl text-gray-900 mb-2">Learn the exact 7 steps to a successful MVP launch</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-lg  border-0 bg-white">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#9ED95D] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-[#ffffff]" />
                  </div>
                  <div>
                    <h3 className="font-2xl text-gray-900 mb-2">Avoid the costliest founder mistakes (validated by real-world projects)</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-lg border-0 bg-white">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#9ED95D] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-6 h-6 text-[#ffffff]" />
                  </div>
                  <div>
                    <h3 className="font-2xl text-gray-900 mb-2">Discover how top startups test, iterate, and scale fast</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 italic mb-8 max-w-2xl mx-auto">
              &quot;Created by 4Blocks — the product studio behind dozens of successful SaaS, AI, and blockchain MVPs.&quot;
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border border-green-200 bg-green-50">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Clear Step-by-Step Guidance</h3>
                <p className="text-gray-600">Follow a proven roadmap from idea to launch with step-by-step clarity.</p>
              </CardContent>
            </Card>

            <Card className="p-6 border border-green-200 bg-green-50">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Actionable & Practical</h3>
                <p className="text-gray-600">Download and start applying actionable steps immediately.</p>
              </CardContent>
            </Card>

            <Card className="p-6 border border-green-200 bg-green-50">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Time-Saving Insights</h3>
                <p className="text-gray-600">Skip months of trial-and-error with a roadmap that works.</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="bg-green-500 rounded-2xl p-8 mt-16">
            <div className="text-center">
              <Button
                onClick={handleDirectDownload}
                className="bg-white text-green-500 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
              >
                <Download className="w-5 h-5 mr-2" />
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
    </div>
  );
}
