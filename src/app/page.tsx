import * as stylex from "@stylexjs/stylex";
import Logo from "./Logo";
import { Link } from "next-view-transitions";
import { spacing } from "./vars.stylex";

export default function Home() {
  return (
    <div>
      <header {...stylex.props(styles.header)}>
        <Logo style={styles.logo} src="/logo-expanded-2.svg" />
        <nav {...stylex.props(styles.nav)}>
          <Link {...stylex.props(styles.navLink)} href="/blog">
            Blog
          </Link>
          <Link {...stylex.props(styles.navLink)} href="/projects">
            Projects
          </Link>
          <Link {...stylex.props(styles.navLink)} href="/resume">
            Resume
          </Link>
        </nav>
      </header>
      <main></main>
    </div>
  );
}

const styles = stylex.create({
  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 32,
    justifyContent: "center",
    minHeight: {
      default: "calc(90vh - 54px)",
      "@supports (height: 100dvh)": "calc(90dvh - 54px)",
    },
    paddingBlock: spacing.sm,
  },
  h3: {
    fontSize: "2rem",
    fontWeight: 200,
    margin: 0,
  },
  logo: {
    height: {
      default: "20rem",
      "@media (max-width: 900px)": "10rem",
      "@media (max-width: 480px)": "5rem",
    },
    maxWidth: "100%",
    transform: "translateX(1.5%)",
  },
  nav: {
    display: "flex",
    gap: 48,
  },
  navLink: {
    color: "light-dark(crimson, cornflowerblue)",
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textTransform: "uppercase",
    textUnderlineOffset: "8px",
  },
});
