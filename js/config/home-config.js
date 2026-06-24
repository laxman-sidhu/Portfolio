// home-config.js — edit skills / experience / education here

// Skills — tone: blush | rose | peach | butter | sage | mint | sky | lavender | lilac
window.SKILLS = [
  { icon: "🐍", title: "Languages",        tone: "lavender", items: ["Python", "SQL", "R", "JavaScript"] },
  { icon: "📊", title: "Analytics & Viz",  tone: "sky",      items: ["Pandas", "NumPy", "Power BI", "Tableau"] },
  { icon: "🤖", title: "Machine Learning", tone: "rose",     items: ["scikit-learn", "Regression", "Classification"] },
  { icon: "🛠️", title: "Web & Tools",      tone: "sage",     items: ["HTML", "CSS", "Git", "Excel"] }
  // , { icon: "☁️", title: "Cloud", tone: "mint", items: ["AWS", "GCP"] }
];

// Work experience — leave the list empty ([]) to hide the section
window.EXPERIENCE = [
  {
    period: "2025 — Present",
    role:   "Data Analyst",
    company:"Company Name Pvt. Ltd.",
    place:  "Mumbai, India",
    desc:   "Short summary of what you do here — the kind of analysis you run, tools you use, and the impact you drive.",
    tags:   ["Python", "SQL", "Power BI"]
  },
  {
    period: "2024 (Summer)",
    role:   "Data Science Intern",
    company:"Internship Company",
    place:  "Remote",
    desc:   "What you worked on during the internship — models built, dashboards shipped, or datasets cleaned.",
    tags:   ["Pandas", "Visualization"]
  }
];

// Education — score is optional (shown as a pill)
window.EDUCATION = [
  {
    period: "2021 — 2025",
    title:  "B.E. — Computer Science Engineering (Data Science)",
    place:  "Vidyavardhini's College of Engineering & Technology",
    score:  "CGPA 9.7 / 10",
    desc:   "Core focus on data science, machine learning, and statistical modelling, with hands-on web and analytics projects."
  },
  {
    period: "2019 — 2021",
    title:  "Higher Secondary — Science",
    place:  "Annasaheb Vartak College of Arts, Commerce & Science, Vasai",
    score:  "97.83%"
  },
  {
    period: "2018 — 2019",
    title:  "Secondary School",
    place:  "National English High School, Virar",
    score:  "90.80%"
  }
];
