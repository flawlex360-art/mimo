# Personal Portfolio Website Implementation Plan

> [!NOTE]
> This document may not reflect the current implementation.
> See the final report for up-to-date state:
> [Final Report](../reports/personal-portfolio-website.md)

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimalistic personal portfolio website with scroll-reveal animations and a parallax hero background.

**Architecture:** Single-page HTML/CSS/JS site with no build step. Uses Intersection Observer API for scroll-triggered animations and CSS `background-attachment: fixed` for parallax effect.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, Google Fonts (Inter/DM Sans)

## Global Constraints

- No build tools, frameworks, or dependencies — pure HTML/CSS/JS only
- Max content width: 1200px, centered
- Background: `#fafafa`, Text: `#1a1a1a`, Accent: `#2563eb`, Muted: `#6b7280`
- Sections animate in when 10% visible (opacity + translateY)
- Hero background uses `background-attachment: fixed` for parallax
- Respect `prefers-reduced-motion` media query
- Mobile-first responsive design

---

### Task 1: Project Setup & HTML Structure

**Covers:** S1

**Files:**
- Create: `index.html`
- Create: `css/style.css` (empty placeholder)
- Create: `js/main.js` (empty placeholder)
- Create: `assets/images/` directory

**Interfaces:**
- Produces: HTML structure with semantic sections for all subsequent tasks

- [ ] **Step 1: Create project directories**

```bash
mkdir -p css js assets/images
```

- [ ] **Step 2: Create index.html with full page structure**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Name — Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="hero" id="hero">
        <div class="hero-content">
            <h1 class="hero-title">Your Name</h1>
            <p class="hero-tagline">Designer & Developer</p>
        </div>
        <div class="scroll-indicator">
            <span>Scroll</span>
            <div class="scroll-line"></div>
        </div>
    </header>

    <section class="about reveal" id="about">
        <div class="container">
            <h2>About</h2>
            <div class="about-grid">
                <div class="about-text">
                    <p>A brief paragraph about yourself, your interests, and what drives your work.</p>
                    <ul class="about-details">
                        <li>Location: Your City</li>
                        <li>Role: Your Role</li>
                        <li>Interests: Your Interests</li>
                    </ul>
                </div>
                <div class="about-photo">
                    <img src="assets/images/profile.jpg" alt="Your Name" loading="lazy">
                </div>
            </div>
        </div>
    </section>

    <section class="projects reveal" id="projects">
        <div class="container">
            <h2>Projects</h2>
            <div class="projects-grid">
                <article class="project-card">
                    <img src="assets/images/project1.jpg" alt="Project 1" loading="lazy">
                    <h3>Project Title</h3>
                    <p>One-line description of the project.</p>
                    <div class="project-tags">
                        <span>HTML</span>
                        <span>CSS</span>
                        <span>JavaScript</span>
                    </div>
                    <a href="#" class="project-link">View Project →</a>
                </article>
                <!-- Repeat for 3-5 projects -->
            </div>
        </div>
    </section>

    <section class="contact reveal" id="contact">
        <div class="container">
            <h2>Contact</h2>
            <p class="contact-cta">Let's work together</p>
            <a href="mailto:your@email.com" class="contact-email">your@email.com</a>
            <div class="contact-links">
                <a href="#">GitHub</a>
                <a href="#">LinkedIn</a>
                <a href="#">Twitter</a>
            </div>
        </div>
    </section>

    <footer>
        <p>&copy; 2026 Your Name</p>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create empty CSS file**

```css
/* style.css — styles will be added in subsequent tasks */
```

- [ ] **Step 4: Create empty JS file**

```javascript
// main.js — scroll reveal logic will be added in Task 7
```

- [ ] **Step 5: Verify files exist**

```bash
ls -la index.html css/style.css js/main.js
ls -la assets/images/
```

Expected: All files and directories exist.

- [ ] **Step 6: Commit**

```bash
git add index.html css/style.css js/main.js assets/images/
git commit -m "feat: scaffold project structure with HTML skeleton"
```

---

### Task 2: CSS Foundation — Typography, Colors, Spacing

**Covers:** S2

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Consumes: HTML structure from Task 1
- Produces: Base styles for all subsequent visual tasks

