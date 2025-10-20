"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function SocialProof() {
  const testimonials = [
    {
      name: "Marco B.",
      role: "Startup Founder",
      company: "TechVentures",
      quote:
        "4Blocks helped us save €40,000 in development costs by identifying the right MVP scope.",
      image: "/testimonials/avatar1.svg",
    },
    {
      name: "Laura S.",
      role: "Product Manager",
      company: "InnovateLab",
      quote:
        "Their technical review prevented us from making a €25,000 architectural mistake.",
      image: "/testimonials/avatar2.svg",
    },
  ];

  const stats = [
    { number: "47+", label: "MVPs Launched" },
    { number: "€2.1M", label: "Client Savings" },
    { number: "92%", label: "Success Rate" },
  ];

  return (
    <div className="py-8">
      {/* Success Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold text-[#9ED95D]">
              {stat.number}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Client Testimonials */}
      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="border border-[#9ED95D]/20 bg-white/50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#9ED95D]/10 flex items-center justify-center">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    {testimonial.quote}
                  </p>
                  <div className="text-sm font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="flex justify-center items-center space-x-6 mt-8">
        <div className="flex items-center space-x-2">
          <Image src="/badges/secure.svg" alt="Secure" width={20} height={20} />
          <span className="text-xs text-gray-600">100% Secure</span>
        </div>
        <div className="flex items-center space-x-2">
          <Image
            src="/badges/satisfaction.svg"
            alt="Satisfaction"
            width={20}
            height={20}
          />
          <span className="text-xs text-gray-600">Satisfaction Guaranteed</span>
        </div>
        <div className="flex items-center space-x-2">
          <Image
            src="/badges/trusted.svg"
            alt="Trusted"
            width={20}
            height={20}
          />
          <span className="text-xs text-gray-600">
            Trusted by 200+ Startups
          </span>
        </div>
      </div>
    </div>
  );
}
