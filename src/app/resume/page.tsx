import * as stylex from "@stylexjs/stylex";
import { H1 } from "../../mdx-components";
import { colors, fonts, spacing, text } from "../vars.stylex";

export default function ResumePage() {
  return (
    <div {...stylex.props(styles.container)}>
      <H1 xstyle={styles.title}>Resume</H1>
      <div {...stylex.props(styles.viewer)}>
        <object data="media/filip_sjolander.pdf" type="application/pdf" width="100%" height="100%">
          <iframe src="media/filip_sjolander.pdf" title="Resume PDF" width="100%" height="100%" />
        </object>
      </div>
      <div {...stylex.props(styles.actions)}>
        <a href="media/filip_sjolander.pdf" download {...stylex.props(styles.downloadLink)}>
          Download PDF
        </a>
        <span {...stylex.props(styles.note)}>If the PDF doesn&apos;t load, use the link above.</span>
      </div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    marginInline: "auto",
    maxWidth: "min(80rem, 100%)",
  },
  title: {
    marginBottom: spacing.md,
    textAlign: "center",
    textWrap: "balance",
  },
  viewer: {
    marginInline: "auto",
    backgroundColor: colors.surface0,
    borderColor: `color-mix(in oklch, ${colors.fg}, transparent 75%)`,
    borderRadius: 12,
    borderStyle: "solid",
    borderWidth: 1,
    height: {
      default: "100vh",
      "@media (max-width: 768px)": "75vh",
    },
    overflow: "hidden",
    width: "80%",
  },
  actions: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: spacing.sm,
    justifyContent: "center",
    marginTop: spacing.sm,
  },
  downloadLink: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    color: colors.bg,
    fontFamily: fonts.sans,
    fontSize: text.sm,
    fontWeight: 600,
    paddingBlock: spacing.xs,
    paddingInline: spacing.md,
    textDecoration: "none",
  },
  note: {
    color: colors.overlay1,
    fontSize: text.xs,
  },
});
