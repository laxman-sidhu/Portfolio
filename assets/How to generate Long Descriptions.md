# Long-Description Generator Prompt

Paste everything below (from the line `=== PROMPT START ===` to `=== PROMPT END ===`) into any AI assistant. Replace the `PROJECT DETAILS` section at the bottom with a plain-English explanation of your new project, then send it. The assistant will return a single, ready-to-save `.js` file for the project pop-up.

Save the output as `assets/Projects/Long Descriptions/<key>.js`, then set `longDesc: "<key>"` in `js/config/projects-config.js`.

=== PROMPT START ===

You are generating ONE JavaScript file for my portfolio website. The file holds the "long description" that appears inside a project's pop-up card. I will give you a plain-English description of a project; you turn it into the file. Output ONLY the file contents (no explanation, no markdown fences, no commentary before or after).

## Exact output format

The file MUST look exactly like this skeleton (keep the wrapper lines unchanged):

/* ============================================================
LONG DESCRIPTION  ·  <PROJECT NAME>
-----------------------------------

The file name, the key below, and the longDesc value in
projects-config.js must all be the same word: "<key>".
============================================================ */
window.LONGDESC = window.LONGDESC || {};
window.LONGDESC["<key>"] = `<rich-text HTML goes here>`;

* `<key>` is a lowercase, hyphenated slug of the project name (e.g. "Resume Screening" -> "resume-screening", "Movie Showcase" -> "movie-showcase").
* If I give you a key explicitly, use mine.
* The same `<key>` goes in three places: the comment line, the `window.LONGDESC["<key>"]` line, and (later) my config.
* The HTML lives between the backticks. It is a fragment only: no `<html>`, `<head>`, `<body>`, `<script>` or `<style>` tags.

## Allowed HTML tags and how each one looks when rendered

Use only these. They are already styled by the site's CSS, so do NOT add inline styles, classes, or `style=` attributes.

* `<h3>` - main section heading (serif display font). Use for "Overview", "How it works", etc.
* `<h4>` - small accent sub-heading (bold, in the site's purple). Use for short labels like "Highlights", "Tech notes".
* `<h2>` - only if you need a heading bigger than `<h3>` (rarely needed).
* `<p>` - paragraphs.
* `<strong>` - bold (use for the project name on first mention and key terms).
* `<em>` - italic (use for emphasis and proper nouns like API names).
* `<ul>`/`<li>` - bullet list (purple bullets).
* `<ol>`/`<li>` - numbered list (purple numbers). Use for ordered steps.
* `<blockquote>` - a soft, italic callout box. Use for one punchy line, like the goal or a takeaway. At most one per file.
* `<a href="...">` - links (open as normal underlined links).
* `<code>` - inline code / tech names (e.g. `<code>scikit-learn</code>`).
* `<pre><code>` - a code block (dark background). Only include if there is a genuinely useful, short snippet. Skip it for non-code projects.
* `<hr>` - a thin divider line. Use sparingly, if at all.

## Hard rules (do not break these)

1. NEVER use the backtick character (`) anywhere inside the description text. It would end the JavaScript string. For inline code use the `<code>` tag, not backticks.
2. NEVER use the sequence `${` ... `}` inside the text (it breaks the string). If you must show it in a code sample, write it as `$&#123;` ... `&#125;`.
3. Use plain ASCII punctuation only: straight quotes ' and ", and regular hyphens. Do NOT use em dashes, en dashes, curly/smart quotes, or ellipsis characters. Use " - " (spaced hyphen) where you would have used an em dash.
4. No inline styles, no classes, no `id=`, no `<style>`, no `<script>`.
5. Output the file and nothing else.

## Style and structure

* Voice: first person ("I built...", "my..."), warm but professional, concise.
* This is my personal portfolio, so it should sound like me describing my own work.
* Length: roughly 120-220 words.
* Scannable, not a wall of text.

A good default structure:

1. `<h3>Overview</h3>` + one short `<p>` that says what the project is and why it exists. Bold the project name on first mention.
2. `<h4>Highlights</h4>` (or "What it does") + a short `<ul>` of 3-5 bullets.
3. Optionally `<h4>How it works</h4>` + an `<ol>` of steps, OR `<h4>Tech notes</h4>` + a sentence naming the stack (wrap tech in `<code>`).
4. Optionally one `<blockquote>` with the core idea or goal.
5. Adapt the sections to the project - skip any that do not fit.
6. A small fun project can be just Overview + Highlights.

Only state things I actually told you. Do not invent features, numbers, metrics, or tech that I did not mention. If something is unknown, leave it out rather than guessing.

## Worked example

If I said:

"Resume Screening - a Python pipeline that reads a stack of resumes, compares each against a job description, and returns a ranked shortlist. Uses NLP, TF-IDF and cosine similarity. Handles PDF and DOCX."

You would output exactly:

/* ============================================================
LONG DESCRIPTION  ·  Resume Screening
-------------------------------------

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
  <li>Scores each candidate against the role with TF-IDF and cosine similarity.</li>
  <li>Outputs a ranked table with a match percentage for every applicant.</li>
</ul>

<h4>Tech notes</h4>
<p>Built in <code>Python</code> with <code>scikit-learn</code>, <code>pandas</code> and <code>spaCy</code>.</p>

<blockquote>
  The goal was simple: let a recruiter spend their time on people, not paperwork.
</blockquote>
`;

## PROJECT DETAILS (fill this in)

Project name:

Key (optional, I will slugify the name if blank):

What it is / why it exists:

Key features or highlights:

How it works (steps), if relevant:

Tech stack, if relevant:

Anything else to mention:

=== PROMPT END ===
