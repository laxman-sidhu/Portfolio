/* ============================================================
   main.js — shared site behaviour
   ============================================================ */
(function () {
  // Navbar: on the home page it hides under the hero and slides up to stick;
  // on other pages it's a normal sticky bar that gains a shadow on scroll.
  var navbar = document.getElementById('navbar');
  var hero = document.getElementById('hero');
  if (navbar) {
    var onScroll;
    if (hero) {
      onScroll = function () { navbar.classList.toggle('sticky', hero.getBoundingClientRect().bottom <= 64); };
    } else {
      onScroll = function () { navbar.classList.toggle('scrolled', window.scrollY > 8); };
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile hamburger
  var burger = document.getElementById('hamburger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
      burger.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        burger.classList.remove('active');
      });
    });
  }

  // Scroll reveal
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('reveal-on');
    var show = function (el) { el.classList.add('visible'); };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          setTimeout(function () { show(e.target); }, (i % 6) * 70);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    window.__observeReveals = function () {
      var els = document.querySelectorAll('.reveal:not(.reveal-watched)');
      els.forEach(function (el) { el.classList.add('reveal-watched'); io.observe(el); });
      // safety net: never let anything stay invisible
      clearTimeout(window.__revealTimer);
      window.__revealTimer = setTimeout(function () {
        document.querySelectorAll('.reveal').forEach(show);
      }, 3500);
    };
    window.__observeReveals();
  }

  // Lucide icons (loaded after this script if present)
  window.addEventListener('load', function () {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  });
})();
