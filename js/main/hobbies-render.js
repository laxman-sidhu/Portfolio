/* ============================================================
   hobbies-render.js — builds hobby sections + media + lightbox
   Merges hobbies-config.js (words) with hobbies-media.js (files).
   (you should not need to edit this file)
   ============================================================ */
(function () {
  var BASE = 'assets/Hobbies/';
  var VIDEO_RE = /\.(mp4|webm|mov|ogg)$/i;
  var MEDIA = window.HOBBIES_MEDIA || {};
  var CONFIG = window.HOBBIES || [];

  // natural sort so 2 < 10
  function natSort(a, b) {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  }

  function mediaCell(folder, file) {
    var src = BASE + folder + '/' + file;
    if (VIDEO_RE.test(file)) {
      return '<div class="media-item is-video" data-type="video" data-src="' + src + '" data-caption="' + folder + '">' +
               '<video src="' + src + '" muted loop playsinline preload="metadata"></video>' +
               '<span class="vid-badge"><i data-lucide="volume-2"></i></span>' +
             '</div>';
    }
    return '<div class="media-item" data-type="image" data-src="' + src + '" data-caption="' + folder + '">' +
             '<img src="' + src + '" alt="' + folder + '" loading="lazy" decoding="async">' +
           '</div>';
  }

  function blockHTML(h) {
    var files = (MEDIA[h.folder] || []).slice().sort(natSort);
    var grid = files.length
      ? files.map(function (f) { return mediaCell(h.folder, f); }).join('')
      : '<p class="media-empty">No media yet — add files to <code>assets/Hobbies/' + h.folder + '</code> and run update-hobbies.bat.</p>';
    return (
      '<section class="hobby-block">' +
        '<div class="shell">' +
          '<div class="hobby-head reveal">' +
            '<span class="eyebrow">' + (h.eyebrow || '') + '</span>' +
            '<h2>' + (h.icon ? h.icon + ' ' : '') + '<span class="em">' + (h.title || h.folder) + '</span></h2>' +
            '<p>' + (h.text || '') + '</p>' +
            (files.length ? '<span class="hobby-count"><i data-lucide="image"></i> ' + files.length + ' moment' + (files.length > 1 ? 's' : '') + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="shell-fluid"><div class="media-grid reveal">' + grid + '</div></div>' +
      '</section>'
    );
  }

  /* Give each item its true aspect ratio once the media reports dimensions.
     The CSS sizes width as (row-height * --ar); before this resolves an item
     shows as a neutral square, then snaps to its real shape. Vertical layout
     stays stable because the row height is fixed. */
  function applyRatios(scope) {
    var media = scope.querySelectorAll('.media-item img, .media-item video');
    Array.prototype.forEach.call(media, function (m) {
      var item = m.closest('.media-item');
      var set = function () {
        var w = m.naturalWidth || m.videoWidth;
        var h = m.naturalHeight || m.videoHeight;
        if (w && h && item) item.style.setProperty('--ar', (w / h).toFixed(4));
      };
      if (m.tagName === 'IMG') {
        if (m.complete && m.naturalWidth) set();
        else m.addEventListener('load', set, { once: true });
      } else {
        if (m.videoWidth) set();
        else m.addEventListener('loadedmetadata', set, { once: true });
      }
    });
  }

  /* Only the videos currently on screen play; the rest stay paused so the page
     isn't decoding several looping clips at once (big win on mobile). */
  function setupVideoPlayback(scope) {
    var vids = scope.querySelectorAll('.media-grid video');
    if (!vids.length) return;
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(vids, function (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); });
      return;
    }
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else { v.pause(); }
      });
    }, { threshold: 0.25 });
    Array.prototype.forEach.call(vids, function (v) { vio.observe(v); });
  }

  var root = document.getElementById('hobbiesRoot');
  var items = [];
  if (root) {
    root.innerHTML = CONFIG.map(blockHTML).join('');
    // Items render directly into each justified grid in natural order; collect
    // them for the lightbox and tag each with its global index.
    items = Array.prototype.slice.call(root.querySelectorAll('.media-item'));
    items.forEach(function (it, i) { it.dataset.idx = i; });
    applyRatios(root);
    setupVideoPlayback(root);
    if (window.__observeReveals) window.__observeReveals();
  }

  /* ——— Lightbox ——— */
  var lb = document.getElementById('lightbox');
  var stage = document.getElementById('lbStage');
  var capEl = document.getElementById('lbCaption');
  var current = 0;

  function show(idx) {
    current = (idx + items.length) % items.length;
    var item = items[current];
    var type = item.getAttribute('data-type');
    var src = item.getAttribute('data-src');
    stage.querySelectorAll('img, video').forEach(function (n) { if (n.tagName === 'VIDEO') n.pause(); n.remove(); });
    var node;
    if (type === 'video') {
      node = document.createElement('video');
      node.src = src; node.controls = true; node.autoplay = true; node.playsInline = true;
      node.addEventListener('loadeddata', function () { node.classList.add('loaded'); });
    } else {
      node = document.createElement('img');
      node.onload = function () { node.classList.add('loaded'); };
      node.src = src; node.alt = item.getAttribute('data-caption') || '';
    }
    stage.insertBefore(node, capEl);
    capEl.textContent = item.getAttribute('data-caption') || '';
  }
  function open(idx) {
    if (!lb) return;
    lb.classList.add('open'); document.body.style.overflow = 'hidden'; show(idx);
  }
  function close() {
    lb.classList.remove('open'); document.body.style.overflow = '';
    stage.querySelectorAll('video').forEach(function (v) { v.pause(); });
  }

  if (root) {
    root.addEventListener('click', function (e) {
      var it = e.target.closest('.media-item');
      if (it) open(parseInt(it.dataset.idx, 10));
    });
  }
  if (lb) {
    document.getElementById('lbClose').addEventListener('click', close);
    document.getElementById('lbPrev').addEventListener('click', function () { show(current - 1); });
    document.getElementById('lbNext').addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(current + 1);
      if (e.key === 'ArrowLeft') show(current - 1);
    });
  }

  if (window.lucide) window.lucide.createIcons();
})();
