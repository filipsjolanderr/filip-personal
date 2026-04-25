"use client";

import React, { useState, useEffect, useRef } from 'react';
import * as stylex from "@stylexjs/stylex";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { colors } from '../vars.stylex';

// Support modern bundlers without throwing worker errors
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const styles = stylex.create({
  documentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: "transparent",
    paddingInline: "1rem", // Buffer to prevent completely hitting edges
  },
  page: {
    maxWidth: '100%',
    display: 'block',
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
    borderRadius: 8,
    overflow: 'hidden',
    border: `1px solid color-mix(in oklch, ${colors.fg}, transparent 80%)`,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4rem',
    color: colors.subtext0,
    minHeight: '800px',
  }
});

export default function ResumeViewer({ file }: { file: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number>();
  const [width, setWidth] = useState<number>(800);

  useEffect(() => {
    const currentContainer = containerRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target) {
          setWidth(entry.target.clientWidth);
        }
      }
    });

    if (currentContainer) {
      resizeObserver.observe(currentContainer);
      // set initial width
      setWidth(currentContainer.clientWidth);
    }

    return () => resizeObserver.disconnect();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  // Adjust page width to not exceed maximum 900px or full wrapper width minus padding
  const renderWidth = Math.min(width - 32, 900);

  return (
    <div ref={containerRef} {...stylex.props(styles.documentWrapper)}>
      <Document 
        file={file} 
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div {...stylex.props(styles.loadingContainer)}>Loading résumé...</div>}
        error={<div {...stylex.props(styles.loadingContainer)}>Failed to load PDF. Please use the download link.</div>}
      >
        {Array.from(new Array(numPages || 0), (el, index) => (
          <div key={`page_container_${index}`} style={{ marginBottom: "2rem" }}>
             <Page 
               key={`page_${index + 1}`} 
               pageNumber={index + 1} 
               width={renderWidth} 
               renderTextLayer={true}
               renderAnnotationLayer={true}
               className={(stylex.props(styles.page).className as string)}
             />
          </div>
        ))}
      </Document>
    </div>
  );
}
