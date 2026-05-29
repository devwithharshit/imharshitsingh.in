const { json, methodNotAllowed, noStore } = require("./_lib/http");
const { readBlogs } = require("./_lib/blogs");

module.exports = async function handler(req, res) {
  noStore(res);

  if (req.method !== "GET") {
    return methodNotAllowed(res, ["GET"]);
  }

  try {
    const doc = await readBlogs();
    const searchParams = new URL(req.url, "https://imharshitsingh.in").searchParams;
    const slug = (searchParams.get("slug") || "").trim();

    const publishedPosts = doc.posts
      .filter(function (post) {
        return post.published !== false;
      })
      .sort(function (left, right) {
        return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
      });

    if (slug) {
      const post = publishedPosts.find(function (item) {
        return item.slug === slug;
      });

      if (!post) {
        return json(res, 404, {
          ok: false,
          error: "Post not found"
        });
      }

      return json(res, 200, {
        ok: true,
        post
      });
    }

    return json(res, 200, {
      ok: true,
      posts: publishedPosts.map(function (post) {
        return {
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          publishedAt: post.publishedAt,
          readingTime: post.readingTime,
          tags: post.tags,
          coverImage: post.coverImage
        };
      })
    });
  } catch (error) {
    return json(res, 500, {
      ok: false,
      error: "Failed to fetch blogs",
      details: process.env.NODE_ENV === "production" ? undefined : String(error.message || error)
    });
  }
};
