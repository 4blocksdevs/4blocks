"use client";
import { useEffect } from "react";
import UniversalTracking from "@/lib/universal-tracking";
import UTMTracker from "@/lib/utm-tracker";

/**
 * PDFDownloadTracker
 * --------------------------------------
 * Automatically listens for clicks on <a> tags whose href ends with .pdf
 * and fires a unified tracking event through UniversalTracking (Meta Pixel via
 * standard + custom events; for PDFs we use trackCustom('DownloadPDF')).
 *
 * Enhancements:
 * - Supports custom attributes: data-download-type, data-lead-source, data-file-name
 * - Captures UTM attribution via existing UTMTracker
 * - Uses MutationObserver to catch dynamically added links
 * - Debounces duplicate listener attachment
 */
const PDFDownloadTracker = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Ensure UniversalTracking is initialized (it will early-return if already)
    try { UniversalTracking.initialize(); } catch {}

    const processedAttr = "data-pdf-listener-attached"; // flag to avoid duplicate listeners

    const attachListeners = (root: ParentNode | Document = document) => {
      const anchors = root.querySelectorAll<HTMLAnchorElement>('a[href$=".pdf"]');
      anchors.forEach((a) => {
        if (a.hasAttribute("data-skip-pdf-auto")) return; // programmatic helper already tracked
        if (a.hasAttribute(processedAttr)) return;
        a.setAttribute(processedAttr, "true");

        a.addEventListener("click", (e) => {
          try {
            const href = a.getAttribute("href") || "";
            // Ignore if no href
            if (!href) return;
            // Derive filename
            const url = new URL(href, window.location.origin);
            const fileName = a.getAttribute("data-file-name") || url.pathname.split("/").pop() || "download.pdf";
            const downloadType = a.getAttribute("data-download-type") || inferDownloadType(fileName);
            const leadSource = a.getAttribute("data-lead-source") || `pdf_${downloadType}`;

            // Track via central service
            UniversalTracking.trackPDFDownload(fileName, leadSource, downloadType);

            // Optional: If you wanted to guarantee beacon before navigation for same-origin direct loads
            // you could delay navigation slightly. Generally not needed for a direct file request.
          } catch (err) {
            console.warn("PDF tracking error", err);
          }
        }, { passive: true });
      });
    };

    // Heuristic to derive a semantic download type
    const inferDownloadType = (fileName: string): string => {
      const lower = fileName.toLowerCase();
      if (lower.includes("roadmap")) return "mvp_roadmap";
      if (lower.includes("checklist")) return "checklist";
      if (lower.includes("guide")) return "guide";
      return "pdf"; // fallback
    };

    // Initial attach
    attachListeners(document);

    // Observe DOM for newly added links
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // ELEMENT_NODE
            attachListeners(node as ParentNode);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default PDFDownloadTracker;
