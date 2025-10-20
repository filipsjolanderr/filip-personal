import * as stylex from "@stylexjs/stylex";
import { Link } from "next-view-transitions";
import { H1, P } from "../../mdx-components";
import { colors, fonts, spacing, text } from "../vars.stylex";

type Project = {
  name: string;
  repo: string;
  description: string;
  accent: string;
};

const projects: Project[] = [
  {
    name: "Matlåda?",
    repo: "https://github.com/filipsjolanderr/matlada",
    description: `
    A web app for sharing your weekly meal planning with your team.
    `.trim(),
    accent: colors.blue,
  }
];

export default function Projects() {
  return (
    <div>
      <H1 xstyle={styles.h1}>Projects</H1>

      <ul {...stylex.props(styles.list)}>
        {projects.map((proj) => (
          <li key={proj.repo} {...stylex.props(styles.item)}>
            <div {...stylex.props(styles.itemInner)}>
              <div {...stylex.props(styles.accent(proj.accent))} />
              <div {...stylex.props(styles.content)}>
                <div {...stylex.props(styles.titleRow)}>
                  <Link
                    {...stylex.props(styles.title)}
                    href={proj.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {proj.name}
                  </Link>
                  <a
                    {...stylex.props(styles.repoLink)}
                    href={proj.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github ↗
                  </a>
                </div>
                <P xstyle={styles.desc}>{proj.description}</P>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = stylex.create({
  h1: {
    marginBottom: spacing.xl,
    textAlign: "center",
    textWrap: "balance",
  },
  list: {
    borderBottomColor: `color-mix(in oklch, ${colors.fg}, transparent 75%)`,
    borderBottomStyle: "solid",
    borderBottomWidth: {
      default: 1,
      "@media (min-resolution: 2dppx)": 0.5,
      "@media (min-resolution: 3dppx)": 0.33,
    },
    listStyle: "none",
    margin: 0,
    marginInline: "auto",
    maxWidth: "min(56rem, 100%)",
    padding: 0,
    width: "100%",
  },
  item: {
    borderTopColor: `color-mix(in oklch, ${colors.fg}, transparent 75%)`,
    borderTopStyle: "solid",
    borderTopWidth: {
      default: 1,
      "@media (min-resolution: 2dppx)": 0.5,
      "@media (min-resolution: 3dppx)": 0.33,
    },
    margin: 0,
    paddingBlock: spacing.md,
  },
  itemInner: {
    alignItems: "flex-start",
    display: "grid",
    gap: spacing.md,
    gridTemplateColumns: "8px 1fr",
  },
  accent: (bg: string) => ({
    backgroundColor: bg,
    borderRadius: 999,
    height: "calc(100% - 6px)",
    marginBlock: 3,
    width: 4,
  }),
  content: {
    minWidth: 0,
  },
  titleRow: {
    alignItems: "baseline",
    display: "flex",
    gap: spacing.sm,
    width: "100%",
  },
  title: {
    color: {
      default: colors.fg,
      ":hover": colors.accent,
      ":focus": colors.accent,
    },
    fontSize: text.h4,
    fontWeight: 800,
    lineHeight: 0.95,
    textDecoration: "none",
    textTransform: "uppercase",
  },
  repoLink: {
    color: colors.overlay1,
    fontFamily: fonts.mono,
    fontSize: text.xs,
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textUnderlineOffset: "3px",
    whiteSpace: "nowrap",
  },
  desc: {
    lineHeight: 1.2,
    marginInline: 0,
    marginTop: spacing.xxs,
    maxWidth: "none",
    opacity: 0.7,
  },
});
