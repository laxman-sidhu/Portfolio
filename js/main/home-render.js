// home-render.js — builds skills / experience / education from home-config.js.
// All markup lives in the <template> elements in index.html; this file only clones and fills them.
(function () {
  function clone(id) {
    return document.getElementById(id).content.firstElementChild.cloneNode(true);
  }

  function fillChips(container, items) {
    container.replaceChildren();
    (items || []).forEach(function (s) {
      var chip = clone('tpl-chip');
      chip.textContent = s;
      container.appendChild(chip);
    });
  }

  // Skills
  var skillsEl = document.getElementById('skillsGrid');
  if (skillsEl && window.SKILLS) {
    skillsEl.replaceChildren();
    window.SKILLS.forEach(function (c) {
      var card = clone('tpl-skill-card');
      card.setAttribute('data-tone', c.tone || 'lavender');
      card.querySelector('.skill-ico').textContent = c.icon || '✨';
      card.querySelector('h3').textContent = c.title || '';
      fillChips(card.querySelector('.skill-chips'), c.items);
      skillsEl.appendChild(card);
    });
  }

  // Experience (timeline)
  var expWrap = document.getElementById('experienceSection');
  var expEl = document.getElementById('experienceTimeline');
  if (expEl && window.EXPERIENCE && window.EXPERIENCE.length) {
    expEl.replaceChildren();
    window.EXPERIENCE.forEach(function (e) {
      var item = clone('tpl-exp-item');
      item.querySelector('.tl-year').textContent = e.period || '';
      item.querySelector('h3').textContent = e.role || '';
      item.querySelector('.tl-place').textContent = (e.company || '') + (e.place ? ' · ' + e.place : '');
      var desc = item.querySelector('.tl-desc');
      if (e.desc) desc.textContent = e.desc; else desc.remove();
      var tagsBox = item.querySelector('.tl-tags');
      if (e.tags && e.tags.length) fillChips(tagsBox, e.tags); else tagsBox.remove();
      expEl.appendChild(item);
    });
  } else if (expWrap) {
    expWrap.style.display = 'none'; // Hide the section if there is no experience
  }

  // Education (timeline)
  var eduEl = document.getElementById('educationTimeline');
  if (eduEl && window.EDUCATION) {
    eduEl.replaceChildren();
    window.EDUCATION.forEach(function (e) {
      var item = clone('tpl-edu-item');
      item.querySelector('.tl-year').textContent = e.period || '';
      var score = item.querySelector('.tl-score');
      if (e.score) score.textContent = e.score; else score.remove();
      item.querySelector('h3').textContent = e.title || '';
      var place = item.querySelector('.tl-place');
      if (e.place) place.textContent = e.place; else place.remove();
      var desc = item.querySelector('.tl-desc');
      if (e.desc) desc.textContent = e.desc; else desc.remove();
      eduEl.appendChild(item);
    });
  }

  // Re-observe freshly added reveal elements
  if (window.__observeReveals) window.__observeReveals();
})();
