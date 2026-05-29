(function () {
  function formatDate(value) {
    var date = new Date(value);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(date);
  }

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function markdownToHtml(markdown) {
    var safe = escapeHtml(markdown || "");

    var lines = safe.split(/\n/);
    var transformed = [];
    var inList = false;

    lines.forEach(function (line) {
      var trimmed = line.trim();

      if (!trimmed) {
        if (inList) {
          transformed.push("</ul>");
          inList = false;
        }
        return;
      }

      if (trimmed.startsWith("### ")) {
        if (inList) {
          transformed.push("</ul>");
          inList = false;
        }
        transformed.push("<h3>" + inlineFormat(trimmed.slice(4)) + "</h3>");
        return;
      }

      if (trimmed.startsWith("## ")) {
        if (inList) {
          transformed.push("</ul>");
          inList = false;
        }
        transformed.push("<h2>" + inlineFormat(trimmed.slice(3)) + "</h2>");
        return;
      }

      if (trimmed.startsWith("- ")) {
        if (!inList) {
          transformed.push("<ul>");
          inList = true;
        }
        transformed.push("<li>" + inlineFormat(trimmed.slice(2)) + "</li>");
        return;
      }

      if (trimmed.startsWith("> ")) {
        if (inList) {
          transformed.push("</ul>");
          inList = false;
        }
        transformed.push("<blockquote>" + inlineFormat(trimmed.slice(2)) + "</blockquote>");
        return;
      }

      if (inList) {
        transformed.push("</ul>");
        inList = false;
      }

      transformed.push("<p>" + inlineFormat(trimmed) + "</p>");
    });

    if (inList) {
      transformed.push("</ul>");
    }

    return transformed.join("");
  }

  function inlineFormat(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>");
  }

  async function requestJson(url) {
    var response = await fetch(url, {
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }

    return response.json();
  }

  async function fetchPosts() {
    try {
      var apiResult = await requestJson("/api/blogs");
      if (apiResult && apiResult.ok && Array.isArray(apiResult.posts)) {
        return apiResult.posts;
      }
      return [];
    } catch (_error) {
      try {
        var fallback = await requestJson("/data/blogs.json");
        return Array.isArray(fallback.posts) ? fallback.posts : [];
      } catch (_fallbackError) {
        return [];
      }
    }
  }

  function renderPostCard(post) {
    var cover = post.coverImage
      ? '<div class="blog-cover" style="background-image: url(\'' + escapeHtml(post.coverImage) + '\')"></div>'
      : '<div class="blog-cover" style="background-image: linear-gradient(140deg, rgba(47,109,246,0.36), rgba(23,173,150,0.34))"></div>';

    var tags = Array.isArray(post.tags) && post.tags.length
      ? " - " + post.tags.slice(0, 2).join(", ")
      : "";

    return [
      '<article class="blog-card reveal">',
      cover,
      '<div class="blog-body">',
      '<div class="blog-meta">' + formatDate(post.publishedAt) + " - " + (post.readingTime || 1) + " min" + tags + "</div>",
      '<h3>' + escapeHtml(post.title) + "</h3>",
      '<p>' + escapeHtml(post.excerpt || "") + "</p>",
      '<a href="post.html?slug=' + encodeURIComponent(post.slug) + '">Open Post</a>',
      "</div>",
      "</article>"
    ].join("");
  }

  async function initHomePreview() {
    var target = document.querySelector("[data-home-posts]");
    if (!target) {
      return;
    }

    var posts = await fetchPosts();
    if (!posts.length) {
      target.innerHTML = '<div class="empty-state">No blogs available yet.</div>';
      return;
    }

    target.innerHTML = posts.slice(0, 3).map(renderPostCard).join("");
    triggerReveal(target);
  }

  async function initWritingPage() {
    var target = document.querySelector("[data-writing-grid]");
    if (!target) {
      return;
    }

    var search = document.querySelector("[data-blog-search]");
    var posts = await fetchPosts();
    var activePosts = posts.slice();

    function renderList() {
      if (!activePosts.length) {
        target.innerHTML = '<div class="empty-state">No blogs matched your search.</div>';
        return;
      }

      target.innerHTML = activePosts.map(renderPostCard).join("");
      triggerReveal(target);
    }

    if (search) {
      search.addEventListener("input", function () {
        var query = String(search.value || "").toLowerCase().trim();
        if (!query) {
          activePosts = posts.slice();
          renderList();
          return;
        }

        activePosts = posts.filter(function (post) {
          var haystack = [post.title, post.excerpt, Array.isArray(post.tags) ? post.tags.join(" ") : ""]
            .join(" ")
            .toLowerCase();
          return haystack.includes(query);
        });

        renderList();
      });
    }

    renderList();
  }

  async function initPostPage() {
    var root = document.querySelector("[data-post-root]");
    if (!root) {
      return;
    }

    var params = new URLSearchParams(window.location.search);
    var slug = (params.get("slug") || "").trim();

    if (!slug) {
      root.innerHTML = '<div class="empty-state">Invalid post URL. Go back to writing and select a blog.</div>';
      return;
    }

    var post;
    try {
      var result = await requestJson("/api/blogs?slug=" + encodeURIComponent(slug));
      post = result.post;
    } catch (_error) {
      var posts = await fetchPosts();
      post = posts.find(function (item) {
        return item.slug === slug;
      });
    }

    if (!post) {
      root.innerHTML = '<div class="empty-state">Post not found.</div>';
      return;
    }

    document.title = post.title + " | Harshit Singh";

    var cover = post.coverImage
      ? '<div class="post-cover" style="background-image: url(\'' + escapeHtml(post.coverImage) + '\')"></div>'
      : "";

    var tags = Array.isArray(post.tags)
      ? post.tags.map(function (tag) {
          return '<span class="tag">' + escapeHtml(tag) + "</span>";
        }).join("")
      : "";

    root.innerHTML = [
      '<article class="post-article reveal">',
      cover,
      '<div class="post-content">',
      '<h1 class="post-title">' + escapeHtml(post.title) + "</h1>",
      '<div class="post-info"><span>' + formatDate(post.publishedAt) + '</span><span>' + (post.readingTime || 1) + ' min read</span></div>',
      '<div class="tags">' + tags + "</div>",
      '<div class="post-markdown">' + markdownToHtml(post.content || "") + "</div>",
      "</div>",
      "</article>"
    ].join("");

    var recent = document.querySelector("[data-recent-posts]");
    if (recent) {
      var posts = await fetchPosts();
      var top = posts.filter(function (item) {
        return item.slug !== slug;
      }).slice(0, 4);

      if (!top.length) {
        recent.innerHTML = '<li>No related posts yet.</li>';
      } else {
        recent.innerHTML = top.map(function (item) {
          return '<li><a href="post.html?slug=' + encodeURIComponent(item.slug) + '">' + escapeHtml(item.title) + '</a><time>' + formatDate(item.publishedAt) + "</time></li>";
        }).join("");
      }
    }

    triggerReveal(root);
  }

  function triggerReveal(scope) {
    var nodes = scope.querySelectorAll(".reveal");
    nodes.forEach(function (node) {
      node.classList.add("in");
    });
  }

  initHomePreview();
  initWritingPage();
  initPostPage();
})();
