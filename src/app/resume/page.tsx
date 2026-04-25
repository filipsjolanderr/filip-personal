import React from "react";
import * as stylex from "@stylexjs/stylex";
import { H1 } from "../../mdx-components";
import { colors, fonts, spacing, text } from "../vars.stylex";
import CVViewer from "./CVViewerWrapper";

export const metadata = {
  title: "CV",
  description: "CV of Filip Sjölander",
};

export default function CVPage() {
  return (
    <div {...stylex.props(styles.container)}>
      <H1 xstyle={styles.title}>CV</H1>

      <div {...stylex.props(styles.viewer)}>
        <CVViewer file="/media/filip_sjolander.pdf" />
      </div>

      <div {...stylex.props(styles.actions)}>
        <a href="/media/filip_sjolander.pdf" download {...stylex.props(styles.downloadLink)}>
          Download as PDF
        </a>
      </div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    marginInline: "auto",
    maxWidth: "min(65rem, 100%)",
    paddingBottom: spacing.xxxl,
    fontFamily: fonts.sans,
    color: colors.fg,
  },
  title: {
    marginBottom: spacing.xxl,
    textAlign: "center",
    textWrap: "balance",
    fontSize: text.h1,
    letterSpacing: "-0.02em",
  },
  viewer: {
    marginInline: "auto",
    width: "100%",
    marginBottom: spacing.xxxl,
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: `color-mix(in oklch, ${colors.fg}, transparent 85%)`,
  },
  downloadLink: {
    backgroundColor: colors.surface0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: `color-mix(in oklch, ${colors.fg}, transparent 75%)`,
    borderRadius: 8,
    color: colors.fg,
    fontFamily: fonts.sans,
    fontSize: text.sm,
    fontWeight: 600,
    paddingBlock: spacing.sm,
    paddingInline: spacing.lg,
    textDecoration: "none",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: colors.accent,
      color: colors.bg,
      borderColor: colors.accent,
    }
  },
});
