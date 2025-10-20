import ThankYouContent from "@/components/client/ThankYouContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You - MVP Roadmap Download",
  description: "Thank you for downloading our MVP roadmap. Book your free consultation to learn how to implement it successfully.",
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}