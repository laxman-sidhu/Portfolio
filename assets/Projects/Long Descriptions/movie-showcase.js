/* ============================================================
   LONG DESCRIPTION  ·  Movie Showcase
   ------------------------------------------------------------
   Edit the rich-text HTML between the backticks below.
   You can use:  <h2> <h3> <h4> <p> <strong> <em> <a>
                 <ul>/<li>  <ol>/<li>  <blockquote> <code> <pre> <hr>
   The only characters to avoid inside the text are the
   backtick ( ` ) and the sequence  ${  }  .
   The file name, the key below, and the longDesc value in
   projects-config.js must all be the same word: "movie-showcase".
   ============================================================ */
window.LONGDESC = window.LONGDESC || {};
window.LONGDESC["movie-showcase"] = `
<h3>Overview</h3>
<p>
  <strong>Movie Showcase</strong> is a genre-organized gallery of everything
  I've watched - films and web series alike. Every title is laid out as a clean
  card with its poster loaded live, and the whole catalog is driven by a single
  <em>Google Sheet</em>, so adding a movie is as simple as typing a new row.
</p>

<h4>Highlights</h4>
<ul>
  <li>Titles split into sections like <strong>Hollywood</strong>, <strong>Bollywood</strong>, <strong>Tollywood</strong>, Other Languages and Web Series.</li>
  <li>Posters pulled live from a link stored alongside each title.</li>
  <li>Instant <strong>search</strong> by name plus filtering by genre.</li>
  <li>Tap any card for a full-screen detail pop-up.</li>
  <li>Responsive grid that reflows neatly on phones and desktops.</li>
</ul>

<h4>Live stats</h4>
<p>
  The About page keeps a running <strong>count for every movie industry</strong> -
  Hollywood, Bollywood, Tollywood and the rest - read straight from the sheet and
  animated as the numbers tick up, alongside a grand total across all categories.
  The counts refresh on their own, so the page always reflects what I've actually watched.
</p>

<h4>Tech notes</h4>
<p>Built with plain <code>HTML</code>, <code>CSS</code> and <code>JavaScript</code> - no frameworks - with all data served from published <em>Google Sheets</em>.</p>

<blockquote>
  The idea was simple: keep a living, self-updating record of my watch history that looks good and runs anywhere.
</blockquote>
`;