- [ ] **Step 1: Write CSS reset and base styles**

```css
/* Reset */
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Base */
html {
    scroll-behavior: smooth;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #fafafa;
    color: #1a1a1a;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
}

/* Typography */
h1, h2, h3 {
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    line-height: 1.2;
}

h1 {
    font-size: clamp(3rem, 8vw, 6rem);
}

h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 2rem;
}

h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
}

p {
    margin-bottom: 1rem;
}

a {
    color: #2563eb;
    text-decoration: none;
    transition: color 0.2s ease;
}

a:hover {
    color: #1d4ed8;
}

img {
    max-width: 100%;
    height: auto;
    display: block;
}

/* Layout */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

/* Section spacing */
.about,
.projects,
.contact {
    padding: 100px 0;
}
```

- [ ] **Step 2: Verify styles apply correctly**

Open `index.html` in browser. Verify:
- Background is off-white (#fafafa)
- Text is near-black (#1a1a1a)
- DM Sans font loads for headings
- Links are blue (#2563eb)
- Sections have generous spacing

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add CSS reset, typography, and base layout"
```

---

### Task 3: Hero Section with Parallax Background

**Covers:** S3, S4 (Hero)

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Consumes: HTML structure from Task 1, base styles from Task 2
- Produces: Hero section visual design

- [ ] **Step 1: Add hero CSS styles**

```css
/* Hero Section */
.hero {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    background-image: url('../assets/images/hero-bg.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(250, 250, 250, 0.7);
    z-index: 1;
}

.hero-content {
    position: relative;
    z-index: 2;
}

.hero-title {
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
}

.hero-tagline {
    font-size: clamp(1rem, 2vw, 1.5rem);
    color: #6b7280;
    font-weight: 400;
}

/* Scroll Indicator */
.scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.scroll-indicator span {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #6b7280;
}

.scroll-line {
    width: 1px;
    height: 40px;
    background: #6b7280;
    animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
    0%, 100% {
        opacity: 1;
        transform: scaleY(1);
    }
    50% {
        opacity: 0.5;
        transform: scaleY(0.5);
    }
}
```

- [ ] **Step 2: Add a placeholder hero background image**

Place any image in `assets/images/hero-bg.jpg` (or use a solid color temporarily by commenting out background-image).

- [ ] **Step 3: Verify hero section**

Open in browser. Verify:
- Hero fills the viewport
- Background image is visible with parallax effect on scroll
- Content is centered with semi-transparent overlay
- Scroll indicator animates at bottom

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "feat: add hero section with parallax background"
```

---

### Task 4: About Section

**Covers:** S4 (About)

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Consumes: HTML structure from Task 1, base styles from Task 2
- Produces: About section visual design

- [ ] **Step 1: Add about section CSS**

```css
/* About Section */
.about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;
}

.about-text p {
    font-size: 1.125rem;
    line-height: 1.8;
    color: #374151;
}

.about-details {
    list-style: none;
    margin-top: 2rem;
}

.about-details li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e7eb;
    color: #6b7280;
}

.about-details li:last-child {
    border-bottom: none;
}

.about-photo img {
    border-radius: 4px;
    aspect-ratio: 1;
    object-fit: cover;
}
```

- [ ] **Step 2: Verify about section**

Open in browser. Verify:
- Two-column layout (text left, photo right)
- Clean typography with good line height
- Details list has subtle separators

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add about section styles"
```

---

### Task 5: Projects Section with Grid

**Covers:** S4 (Projects)

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Consumes: HTML structure from Task 1, base styles from Task 2
- Produces: Projects grid and card styles

- [ ] **Step 1: Add projects section CSS**

```css
/* Projects Section */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.project-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.project-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.project-card h3,
.project-card p {
    padding: 0 1.5rem;
}

.project-card h3 {
    padding-top: 1.5rem;
}

.project-card p {
    color: #6b7280;
    font-size: 0.9375rem;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
}

.project-tags span {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    background: #f3f4f6;
    border-radius: 100px;
    color: #6b7280;
}

.project-link {
    display: block;
    padding: 1rem 1.5rem 1.5rem;
    font-weight: 500;
}
```

- [ ] **Step 2: Verify projects section**

Open in browser. Verify:
- Cards display in responsive grid (2-3 columns)
- Hover effect works (scale + shadow)
- Tags display correctly
- Images fill card width

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add projects section with grid and card styles"
```

---

### Task 6: Contact Section

**Covers:** S4 (Contact)

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Consumes: HTML structure from Task 1, base styles from Task 2
- Produces: Contact section visual design

- [ ] **Step 1: Add contact section CSS**

```css
/* Contact Section */
.contact {
    text-align: center;
}

.contact-cta {
    font-size: 1.25rem;
    color: #6b7280;
    margin-bottom: 1rem;
}

.contact-email {
    display: inline-block;
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 2rem;
    transition: color 0.2s ease;
}

.contact-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
}

.contact-links a {
    color: #6b7280;
    font-size: 0.9375rem;
    transition: color 0.2s ease;
}

.contact-links a:hover {
    color: #1a1a1a;
}

/* Footer */
footer {
    text-align: center;
    padding: 2rem;
    color: #6b7280;
    font-size: 0.875rem;
}
```

- [ ] **Step 2: Verify contact section**

Open in browser. Verify:
- Content is centered
- Email link is large and prominent
- Social links are spaced evenly
- Footer is minimal

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add contact section and footer styles"
```

---

### Task 7: Scroll Reveal Animations (Intersection Observer)

**Covers:** S3

**Files:**
- Modify: `css/style.css`
- Modify: `js/main.js`

**Interfaces:**
- Consumes: HTML `.reveal` classes from Task 1
- Produces: Scroll-triggered animations for all sections

- [ ] **Step 1: Add reveal CSS classes**

```css
/* Scroll Reveal */
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.revealed {
    opacity: 1;
    transform: translateY(0);
}

/* Staggered children for project cards */
.projects-grid .project-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.projects-grid .project-card.revealed {
    opacity: 1;
    transform: translateY(0);
}

.projects-grid .project-card:nth-child(1) { transition-delay: 0ms; }
.projects-grid .project-card:nth-child(2) { transition-delay: 100ms; }
.projects-grid .project-card:nth-child(3) { transition-delay: 200ms; }
.projects-grid .project-card:nth-child(4) { transition-delay: 300ms; }
.projects-grid .project-card:nth-child(5) { transition-delay: 400ms; }

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
    .reveal,
    .projects-grid .project-card {
        opacity: 1;
        transform: none;
        transition: none;
    }
}
```

- [ ] **Step 2: Write Intersection Observer JavaScript**

```javascript
// main.js — Scroll Reveal with Intersection Observer

document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that should reveal on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const projectCards = document.querySelectorAll('.project-card');

    // Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                sectionObserver.unobserve(entry.target); // One-time animation
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // Slight offset for better timing
    });

    // Observer for project cards (staggered)
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe sections
    revealElements.forEach(el => sectionObserver.observe(el));

    // Observe project cards separately for staggered animation
    projectCards.forEach(card => cardObserver.observe(card));
});
```

- [ ] **Step 3: Verify scroll animations**

Open in browser. Verify:
- Sections fade in and slide up when scrolling
- Project cards animate with staggered timing
- Animation only plays once (no re-trigger on scroll back)
- Smooth easing (deceleration curve)

- [ ] **Step 4: Test reduced motion**

In browser DevTools, enable `prefers-reduced-motion: reduce` in rendering tab. Verify all content is visible immediately without animation.

- [ ] **Step 5: Commit**

```bash
git add css/style.css js/main.js
git commit -m "feat: add scroll reveal animations with Intersection Observer"
```

---

### Task 8: Responsive Design

**Covers:** S5

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Consumes: All previous styles
- Produces: Mobile and tablet adaptations

- [ ] **Step 1: Add responsive CSS**

```css
/* Responsive Design */

