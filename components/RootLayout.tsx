import { ReactNode } from "react";
import ClientLayout from "@/components/client/ClientLayout";

interface RootLayoutProps {
  children: ReactNode;
  clientProps?: {
    pageTitle: string;
    leadSource: string;
  };
}

export default function RootLayout({ children, clientProps }: RootLayoutProps) {
  return (
    <ClientLayout trackingData={clientProps}>
      <div className="min-h-screen bg-white">{children}</div>
    </ClientLayout>
  );
}
