/* ============================================================
   projects-config.js   ←  EDIT THIS FILE TO ADD PROJECTS
   ------------------------------------------------------------
   To add a project, copy one { ... } block and fill it in.
   No HTML needed anywhere — the cards build themselves.

   Fields:
     name        : project title                       (required)
     thumbnail   : image path or URL                   (required)
     desc        : SHORT one or two line description    (optional)
                   → shown on the card AND at the top of the pop-up.
     tags        : array of tech, e.g. ["HTML","CSS"]   (optional)
     difficulty  : "easy" | "intermediate" | "difficult"(optional)
     code        : GitHub URL, or "None" to hide it      (required)
     demo        : live demo URL, or "None"              (required)
     longDesc    : name of the long-description file (without
                   extension), OR "None" for no long section.   (required)

   LONG DESCRIPTIONS (the pop-up card):
     • Clicking a card opens a pop-up showing the thumbnail, title,
       short desc, tags, buttons, AND the long description.
     • Each long write-up lives in its own file inside:
           assets/Projects/Long Descriptions/
       and is named <key>.js  (e.g. resume-screening.js).
     • Inside that file you write normal rich-text HTML:
           <h3>, <p>, <strong>, <em>, <ul>/<li>, <ol>/<li>,
           <blockquote>, <a>, <code>, <pre>, <hr> ...
       (Open resume-screening.js to see the exact, copy-ready shape.)
     • To add a long description:
           1. copy an existing file, e.g. resume-screening.js
           2. rename it, e.g.  my-project.js
           3. edit the HTML inside it
           4. set  longDesc: "my-project"  here in the config
       The config value, the file name, and the key inside the
       file are all the SAME word.
     • Don't want one yet?  →  set  longDesc: "None"
     • Why .js and not .html?  So the pop-up also works when you
       just double-click index.html locally (no server needed).

   BUTTON RULE (handled automatically):
     • demo is a real link  →  shows  [ Live Demo ]  +  [ Code ]
     • demo is "None"        →  shows only  [ View Code ]  (full width)
     • code is "None" too    →  that button is hidden as well
   ============================================================ */

window.PROJECTS_MAIN = [
  {
    name: "Resume Screening",
    thumbnail: "None",                 // no image yet → a pastel placeholder is shown
    desc: "An NLP pipeline that ranks and shortlists resumes against a job description automatically.",
    tags: ["Python", "NLP", "scikit-learn"],
    difficulty: "intermediate",
    code: "https://github.com/LaxmanSidhu",
    demo: "None",
    longDesc: "resume-screening"
  },

  /* ----- DUMMY EXAMPLES — replace these with your real projects ----- */
  {
    name: "Sales Insight Dashboard",
    thumbnail: "None",
    desc: "Sample entry. An end-to-end SQL + Power BI analysis of retail data across regions.",
    tags: ["SQL", "Power BI", "Excel"],
    difficulty: "intermediate",
    code: "None",
    demo: "None",
    longDesc: "None"                   // no long description → pop-up skips that section
  },
  {
    name: "Customer Churn Predictor",
    thumbnail: "None",
    desc: "Sample entry. An ML model predicting customer churn with feature engineering and tuning.",
    tags: ["Python", "scikit-learn", "Pandas"],
    difficulty: "difficult",
    code: "https://github.com/",
    demo: "None",
    longDesc: "None"
  }
];

window.PROJECTS_FUN = [
  {
    name: "Movie Showcase",
    thumbnail: "assets/Projects/MovieShowcase.png",
    desc: "A genre-organized showcase of every movie I've watched, with dynamic listings and live TMDB posters.",
    tags: ["HTML", "CSS", "JavaScript"],
    difficulty: "intermediate",
    code: "https://github.com/LaxmanSidhu/Movie-Showcase",
    demo: "https://laxman-sidhu.github.io/Movie-Showcase/",
    longDesc: "movie-showcase"
  },
  {
    name: "Siblings Bookverse",
    thumbnail: "assets/Projects/Bookshelf.png",
    desc: "A shared digital bookshelf displaying the books read by me and my sibling, side by side.",
    tags: ["HTML", "CSS", "JavaScript"],
    difficulty: "easy",
    code: "https://github.com/LaxmanSidhu/Book-Verse",
    demo: "https://laxmansidhu.github.io/Book-Verse/index.html",
    longDesc: "book-verse"
  },
  {
    name: "SidTrails",
    thumbnail: "None",
    desc: "My personal travel dashboard — every place I've been, every place I want to go, and the adventures along the way.",
    tags: ["HTML", "CSS", "JavaScript"],
    difficulty: "intermediate",
    code: "https://github.com/LaxmanSidhu/Travel-Dashboard",
    demo: "https://laxman-sidhu.github.io/Travel-Dashboard/",
    longDesc: "sidtrails"
  },
  {
    name: "Celebrity Pairs",
    thumbnail: "assets/Projects/CelebrityPairs.png",
    desc: "Add your favourite celebrity pairs — on screen or off screen — and share your picks!",
    tags: ["HTML", "CSS", "JavaScript"],
    difficulty: "easy",
    code: "None",
    demo: "https://laxmansidhu.github.io/Celebrity-Pairs/index.html",
    longDesc: "None"
  }
];
