/* ============================================================
LONG DESCRIPTION  ·  ML Hub
---------------------------
The file name, the key below, and the longDesc value in
projects-config.js must all be the same word: "ml-hub".
============================================================ */
window.LONGDESC = window.LONGDESC || {};
window.LONGDESC["ml-hub"] = `
<h3>Overview</h3>
<p>
  <strong>ML Hub</strong> is a production-ready <em>Flask</em> application that hosts
  several of my machine-learning projects inside one dashboard. I built it so every
  model I train has a clean, shared home instead of living as a scattered notebook
  or a one-off script.
</p>
<h4>Highlights</h4>
<ul>
  <li>Ships six working models across healthcare, agriculture, industry, NLP and weather.</li>
  <li>Handles both tabular form inputs and image uploads through the same prediction page.</li>
  <li>Returns a clear prediction with a confidence score for every model.</li>
  <li>Modern dashboard with dark mode, live search and category filters.</li>
</ul>
<h4>How it works</h4>
<p>
  It uses a plugin architecture: each project is a self-contained folder that exposes a
  <code>load()</code> and a <code>predict()</code> function. A registry discovers every
  folder on startup, so adding a new model means dropping in a folder and restarting -
  nothing else in the app changes.
</p>
<h4>Tech notes</h4>
<p>
  Built with <code>Flask</code>, <code>scikit-learn</code> and <code>TensorFlow</code>,
  styled with <code>Bootstrap 5</code>, and deployed on <em>Render</em> with <code>gunicorn</code>.
</p>
<blockquote>
  The goal was one place to ship any model I build, where adding the next one is just a new folder.
</blockquote>
`;