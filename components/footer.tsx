"use client"
import Image from 'next/image';
import React from 'react'

const Footer = () => {
  return (
    < footer className = "bg-[#F3FFEF] text-white py-12" >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-[#9ED95D0a] rounded-lg flex items-center justify-center">
 <Image
              src="/logo.svg"
              alt="4Blocks Logo"
              width={48}
              height={48}
                />
              </div>
              <span className="ml-2 text-black text-2xl font-bold">BLOCKS</span>
            </div>
            <p className="text-black">Italian Software Solutions for Businesses</p>
          </div>

          <div>
            <h3 className="text-lg text-black font-semibold mb-4">CONTACTS</h3>
            <p className="text-black">info@4blocks.xyz</p>
          </div>

          <div>
            <h3 className="text-lg text-black font-semibold mb-4">POLICIES</h3>
            <div className="flex gap-2">
              <a href="/privacy-policy" className="block text-black hover:text-gray-700 transition-colors">Privacy Policy</a> 
              <a href="/terms-conditions" className="block text-black hover:text-gray-700 transition-colors">| Terms & Conditions</a>
              <a href="/cookies-policy" className="block text-black hover:text-gray-700 transition-colors">| Cookies</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-black">
          &copy; {new Date().getFullYear()} 4BLOCKS Software Development LLC. All rights reserved. Made in Italy.
        </div>
      </div>
        </footer >
  )
}

export default Footer;
