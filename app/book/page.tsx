import CalendlyEmbed from "@/components/CalendlyEmbed";

export const metadata = {
  title: "Book a call | 4Blocks",
  description: "Schedule your MVP strategy call with 4Blocks.",
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Book your strategy call</h1>
      <p className="text-muted-foreground mb-6">
        Pick a time that works for you. Your UTM parameters will be preserved.
      </p>
      <CalendlyEmbed />
    </div>
  );
}
