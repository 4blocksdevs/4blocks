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
