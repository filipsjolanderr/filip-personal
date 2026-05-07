import { getFeed } from "@/lib/feed";

export const GET = async function get() {
  let feed;
  try {
    feed = await getFeed();
  } catch (error) {
    console.error(error);
    return new Response("Error generating feed", {
      status: 500,
    });
  }

  return new Response(feed.json1(), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

export const dynamic = "force-static";
