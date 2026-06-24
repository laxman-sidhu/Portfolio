// projects-config.js — edit this file to add projects (cards build themselves)
// Fields: name, thumbnail, desc, tags[], difficulty (easy|intermediate|difficult),
//         code (URL or "None"), demo (URL or "None"), longDesc (file key or "None").
// Long descriptions live in assets/Projects/Long Descriptions/<key>.js as rich-text HTML.

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
