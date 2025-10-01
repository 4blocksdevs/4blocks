"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function ChecklistThankYouPage() {
  const [email, setEmail] = useState("");
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4 text-black">Thank You!</h1>
      <p className="mb-6 text-black">Your checklist is on its way. Check your inbox.</p>
      <div className="mt-8">
        <Image src="/check.svg" alt="Checklist Sent" width={48} height={48} />
      </div>
      <form className="flex flex-col items-center gap-4 w-full max-w-sm mt-8">
        <Input
          id="email"
          type="email"
          placeholder="Email (resend)"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="focus:outline-none text-base border-[#9ED95D] border"
        />
        <Button type="submit" className="bg-[#9ED95D] text-black font-semibold px-4 py-2 w-full">
          Resend Checklist
        </Button>
      </form>
    </div>
  );
}
