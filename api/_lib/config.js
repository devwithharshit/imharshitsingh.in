function getRepoConfig() {
  const owner = process.env.GITHUB_OWNER || "devwithharshit";
  const repo = process.env.GITHUB_REPO || "imharshitsingh.in";
  const branch = process.env.GITHUB_BRANCH || "main";
  const token = process.env.GITHUB_TOKEN || "";
  const dataPath = process.env.BLOG_DATA_PATH || "data/blogs.json";

  return {
    owner,
    repo,
    branch,
    token,
    dataPath,
    canWriteRemote: Boolean(token)
  };
}

function getAdminConfig() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "",
    sessionSecret: process.env.ADMIN_SESSION_SECRET || ""
  };
}

module.exports = {
  getRepoConfig,
  getAdminConfig
};
