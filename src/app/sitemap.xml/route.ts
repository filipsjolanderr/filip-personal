import { getBlogPosts } from "../blog/getPosts";

export async function GET() {
  const posts = await getBlogPosts();

  const blogUrls = posts.map((post) => ({
    url: `https://sjolander.dev${post.path}`,
    lastModified: post.date
      ? new Date(post.date).toISOString()
      : new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const urls = [
    {
      url: "https://sjolander.dev",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://sjolander.dev/blog",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://sjolander.dev/projects",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://sjolander.dev/resume",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...blogUrls,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
