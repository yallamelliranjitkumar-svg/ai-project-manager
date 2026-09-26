# Build Log

A plain-English diary of how this site was built by directing AI.

## 26 Sep 2026: Architect

- Wrote the creative brief (BRIEF.md).
- Asked Claude to propose the stack, folder structure and phases before any code.
- Decided: React + Vite + TypeScript, React Three Fiber for 3D, GSAP for scroll,
  Motion for UI, and Vercel for hosting. No backend.

## 26 Sep 2026: Design

- Claude wrote the design system (docs/DESIGN.md): one violet accent, the Unbounded
  and Inter fonts, spacing rules, motion rules and a chapter-by-chapter 3D plan.
- Decided: Chapter 5 asks the visitor to accept the AI's recommendation or
  **override it with human judgement**, using a healthcare launch scenario.
- Joined up the brief's two agent lists into five domains, each with an agent.

## 26 Sep 2026: Phase 1 (Foundation)

- Set up the project and turned the design system into code ("tokens").
- Built every section with real text: hero, journey, process strip, six chapters,
  experiment cards and footer. All wording lives in `src/content/content.ts`.
- Added the glowing PROJECT sphere (drawn in code, no 3D model files) and a field
  of particles. Phones get fewer particles and no heavy glow effect.
- Fixes made while reviewing in the browser:
  - The sphere first looked like a flat purple disc. The glow was moved to the
    edges so it reads as a glowing orb.
  - On phones the sphere covered the headline. It now sits smaller, in the lower right.
- Known and planned: the sphere stays in one place for now. Phase 2 makes it move
  and change with scrolling.
