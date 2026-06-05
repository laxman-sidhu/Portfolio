/* ============================================================
   home-render.js — builds skills / experience / education
   from home-config.js  (you should not need to edit this)
   ============================================================ */
(function () {
  function esc(s) { return (s == null ? '' : String(s)); }

  /* ---- Skills ---- */
  function skillCard(c) {
    var chips = (c.items || []).map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('');
    return (
      '<div class="skill-card reveal" data-tone="' + esc(c.tone || 'lavender') + '">' +
        '<div class="skill-ico">' + esc(c.icon || '✨') + '</div>' +
        '<h3>' + esc(c.title) + '</h3>' +
        '<div class="skill-chips">' + chips + '</div>' +
      '</div>'
    );
  }
  var skillsEl = document.getElementById('skillsGrid');
  if (skillsEl && window.SKILLS) skillsEl.innerHTML = window.SKILLS.map(skillCard).join('');

  /* ---- Experience (timeline) ---- */
  function tags(arr) {
    if (!arr || !arr.length) return '';
    return '<div class="tl-tags">' + arr.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>';
  }
  function expItem(e) {
    return (
      '<div class="tl-item reveal" data-type="experience">' +
        '<span class="tl-dot"></span>' +
        '<div class="tl-card">' +
          '<div class="tl-meta">' +
            '<span class="tl-year">' + esc(e.period) + '</span>' +
            '<span class="tl-kind">Experience</span>' +
          '</div>' +
          '<h3>' + esc(e.role) + '</h3>' +
          '<p class="tl-place">' + esc(e.company) + (e.place ? ' · ' + esc(e.place) : '') + '</p>' +
          (e.desc ? '<p class="tl-desc">' + esc(e.desc) + '</p>' : '') +
          tags(e.tags) +
        '</div>' +
      '</div>'
    );
  }
  var expWrap = document.getElementById('experienceSection');
  var expEl = document.getElementById('experienceTimeline');
  if (expEl && window.EXPERIENCE && window.EXPERIENCE.length) {
    expEl.innerHTML = window.EXPERIENCE.map(expItem).join('');
  } else if (expWrap) {
    expWrap.style.display = 'none'; // hide section if no experience
  }

  /* ---- Education (timeline) ---- */
  function eduItem(e) {
    return (
      '<div class="tl-item reveal" data-type="education">' +
        '<span class="tl-dot"></span>' +
        '<div class="tl-card">' +
          '<div class="tl-meta">' +
            '<span class="tl-year">' + esc(e.period) + '</span>' +
            '<span class="tl-kind">Education</span>' +
            (e.score ? '<span class="tl-score">' + esc(e.score) + '</span>' : '') +
          '</div>' +
          '<h3>' + esc(e.title) + '</h3>' +
          (e.place ? '<p class="tl-place">' + esc(e.place) + '</p>' : '') +
          (e.desc ? '<p class="tl-desc">' + esc(e.desc) + '</p>' : '') +
        '</div>' +
      '</div>'
    );
  }
  var eduEl = document.getElementById('educationTimeline');
  if (eduEl && window.EDUCATION) eduEl.innerHTML = window.EDUCATION.map(eduItem).join('');

  // re-observe freshly added reveal elements (main.js may have run already)
  if (window.__observeReveals) window.__observeReveals();
})();
