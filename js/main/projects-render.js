// projects-render.js — builds cards from projects-config.js and powers the project modal.
// All markup lives in the <template> elements in projects.html; this file only clones and fills them.
// longDesc: "None" means no long-description section is shown.
(function () {
  function has(link) {
    return link && String(link).trim() !== '' && String(link).trim().toLowerCase() !== 'none';
  }

  var TONES = ['blush', 'sky', 'sage', 'peach', 'lilac', 'mint', 'butter', 'rose'];

  // Clone the first element of a <template> by id
  function clone(id) {
    return document.getElementById(id).content.firstElementChild.cloneNode(true);
  }

  function fillThumb(container, p, idx) {
    container.replaceChildren();
    if (has(p.thumbnail)) {
      var img = clone('tpl-thumb-img');
      img.src = p.thumbnail;
      img.alt = p.name || '';
      container.appendChild(img);
    } else {
      var ph = clone('tpl-thumb-placeholder');
      ph.classList.add('tone-' + TONES[idx % TONES.length]);
      ph.querySelector('span').textContent = (p.name || '?').trim().charAt(0).toUpperCase();
      container.appendChild(ph);
    }
  }

  function fillTags(container, tags) {
    container.replaceChildren();
    (tags || []).forEach(function (t) {
      var s = clone('tpl-tag');
      s.textContent = t;
      container.appendChild(s);
    });
  }

  // Difficulty badge info, or null when none applies
  function badgeInfo(p, isFun) {
    if (isFun) return null;
    var d = (p.difficulty || '').toLowerCase();
    var label = { easy: 'Easy', intermediate: 'Intermediate', difficult: 'Difficult' }[d];
    return label ? { cls: 'badge-' + d, label: label } : null;
  }

  // Build the Live Demo / Code buttons as a fragment
  function buildActions(p, isFun, sizeClass, context) {
    var frag = document.createDocumentFragment();
    if (has(p.demo)) {
      var d = clone('tpl-btn-demo');
      if (sizeClass) d.classList.add(sizeClass);
      d.href = p.demo;
      d.querySelector('.btn-label').textContent = isFun ? 'Try It' : 'Live Demo';
      frag.appendChild(d);
    }
    // Fun cards hide the code link (it still shows inside the pop-up); main projects keep it in both.
    var showCode = !(isFun && context === 'card');
    if (showCode && has(p.code)) {
      var c = clone('tpl-btn-code');
      if (sizeClass) c.classList.add(sizeClass);
      c.href = p.code;
      c.querySelector('.btn-label').textContent = has(p.demo) ? 'Code' : 'View Code';
      frag.appendChild(c);
    }
    return frag;
  }

  // Build one card (short desc only, whole card clickable)
  function buildCard(p, isFun, idx, group) {
    var card = clone('tpl-project-card');
    if (isFun) card.classList.add('fun-card');
    card.setAttribute('aria-label', 'View details for ' + (p.name || 'project'));
    card.setAttribute('data-group', group);
    card.setAttribute('data-idx', idx);

    fillThumb(card.querySelector('.card-thumb'), p, idx);

    var badge = card.querySelector('.card-badge');
    var bi = badgeInfo(p, isFun);
    if (bi) { badge.classList.add(bi.cls); badge.textContent = bi.label; }
    else badge.remove();

    card.querySelector('.card-title').textContent = p.name || 'Untitled';

    var desc = card.querySelector('.card-desc');
    if (p.desc) desc.textContent = p.desc; else desc.remove();

    var tech = card.querySelector('.card-tech');
    if (!isFun && p.tags && p.tags.length) fillTags(tech, p.tags); else tech.remove();

    var actions = card.querySelector('.card-actions');
    var actFrag = buildActions(p, isFun, 'btn-sm', 'card');
    if (actFrag.childNodes.length) actions.appendChild(actFrag); else actions.remove();

    return card;
  }

  function render(targetId, list, isFun, group) {
    var el = document.getElementById(targetId);
    if (!el) return;
    el.replaceChildren();
    if (!list || !list.length) { el.appendChild(clone('tpl-empty-note')); return; }
    list.forEach(function (p, i) { el.appendChild(buildCard(p, isFun, i, group)); });
  }

  // Modal
  var overlay, lastFocused;
  var LD_DIR = 'assets/Projects/Long Descriptions/';

  // Inject a <script> for each long-description file so it also works from file://
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
    overlay = clone('tpl-project-modal');
    document.body.appendChild(overlay);

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

  // Bouncing "scroll for more" hint while content is hidden below
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
    var key = has(p.longDesc) ? String(p.longDesc).trim() : null;
    var html = key ? (window.LONGDESC || {})[key] : null;
    if (html != null) { box.style.display = ''; box.innerHTML = html; }
    else { box.style.display = 'none'; box.replaceChildren(); }
  }

  function openModal(p, isFun, idx) {
    if (!overlay) buildModal();
    lastFocused = document.activeElement;

    fillThumb(overlay.querySelector('.pm-thumb'), p, idx);

    var pmBadge = overlay.querySelector('.pm-badge');
    pmBadge.replaceChildren();
    var bi = badgeInfo(p, isFun);
    if (bi) {
      var b = clone('tpl-badge');
      b.classList.add(bi.cls);
      b.textContent = bi.label;
      pmBadge.appendChild(b);
      pmBadge.style.display = '';
    } else { pmBadge.style.display = 'none'; }

    overlay.querySelector('.pm-title').textContent = p.name || 'Untitled';

    var sd = overlay.querySelector('.pm-shortdesc');
    if (p.desc) { sd.style.display = ''; sd.textContent = p.desc; }
    else { sd.style.display = 'none'; }

    var tech = overlay.querySelector('.pm-tech');
    if (!isFun && p.tags && p.tags.length) { tech.style.display = ''; fillTags(tech, p.tags); }
    else { tech.style.display = 'none'; tech.replaceChildren(); }

    var acts = overlay.querySelector('.pm-actions');
    acts.replaceChildren();
    var actFrag = buildActions(p, isFun, '', 'modal');
    if (actFrag.childNodes.length) { acts.style.display = ''; acts.appendChild(actFrag); }
    else { acts.style.display = 'none'; }

    loadLongDesc(p);

    document.body.classList.add('pm-lock');
    overlay.classList.add('open');
    overlay.querySelector('.pm-scroll').scrollTop = 0;
    overlay.querySelector('.pm-close').focus();
    requestAnimationFrame(updateScrollHint);
    setTimeout(updateScrollHint, 120);
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.classList.remove('pm-lock');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  // One delegated handler for both grids
  function wireGrid(targetId, list, isFun) {
    var el = document.getElementById(targetId);
    if (!el) return;

    function handle(e, card) {
      // Let real links (Live Demo / Code) work without opening the modal
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

  preloadLongDescs();
  render('mainProjectsGrid', window.PROJECTS_MAIN, false, 'main');
  render('funProjectsGrid', window.PROJECTS_FUN, true, 'fun');
  wireGrid('mainProjectsGrid', window.PROJECTS_MAIN, false);
  wireGrid('funProjectsGrid', window.PROJECTS_FUN, true);
  if (window.__observeReveals) window.__observeReveals();
})();
