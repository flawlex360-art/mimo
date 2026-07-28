# Personal Portfolio Website Design Spec

> [!NOTE]
> This document may not reflect the current implementation.
> See the final report for up-to-date state:
> [Final Report](../reports/personal-portfolio-website.md)

## [S1] Architecture & File Structure

```
mimo/
├── index.html          # Single page with all sections
├── css/
│   └── style.css       # All styles — light, editorial aesthetic
├── js/
│   └── main.js         # Intersection Observer + scroll logic
├── assets/
│   ├── images/         # Project screenshots, hero background
│   └── fonts/          # (optional) Custom fonts if needed
└── README.md
```

**Key decisions:**
- Single HTML file with semantic sections (`<header>`, `<section>`, `<footer>`)
- CSS organized by component (hero, about, projects, contact)
- Vanilla JS using Intersection Observer API for scroll detection
- No build step — open `index.html` directly or use any static host

## [S2] Visual Design — Light / Clean / Editorial

**Typography:**
- Headings: `Inter` or `DM Sans` (clean geometric sans-serif)
- Body: System font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`)
- Large heading sizes (clamp between 2.5rem–5rem) for editorial impact

**Color palette:**
- Background: `#fafafa` (off-white, not pure white)
- Text: `#1a1a1a` (near-black)
- Accent: `#2563eb` (clean blue) for links and interactive elements
- Muted: `#6b7280` (gray) for secondary text

**Spacing:**
- Generous whitespace — sections have 100–150px vertical padding
- Content max-width: 1200px, centered
- Grid gap: 2–3rem between project cards

**Aesthetic:**
- No borders, no shadows — separation through whitespace alone
- Subtle hover states (color shifts, slight scale)
- Typography-driven hierarchy, not decorative elements

## [S3] Scroll Reveal Behavior

**The hero background reveal effect:**
- A large background image sits behind the hero section
- As the user scrolls, the image is progressively revealed (clipped or opacity-based)
- Implementation: CSS `background-attachment: fixed` creates a parallax effect where the image stays stationary while content scrolls over it

**Section reveals:**
- Each section starts invisible (`opacity: 0`, `transform: translateY(30px)`)
- When the section enters the viewport (10% visible), it animates in:
  - `opacity: 0 → 1`
  - `translateY(30px) → 0`
  - Duration: 0.8s, easing: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth deceleration)
- Staggered children: project cards animate in sequence (100ms delay between each)

**Implementation approach:**
- Intersection Observer watches each section
- When section enters viewport, add `.revealed` class
- CSS transitions handle the animation
- Observer disconnects after reveal (one-time animation)
- Respects `prefers-reduced-motion` — no animation for users who disable it

**Performance:**
- Uses CSS transforms (GPU-accelerated) — no layout thrashing
- Observer disconnects after reveal (one-time animation)

## [S4] Section Designs

### Hero Section
- Full viewport height (`100vh`)
- Large background image with parallax effect
- Name in large editorial typography (clamp 3rem–6rem)
- One-line tagline: what you do / who you are
- Subtle scroll indicator at bottom (animated chevron or line)
- Background image reveals as you scroll past the hero

### About Section
- Two-column layout (text + optional photo)
- Clean paragraph text, no boxes or cards
- Key details as simple list items (location, role, interests)
- Reveals with fade-up animation

### Projects Section
- Grid layout (2–3 columns on desktop, 1 on mobile)
- Each project card:
  - Thumbnail image
  - Project title
  - One-line description
  - Tags (technology/category)
  - Link to live project or GitHub
- Cards reveal with staggered animation
- Hover: subtle scale (1.02) and shadow

### Contact Section
- Simple centered layout
- Email link (primary CTA)
- Social links as text (GitHub, LinkedIn, Twitter/X)
- Optional: simple contact form (name, email, message)
- Reveals with fade-up

## [S5] Responsive Design

**Breakpoints:**
- Mobile: < 768px (single column, stacked layout)
- Tablet: 768px–1024px (2-column grid)
- Desktop: > 1024px (full layout, max-width 1200px)

**Mobile adaptations:**
- Hero: smaller typography, background image still visible
- About: single column, photo above text
- Projects: single column cards, full-width
- Contact: stacked links, larger touch targets

**Performance considerations:**
- Images: `loading="lazy"` for below-fold content
- Hero image: preload for immediate display
- CSS: minimal, no framework overhead
- JS: ~50 lines of vanilla JavaScript
