// hobbies-render.js — builds hobby sections + media + lightbox.
// All markup lives in the <template> elements in hobbies.html; this file only clones and fills them.
(function () {
  var BASE = 'assets/Hobbies/';
  var VIDEO_RE = /\.(mp4|webm|mov|ogg)$/i;
  var MEDIA = window.HOBBIES_MEDIA || {};
  var CONFIG = window.HOBBIES || [];

  function clone(id) {
    return document.getElementById(id).content.firstElementChild.cloneNode(true);
  }

  // Natural sort so 2 < 10
  function natSort(a, b) {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  }

  function mediaCell(folder, file) {
    var src = BASE + folder + '/' + file;
    var isVid = VIDEO_RE.test(file);
    var cell = clone(isVid ? 'tpl-media-video' : 'tpl-media-image');
    cell.setAttribute('data-src', src);
    cell.setAttribute('data-caption', folder);
    var media = cell.querySelector(isVid ? 'video' : 'img');
    media.src = src;
    if (!isVid) media.alt = folder;
    return cell;
  }

  function buildBlock(h) {
    var files = (MEDIA[h.folder] || []).slice().sort(natSort);
    var block = clone('tpl-hobby-block');
    block.querySelector('.eyebrow').textContent = h.eyebrow || '';
    var icon = block.querySelector('.hobby-icon');
    if (h.icon) icon.textContent = h.icon; else icon.remove();
    block.querySelector('.em').textContent = h.title || h.folder;
    block.querySelector('.hobby-text').textContent = h.text || '';

    var count = block.querySelector('.hobby-count');
    if (files.length) {
      block.querySelector('.hobby-count-text').textContent = files.length + ' moment' + (files.length > 1 ? 's' : '');
    } else count.remove();

    var grid = block.querySelector('.media-grid');
    if (files.length) {
      files.forEach(function (f) { grid.appendChild(mediaCell(h.folder, f)); });
    } else {
      var empty = clone('tpl-media-empty');
      empty.querySelector('code').textContent = 'assets/Hobbies/' + h.folder;
      grid.appendChild(empty);
    }
    return block;
  }

  // Give each item its real aspect ratio once the media reports dimensions
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

  // Only on-screen videos play; the rest stay paused to save decoding work
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
    root.replaceChildren();
    CONFIG.forEach(function (h) { root.appendChild(buildBlock(h)); });
    // Collect items for the lightbox and tag each with its global index
    items = Array.prototype.slice.call(root.querySelectorAll('.media-item'));
    items.forEach(function (it, i) { it.dataset.idx = i; });
    applyRatios(root);
    setupVideoPlayback(root);
    if (window.__observeReveals) window.__observeReveals();
  }

  // Lightbox
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
})();
