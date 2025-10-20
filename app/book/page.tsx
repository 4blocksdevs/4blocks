import BookContent from "@/components/client/BookContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free MVP Strategy Session - 4Blocks",
  description: "Schedule a free consultation to discuss your MVP development needs with our experts.",
};

export default function BookPage() {
  return <BookContent />;
}