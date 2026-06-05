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
               '<video src="' + src + '" autoplay muted loop playsinline preload="metadata"></video>' +
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

  function debounce(fn, ms) { var t; return function () { clearTimeout(t); t = setTimeout(fn, ms); }; }

  // Distribute each grid's items into N centered columns. N grows with screen
  // width but never exceeds the item count, so sparse hobbies stay centered.
  function layoutMasonry() {
    var grids = document.querySelectorAll('.media-grid');
    Array.prototype.forEach.call(grids, function (grid) {
      var cached = grid.__items;
      if (!cached || !cached.length) return;
      var avail = grid.clientWidth || grid.offsetWidth;
      if (!avail) return;
      var TARGET = 184; // approx px per column → ~8 columns at a typical 100%-zoom desktop
      var fit = Math.floor(avail / TARGET);
      var minCols = avail >= 340 ? 2 : 1;       // never collapse to 1 column on phones
      var n = Math.max(minCols, fit);
      n = Math.max(1, Math.min(n, cached.length)); // never more columns than items
      if (grid.__cols === n) return; // column count unchanged → skip rebuild
      grid.__cols = n;
      grid.innerHTML = '';
      var cols = [];
      for (var i = 0; i < n; i++) {
        var c = document.createElement('div');
        c.className = 'media-col';
        grid.appendChild(c);
        cols.push(c);
      }
      for (var j = 0; j < cached.length; j++) { cols[j % n].appendChild(cached[j]); }
    });
  }

  var root = document.getElementById('hobbiesRoot');
  var items = [];
  if (root) {
    root.innerHTML = CONFIG.map(blockHTML).join('');
    // cache each grid's media items in natural order; build the global ordered list (for the lightbox)
    Array.prototype.slice.call(document.querySelectorAll('.media-grid')).forEach(function (grid) {
      grid.__items = Array.prototype.slice.call(grid.querySelectorAll('.media-item'));
      items = items.concat(grid.__items);
    });
    layoutMasonry();
    window.addEventListener('resize', debounce(layoutMasonry, 150));
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

  items.forEach(function (it, i) { it.addEventListener('click', function () { open(i); }); });
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
