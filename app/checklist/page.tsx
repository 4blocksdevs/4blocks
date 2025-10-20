import ChecklistContent from "@/components/client/ChecklistContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free MVP Checklist - Essential Guide for Founders",
  description: "Download our comprehensive MVP checklist with 40+ essential checkpoints for successfully validating and launching your MVP.",
};

export default function ChecklistPage() {
  return <ChecklistContent />;
}