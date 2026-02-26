"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import profile from "@/app/assets/profile.png";
/* ══════════════════════════════════════════════════════
   SOCIAL ICONS
══════════════════════════════════════════════════════ */
const IconGithub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);
const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const IconTwitter = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ══════════════════════════════════════════════════════
   THREE.JS — FLUID PAINT DRIP SHADER
   
   Strategy: metaball SDF blobs that start at the very
   top of the canvas and flow DOWN like thick paint poured
   from above. They accumulate and pool near the bottom-right
   (behind Faraji). Left side stays clear for text legibility.
══════════════════════════════════════════════════════ */
const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/* 
  Paint drip shader:
  - 10 blobs, each assigned to a column in the right half of the screen
  - Each blob drips from top (y=1) toward bottom (y=0)
  - Blobs merge smoothly when close (metaball smooth-min)
  - Gravity stretches them vertically (teardrop distortion)
  - Right half of screen has full paint, left half fades out
*/
const FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;

  // 7 joyful paint colours
  vec3 pal(int i) {
    if (i == 0) return vec3(0.91, 0.16, 0.22); // crimson
    if (i == 1) return vec3(1.00, 0.55, 0.00); // tangerine
    if (i == 2) return vec3(0.06, 0.62, 0.90); // sky blue
    if (i == 3) return vec3(0.62, 0.18, 0.88); // purple
    if (i == 4) return vec3(0.05, 0.72, 0.38); // emerald
    if (i == 5) return vec3(1.00, 0.82, 0.00); // sunflower
    return             vec3(1.00, 0.38, 0.68); // hot pink
  }

  // Smooth minimum — merges two blobs
  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5*(b - a)/k, 0.0, 1.0);
    return mix(b, a, h) - k*h*(1.0 - h);
  }

  // Per-blob: x column (right half), speed, phase
  vec2 blobPos(int i, float t) {
    float fi = float(i);

    // Cluster blobs across x=0.45 → 1.0 (right half + overflow)
    float xBase  = 0.45 + mod(fi * 0.097 + 0.03, 0.55);
    float xSway  = 0.022 * sin(t * 0.4 + fi * 1.9);
    float x      = xBase + xSway;

    // Start at top (y=1.1), drip downward at staggered speeds
    float speed  = 0.055 + fi * 0.008;
    float yStart = 1.15 + fi * 0.18; // stagger so they don't all arrive at once
    float y      = mod(yStart - t * speed, 1.45) - 0.12;

    // Gentle horizontal drift as they fall
    x += 0.015 * sin(t * 0.7 + fi * 3.1) * (1.0 - y);

    return vec2(x, y);
  }

  void main() {
    vec2 uv = vUv;
    float ar = uRes.x / uRes.y;

    // Aspect-correct UV
    vec2 uvA = vec2(uv.x * ar, uv.y);

    float field = 0.0;
    vec3  cAcc  = vec3(0.0);
    float wAcc  = 0.0;

    for (int i = 0; i < 10; i++) {
      vec2  p   = blobPos(i, uTime);
      vec2  pA  = vec2(p.x * ar, p.y);

      // Radius — blobs grow as they fall (paint spreads)
      float r = 0.06 + float(i) * 0.006 + (1.0 - clamp(p.y, 0.0, 1.0)) * 0.04;

      // Teardrop: stretch vertically in direction of fall
      float dx = uvA.x - pA.x;
      float dy = (uv.y - p.y) * 0.72; // squish Y → elongates drip
      float dist = sqrt(dx*dx + dy*dy);

      float contrib = (r * r) / (dist * dist + 0.0001);
      field += contrib;

      float w = contrib * contrib;
      int ci = int(mod(float(i), 7.0));
      cAcc += pal(ci) * w;
      wAcc += w;
    }

    // Threshold — paint surface
    float threshold = 0.85;
    float alpha = smoothstep(threshold - 0.08, threshold + 0.14, field);

    vec3 paintCol = wAcc > 0.001 ? cAcc / wAcc : vec3(1.0);

    // Gloss highlight on leading edge of each drip
    float gloss = smoothstep(threshold + 0.05, threshold + 0.4, field);
    paintCol = mix(paintCol, paintCol * 1.25 + 0.1, gloss * 0.3);

    // X-fade: paint only on right side; left side (text) stays clear
    // Hard zero below x=0.3, full paint above x=0.5
    float xFade = smoothstep(0.28, 0.52, uv.x);
    alpha *= xFade;

    // Y-fade: slight fade at very bottom so it doesn't look cut off
    float yFade = smoothstep(0.0, 0.06, uv.y);
    alpha *= yFade;

    gl_FragColor = vec4(paintCol, alpha * 0.92);
  }
