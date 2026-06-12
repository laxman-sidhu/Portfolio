# Laxman Sawant - Portfolio

A personal portfolio website built with plain HTML, CSS, and JavaScript. It contains three pages, each powered by a simple configuration file so content can be updated without modifying the layout.

## Pages

### 1. Home - `index.html`

* Hero section with photo, name, role, short bio, and quick links (Resume, Projects, Contact).
* Technical Toolkit with skills grouped by purpose.
* Work Experience displayed as a timeline.
* Education & Milestones displayed as a timeline.
* Contact form for getting in touch.

### 2. Projects - `projects.html`

* Main Projects showcasing focused, intentional builds.
* Fun Projects featuring smaller experiments and side projects.
* Every project appears as a clickable card containing a thumbnail, title, short description, tags, and action buttons.
* Clicking a card opens a pop-up containing the project's full rich-text long description.

### 3. Hobbies - `hobbies.html`

* Dedicated galleries for hobbies including Dancing, Cycling, Playing Sports, and Beach Days.
* Supports both photos and videos.
* Clicking any media item opens a lightbox viewer.

## Project Structure

```text
Portfolio/
├─ index.html
├─ projects.html
├─ hobbies.html
├─ css/
├─ js/
│  ├─ config/
│  └─ main/
└─ assets/
```

## Content Management

* Projects: `js/config/projects-config.js`
* Skills, Experience & Education: `js/config/home-config.js`
* Hobbies: `js/config/hobbies-config.js`
* Project Long Descriptions: `assets/Projects/Long Descriptions/<name>.js`

## Running the Site

Open `index.html` directly in a browser, or host the project on GitHub Pages.

For full local functionality, including project pop-ups, start a local server:

`python -m http.server`

Then visit:

`http://localhost:8000`
