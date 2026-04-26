import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts, spacing, text } from "../vars.stylex";
import PdfViewerWrapper from "./PdfViewerWrapper";

export const metadata = {
  title: "CV",
  description: "CV of Filip Sjölander — Software Engineer",
};

export default function CVPage() {
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.layout)}>
        {/* PDF Viewer */}
        <div {...stylex.props(styles.viewerWrapper)}>
          <PdfViewerWrapper file="/media/filip_sjolander.pdf" />
        </div>

        {/* Download button — centered below the PDF */}
        <div {...stylex.props(styles.toolbar)}>
          <a
            href="/media/filip_sjolander.pdf"
            download
            {...stylex.props(styles.downloadBtn)}
          >
            <DownloadIcon />
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

const styles = stylex.create({
  container: {
    marginInline: "auto",
    maxWidth: "min(64rem, 100%)",
    paddingInline: spacing.md,
    paddingBottom: spacing.xxxl,
    fontFamily: fonts.sans,
    color: colors.fg,
  },
  layout: {
    marginInline: "auto",
    width: "70%",
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
    marginTop: spacing.md,
  },
  sidebar: {
    display: "none",
  },
  downloadBtn: {
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: 8,
    borderStyle: "none",
    color: colors.bg,
    cursor: "pointer",
    display: "inline-flex",
    flexShrink: 0,
    fontFamily: fonts.sans,
    fontSize: text.sm,
    fontWeight: 600,
    gap: spacing.xs,
    paddingBlock: spacing.sm,
    paddingInline: spacing.lg,
    textDecoration: "none",
    transition: "opacity 0.15s ease, transform 0.15s ease",
    ":hover": {
      opacity: 0.85,
      transform: "translateY(-1px)",
    },
    ":active": {
      transform: "translateY(0)",
    },
  },
  viewerWrapper: {
    borderRadius: 8,
    marginInline: "auto",
    overflow: "hidden",
    width: "100%",
    // Subtle border so the white PDF doesn't hard-edge against dark bg
    borderColor: `color-mix(in oklch, ${colors.fg}, transparent 88%)`,
    borderStyle: "solid",
    borderWidth: 1,
  },
});