/* Tablet */
@media (max-width: 1024px) {
    .about-grid {
        gap: 2rem;
    }

    .projects-grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
}

/* Mobile */
@media (max-width: 768px) {
    .about,
    .projects,
    .contact {
        padding: 60px 0;
    }

    .about-grid {
        grid-template-columns: 1fr;
    }

    .about-photo {
        order: -1; /* Photo above text on mobile */
    }

    .about-photo img {
        max-width: 200px;
        margin: 0 auto;
    }

    .projects-grid {
        grid-template-columns: 1fr;
    }

    .contact-links {
        flex-direction: column;
        gap: 1rem;
    }

    .hero {
        background-attachment: scroll; /* Disable parallax on mobile for performance */
    }
}
```

- [ ] **Step 2: Test responsive behavior**

Use browser DevTools responsive mode. Test at:
- 375px (iPhone SE)
- 768px (iPad)
- 1024px (small laptop)
- 1440px (desktop)

Verify:
- Mobile: single column, stacked layout
- Tablet: 2-column grid for projects
- Desktop: full layout with max-width

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add responsive design for mobile and tablet"
```

---

### Task 9: Final Polish & Content

**Covers:** S2, S3, S4, S5

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`

**Interfaces:**
- Consumes: All previous work
- Produces: Final polished website

- [ ] **Step 1: Update placeholder content**

Replace in `index.html`:
- "Your Name" → your actual name
- "Designer & Developer" → your actual tagline
- About section text → your actual bio
- Project cards → your actual projects (3-5 projects)
- Contact links → your actual social links
- Email → your actual email

- [ ] **Step 2: Add hero background image**

Place a high-quality image in `assets/images/hero-bg.jpg`. Recommended:
- Abstract texture, nature landscape, or architectural photo
- Minimum 1920x1080 resolution
- Not too busy — text needs to be readable over it

- [ ] **Step 3: Add project images**

Place project screenshots in `assets/images/`:
- `project1.jpg`, `project2.jpg`, etc.
- Consistent aspect ratio (16:9 or 4:3)
- Compress for web (tinypng.com or similar)

- [ ] **Step 4: Final visual review**

Open in browser and verify:
- All content is real (no placeholders)
- Images load correctly
- Scroll animations feel smooth
- Typography is consistent
- Colors are cohesive
- Spacing feels balanced

- [ ] **Step 5: Commit**

```bash
git add index.html assets/images/
git commit -m "feat: add real content and images"
```

---

### Task 10: Cross-Browser Testing & Deployment Prep

**Covers:** S5

**Files:**
- Modify: `css/style.css` (if fixes needed)
- Create: `README.md`

**Interfaces:**
- Consumes: All previous work
- Produces: Production-ready website

- [ ] **Step 1: Test in multiple browsers**

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (if available)
- Edge (latest)

Check for:
- Layout consistency
- Font rendering
- Animation performance
- Parallax behavior

- [ ] **Step 2: Performance check**

Run Lighthouse audit in Chrome DevTools. Target:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+

- [ ] **Step 3: Create README.md**

```markdown
# Personal Portfolio

