(function () {
  var loginForm = document.querySelector("[data-admin-login-form]");
  var publishForm = document.querySelector("[data-admin-publish-form]");
  var loginState = document.querySelector("[data-login-state]");
  var publishState = document.querySelector("[data-publish-state]");
  var authArea = document.querySelector("[data-auth-area]");
  var editorArea = document.querySelector("[data-editor-area]");
  var logoutButtons = document.querySelectorAll("[data-admin-logout]");

  function setStatus(node, message, type) {
    if (!node) {
      return;
    }

    node.textContent = message || "";
    node.classList.remove("error", "success");
    if (type) {
      node.classList.add(type);
    }
  }

  async function request(url, options) {
    var response = await fetch(url, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      ...options
    });

    var payload = await response.json().catch(function () {
      return {};
    });

    return {
      ok: response.ok,
      status: response.status,
      payload: payload
    };
  }

  function toggleAuthenticated(isAuthenticated) {
    if (!authArea || !editorArea) {
      return;
    }

    authArea.classList.toggle("hidden", isAuthenticated);
    editorArea.classList.toggle("hidden", !isAuthenticated);
  }

  async function checkSession() {
    var result = await request("/api/admin/session", {
      method: "GET"
    });

    toggleAuthenticated(result.ok && result.payload && result.payload.authenticated);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      setStatus(loginState, "Authenticating...");

      var username = loginForm.querySelector("[name='username']").value;
      var password = loginForm.querySelector("[name='password']").value;

      var result = await request("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ username: username, password: password })
      });

      if (!result.ok) {
        setStatus(loginState, (result.payload && result.payload.error) || "Login failed.", "error");
        return;
      }

      setStatus(loginState, "Logged in.", "success");
      loginForm.reset();
      toggleAuthenticated(true);
    });
  }

  if (publishForm) {
    publishForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      setStatus(publishState, "Publishing post...");

      var formData = new FormData(publishForm);
      var payload = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        excerpt: formData.get("excerpt"),
        content: formData.get("content"),
        tags: formData.get("tags"),
        coverImage: formData.get("coverImage"),
        publishedAt: formData.get("publishedAt")
      };

      var result = await request("/api/admin/publish", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      if (!result.ok) {
        setStatus(publishState, (result.payload && result.payload.error) || "Publish failed.", "error");
        return;
      }

      setStatus(
        publishState,
        "Published successfully. Vercel redeploy will start automatically after GitHub commit update.",
        "success"
      );
      publishForm.reset();
    });
  }

  logoutButtons.forEach(function (button) {
    button.addEventListener("click", async function () {
      var result = await request("/api/admin/logout", {
        method: "POST"
      });

      if (result.ok) {
        toggleAuthenticated(false);
        setStatus(loginState, "Logged out.", "success");
      }
    });
  });

  checkSession().catch(function () {
    toggleAuthenticated(false);
  });
})();
