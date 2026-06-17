/* ============================================================
   projects-render.js — builds cards from projects-config.js
   and powers the click-to-open project modal.
   (you should not need to edit this file)
   ------------------------------------------------------------
   • Each card is clickable → opens a pop-up modal.
   • The card shows the SHORT desc only.
   • The modal shows everything + the rich-text LONG description,
     loaded from the file named in `longDesc` in the config.
   • longDesc: "None"  →  no long-description section is shown.
   ============================================================ */
(function () {
  function has(link) {
    return link && String(link).trim() !== '' && String(link).trim().toLowerCase() !== 'none';
  }

  var TONES = ['blush', 'sky', 'sage', 'peach', 'lilac', 'mint', 'butter', 'rose'];

  function thumbHTML(p, idx) {
    if (has(p.thumbnail)) {
      return '<img src="' + p.thumbnail + '" alt="' + (p.name || '') + '" loading="lazy" decoding="async">';
    }
    var tone = TONES[idx % TONES.length];
    var initial = (p.name || '?').trim().charAt(0).toUpperCase();
    return '<div class="thumb-placeholder tone-' + tone + '"><span>' + initial + '</span></div>';
  }

  // Lucide dropped its brand icons (incl. github), so use an inline SVG that
  // always renders and inherits the button's text colour.
  var GH_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.05-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/></svg>';

  function actionsHTML(p, isFun, sizeClass, context) {
    var demoLabel = isFun ? 'Try It' : 'Live Demo';
    var demo = has(p.demo)
      ? '<a class="btn btn-primary ' + sizeClass + '" href="' + p.demo + '" target="_blank" rel="noopener">' + demoLabel + ' <i data-lucide="external-link"></i></a>'
      : '';
    // Fun project CARDS display only the "Try It" button; the GitHub/code link
    // (when present) is shown only inside the pop-up. Main projects keep code in
    // both the card and the pop-up, exactly as before.
    var showCode = !(isFun && context === 'card');
    var code = (showCode && has(p.code))
      ? '<a class="btn btn-outline ' + sizeClass + '" href="' + p.code + '" target="_blank" rel="noopener">' + GH_ICON + ' ' + (has(p.demo) ? 'Code' : 'View Code') + '</a>'
      : '';
    if (!demo && !code) return '';
    return demo + code;
  }

  function tagsHTML(tags, cls) {
    if (!tags || !tags.length) return '';
    return '<div class="' + cls + '">' + tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div>';
  }

  function badgeHTML(p, isFun) {
    // Fun projects don't show a redundant "Fun" badge — the whole section is fun.
    if (isFun) return '';
    var d = (p.difficulty || '').toLowerCase();
    var label = { easy: 'Easy', intermediate: 'Intermediate', difficult: 'Difficult' }[d];
    if (!label) return '';
    return '<span class="card-badge badge-' + d + '">' + label + '</span>';
  }

  /* ---- CARD (short desc only, whole card clickable) ---- */
  function cardHTML(p, isFun, idx, group) {
    var actions = actionsHTML(p, isFun, 'btn-sm', 'card');
    return (
      '<article class="project-card reveal' + (isFun ? ' fun-card' : '') + '"' +
        ' tabindex="0" role="button" aria-label="View details for ' + (p.name || 'project') + '"' +
        ' data-group="' + group + '" data-idx="' + idx + '">' +
        '<div class="card-thumb">' +
          thumbHTML(p, idx) +
        '</div>' +
        '<div class="card-body">' +
          badgeHTML(p, isFun) +
          '<h3 class="card-title">' + (p.name || 'Untitled') + '</h3>' +
          (p.desc ? '<p class="card-desc">' + p.desc + '</p>' : '') +
          (isFun ? '' : tagsHTML(p.tags, 'card-tech')) +
          (actions ? '<div class="card-actions">' + actions + '</div>' : '') +
        '</div>' +
      '</article>'
    );
  }

  function render(targetId, list, isFun, group) {
    var el = document.getElementById(targetId);
    if (!el) return;
    if (!list || !list.length) {
      el.innerHTML = '<p class="empty-note">No projects added yet — open <code>js/config/projects-config.js</code> to add one.</p>';
      return;
    }
    el.innerHTML = list.map(function (p, i) { return cardHTML(p, isFun, i, group); }).join('');
  }

  /* ============================================================
     MODAL
     ============================================================ */
  var overlay, lastFocused;
  var LD_DIR = 'assets/Projects/Long Descriptions/';

  /* Inject a <script> for every long-description file named in the config.
     Using <script src> (instead of fetch) means it also works when the page
     is opened directly from disk (file://), not just on a web server. */
  function preloadLongDescs() {
    window.LONGDESC = window.LONGDESC || {};
    var keys = {};
    [window.PROJECTS_MAIN, window.PROJECTS_FUN].forEach(function (list) {
      (list || []).forEach(function (p) {
        if (has(p.longDesc)) keys[String(p.longDesc).trim()] = true;
      });
    });
    Object.keys(keys).forEach(function (key) {
      var s = document.createElement('script');
      s.src = encodeURI(LD_DIR + key + '.js');
      s.async = false;
      document.head.appendChild(s);
    });
  }

  function buildModal() {
    overlay = document.createElement('div');
    overlay.className = 'pm-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
      '<div class="pm-dialog">' +
        '<button class="pm-close" aria-label="Close"><i data-lucide="x"></i></button>' +
        '<div class="pm-scroll">' +
          '<div class="pm-thumb"></div>' +
          '<div class="pm-body">' +
            '<div class="pm-badge"></div>' +
            '<h2 class="pm-title" id="pmTitle"></h2>' +
            '<p class="pm-shortdesc"></p>' +
            '<div class="pm-tech"></div>' +
            '<div class="pm-longdesc"></div>' +
            '<div class="pm-actions"></div>' +
          '</div>' +
        '</div>' +
        '<div class="pm-scrollhint" aria-hidden="true"><i data-lucide="chevrons-down"></i></div>' +
      '</div>';
    document.body.appendChild(overlay);
    overlay.setAttribute('aria-labelledby', 'pmTitle');

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    overlay.querySelector('.pm-close').addEventListener('click', closeModal);
    overlay.querySelector('.pm-scroll').addEventListener('scroll', updateScrollHint, { passive: true });
    window.addEventListener('resize', updateScrollHint, { passive: true });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
    });
  }

  /* show a bouncing "scroll for more" hint while there's hidden content below */
  function updateScrollHint() {
    if (!overlay) return;
    var sc = overlay.querySelector('.pm-scroll');
    if (!sc) return;
    var canScroll = (sc.scrollHeight - sc.clientHeight) > 8;
    var atBottom = (sc.scrollTop + sc.clientHeight) >= (sc.scrollHeight - 8);
    overlay.classList.toggle('can-scroll', canScroll && !atBottom);
  }

  function loadLongDesc(p) {
    var box = overlay.querySelector('.pm-longdesc');
    box.classList.remove('loading');

    if (!has(p.longDesc)) {           // "None" or empty → no section
      box.style.display = 'none';
      box.innerHTML = '';
      return;
    }

    var key = String(p.longDesc).trim();
    var html = (window.LONGDESC || {})[key];

    if (html != null) {
      box.style.display = '';
      box.innerHTML = html;
      if (window.lucide) window.lucide.createIcons();
    } else {
      // file missing or not loaded yet → hide rather than show an empty frame
      box.style.display = 'none';
      box.innerHTML = '';
    }
  }

  function openModal(p, isFun, idx) {
    if (!overlay) buildModal();
    lastFocused = document.activeElement;

    overlay.querySelector('.pm-thumb').innerHTML = thumbHTML(p, idx);
    var pmBadge = overlay.querySelector('.pm-badge');
    var badgeMarkup = badgeHTML(p, isFun);
    if (badgeMarkup) { pmBadge.style.display = ''; pmBadge.innerHTML = badgeMarkup; }
    else { pmBadge.style.display = 'none'; pmBadge.innerHTML = ''; }
    overlay.querySelector('.pm-title').textContent = p.name || 'Untitled';

    var sd = overlay.querySelector('.pm-shortdesc');
    if (p.desc) { sd.style.display = ''; sd.textContent = p.desc; }
    else { sd.style.display = 'none'; }

    var tech = overlay.querySelector('.pm-tech');
    if (!isFun && p.tags && p.tags.length) {
      tech.style.display = '';
      tech.innerHTML = p.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    } else { tech.style.display = 'none'; tech.innerHTML = ''; }

    var acts = overlay.querySelector('.pm-actions');
    var actionsMarkup = actionsHTML(p, isFun, 'btn', 'modal');
    if (actionsMarkup) { acts.style.display = ''; acts.innerHTML = actionsMarkup; }
    else { acts.style.display = 'none'; acts.innerHTML = ''; }

    loadLongDesc(p);

    document.body.classList.add('pm-lock');
    overlay.classList.add('open');
    overlay.querySelector('.pm-scroll').scrollTop = 0;   // always start at the top
    if (window.lucide) window.lucide.createIcons();
    overlay.querySelector('.pm-close').focus();
    // check after layout settles (icons/images may change height)
    requestAnimationFrame(updateScrollHint);
    setTimeout(updateScrollHint, 120);
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.classList.remove('pm-lock');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  /* one delegated handler for both grids */
  function wireGrid(targetId, list, isFun) {
    var el = document.getElementById(targetId);
    if (!el) return;

    function handle(e, card) {
      // let real links (Live Demo / Code) work without opening the modal
      if (e.target.closest('a')) return;
      var idx = parseInt(card.getAttribute('data-idx'), 10);
      var p = list[idx];
      if (p) { if (e) e.preventDefault(); openModal(p, isFun, idx); }
    }

    el.addEventListener('click', function (e) {
      var card = e.target.closest('.project-card');
      if (card) handle(e, card);
    });
    el.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var card = e.target.closest('.project-card');
      if (card) handle(e, card);
    });
  }

  /* ---- build everything ---- */
  preloadLongDescs();

  render('mainProjectsGrid', window.PROJECTS_MAIN, false, 'main');
  render('funProjectsGrid', window.PROJECTS_FUN, true, 'fun');

  wireGrid('mainProjectsGrid', window.PROJECTS_MAIN, false);
  wireGrid('funProjectsGrid', window.PROJECTS_FUN, true);

  if (window.__observeReveals) window.__observeReveals();
  if (window.lucide) window.lucide.createIcons();
})();