`;

function PaintCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(W, H) },
    };

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    const geo = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geo, mat));

    const clock = new THREE.Clock();
    let frame: number;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const nW = el.clientWidth;
      const nH = el.clientHeight;
      renderer.setSize(nW, nH);
      uniforms.uRes.value.set(nW, nH);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      mat.dispose();
      geo.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="paint-canvas" />;
}

function MagCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 12;
    el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(8px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.2s ease", willChange: "transform", ...style }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SCROLL REVEAL HOOK
══════════════════════════════════════════════════════ */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal");
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */
const SERVICES = [
  {
    label: "Website Developer",
    sub: "+5 shipped websites",
    accent: "var(--red)",
    icon: "⌨️",
    img: "https://cdn.sanity.io/images/evc2qsht/production/a7f32771a360b2b0fce6def8e80e9050cbf3a5eb-1920x1080.png",
  },
  {
    label: "Graphic Designer",
    sub: "Engaging & dynamic designs",
    accent: "var(--violet)",
    icon: "🎨",
    img: "https://cdn.sanity.io/images/evc2qsht/production/6e2fe1a580d3336e5f8a2bea24373cf00ca8c567-3022x1398.png",
  },
  {
    label: "Website Designer",
    sub: "Wireframes to full mock-ups",
    accent: "var(--cyan)",
    icon: "✏️",
    img: "https://cdn.sanity.io/images/evc2qsht/production/61e9351b3ac68a3975dd1e799d010fe066e2c4f9-800x424.png",
  },
];

const PROJECTS = [
  { title: "Ignite", tag: "Website", year: "2021", accent: "var(--red)", desc: "Game directory site using RAWG.io API", img: "https://cdn.sanity.io/images/evc2qsht/production/0ce970f931bc2c11a148ed2ddd5281d7974651f5-1920x898.png", github: "https://github.com/FarajiSparks/ignite", live: "https://famous-alpaca-90707c.netlify.app/" },
  { title: "Dialabottle ", tag: "Design", year: "2021", accent: "var(--violet)", desc: "Canadian Alcohol Delivery Company", img: "https://cdn.sanity.io/images/evc2qsht/production/a7f32771a360b2b0fce6def8e80e9050cbf3a5eb-1920x1080.png", live: "https://dialabottles.ca/" },
  { title: "TheInstaBooze", tag: "Website", year: "2021", accent: "var(--cyan)", desc: "Canadian Alcohol Delivery Company", img: "https://cdn.sanity.io/images/evc2qsht/production/6c0635c3fcf2a3b6d81e184361e0d42ea93ef0d7-1902x1080.png", live: "https://theinstabooze.com/" },
  { title: "Facepelt Media", tag: "Website", year: "2021", accent: "var(--green)", desc: "Creative Portfolio for Brandon Bartlett .", img: "https://cdn.sanity.io/images/evc2qsht/production/ab034817d607719846f2339694a9ca3b2be06c6d-1898x889.png", github: "https://github.com/FarajiSparks/Capture" },
];

const SOCIALS = [
  { href: "https://github.com/FarajiSparks", Icon: IconGithub, label: "GitHub" },
  // { href: "https://linkedin.com", Icon: IconLinkedIn, label: "LinkedIn" },
  // { href: "https://twitter.com", Icon: IconTwitter, label: "Twitter" },
];

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const projectsRef = useReveal();
  const ctaRef = useReveal();

  return (
    <>
      {/* ══ NAV ══ */}
      <nav className="nav">
        <a href="#home" className="nav-logo">
          Faraji<span>.</span>
        </a>

        <ul className="nav-links">
          {["Work", "Contact"].map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}>{l}</a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <a href="#contact" className="btn btn-primary" style={{ display: "none" }}>
            Hire me
          </a>
          {/* ^ shown via CSS at md+ */}
          <style>{`@media(min-width:769px){.nav-right .btn{display:inline-block!important}}`}</style>

          <button
            className={`hamburger${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu${menuOpen ? " is-open" : ""}`}>
        {["Services", "Work", "Contact"].map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
          >
            {l}
          </a>
        ))}
      </div>

      {/* ══ HERO ══ */}
      <section id="home" className="hero">
        {/* Paint drip — sits behind everything, confined to right side by shader */}
        <PaintCanvas />

        {/* Gradient overlay — protects left text, allows paint to show right */}
        <div className="hero-overlay" />

        <div className="hero-inner">

          {/* Left: copy */}
          <div className="hero-copy">
            <p className="eyebrow anim-1">Hey, I&apos;m</p>

            <h1 className="hero-name anim-2">
              Faraji
              <br />
            </h1>

            <p className="hero-tagline anim-3">
              You need a site that loads fast and looks great.<br /> I handle both sides of the equation.
            </p>

            <div className="hero-actions anim-4">
              <a href="#work" className="btn btn-primary">View my work</a>
              <a href="#contact" className="btn btn-ghost">Let&apos;s Talk</a>
            </div>

            <div className="hero-socials anim-5">
              {SOCIALS.map(({ href, Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  className="social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
          <div className="hero-image-col anim-img">
            <div className="hero-frame">
              <Image
                src={profile}
                alt="Faraji Sparks"
                fill
                priority
                className="hero-photo"
                sizes="(max-width: 860px) 55vw, 36vw"
                style={{
                  objectFit: "contain",
                  objectPosition: "bottom center",
                }}
              />
            </div>
          </div>
        </div>

        {/* Scroll nudge */}
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section
        id="work"
        className="section projects-bg"
        ref={projectsRef as React.RefObject<HTMLElement>}
      >
        <div className="section-inner">
          <div className="section-header">
            <p className="eyebrow">Selected work</p>
          </div>

          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <MagCard key={p.title} className="card" style={{ cursor: "pointer" }}>
                {p.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    className="project-placeholder"
                    style={{
                      background: `color-mix(in srgb, ${p.accent} 10%, var(--stone))`,
                    }}
                  >
                    🖼️
                  </div>
                )}

                <div className="project-body">
                  <div className="project-meta">
                    <span
                      className="project-tag"
                      style={{ color: p.accent, borderColor: p.accent }}
                    >
                      {p.tag}
                    </span>
                    <span className="project-year">{p.year}</span>
                  </div>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>
                  {p.github || p.live ? (
                    <div className="project-links" style={{
                      borderColor: p.accent, marginTop: "12px", gap: "12px", display: "flex", flexWrap: "wrap"
                    }}>
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer">
                          Live Site
                        </a>
                      )}
                    </div>
                  ) : null}
                  <span className="project-arrow">↗</span>
                </div>
              </MagCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section
        id="contact"
        className="section cta-bg"
        ref={ctaRef as React.RefObject<HTMLElement>}
      >
        <div className="cta-inner">
          <span className="eyebrow">Let&apos;s collaborate</span>
          <h2 className="section-title">
            Got a project
            <br />
            in <span className="grad-text">mind?</span>
          </h2>
          <p className="cta-body">
            Whether you need a website built from scratch, a brand identity,
            or a UI overhaul, let&apos;s make it memorable.
          </p>
          <a href="mailto:farajisparks@gmail.com" className="btn btn-primary">
            Start a conversation →
          </a>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="footer">
        <a href="#home" className="footer-logo">
          Faraji<span style={{ color: "var(--red)" }}>.</span>
        </a>
        <span className="footer-copy">
          © {new Date().getFullYear()} Faraji Sparks. All rights reserved.
        </span>
        <div className="footer-socials">
          {SOCIALS.map(({ href, Icon, label }) => (
            <a
              key={href}
              href={href}
              aria-label={label}
              className="social-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon />
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}