"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Point pdfjs worker at the bundled worker served from public/
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface PdfViewerProps {
  file: string;
}

export default function PdfViewer({ file }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(node);
    setContainerWidth(node.clientWidth);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", overflowY: "auto", overflowX: "hidden" }}
    >
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={
          <div style={{ padding: "2rem", textAlign: "center", opacity: 0.5 }}>
            Loading PDF…
          </div>
        }
        error={
          <div style={{ padding: "2rem", textAlign: "center", opacity: 0.5 }}>
            Failed to load PDF.{" "}
            <a href={file} style={{ color: "inherit", textDecoration: "underline" }}>
              Download instead
            </a>
          </div>
        }
      >
        {Array.from({ length: numPages }, (_, i) => (
          <Page
            key={`page_${i + 1}`}
            pageNumber={i + 1}
            width={containerWidth}
            renderAnnotationLayer
            renderTextLayer
          />
        ))}
      </Document>
    </div>
  );
}
