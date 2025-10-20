"use client";
import Image from "next/image";
import React from "react";
import UniversalTracking from "@/lib/universal-tracking";

const Footer = () => {
  return (
    <footer className="bg-[#F3FFEF] text-white py-6">
      <div className="container max-w-5xl mx-auto px-2">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center mb-2">
              <div className="w-5 h-5 bg-[#9ED95D0a] rounded-lg flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="4Blocks Logo"
                  width={24}
                  height={24}
                />
              </div>
              <span className="ml-1 text-black text-base font-bold">
                BLOCKS
              </span>
            </div>
            <p className="text-black text-xs">
              Italian Software Solutions for Businesses
            </p>
          </div>

          <div>
            <h3 className="text-sm text-black font-semibold mb-2">CONTACTS</h3>
            <a
              href="mailto:info@4blocks.xyz"
              onClick={() =>
                UniversalTracking.trackContactClick("email", "footer")
              }
              className="text-black text-xs hover:underline"
            >
              info@4blocks.xyz
            </a>
            <div className="flex items-center mt-1">
              <Image
                src="/WhatsApp.svg"
                alt="WhatsApp"
                width={20}
                height={20}
                className="mr-1"
              />
              <a
                href="https://wa.me/393883786104"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  UniversalTracking.trackContactClick(
                    "phone",
                    "footer_whatsapp"
                  )
                }
                className="text-black text-xs hover:underline ml-1"
              >
                +39 388 378 6104
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-black font-semibold mb-2">POLICIES</h3>
            <div className="flex gap-1">
              <a
                href="/privacy-policy"
                className="block text-black hover:text-gray-700 transition-colors text-xs"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-conditions"
                className="block text-black hover:text-gray-700 transition-colors text-xs"
              >
                | Terms & Conditions
              </a>
              <a
                href="/cookies-policy"
                className="block text-black hover:text-gray-700 transition-colors text-xs"
              >
                | Cookies
              </a>
            </div>
          </div>
        </div>
        <div className="mt-24 text-center text-black text-xs mb-4">
          &copy; {new Date().getFullYear()} 4BLOCKS Software Development LLC.
          All rights reserved. Made in Italy.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
