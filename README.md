# Developer Portfolio — Moosa

An interactive, dependency-free single-page developer portfolio built with modern vanilla JavaScript (ES modules) and Three.js. This repository showcases production-grade full-stack web applications, system automation tools, algorithmic problem-solving milestones, and technical certifications.

---

## Technical Overview

The application is structured as an architectural WebGL experience with an accessible 2D fallback:

- **Core Engine:** Vanilla JavaScript utilizing native ES modules.
- **Client-Side Routing:** Custom single-page application router built on the HTML5 History API (`pushState`, `popState`) with transition lifecycle management (`Scope`).
- **3D Graphics & Canvas:** Three.js scene architecture featuring a 3D entrance rotunda, interactive raycast doors, dynamic canvas-rendered textures, and camera transitions.
- **Asset Pipeline:** Custom loading manager tracking GLTF/GLB models, HDR environment maps, and textures with real-time progress indicators.
- **Styling:** Modular CSS architecture adhering to custom dark/gold glassmorphism design tokens.

---

## Featured Engineering Projects

### 1. Civora — Civic Issue Reporting & Accountability Platform
- **Live Deployment:** https://civora-tau.vercel.app/
- **Stack:** React 19, TypeScript, Vite, Tailwind CSS, Leaflet GIS, Node.js, Express, Prisma ORM, PostgreSQL (Supabase), Google Gemini API, Zod
- **Architecture:** Enterprise municipal resolution pipeline featuring photographic field reporting, multimodal AI complaint triage, perceptual hashing (dHash) deduplication, SLA tracking, and defect liability management.

### 2. PRAMAAN — Evidence-Backed Skill Verification
- **Live Deployment:** https://pramaan-verify.vercel.app/
- **Stack:** React 19, Vite, TypeScript, Tailwind CSS, Leaflet GIS, Node.js, Express, MongoDB (Mongoose), Google Gemini API
- **Architecture:** Converts self-reported technical claims into verified skill profiles. Eliminates authentication barriers via secure HTTP-only browser cookie profile switching for rapid project team formation.

### 3. DailyTrack — Task Management & Habit Streaks
- **Live Deployment:** https://dailytrack4bros.vercel.app/
- **Stack:** React 19, React Router v7, Vite, Tailwind CSS, Node.js, Express, MongoDB Atlas, JWT, Bcrypt
- **Architecture:** Collaborative workflow and daily routine workspace with persistent habit streak mechanics, real-time shared states, and stateless token authentication.

### 4. SkillGap — Technical Competency Matching Platform
- **Stack:** HTML5, CSS3, Modern JavaScript, Node.js, Express, MongoDB
- **Architecture:** Evaluates user skill sets against industry role benchmarks, identifying missing competencies and delivering structured learning directives.

---

## Core Technical Competencies

