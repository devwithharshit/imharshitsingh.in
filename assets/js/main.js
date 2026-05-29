(function () {
  function setYear() {
    document.querySelectorAll("[data-year]").forEach(function (node) {
      node.textContent = String(new Date().getFullYear());
    });
  }

  function markActivePage() {
    var page = document.body.getAttribute("data-page");
    if (!page) {
      return;
    }

    var link = document.querySelector('.nav-links a[data-page="' + page + '"]');
    if (link) {
      link.setAttribute("aria-current", "page");
    }
  }

  function setupMenu() {
    var button = document.getElementById("menu-toggle");
    var navLinks = document.getElementById("nav-links");
    if (!button || !navLinks) {
      return;
    }

    button.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.textContent = isOpen ? "X" : "|||";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        button.textContent = "|||";
      });
    });
  }

  function setupReveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (!nodes.length || !("IntersectionObserver" in window)) {
      nodes.forEach(function (node) {
        node.classList.add("in");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -36px 0px"
      }
    );

    nodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  setYear();
  markActivePage();
  setupMenu();
  setupReveal();
})();
