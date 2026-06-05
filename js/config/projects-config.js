/* ============================================================
   projects-config.js   ←  EDIT THIS FILE TO ADD PROJECTS
   ------------------------------------------------------------
   To add a project, copy one { ... } block and fill it in.
   No HTML needed anywhere — the cards build themselves.

   Fields:
     name        : project title                       (required)
     thumbnail   : image path or URL                   (required)
     desc        : one or two line description          (optional)
     tags        : array of tech, e.g. ["HTML","CSS"]   (optional)
     difficulty  : "easy" | "intermediate" | "difficult"(optional)
     code        : GitHub URL, or "None" to hide it      (required)
     demo        : live demo URL, or "None"              (required)

   BUTTON RULE (handled automatically):
     • demo is a real link  →  shows  [ Live Demo ]  +  [ Code ]
     • demo is "None"        →  shows only  [ View Code ]  (full width)
     • code is "None" too    →  that button is hidden as well
   ============================================================ */

window.PROJECTS_MAIN = [
  {
    name: "Movie Showcase",
    thumbnail: "assets/Projects/MovieShowcase.png",
    desc: "A genre-organized showcase of every movie I've watched, with dynamic listings and live TMDB posters.",
    tags: ["HTML", "CSS", "JavaScript"],
    difficulty: "intermediate",
    code: "https://github.com/LaxmanSidhu/Movie-Showcase",
    demo: "https://laxmansidhu.github.io/Movie-Showcase/index.html"
  },
  {
    name: "Siblings Bookshelf",
    thumbnail: "assets/Projects/Bookshelf.png",
    desc: "A shared digital bookshelf displaying the books read by me and my sibling, side by side.",
    tags: ["HTML", "CSS", "JavaScript"],
    difficulty: "easy",
    code: "https://github.com/LaxmanSidhu/Book-Verse",
    demo: "https://laxmansidhu.github.io/Book-Verse/index.html"
  },

  /* ----- DUMMY EXAMPLES — replace these with your real projects ----- */
  {
    name: "Sales Insight Dashboard",
    thumbnail: "None",                 // no image yet → a pastel placeholder is shown
    desc: "Sample entry. An end-to-end SQL + Power BI analysis of retail data across regions.",
    tags: ["SQL", "Power BI", "Excel"],
    difficulty: "intermediate",
    code: "None",                      // demo "None" → only the Code button shows
    demo: "None"
  },
  {
    name: "Customer Churn Predictor",
    thumbnail: "None",
    desc: "Sample entry. An ML model predicting customer churn with feature engineering and tuning.",
    tags: ["Python", "scikit-learn", "Pandas"],
    difficulty: "difficult",
    code: "https://github.com/",
    demo: "None"                       // demo "None" → only the Code button shows
  }
];

window.PROJECTS_FUN = [
  {
    name: "Celebrity Pairs",
    thumbnail: "assets/Projects/CelebrityPairs.png",
    desc: "Add your favourite celebrity pairs — on screen or off screen — and share your picks!",
    tags: ["HTML", "CSS", "JavaScript"],
    difficulty: "easy",
    code: "None",
    demo: "https://laxmansidhu.github.io/Celebrity-Pairs/index.html"
  },

  /* ----- DUMMY EXAMPLES — replace with your real fun projects ----- */
  {
    name: "Pomodoro Timer",
    thumbnail: "None",
    desc: "Sample entry. A minimalist focus timer with session tracking and gentle chimes.",
    tags: ["HTML", "CSS", "JavaScript"],
    difficulty: "easy",
    code: "https://github.com/",
    demo: "https://example.com"        // has a demo → shows Try It + Code
  },
  {
    name: "Weather Now",
    thumbnail: "None",
    desc: "Sample entry. A clean weather app with a 7-day forecast and animated conditions.",
    tags: ["JavaScript", "API"],
    difficulty: "easy",
    code: "None",
    demo: "https://example.com"        // has a demo → shows only Try It
  }
];
