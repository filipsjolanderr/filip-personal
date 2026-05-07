import { Feed } from "feed";
import { getBlogPosts } from "./blog";

export async function getFeed() {
  const siteURL = "https://sjolander.dev";
  const feedOptions = {
    title: "sjolander.dev",
    language: "en",
    id: siteURL,
    link: siteURL,
    description: "Filip Sjölander's blog",
    // image: `${siteURL}/og.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Filip Sjölander`,
    author: {
      name: "Filip Sjölander",
      link: `${siteURL}/blog`,
    },
  };
  const feed = new Feed(feedOptions);
  try {
    const posts = await getBlogPosts();

    posts.forEach((post) => {
      const { title, path, description = "", date = "" } = post;

      if (title == null || path == null) {
        return;
      }

      feed.addItem({
        title,
        id: path,
        link: `${siteURL}${path}`,
        description,
        content: description,
        date: new Date(date),
        author: [feedOptions.author],
      });
    });

    return feed;
  } catch (error) {
    console.error(error);
    return feed;
  }
}
