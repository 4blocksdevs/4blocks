"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function ChecklistPage() {
  const [email, setEmail] = useState("");
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4 text-black">Get Your Free Checklist</h1>
      <p className="mb-6 text-black">Enter your email to receive the checklist instantly.</p>
      <form className="flex flex-col items-center gap-4 w-full max-w-sm">
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="focus:outline-none text-base border-[#9ED95D] border"
        />
        <Button type="submit" className="bg-[#9ED95D] text-black font-semibold px-4 py-2 w-full">
          Get Checklist
        </Button>
      </form>
      <div className="mt-8">
        <Image src="/check.svg" alt="Checklist" width={48} height={48} />
      </div>
    </div>
  );
}
