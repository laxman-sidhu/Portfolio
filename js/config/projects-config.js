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
    thumbnail: "assets/Projects/ResumeScreening.png",                
    desc: "A Flask web app that screens resumes against a job description with NLP ranking, optimizes them using Google Gemini, and runs built in aptitude tests, all in one hiring workflow.",
    tags: ["Python", "NLP", "scikit-learn", "Flask", "Gemini"],
    difficulty: "intermediate",
    code: "https://github.com/Laxman-19/Resume-Screening-Optimizing-Aptitude",
    demo: "https://resume-screening-optimizing-aptitude.onrender.com/",
    longDesc: "resume-screening-optimizing-aptitude"
  },
  {
    name: "ML Hub",
    thumbnail: "None",
    desc: "A production Flask dashboard that hosts many machine-learning models: tabular and image-based, behind a plugin architecture",
    tags: ["SQL", "Power BI", "Excel"],
    difficulty: "Easy",
    code: "None",
    demo: "None",
    longDesc: "ml-hub"                   
  },
  {
    name: "Olympics Analysis and Prediction",
    thumbnail: "None",
    desc: "A Streamlit web app that explores 120 years of Olympic data through interactive charts and a medal map, and predicts the medal an athlete is most likely to win.",
    tags: ["Python", "Streamlit", "Pandas", "Plotly", "Scikit-learn"],
    difficulty: "Easy",
    code: "None",
    demo: "None",
    longDesc: "olympics-analysis-and-prediction"                   
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
  }
];
