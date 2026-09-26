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
- Phase 1 went live on Vercel. Every push to GitHub now updates the site automatically.

## 26 Sep 2026: New theme (Design v2)

- Kept the story exactly as it was, but moved it into a new world: **Aurora
  Station**, a hospital orbiting Earth.
- The PROJECT sphere becomes the station's glowing core. The five AI agents take
  posts at five wards, and the project being delivered is a sixth ward that
  lights up at the end.
- Colour now carries meaning: cyan = hospital, violet = AI, warm white = human,
  amber = risk.
- Rules I set for the AI: be inspired by classic sci-fi but copy nothing (no
  franchise logos, ships or interface styles), use only public-domain or openly
  licensed assets (NASA Earth imagery), and show no fake medical imagery.
- The station shape is based on the Stanford torus, a public 1975 NASA design study.

## 26 Sep 2026: Re-theme build

- Downloaded three public-domain NASA images of Earth (day surface, city
  lights, clouds) and shrank them from 4.1 MB to about 620 KB for computers
  and 180 KB for phones.
- Built an animated Earth: it turns slowly, clouds drift, cities glow on the
  night side, and a blue atmosphere glows at the edge.
- Built Aurora Station in code: a ring with six wards, spokes, solar panels,
  twinkling window lights and the glowing PROJECT core.
- Restyled every section: cyan hospital colours, violet for AI, HUD glass
  panels with viewfinder corners, and JetBrains Mono for screen readouts.
  Examples: the journey became a flight path (altitude 0 km → 408 km), and the
  process strip became a launch countdown (T-5 → T-0).
- Fixes made while reviewing in the browser:
  - Earth first looked like a small globe showing polar ice. It is now huge and
    far away, so only its curved edge shows.
  - Earth was too bright behind the text. Moving the sun behind the planet put
    most of it in night.
  - The 3D no longer waits for the label font before appearing.

## 26–27 Sep 2026: The scroll film (prototype page)

- Collected three reference images (spaceship, space dock, nebula) and planned a
  scroll story: the ship (the project) flies through the six stages and docks at
  Aurora Station (docs/SCROLL-ANIMATION-PLAN.md).
- Built a free parallax prototype first to test the scroll timing.
- Generated the film in Kling AI, shot by shot, using start and end frames that
  Claude built from cut-outs of the ship and station. Around 20 takes in total.
  Every take, cost and lesson is logged.
- Lessons: full 360° orbits melt when the AI has never seen the ship's back;
  generating a rear view fixed that. Binding the ship "element" pulls it toward
  the camera, so don't bind it when the ship should stay small. Keep the ship's
  on-screen direction consistent, or change sides only after a head-on,
  tail-on or top-down view.
- Claude joined the shots into one 46-second film, checked every join frame by
  frame, removed frozen tails, and made web versions (1080p for computers,
  540p for phones) that scrub instantly as you scroll.
- The prototype page plays the film by scroll with the chapter text, AI agent
  tags, alerts, the decision buttons and labelled station rings on top.
- Fixes from review: readable text over bright clouds, sharper film, finale
  labels in dark glass tags, and the complete station always visible.
