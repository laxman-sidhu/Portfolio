/* ============================================================
   projects-render.js — builds cards from projects-config.js
   (you should not need to edit this file)
   ============================================================ */
(function () {
  function has(link) {
    return link && String(link).trim() !== '' && String(link).trim().toLowerCase() !== 'none';
  }

  var TONES = ['blush','sky','sage','peach','lilac','mint','butter','rose'];
  function thumbHTML(p, idx) {
    if (has(p.thumbnail)) {
      return '<img src="' + p.thumbnail + '" alt="' + (p.name || '') + '" loading="lazy" decoding="async">';
    }
    var tone = TONES[idx % TONES.length];
    var initial = (p.name || '?').trim().charAt(0).toUpperCase();
    return '<div class="thumb-placeholder tone-' + tone + '"><span>' + initial + '</span></div>';
  }

  function actionsHTML(p, isFun) {
    var demoLabel = isFun ? 'Try It' : 'Live Demo';
    var demo = has(p.demo)
      ? '<a class="btn btn-primary btn-sm" href="' + p.demo + '" target="_blank" rel="noopener">' + demoLabel + ' <i data-lucide="external-link"></i></a>'
      : '';
    var code = has(p.code)
      ? '<a class="btn btn-outline btn-sm" href="' + p.code + '" target="_blank" rel="noopener"><i data-lucide="github"></i> ' + (has(p.demo) ? 'Code' : 'View Code') + '</a>'
      : '';
    if (!demo && !code) return '';
    return '<div class="card-actions">' + demo + code + '</div>';
  }

  function tagsHTML(tags) {
    if (!tags || !tags.length) return '';
    return '<div class="card-tech">' + tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div>';
  }

  function badgeHTML(p, isFun) {
    if (isFun) return '<span class="card-badge fun">Fun</span>';
    var d = (p.difficulty || '').toLowerCase();
    var label = { easy: 'Easy', intermediate: 'Intermediate', difficult: 'Difficult' }[d];
    if (!label) return '';
    return '<span class="card-badge badge-' + d + '">' + label + '</span>';
  }

  function cardHTML(p, isFun, idx) {
    return (
      '<article class="project-card reveal' + (isFun ? ' fun-card' : '') + '">' +
        '<div class="card-thumb">' +
          thumbHTML(p, idx) +
          badgeHTML(p, isFun) +
        '</div>' +
        '<div class="card-body">' +
          '<h3 class="card-title">' + (p.name || 'Untitled') + '</h3>' +
          (p.desc ? '<p class="card-desc">' + p.desc + '</p>' : '') +
          tagsHTML(p.tags) +
          actionsHTML(p, isFun) +
        '</div>' +
      '</article>'
    );
  }

  function render(targetId, list, isFun) {
    var el = document.getElementById(targetId);
    if (!el) return;
    if (!list || !list.length) {
      el.innerHTML = '<p class="empty-note">No projects added yet — open <code>js/projects-config.js</code> to add one.</p>';
      return;
    }
    el.innerHTML = list.map(function (p, i) { return cardHTML(p, isFun, i); }).join('');
  }

  render('mainProjectsGrid', window.PROJECTS_MAIN, false);
  render('funProjectsGrid', window.PROJECTS_FUN, true);

  if (window.__observeReveals) window.__observeReveals();
  if (window.lucide) window.lucide.createIcons();
})();
