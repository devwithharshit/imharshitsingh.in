const { json, methodNotAllowed, readBody, noStore } = require("../_lib/http");
const { getAdminConfig } = require("../_lib/config");
const { getSessionFromRequest } = require("../_lib/auth");
const { estimateReadTime, readBlogs, saveBlogs } = require("../_lib/blogs");
const { slugify } = require("../_lib/slug");

function parseTags(raw) {
  if (Array.isArray(raw)) {
    return raw.map(function (tag) {
      return String(tag || "").trim();
    }).filter(Boolean);
  }

  return String(raw || "")
    .split(",")
    .map(function (tag) {
      return tag.trim();
    })
    .filter(Boolean);
}

module.exports = async function handler(req, res) {
  noStore(res);

  if (req.method !== "POST") {
    return methodNotAllowed(res, ["POST"]);
  }

  const admin = getAdminConfig();
  const session = getSessionFromRequest(req, admin.sessionSecret);

  if (!session) {
    return json(res, 401, {
      ok: false,
      error: "Unauthorized"
    });
  }

  try {
    const body = await readBody(req);
    const title = String(body.title || "").trim();
    const excerpt = String(body.excerpt || "").trim();
    const content = String(body.content || "").trim();
    const coverImage = String(body.coverImage || "").trim();
    const inputSlug = String(body.slug || "").trim();
    const slug = slugify(inputSlug || title);
    const tags = parseTags(body.tags);

    if (!title || !excerpt || !content) {
      return json(res, 400, {
        ok: false,
        error: "Title, excerpt and content are required"
      });
    }

    if (!slug) {
      return json(res, 400, {
        ok: false,
        error: "Could not create a valid slug"
      });
    }

    const doc = await readBlogs();

    const duplicate = doc.posts.some(function (post) {
      return post.slug === slug;
    });

    if (duplicate) {
      return json(res, 409, {
        ok: false,
        error: "A post with this slug already exists"
      });
    }

    let publishedAt = new Date().toISOString();
    if (body.publishedAt) {
      const parsedDate = new Date(body.publishedAt);
      if (Number.isNaN(parsedDate.getTime())) {
        return json(res, 400, {
          ok: false,
          error: "Invalid published date"
        });
      }
      publishedAt = parsedDate.toISOString();
    }

    const nextPost = {
      id: "post_" + Date.now(),
      title,
      slug,
      excerpt,
      content,
      publishedAt,
      updatedAt: publishedAt,
      readingTime: Number(body.readingTime || estimateReadTime(content)),
      tags,
      coverImage,
      published: true
    };

    const nextDoc = {
      ...doc,
      updatedAt: new Date().toISOString(),
      posts: [nextPost].concat(doc.posts)
    };

    await saveBlogs(nextDoc);

    return json(res, 201, {
      ok: true,
      post: nextPost,
      message: "Post published successfully"
    });
  } catch (error) {
    const details = process.env.NODE_ENV === "production" ? undefined : String(error.message || error);
    return json(res, 500, {
      ok: false,
      error: "Failed to publish blog",
      details
    });
  }
};
