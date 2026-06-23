/* ============================================================
   LONG DESCRIPTION  ·  Resume Screening, Optimizing and Aptitude
   ------------------------------------------------------------
   Edit the rich-text HTML between the backticks below.
   You can use:  <h2> <h3> <h4> <p> <strong> <em> <a>
                 <ul>/<li>  <ol>/<li>  <blockquote> <code> <pre> <hr>
   The only characters to avoid inside the text are the
   backtick ( ` ) and the sequence  ${  }  .
   The file name, the key below, and the longDesc value in
   projects-config.js must all be the same word:
   "resume-screening-optimizing-aptitude".
   ============================================================ */
window.LONGDESC = window.LONGDESC || {};
window.LONGDESC["resume-screening-optimizing-aptitude"] = `
<h3>Overview</h3>
<p>
  <strong>Resume Screening, Optimizing and Aptitude</strong> is a Flask web app that
  takes a hiring team from a folder of resumes to a tested shortlist. It brings three
  tools into one workflow - <em>NLP</em> resume matching, generative-AI resume feedback,
  and built-in aptitude testing - so screening, improving, and assessing candidates all
  happen in the same place.
</p>

<h4>Resume Screening</h4>
<ul>
  <li>Reads many resumes from <strong>PDF</strong>, <strong>DOCX</strong> and <strong>TXT</strong> into clean text.</li>
  <li>Ranks every candidate against a <em>job description</em> using TF-IDF and cosine similarity.</li>
  <li>Extracts each applicant's name, email, phone, skills and experience automatically.</li>
  <li>Lets me select candidates, then email them or send a test without leaving the page.</li>
</ul>

<h4>Resume Optimization</h4>
<ul>
  <li>Analyses a single resume against a role with <em>Google Gemini</em>.</li>
  <li>Returns a match score, the missing keywords, and a tailored profile summary.</li>
  <li>Suggests focused learning to help close the gaps it finds.</li>
</ul>

<h4>Aptitude Testing</h4>
<ul>
  <li>Builds timed multiple-choice tests with a configurable pass mark.</li>
  <li>Sends each candidate a single-use link that expires after seven days.</li>
  <li>Auto-scores every submission and collects results in a dashboard.</li>
</ul>

<h4>How it works</h4>
<ol>
  <li><strong>Ingest</strong> - resumes are loaded and normalised into text.</li>
  <li><strong>Match</strong> - each one is scored against the job description.</li>
  <li><strong>Shortlist</strong> - I select the strongest candidates from the ranked list.</li>
  <li><strong>Assess</strong> - they receive an aptitude test, and I review the scores.</li>
</ol>

<h4>Tech notes</h4>
<p>
  Built in <code>Python</code> with <code>Flask</code>, <code>scikit-learn</code> and
  <code>numpy</code> for matching, the <code>google-genai</code> SDK for AI analysis,
  <code>SQLAlchemy</code> (SQLite or Postgres) for storage, and a <code>Bootstrap 5</code>
  front end served by <code>gunicorn</code>. The scoring core is small:
</p>
<pre><code>from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

vec = TfidfVectorizer(stop_words="english")
matrix = vec.fit_transform([job_desc] + resumes)
scores = cosine_similarity(matrix[0:1], matrix[1:])</code></pre>

<blockquote>
  The goal was simple: let a recruiter spend their time on people, not on paperwork.
</blockquote>
`;