"use client";
import UniversalTracking from "@/lib/universal-tracking";

export interface TrackPDFOptions {
  filePath: string;
  fileName?: string;
  leadSource?: string;
  downloadType?: string;
  autoClick?: boolean; // default true
}

export function trackAndDownloadPDF({
  filePath,
  fileName,
  leadSource = "pdf_download",
  downloadType = "pdf",
  autoClick = true,
}: TrackPDFOptions): void {
  try {
    const inferredName = fileName || filePath.split("/").pop() || "download.pdf";
    UniversalTracking.trackPDFDownload(inferredName, leadSource, downloadType);

    // Send UTM data to Brevo (if email is available in window or session)
  let email: string | undefined = undefined;
    // Try to get email from global context, session, or prompt (customize as needed)
    if (typeof window !== "undefined") {
  const sessionEmail = window.sessionStorage?.getItem("lead_email");
  const localEmail = window.localStorage?.getItem("lead_email");
  email = sessionEmail ?? localEmail ?? undefined;
    }
    if (email) {
      // Dynamically import to avoid SSR issues
      import("@/lib/brevo-client")
        .then((mod) => {
          // Some builds use default, some named export
          const fn = mod.subscribeToBrevo || mod.default;
          if (typeof fn === "function") {
            fn({
              email: email ?? "",
              lead_source: leadSource,
              tags: [downloadType],
            });
          } else {
            console.warn("Brevo subscribeToBrevo not found in module", mod);
          }
        })
        .catch((err) => {
          console.warn("Brevo dynamic import failed", err);
        });
    }

    if (!autoClick) return;

    const a = document.createElement("a");
    a.href = filePath;
    a.download = inferredName;
    // Mark so auto listener skips it
    a.setAttribute("data-skip-pdf-auto", "true");
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    console.warn("trackAndDownloadPDF error", err);
  }
}

export default trackAndDownloadPDF;
