"use client";
import UTMTracker from "@/lib/utm-tracker";

export interface BrevoSubscribeInput {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  lead_source?: string;
  tags?: string[];
  listIds?: number[];
}

export async function subscribeToBrevo(input: BrevoSubscribeInput): Promise<boolean> {
  try {
    const utm = UTMTracker.getAttribution() || {};
    const res = await fetch("/api/brevo-subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...input, utm }),
    });
    if (!res.ok) {
      console.warn("Brevo subscribe failed", await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.warn("Brevo subscribe exception", e);
    return false;
  }
}

export default subscribeToBrevo;
