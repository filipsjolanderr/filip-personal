import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { unstable_cache } from "next/cache";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const blogDir = path.join(__dirname, "(posts)");

export type Config = {
  title?: string;
  description?: string;
  date?: string;
  published?: boolean;
  tags?: string[];
  readTime?: number;
};

export const getBlogPosts = unstable_cache(async () => {
  const blogs = await fs.readdir(blogDir);

  // filter for only folders
  const blogsPathsAndTitles = blogs.map(async (blog) => {
    const blogPath = path.join(blogDir, blog);
    const stat = await fs.stat(blogPath);

    if (!stat.isDirectory()) {
      return null;
    }

    const filesWithinFolder = await fs.readdir(blogPath);
    if (!filesWithinFolder.includes("page.mdx")) {
      return null;
    }

    const filePath = path.join(blogPath, "page.mdx");
    const file = await fs.readFile(filePath, "utf-8");

    const lines = file.split("\n");
    const firstImport = lines.findIndex((line) => line.startsWith("import "));

    const relevantContent = lines.slice(0, firstImport).join("\n");

    const { metadata }: { metadata?: Config } = (await evaluate(
      relevantContent,
      { ...runtime }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    )) as any;

    if (metadata == null) {
      return null;
    }

    // Estimate read time from the full file content
    const plainText = file
      .replace(/^export\s+const\s+\w+\s*=[^;]*;/gm, "") // strip export statements
      .replace(/<[^>]+>/g, " ") // strip JSX tags
      .replace(/```[\s\S]*?```/g, " ") // strip code blocks
      .replace(/`[^`]*`/g, " ") // strip inline code
      .replace(/import\s+.*?;/g, " "); // strip imports
    const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return { ...metadata, path: "/blog/" + blog, readTime };
  });
  const maybePostsResolved = await Promise.all(blogsPathsAndTitles);

  return maybePostsResolved
    .filter((post) => post !== null)
    .sort((a, b) =>
      a.date != null && b.date != null ? b.date.localeCompare(a.date) : 0
    );
});
