(function () {
  var years = document.querySelectorAll("[data-year]");
  var currentYear = String(new Date().getFullYear());
  years.forEach(function (el) {
    el.textContent = currentYear;
  });

  var nav = document.getElementById("nav");
  var menuBtn = document.getElementById("menu-btn");
  var navLinks = document.getElementById("nav-links");
  var page = document.body.getAttribute("data-page");

  if (page) {
    var activeLink = document.querySelector('.nav-links a[data-page="' + page + '"]');
    if (activeLink) {
      activeLink.setAttribute("aria-current", "page");
    }
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.textContent = open ? "X" : "|||";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "|||";
      });
    });
  }

  if (nav) {
    window.addEventListener("scroll", function () {
      nav.classList.toggle("scrolled", window.scrollY > 10);
    });
  }

  var revealNodes = document.querySelectorAll(".reveal");
  if (!revealNodes.length) {
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
      threshold: 0.18,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealNodes.forEach(function (el) {
    observer.observe(el);
  });
})();
