const fs = require("fs/promises");
const path = require("path");
const { getRepoConfig } = require("./config");

function normalizeBlogDocument(input) {
  const base = input && typeof input === "object" ? input : {};
  const posts = Array.isArray(base.posts) ? base.posts : [];

  return {
    version: 1,
    updatedAt: base.updatedAt || new Date().toISOString(),
    posts: posts.map(sanitizePost).filter(Boolean)
  };
}

function sanitizePost(post) {
  if (!post || typeof post !== "object") {
    return null;
  }

  const title = String(post.title || "").trim();
  const slug = String(post.slug || "").trim();

  if (!title || !slug) {
    return null;
  }

  const tags = Array.isArray(post.tags)
    ? post.tags.map(function (tag) {
      return String(tag).trim();
    }).filter(Boolean)
    : [];

  return {
    id: String(post.id || slug),
    title,
    slug,
    excerpt: String(post.excerpt || "").trim(),
    content: String(post.content || "").trim(),
    publishedAt: post.publishedAt || new Date().toISOString(),
    updatedAt: post.updatedAt || post.publishedAt || new Date().toISOString(),
    readingTime: Number(post.readingTime || estimateReadTime(post.content || "")),
    tags,
    coverImage: String(post.coverImage || "").trim(),
    published: post.published !== false
  };
}

function estimateReadTime(content) {
  const words = String(content || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function localFilePath() {
  const config = getRepoConfig();
  return path.join(process.cwd(), config.dataPath);
}

async function readLocalBlogs() {
  const file = localFilePath();
  const raw = await fs.readFile(file, "utf8");
  return normalizeBlogDocument(JSON.parse(raw));
}

async function writeLocalBlogs(payload) {
  const file = localFilePath();
  const normalized = normalizeBlogDocument(payload);
  normalized.updatedAt = new Date().toISOString();
  await fs.writeFile(file, JSON.stringify(normalized, null, 2) + "\n", "utf8");
  return normalized;
}

async function githubFetch(pathname, init) {
  const response = await fetch("https://api.github.com" + pathname, init);
  if (!response.ok) {
    const bodyText = await response.text();
    const error = new Error("GitHub API request failed");
    error.status = response.status;
    error.payload = bodyText;
    throw error;
  }
  return response.json();
}

function githubHeaders(token) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: "Bearer " + token,
    "X-GitHub-Api-Version": "2022-11-28"
  };
}

async function readRemoteBlogs(config) {
  const encodedPath = encodeURIComponent(config.dataPath).replace(/%2F/g, "/");
  const result = await githubFetch(
    "/repos/" + config.owner + "/" + config.repo + "/contents/" + encodedPath + "?ref=" + encodeURIComponent(config.branch),
    {
      method: "GET",
      headers: githubHeaders(config.token)
    }
  );

  const decoded = Buffer.from(String(result.content || "").replace(/\n/g, ""), "base64").toString("utf8");
  const doc = normalizeBlogDocument(JSON.parse(decoded));

  return {
    doc,
    sha: result.sha
  };
}

async function writeRemoteBlogs(config, payload, existingSha) {
  const encodedPath = encodeURIComponent(config.dataPath).replace(/%2F/g, "/");
  const normalized = normalizeBlogDocument(payload);
  normalized.updatedAt = new Date().toISOString();

  const body = {
    message: "content: publish blog via admin",
    content: Buffer.from(JSON.stringify(normalized, null, 2) + "\n", "utf8").toString("base64"),
    branch: config.branch,
    sha: existingSha,
    committer: {
      name: "Harshit Blog Bot",
      email: "noreply@imharshitsingh.in"
    }
  };

  await githubFetch(
    "/repos/" + config.owner + "/" + config.repo + "/contents/" + encodedPath,
    {
      method: "PUT",
      headers: {
        ...githubHeaders(config.token),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  );

  return normalized;
}

async function readBlogs() {
  const config = getRepoConfig();

  if (config.canWriteRemote) {
    const remote = await readRemoteBlogs(config);
    return remote.doc;
  }

  return readLocalBlogs();
}

async function saveBlogs(nextDoc) {
  const config = getRepoConfig();

  if (config.canWriteRemote) {
    const remote = await readRemoteBlogs(config);
    return writeRemoteBlogs(config, nextDoc, remote.sha);
  }

  return writeLocalBlogs(nextDoc);
}

module.exports = {
  normalizeBlogDocument,
  sanitizePost,
  estimateReadTime,
  readBlogs,
  saveBlogs
};