- **Languages:** C++, Python, JavaScript (ES6+), SQL, Bash / Shell
- **Frontend:** React.js, Next.js, HTML5, CSS3, Tailwind CSS, Three.js
- **Backend & Databases:** Node.js, Express.js, PostgreSQL (Prisma ORM), MongoDB (Mongoose), RESTful APIs
- **Systems & Tools:** Linux (Ubuntu / WSL), Git, GitHub, Vite, Postman, VS Code
- **Algorithmic Problem Solving:** 150+ problems solved across data structures and algorithms on LeetCode (https://leetcode.com/u/Moosa_ENG/)

---

## Repository Structure

```
.
├── README.md                  # Project documentation and architectural overview
├── server.mjs                 # Zero-dependency local Node.js development server with SPA fallback
├── vercel.json                # Vercel deployment configuration with SPA routing rewrites
├── _redirects                 # Netlify single-page application redirect rules
└── site/
    ├── index.html             # Single-page application entry point and WebGL mount container
    ├── manifest.webmanifest   # Progressive web application manifest
    ├── css/                   # Modular style architecture and glassmorphism design tokens
    │   ├── bundle.css         # Foundational layouts and typography
    │   ├── custom.css         # Component styling and responsive overrides
    │   └── recreation.css     # Unified dark/gold glassmorphism tokens and button styles
    ├── js/                    # Native ES module application logic
    │   ├── core/              # Foundational single-page application engine
    │   │   ├── dom.js         # Declarative hyperscript element factory
    │   │   ├── nav.js         # Navigation destination registry and URL resolution
    │   │   ├── router.js      # Client-side router with lifecycle scope handling
    │   │   └── store.js       # Centralized client-side state store
    │   ├── pages/             # Route controllers and view renderers
    │   │   ├── home.js        # WebGL canvas orchestrator and 2D directory fallback
    │   │   ├── projects.js    # Engineering project showcase and filtering
    │   │   ├── project-detail.js # Deep-dive project architectural breakdowns
    │   │   ├── skills.js      # Technical arsenal, certifications, and tooling tiers
    │   │   ├── calendar.js    # Academic trajectory and milestones (/journey)
    │   │   ├── committee.js   # Leadership, working groups, and mentorship
    │   │   ├── gallery.js     # Engineering artifacts, whiteboard sessions, and notes
    │   │   ├── about.js       # Executive biography and engineering credentials
    │   │   └── contact.js     # Direct communication channels, external links, and dispatch form
    │   ├── scene/             # Three.js 3D WebGL scene implementation
    │   │   ├── world.js       # Render loop, scene graph, and camera coordinator
    │   │   ├── doors.js       # Interactive raycasted destination portals
    │   │   ├── reflector.js   # Real-time planar floor reflections
    │   │   └── lighting.js    # Cinematic ambient and directional illumination
    │   └── ui/                # Shared user interface components and Lucide SVG icons
    ├── data/                  # Static JSON models and structured scene markup
    │   ├── events.json        # Project catalog and architectural metadata
    │   ├── schedule.json      # Academic timeline and milestones
    │   └── skills-scene.html  # Technical competencies and toolchain districts
    ├── models/                # Optimized 3D assets (GLTF / GLB)
    ├── audio/                 # Ambient background audio assets
    └── photos/                # Engineering screenshots and gallery documentation
```

---

## Application Routing

All routes are handled client-side via the custom SPA router:

| Route | View Description |
| --- | --- |
| `/` | Interactive 3D Rotunda and WebGL Scene (with 2D Directory Fallback) |
| `/projects` | Engineering Project Directory with Filtered Categorization |
| `/projects/:id` | Dedicated Architectural Case Study and Technical Specification |
| `/skills` | Technical Arsenal, Language Districts, and Tooling Village |
| `/journey` | Academic Timeline, Engineering Degree, and Milestones |
| `/leadership` | Leadership Roles, Working Groups, and Technical Mentorship |
| `/about` | Executive Bio, Core Focus Areas, and Software Engineering Background |
| `/gallery` | Engineering Artifacts, Whiteboard Architectures, and Field Notes |
| `/contact` | Direct Communication Hub, Inquiry Dispatch Form, and External Profiles |

---

## Local Development & Setup

This project uses native ES modules and requires zero runtime package installations (`npm install` is not required).

### Prerequisites

- Node.js (version 18 or higher recommended)
- A modern web browser with WebGL 2.0 support (Chrome, Firefox, Safari, Edge)

### Execution

1. Clone or download the repository to your local machine:
   ```bash
   git clone https://github.com/Moosa2006/Portfolio.git
   cd Portfolio
   ```

2. Start the built-in development server:
   ```bash
   node server.mjs
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:4173
   ```

The local development server automatically handles SPA path routing (rewriting all extensionless routes to `/site/index.html`), serves assets with proper MIME types, and disables aggressive caching for rapid development iterations.

---

## Production Deployment

The codebase is statically deployable to any standard edge host or CDN:

- **Vercel:** Fully configured with `vercel.json` rewriting all subpaths to `/site/index.html`.
- **Netlify:** Pre-configured with `_redirects` (`/* /index.html 200`) for seamless client-side routing.
- **Static Hosting (Nginx / Apache / GitHub Pages):** Ensure all unknown routes rewrite to `/site/index.html`.

---

## Architecture & Engineering Highlights

- **Zero Runtime Dependencies:** The entire UI layer operates on vanilla JavaScript with zero third-party framework overhead, resulting in immediate initial paint and sub-second route transitions.
- **Progressive Enhancement:** If WebGL is unavailable or disabled, the application detects context creation failures and automatically presents a fully accessible 2D directory modal.
- **Glassmorphism Design System:** Custom CSS tokens deliver high-contrast readability against a cinematic obsidian and gold backdrop (`#E2B870`, `#F3E5AB`, `#0F141C`).
- **Memory & Resource Cleanup:** The custom router triggers explicit teardown lifecycles on route departure, releasing event listeners, audio buffers, and WebGL textures to prevent memory leaks.

---

## Contact & Connect

- **Developed by:** Moosa
- **Role:** Full-Stack Software Developer & Systems Builder
- **Institution:** Guru Nanak Dev Engineering College (GNDEC), Ludhiana
- **Email:** moosarajput2006@gmail.com
- **Phone:** +91 9877890312
- **LeetCode:** https://leetcode.com/u/Moosa_ENG/
- **GitHub:** https://github.com/Moosa2006
- **LinkedIn:** https://www.linkedin.com/in/moosa2006/


## License

This project is released under the MIT License.




