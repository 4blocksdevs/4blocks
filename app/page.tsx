import { Metadata } from "next";
import RootLayout from "@/components/RootLayout";
import LandingHero from "@/components/client/LandingHero";

export const metadata: Metadata = {
  title: "MVP Roadmap - Free Guide by 4Blocks",
  description:
    "Download our free MVP roadmap and learn the proven 7-step guide to launch a successful MVP without wasting time and money.",
};

export default function LandingPage() {
  return (
    <RootLayout
      clientProps={{
        pageTitle: "MVP Roadmap Landing Page",
        leadSource: "landing_page",
      }}
    >
      <LandingHero />
    </RootLayout>
  );
}
