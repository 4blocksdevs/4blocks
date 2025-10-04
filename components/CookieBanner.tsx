"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Cookie, Settings, Info } from "lucide-react";
import Link from "next/link";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(cookieConsent);
      setPreferences(savedPreferences);
      initializeTracking(savedPreferences);
    }
  }, []);

  const initializeTracking = (prefs: CookiePreferences) => {
    if (typeof window !== "undefined") {
      // Initialize Google Analytics if analytics cookies accepted
      if (prefs.analytics) {
        window.gtag =
          window.gtag ||
          function () {
            (window.dataLayer = window.dataLayer || []).push(arguments);
          };
        window.gtag("js", new Date());
        window.gtag("config", "G-CC9W51TKC8", {
          anonymize_ip: true,
          cookie_expires: 63072000, // 2 years
        });
      }

      // Initialize Meta Pixel if marketing cookies accepted
      if (prefs.marketing) {
        (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
          if (f.fbq) return;
          n = f.fbq = function () {
            n.callMethod
              ? n.callMethod.apply(n, arguments)
              : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = !0;
          n.version = "2.0";
          n.queue = [];
          t = b.createElement(e);
          t.async = !0;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s);
        })(
          window,
          document,
          "script",
          "https://connect.facebook.net/en_US/fbevents.js"
        );

        window.fbq("init", "YOUR_PIXEL_ID");
        window.fbq("track", "PageView");
      }
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    initializeTracking(allAccepted);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    initializeTracking(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    localStorage.setItem("cookie-consent", JSON.stringify(essentialOnly));
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2">
      <Card className="max-w-2xl mx-auto shadow-lg border border-gray-200 bg-white">
        <CardContent className="p-3">
          {!showSettings ? (
            // Main banner
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-[#9ED95D]" />
                  <h3 className="text-base font-semibold text-black">
                    We value your{" "}
                    <span className="text-[#9ED95D]">privacy</span>
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBanner(false)}
                  className="text-black hover:text-black"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-black mb-2 text-xs">
                We use cookies to enhance your browsing experience, serve
                personalized ads or content, and analyze our traffic. <br />
                By clicking &quot;Accept All,&quot; you consent to our use of
                cookies. You can also choose &quot;Reject All&quot; or
                &quot;Customize Settings&quot; to control your preferences.
              </p>
              <div className="text-xs text-black mb-3">
                Read our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[#9ED95D] hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/cookies-policy"
                  className="text-[#9ED95D] hover:underline"
                >
                  Cookies Policy
                </Link>{" "}
                for more information.
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleAcceptAll}
                  className="bg-[#9ED95D] hover:bg-[#8BC34A] text-black text-xs px-3 "
                >
                  Accept All
                </Button>
                <Button
                  onClick={handleRejectAll}
                  variant="outline"
                  className="border-gray-300 text-black hover:bg-gray-50 text-xs px-3 "
                >
                  Reject All
                </Button>
                <Button
                  onClick={() => setShowSettings(true)}
                  variant="outline"
                  className="border-gray-300 text-[#9ED95D] hover:bg-gray-50 text-xs px-3 "
                >
                  <Settings className="w-3 h-3 mr-1" />
                  Customize Settings
                </Button>
              </div>
            </div>
          ) : (
            // Settings panel
            <div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm font-semibold text-black">
                  Customize Settings
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                  className="text-black hover:text-black"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-[#F0FFDF] rounded-lg">
                  <div>
                    <h4 className="font-medium text-black text-xs">
                      Necessary Cookies
                    </h4>
                    <p className="text-[10px] text-black">
                      These cookies are essential for the website to function
                      and cannot be switched off in our systems. They are
                      usually only set in response to actions you take, such as
                      setting your privacy preferences, logging in, or filling
                      out forms. Without these cookies, parts of our site will
                      not work properly.
                    </p>
                  </div>
                  <div className="grid place-items-center grid-cols-2">
                    <input
                      type="checkbox"
                      checked={preferences.essential}
                      disabled
                      className="w-3 h-3 text-[#9ED95D] border-gray-300 rounded focus:ring-[#9ED95D]"
                    />
                    <span className="inline-block text-[10px] text-[#9ED95D] p-1 font-semibold mt-0.5">
                      Always Active
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#F0FFDF] rounded-lg">
                  <div>
                    <h4 className="font-medium text-black text-xs">
                      Analytics Cookies
                    </h4>
                    <p className="text-[10px] text-black">
                      These cookies help us understand how visitors interact
                      with our website. We use them to count visits, measure
                      traffic sources, and improve our performance. They show us
                      which pages are most and least popular and how visitors
                      move around the site.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          analytics: e.target.checked,
                        })
                      }
                      className="w-3 h-3 text-[#9ED95D] border-gray-300 rounded focus:ring-[#9ED95D] mx-2"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#F0FFDF] rounded-lg ">
                  <div>
                    <h4 className="font-medium text-black text-xs">
                      Marketing Cookies
                    </h4>
                    <p className="text-[10px] text-black">
                      These cookies may be set by our advertising and marketing
                      partners, such as Meta (Facebook) and HubSpot. They may be
                      used to build a profile of your interests, deliver
                      relevant advertising on other websites, and measure the
                      effectiveness of campaigns.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          marketing: e.target.checked,
                        })
                      }
                      className="w-3 h-3 text-[#9ED95D] border-gray-300 rounded focus:ring-[#9ED95D] mx-2"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#F0FFDF] rounded-lg ">
                  <div>
                    <h4 className="font-medium text-black text-xs">
                      Functional Cookies
                    </h4>
                    <p className="text-[10px] text-black">
                      These cookies enable enhanced functionality and
                      personalization, such as remembering your preferences or
                      integrating with third-party services. If you do not allow
                      these cookies, some or all of these services may not
                      function properly.
                    </p>
                  </div>
                  <div className="flex mx-2 items-center">
                    <input
                      type="checkbox"
                      checked={false}
                      disabled
                      className="w-3 h-3 text-[#9ED95D] border-gray-300 rounded focus:ring-[#9ED95D] opacity-50 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-3">
                <Button
                  onClick={() => setShowSettings(false)}
                  className="bg-[#9ED95D] hover:bg-[#8BC34A] text-white text-xs px-3 "
                >
                  Back
                </Button>
                <Button
                  onClick={handleAcceptSelected}
                  variant="outline"
                  className="border-gray-300 text-black hover:bg-gray-50 text-xs px-3 "
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
