import * as stylex from "@stylexjs/stylex";
import { Link } from "next-view-transitions";
import { headers } from "next/headers";
import { P } from "@/mdx-components";
import { fonts, spacing } from "../../vars.stylex";
import { getBlogPosts } from "@/lib/blog";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const slug = pathname.split("/").pop() ?? "";

  const posts = await getBlogPosts();
  const post = posts.find((p) => p.path === "/blog/" + slug);

  return (
    <>
      <div {...stylex.props(styles.topRow)}>
        <Link {...stylex.props(styles.backLink)} href="/blog">
          <span aria-hidden={true}>{"← "}</span>
          all posts
        </Link>
        {post != null && (
          <div {...stylex.props(styles.meta)}>
            <span {...stylex.props(styles.date)}>{post.date}</span>
            {post.readTime != null && (
              <span {...stylex.props(styles.readTime)}>
                {post.readTime} min read
              </span>
            )}
          </div>
        )}
      </div>
      <div>{children}</div>
    </>
  );
}

const styles = stylex.create({
  topRow: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: spacing.xl,
    marginInline: "auto",
    marginTop: spacing.xxl,
    maxWidth: "54rem",
    width: "100%",
  },
  backLink: {
    color: "light-dark(crimson, cornflowerblue)",
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textDecorationThickness: {
      default: "1px",
      "@media (min-resolution: 2dppx)": "0.5px",
      "@media (min-resolution: 3dppx)": "0.33px",
    },
    textTransform: "uppercase",
    textUnderlineOffset: "6px",
  },
  p: {
    marginBottom: spacing.xl,
    marginTop: spacing.xxl,
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    fontFamily: fonts.mono,
    gap: 2,
    textAlign: "right",
  },
  date: {
    opacity: 0.5,
  },
  readTime: {
    fontSize: "0.8em",
    fontWeight: 400,
    opacity: 0.4,
  },
});