A minimalistic personal portfolio website with scroll-reveal animations.

## Features

- Parallax hero background
- Scroll-triggered section reveals
- Responsive design (mobile, tablet, desktop)
- No build step — pure HTML/CSS/JS

## Setup

1. Clone the repository
2. Open `index.html` in a browser
3. Or serve with any static file server

## Customization

- Edit `index.html` for content
- Modify `css/style.css` for styles
- Update `assets/images/` for images

## Deployment

Deploy to any static hosting:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
```

- [ ] **Step 4: Final commit**

```bash
git add README.md
git commit -m "docs: add README with setup and deployment instructions"
```

---

## Self-Review Summary

**Spec Coverage:**
- S1 (Architecture): Task 1 ✓
- S2 (Visual Design): Tasks 2, 9 ✓
- S3 (Scroll Reveal): Tasks 3, 7 ✓
- S4 (Section Designs): Tasks 3, 4, 5, 6, 9 ✓
- S5 (Responsive): Tasks 8, 10 ✓

**Placeholder Scan:** No TBDs, TODOs, or incomplete steps found.

**Type Consistency:** CSS class names and JS selectors are consistent across all tasks.

**Execution Recommendation:** 10 tasks, all sequential (each builds on previous). Recommend **inline execution** with checkpoints after Tasks 4 and 7.
