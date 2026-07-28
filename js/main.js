// main.js — Cursor Reveal + Scroll Reveal

document.addEventListener('DOMContentLoaded', () => {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    const canHover = !isTouch;
    const allHeroes = document.querySelectorAll('.hero');

    // ── Cursor Reveal Effect (Desktop & Mobile) ────────────────────
    allHeroes.forEach(hero => {
        const canvas = hero.querySelector('.hero-mask');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const MASK_COLOR = '250, 250, 250';
        const R_START = 6;
        const R_END = 100;
        const R_VARY = 0.45;
        const LIFETIME = 600;
        const STAMP_STEP = 10;
        const MAX_STAMPS = 200;
        const DPR = Math.min(window.devicePixelRatio || 1, 2);

        let w = 0;
        let h = 0;

        function resize() {
            const rect = hero.getBoundingClientRect();
            w = rect.width;
            h = rect.height;
            canvas.width = Math.round(w * DPR);
            canvas.height = Math.round(h * DPR);
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'rgb(' + MASK_COLOR + ')';
            ctx.fillRect(0, 0, w, h);
        }

        resize();
        window.addEventListener('resize', resize);

        const stamps = [];
        let lastX = null;
        let lastY = null;

        function addStamp(x, y) {
            if (stamps.length >= MAX_STAMPS) stamps.shift();
            stamps.push({
                x: x,
                y: y,
                born: performance.now(),
                seed: Math.random() * Math.PI * 2,
                rmax: R_END * (1 - R_VARY + Math.random() * R_VARY),
            });
        }

        function stampAlong(x, y) {
            if (lastX === null) {
                addStamp(x, y);
            } else {
                const dx = x - lastX;
                const dy = y - lastY;
                const dist = Math.hypot(dx, dy);
                const steps = Math.max(1, Math.ceil(dist / STAMP_STEP));
                for (let i = 1; i <= steps; i++) {
                    addStamp(lastX + (dx * i) / steps, lastY + (dy * i) / steps);
                }
            }
            lastX = x;
            lastY = y;
        }

        function carveInk(x, y, r, alpha, seed) {
            const g = ctx.createRadialGradient(x, y, r * 0.25, x, y, r);
            g.addColorStop(0, 'rgba(0, 0, 0, ' + 0.95 * alpha + ')');
            g.addColorStop(0.55, 'rgba(0, 0, 0, ' + 0.88 * alpha + ')');
            g.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            const segs = 32;
            for (let i = 0; i <= segs; i++) {
                const a = (i / segs) * Math.PI * 2;
                const wob =
                    0.78 +
                    0.14 * Math.sin(a * 3 + seed) +
                    0.08 * Math.sin(a * 7 + seed * 2.1) +
                    0.05 * Math.sin(a * 13 + seed * 0.7);
                const rr = r * wob;
                const px = x + Math.cos(a) * rr;
                const py = y + Math.sin(a) * rr;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
        }

        let running = false;

        function loop() {
            const now = performance.now();

            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'rgb(' + MASK_COLOR + ')';
            ctx.fillRect(0, 0, w, h);

            ctx.globalCompositeOperation = 'destination-out';
            for (let i = stamps.length - 1; i >= 0; i--) {
                const t = (now - stamps[i].born) / LIFETIME;
                if (t >= 1) {
                    stamps.splice(i, 1);
                    continue;
                }
                const ease = 1 - Math.pow(1 - t, 3);
                const r = R_START + (stamps[i].rmax - R_START) * ease;
                const alpha = 1 - t * t;
                carveInk(stamps[i].x, stamps[i].y, r, alpha, stamps[i].seed);
            }

            if (stamps.length) {
                requestAnimationFrame(loop);
            } else {
                running = false;
            }
        }

        function start() {
            if (!running) {
                running = true;
                requestAnimationFrame(loop);
            }
        }

        if (canHover) {
            hero.addEventListener('mouseenter', function (e) {
                const rect = hero.getBoundingClientRect();
                lastX = e.clientX - rect.left;
                lastY = e.clientY - rect.top;
                stampAlong(lastX, lastY);
                start();
            });

            hero.addEventListener('mousemove', function (e) {
                const rect = hero.getBoundingClientRect();
                stampAlong(e.clientX - rect.left, e.clientY - rect.top);
                start();
            });

            hero.addEventListener('mouseleave', function () {
                lastX = null;
                lastY = null;
            });
        } else {
            // Mobile: Automated Wandering Spotlight
            let autoRoamActive = false;
            let startTime = performance.now();
            let roamReq = null;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (!autoRoamActive) {
                            autoRoamActive = true;
                            startTime = performance.now();
                            lastX = null;
                            lastY = null;
                            roamReq = requestAnimationFrame(autoRoam);
                        }
                    } else {
                        autoRoamActive = false;
                        if (roamReq) cancelAnimationFrame(roamReq);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(hero);

            function autoRoam(now) {
                if (!autoRoamActive) return;
                
                const elapsed = now - startTime;
                const cx = w / 2;
                const cy = h / 2;
                
                // Smooth figure-8 (Lissajous curve)
                const radiusX = w * 0.35;
                const radiusY = h * 0.35;
                
                const x = cx + Math.sin(elapsed * 0.001) * radiusX;
                const y = cy + Math.sin(elapsed * 0.0014) * Math.cos(elapsed * 0.0007) * radiusY;
                
                stampAlong(x, y);
                start();
                
                roamReq = requestAnimationFrame(autoRoam);
            }
        }
    });

    // ── Scroll Reveal (Sections) — Bidirectional ─────────────────────
    const revealElements = document.querySelectorAll('.reveal');
    const projectCards = document.querySelectorAll('.project-card');

    function checkVisibility() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.85; // Trigger at 85% of viewport

        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < triggerPoint && rect.bottom > 0) {
                el.classList.add('revealed');
            } else {
                el.classList.remove('revealed');
            }
        });

        projectCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < triggerPoint && rect.bottom > 0) {
                card.classList.add('revealed');
            } else {
                card.classList.remove('revealed');
            }
        });
    }

    // Use requestAnimationFrame for smooth performance
    let revealTicking = false;
    window.addEventListener('scroll', function() {
        if (!revealTicking) {
            requestAnimationFrame(function() {
                checkVisibility();
                revealTicking = false;
            });
            revealTicking = true;
        }
    }, { passive: true });

    // Initial check
    checkVisibility();

    // ── Mobile Navigation Toggle ─────────────────────────────────────
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('is-open');
            navToggle.classList.toggle('is-active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('is-open');
                navToggle.classList.remove('is-active');
            });
        });
    }
});


    // ── Lucide Icons Init ──────────────────────────────────────────
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ── Service Card Click Animation ───────────────────────────────
    document.querySelectorAll('.service-card, .service-card-full, .project-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            // Prevent if clicking a link inside
            if(e.target.tagName.toLowerCase() === 'a') return;
            
            // Remove class if it's already there to retrigger animation
            this.classList.remove('animate-pop');
            // Trigger reflow
            void this.offsetWidth;
            this.classList.add('animate-pop');
            
            // Cleanup class after animation
            setTimeout(() => {
                this.classList.remove('animate-pop');
            }, 400);
        });
    });
