/* ============================================================
   LONG DESCRIPTION  ·  Resume Screening
   ------------------------------------------------------------
   Edit the rich-text HTML between the backticks below.
   You can use:  <h2> <h3> <h4> <p> <strong> <em> <a>
                 <ul>/<li>  <ol>/<li>  <blockquote> <code> <pre> <hr>
   The only characters to avoid inside the text are the
   backtick ( ` ) and the sequence  ${  }  .
   The file name, the key below, and the longDesc value in
   projects-config.js must all be the same word: "resume-screening".
   ============================================================ */
window.LONGDESC = window.LONGDESC || {};
window.LONGDESC["resume-screening"] = `
<h3>Overview</h3>
<p>
  <strong>Resume Screening</strong> is an end-to-end pipeline that reads a stack
  of resumes, compares each one against a target <em>job description</em>, and
  returns a ranked shortlist in seconds - turning hours of manual filtering into
  a single click.
</p>

<h4>What it does</h4>
<ul>
  <li>Parses resumes from <strong>PDF</strong> and <strong>DOCX</strong> into clean text.</li>
  <li>Extracts skills, experience and education using <em>NLP</em>.</li>
  <li>Scores each candidate against the role with TF-IDF + cosine similarity.</li>
  <li>Outputs a ranked table with a match percentage for every applicant.</li>
</ul>

<h4>How it works</h4>
<ol>
  <li><strong>Ingest</strong> - documents are loaded and normalised.</li>
  <li><strong>Vectorise</strong> - text is converted into feature vectors.</li>
  <li><strong>Match</strong> - similarity is computed against the job spec.</li>
  <li><strong>Rank</strong> - candidates are sorted high to low.</li>
</ol>

<blockquote>
  The goal was simple: let a recruiter spend their time on people, not on paperwork.
</blockquote>

<h4>Tech notes</h4>
<p>
  Built in <code>Python</code> with <code>scikit-learn</code>, <code>pandas</code>,
  and <code>spaCy</code>. A small example of the scoring core:
</p>
<pre><code>from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

vec = TfidfVectorizer(stop_words="english")
matrix = vec.fit_transform([job_desc] + resumes)
scores = cosine_similarity(matrix[0:1], matrix[1:])</code></pre>

<hr>

<p>
  <em>This is placeholder content - replace it with the real write-up for this
  project. The styling will stay exactly the same.</em>
</p>
`;
