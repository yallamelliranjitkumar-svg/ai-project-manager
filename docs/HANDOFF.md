# HANDOFF — The AI Project Manager · Aurora Station (as of 2026-09-27)

## 1. Project Overview
- Portfolio website for **Ranjit Kumar Yallamelli** (healthcare IT / AI / project management background, **never written code**). Proves he can direct AI (Claude Code, Kling AI) as a product team. Headline: "I don't code. I build with AI." Audience: LinkedIn network, hiring managers in healthcare IT, AI and PM.
- Story: six chapters (Define → Plan → Delegate → Monitor → Decide → Deliver) showing AI agents + a human project manager delivering a project. Closing line: "AI doesn't replace the project manager. It changes what the project manager can accomplish."
- Theme (Design v2): **Aurora Station**, a hospital orbiting Earth. Current direction: a **scroll-driven AI-generated film** where a spaceship (= the project) flies through the six stages and docks at Aurora Station; the station's rings are labelled with the six stages as the summary.
- "Done" [INFERRED]: scroll film with all-angle views integrated into the main site (not just /prototype.html), readable on desktop + phone, published on Vercel; LinkedIn post + 15–30 s screen capture showing the process (per BRIEF.md).

## 2. Current State
- **Live main site** (index): Phase 1 re-themed as Aurora Station — code-drawn animated NASA Earth + ring station (React Three Fiber), all sections with copy. Phase 2 (scroll-driven 3D on main site) is **PARKED** by the user.
- **Live prototype page**: https://ai-project-manager-orpin.vercel.app/prototype.html — scroll scrubs the 46 s Kling film (1080p desktop / 540p phone) with HTML chapter panels, AI tags, alerts, Chapter 5 decision buttons, finale ring labels. Verified on live: film loads (1920x1080, 46.08 s, readyState 4), no console errors. Scrolling itself was NOT visually verified on live (preview browser window kept going black) [VERIFY].
- Git: `main` and `parallax-prototype` both at commit **cf6252d** ("Scroll-film prototype: AI-generated flight film driven by scroll"), pushed to GitHub. Working tree: `docs/HANDOFF.md` (this file) is new and uncommitted.
- **Planned, not started**: "all-angle coverage" (show ship right/left/front/back/top) — plan in `docs/SCROLL-ANIMATION-PLAN.md` §9, budget 115 Kling credits.
- Untested: real phones (iOS Safari video scrubbing), slow connections (17 MB film download).
- **Most important next step**: execute the all-angle plan (free edit steps first, then Kling shots A, C, D one at a time with review after each).

## 3. Key Decisions and Rationale
- **Design before code; one phase at a time; user approves each step.** User is a beginner and asked for proposals first.
- **Stack React + Vite + TypeScript, static site on Vercel** (user's brief). TypeScript chosen as a "spell-checker"; must explain in plain English.
- **Theme v2 Aurora Station** (user asked for "hospital in outer space" keeping the original concept). Rejected: a separate "Future of Healthcare talks" station site with placeholders (user said "no stop" and to keep original concept).
- **Colour roles**: cyan = hospital, violet = AI, warm white = human, amber = risk. Fonts: Unbounded (display), Inter (body), JetBrains Mono (HUD labels only).
- **Scroll film from AI video (Kling)** instead of code-drawn 3D or parallax: only way to keep quality of the reference images. A free parallax prototype was built first to test timing (since replaced).
- **Kling over Veo 3.1**: start/end frames, best free tier, ~$0.10/s. Veo = fallback if Kling morphs.
- **Keyframes built by compositing cut-outs** (same ship everywhere) rather than asking Kling to redraw the ship per scene.
- **Chain shots**: last frame of chosen take = start frame of next shot (guarantees seamless joins).
- **Rear view generated in Kling Image Generation** because full 360° orbits melted (Kling never saw the ship's back).
- **Don't bind the element on shots where the ship must stay small/still** (shot 8 take A pulled the ship to the camera).
- **Direction rule (updated)**: ship travels left→right on screen; it MAY point left when we see its left side **only after a neutral view** (head-on, tail-on or top-down). User confirmed: "The direction rule is ok."
- **Web film**: whole file downloaded first (fetch → blob) so seeking is instant; keyframe every 12 frames; 1920x1080 for desktop despite 720p source (sharper upscale + unsharp; honest limit: detail can't be added).
- **Letterbox rather than over-crop**: frame never crops more than ~15% width, so the complete station shows on squarish windows.
- Chapter 5: AI recommends "Launch on schedule"; visitor chooses "Accept AI recommendation" or "Override with human judgement" (hero path). Accept → amber warning persists in finale.

## 4. Architecture and Technical Context
- Node v20.20.2. Key packages (package.json): react ^19.3.0, react-dom ^19.3.0, vite ^8.3.1, typescript ^7.0.2, @vitejs/plugin-react ^6.1.1, three ^0.186.1, @react-three/fiber ^9.8.1, @react-three/drei ^10.7.9, @react-three/postprocessing ^3.1.2, postprocessing ^6.39.5, gsap ^3.15.0, lenis ^1.3.26, @fontsource/unbounded, @fontsource-variable/inter, @fontsource-variable/jetbrains-mono, @types/node, @types/three.
- Repo: `C:\Users\HP\AI-WEB-LAB\final-project` → GitHub `https://github.com/yallamelliranjitkumar-svg/ai-project-manager` (public). Vercel project auto-deploys `main` → https://ai-project-manager-orpin.vercel.app (user's Vercel account "RanjitKumar_Y", Hobby). Vercel Instant Rollback available.
- Multi-page Vite build (`vite.config.ts` rollupOptions.input: `index.html`, `prototype.html`).
- Key files:
  - `BRIEF.md` original creative brief · `docs/DESIGN.md` design system v2 (Aurora Station) · `docs/BUILD-LOG.md` plain-English diary · `docs/SCROLL-ANIMATION-PLAN.md` film plan (+ §9 all-angle plan) · `docs/HANDOFF.md` this file
  - `src/content/content.ts` ALL site copy (site links, hero, journey, process, chapters incl. `ward`, experiments, footer)
  - `src/styles/tokens.css` design tokens · `src/styles/global.css` shared (.label, .hud panels, .ai-text)
  - `src/sections/*` main page sections (Nav, Hero, Journey, ProcessStrip, Chapters, Experiments, Footer)
  - `src/scene/*` main page 3D: `Scene.tsx`, `Earth.tsx` (NASA textures shader), `Station.tsx` (procedural ring station), `ProjectSphere.tsx` (core), `Particles.tsx`; `src/lib/quality.ts` device quality
  - `public/textures/earth/{day,night,clouds}-{2k,1k}.webp` NASA public-domain Earth
  - `prototype.html` + `src/prototype/main.tsx` + `src/prototype/Flight.tsx` + `src/prototype/Flight.css` — the scroll film page
  - `public/film/flight-1080.mp4` (17.1 MB), `public/film/flight-540.mp4` (6.3 MB), `public/film/poster.webp`
- `Flight.tsx` model: `CHAPTERS` array maps film seconds → scroll weight: hero 0–1.5 (w1), define 1.5–9.4 (1.6), plan 9.4–13.0 (1.2), delegate 13.0–15.8 (1.2), monitor 15.8–20.8 (1.3), decide 20.8–25.9 (1.5), deliver 25.9–41.0 (2.2), finale 41.0–46.0 (1.8; film uses 60% then holds). `RINGS` two-line labels at (66,30),(70,41),(64.5,53) % of 16:9 frame. GSAP ScrollTrigger timeline + Lenis; a ticker `seek()` sets `video.currentTime`. Film tweens use `immediateRender: false` (otherwise page opens on the finale frame). Panels positioned by `pos` = bl/br/tl/r.
- **Film production area** (outside repo): `C:\Users\HP\AI-WEB-LAB\inspiration\scroll\`
  - `01-keyframes\` A-ship-over-clouds.jpg, C-ship-in-space.jpg, C2-ship-other-side.jpg, D-ship-at-nebula.jpg, E-ship-in-nebula.jpg, E2-ship-rear-in-nebula.jpg, E2R-ship-rear-heading-right.jpg, E3-shot4-last-frame.jpg, E3R-shot4c-last-frame.jpg, E4-shot5-last-frame.jpg, E4R-shot5b-last-frame.jpg, F-station-ahead.jpg, G-docked-closeup.jpg, G2-shot7-last-frame.jpg, H-station-clean.jpg (Photopea-cleaned, no "Apolo 13"), H-station-wide-docked.jpg, R-ship-rear.png, R-ship-top.png, nebula.jpg, station-TO-CLEAN.jpg
  - `02-takes\` every Kling take (`shotN-take-x.mp4`; `-wm` = watermarked copy)
  - `03-chosen\` shot1–shot8.mp4 (shot1 = take-a trimmed frames 0–224; shot4 = take-c; shot5 = take-b; shot6 = take-b; shot7 = take-a clean; shot8 = take-b at 2x speed)
  - `04-film\aurora-flight-master.mp4` (v3, 1280x720, 24 fps, 46.08 s, silent) + `-v1`, `-v2` backups
  - `log.txt` every take, cost, verdict, lesson · `tools\` helper scripts + `README.txt`
- Reference images: `C:\Users\HP\AI-WEB-LAB\inspiration\hero\upscaled_8x_{spaceship,spacedock,spacenebula}hr.png` (13376x7528, 80–95 MB each). Originals also in `C:\Users\HP\Downloads\` (space.jpg, spacedock*.png, spaceship*.png, spacenebulahr.png).
- Kling AI (paid, user's account): **115 credits** left (confirmed by user 2026-09-27). Element "spaceship" (category Items; main image C-ship-in-space.jpg; 3 extra angles: front view, rear view R-ship-rear, side view — slots full). Costs seen: 720p 5 s = 30, 10 s = 60; 1080p 5 s = 40; shot8 10 s once cost 80.
- Credentials: none stored in repo. GitHub push works from this machine; Vercel/Kling accounts are the user's (user signs in themselves).

## 5. Constraints and Preferences
- User is a complete beginner: **explain everything in plain English**; define jargon.
- Workflow: **one step at a time; user says "done" after each step, then the next step**. Propose before building; don't start building without approval.
- **Ask before committing/pushing**; confirm downloads (file, source, size). User explicitly approved the last commit + publish.
- Keep main site Phase 2 parked unless user asks.
- Design rules (docs/DESIGN.md v2): colour roles above; HUD glass panels; original sci-fi only — **no Star Trek/Star Wars/LCARS** or franchise names/ships; **no red cross symbol**; no real patient scans/anatomy; no medical claims; numbers are illustrative.
- Direction rule: ship left→right; left-pointing only after a neutral view (head-on/tail-on/top-down).
- Only plan within **115 credits** for the all-angle work (user: "Only plan in that 115 credits").
- Footer: LinkedIn https://www.linkedin.com/in/ranjit-kumar-yallamelli-6871b2179/, GitHub yallamelliranjitkumar-svg, contact = LinkedIn only (no public email).
- Kling settings: Video 3.0, 720p, 5 s (10 s only for docking/finale), **Native Audio off**, element bound (except when ship must stay small), always **download without watermark**, save as `02-takes/shotN-take-x.mp4`, log cost in `log.txt`. Never put quotation marks in Kling prompts (quotes = spoken dialogue). Every prompt ends with: "The spaceship keeps its exact shape, details and blue lights. No text, no logos, no extra ships, no cuts, no camera shake."
- Film quality bar: no melting, no jumps (check joins), no frozen tails (trim), text readable over the film.

## 6. Work Log (chronological, 2026-09-26 → 27)
1. Architecture proposal (no code) → user answers (violet, LinkedIn footer, Vercel, TS, public repo).
2. `docs/DESIGN.md` v1 → Phase 1 built (React/Vite/TS, sections, glowing sphere) → pushed → Vercel live.
3. Pivot request (healthcare-talk station site) aborted by user; re-theme to Aurora Station → `docs/DESIGN.md` v2 approved → NASA Earth textures downloaded (user approved) → re-theme built + pushed (commit e2b1763).
4. Scroll-film plan `docs/SCROLL-ANIMATION-PLAN.md`; parallax prototype on branch `parallax-prototype` (commit 5ce2c5a).
5. Kling production: test shot; keyframes built (cut-outs via @imgly background removal, composites via sharp); station text removed in Photopea (Kling edit failed); 8 shots generated with several retakes; rear view generated; direction fixes (orbit cut at head-on; shots 4–6 retaken heading right).
6. Film joined → master v3; web encodes; prototype rewritten to scroll-scrub the film; fixes: wrong opening frame, Decide buttons cut off, text readability (badge, hero halo, glass ring tags, finale shade), sharper 1080p encode, letterbox so complete station shows, two-line ring labels, phone stage line.
7. All-angle plan written (§9). Commit cf6252d; `main` fast-forwarded; pushed; verified live.
- Commands:
  - `npm install` · `npm run dev` (http://localhost:5173, prototype at /prototype.html) · `npm run build` · `git push origin main` (Vercel deploys automatically)
  - `.claude/launch.json` has a "dev" config (git-ignored).
  - Film rebuild (from `inspiration/scroll/tools`, after its npm setup):
    `node join2.cjs <out.mp4> <tmp> ../03-chosen/shot1.mp4 "../03-chosen/shot2.mp4::0-47" "../03-chosen/shot3.mp4::11-120+xf" ../03-chosen/shot4.mp4 ../03-chosen/shot5.mp4 ../03-chosen/shot6.mp4 ../03-chosen/shot7.mp4 ../03-chosen/shot8.mp4`
  - Web encode settings (final): desktop `scale=1920:1080:flags=lanczos,unsharp=5:5:0.5:5:5:0`, libx264 high, yuv420p, preset slow, tune film, **crf 25, -g 12 -keyint_min 12 -sc_threshold 0**, +faststart, no audio → `public/film/flight-1080.mp4`; phone same with `scale=960:540`, `unsharp=5:5:0.4:5:5:0` → `flight-540.mp4`; poster = first frame at 1080p → `poster.webp`.

## 7. Open Questions and Risks
- **Image licensing — HIGH RISK:** user confirmed the three reference images were **saved from Pinterest** (no licence; original creators likely hold copyright; the spaceship image showed a faint watermark square). The whole film (ship, station, nebula) derives from them and is public on /prototype.html and in the GitHub repo (`public/film/*`). Options given to user: (1) trace original creators and get licence/permission, (2) replace with original AI-generated images and remake the film (needs more than 115 credits), (3) take /prototype.html offline until resolved. **No decision yet** — do not promote the prototype (e.g. LinkedIn) until resolved; ask the user before changing anything online.
- Kling credit balance 115 (confirmed); all-angle plan needs ~90, leaving no room for a full retake.
- Left-side view risk: Kling has seen the ship's left side only in the orbit; may be less accurate. Top view not in the element (slots full).
- Not tested on a real iPhone/Android; iOS Safari video seeking can be flaky (code calls play().then(pause) once to unlock) [VERIFY].
- 17 MB desktop film download (a few seconds on broadband, longer on mobile data; phones get 6.3 MB).
- Film source is 720p: softness is inherent; true fix = regenerate at 1080p (≈ double credits).
- Shot 1 has a camera roll (Earth edge moves to the left side) and a faint warm haze; shot 6b purple glow blooms in over ~0.25 s (accepted).
- Film not yet integrated into the main index page (only /prototype.html). Main page still shows the code-drawn R3F Earth/station — two different visual styles live at once.
- The preview browser in Claude's desktop app often renders black when the app window is hidden: verify by measurements/JS or ask the user for screenshots.

## 8. Next Steps
1. **All-angle coverage** (docs/SCROLL-ANIMATION-PLAN.md §9), in order:
   a. Claude: build keyframe **L** (ship's left side at the storm's edge: cut out the left-side view from `C2-ship-other-side.jpg`/orbit, place on the nebula background). Free.
   b. Claude: restore full orbit in the edit (shot2 frames 0–68 instead of 0–47) — Plan becomes right → front → left. Free.
   c. User: Kling **shot A** (Delegate, over the top): start `C2-ship-other-side.jpg`, end `D-ship-at-nebula.jpg`, 720p 5 s, element bound → `02-takes/shotA-take-a.mp4`. Claude reviews (frame sheets, motion, joins, direction).
   d. User: **shot C** (Decide, back → left side): start `E3R-shot4c-last-frame.jpg`, end keyframe L. Review.
   e. User: **shot D** (Deliver, head-on breakout → right side, station): start = last frame of chosen shot C, end `F-station-ahead.jpg`. Review.
   f. Claude: new sequence = shot1 | shot2 (0–68) | A | shot4 | C | D | shot7 | shot8; rejoin, check joins/freezes/views, re-encode web files, **update `CHAPTERS` timings in `src/prototype/Flight.tsx`**, test desktop + phone sizes, ask user before commit/push.
2. **Resolve image licensing first (Pinterest source)** — ask the user which option (trace creators / regenerate originals / take prototype offline). If regenerating, the all-angle shots would be remade anyway, so decide this BEFORE spending the 115 credits.
3. Later (user's call): bring the film into the main index page (replace or complement the R3F scene), then the LinkedIn post + 15–30 s process screen capture.

## 9. Reference Material
- Prompts for new shots (from §9 of the plan; always end with the standard rules sentence):
  - Shot A: "The camera rises smoothly up and over the spaceship, looking straight down on its top as it flies forward, then descends on its other side as a glowing violet and blue nebula rises into view ahead. One continuous move, no cuts."
  - Shot C: "The spaceship holds position at the edge of the storm, engines dimming to a low idle glow. The camera slowly circles from behind the ship around to its left side. Lightning flickers quietly deep in the nebula. Tense, calm, suspended moment."
  - Shot D: "The spaceship's engines flare and it bursts out of the storm straight toward the camera, head-on, then the camera swings around to its right side as it flies on and a ring-shaped space station appears ahead."
- Element description used: "Grey angular sci-fi cruiser, glowing cyan-blue lights, antenna mast at rear, no markings"
- Lessons (log.txt): partial arcs ≤ ~180° work, full 360° melts; generate missing angles first; don't bind element when ship should stay small; start and end frames at the same angle → Kling "slides" the ship (ask for camera movement explicitly); end frames at a different angle force real camera movement.
- Scene-change metric (ffmpeg scene_score) gives a false spike at a clip's first frame; use pixel difference (`pixdiff.cjs`/`motion.cjs`) instead.
- Links: live site https://ai-project-manager-orpin.vercel.app · prototype https://ai-project-manager-orpin.vercel.app/prototype.html · repo https://github.com/yallamelliranjitkumar-svg/ai-project-manager
- Claude memory index: `C:\Users\HP\.claude\projects\C--Users-HP-AI-WEB-LAB-final-project\memory\MEMORY.md`

## 10. Restart Prompt
Read `docs/HANDOFF.md` in `C:\Users\HP\AI-WEB-LAB\final-project` (and `docs/SCROLL-ANIMATION-PLAN.md` §9). I'm a beginner: explain in plain English and go one step at a time, waiting for my "done". First ask me how I want to handle the Pinterest image licensing (see section 7). Then start the all-angles plan: first do the free steps (build keyframe L and restore the full orbit in the edit), show me the results, then give me the Kling instructions for shot A only.

## 11. Update (later on 2026-09-27): all-angle film live on the home page
- The scroll film is now the **home page** (`index.html` → `src/prototype/main.tsx`); the old R3F design is kept at `/classic.html` (noindex); `/prototype.html` forwards to `/` (public/prototype.html).
- Licensing (section 7): user chose **decide later**; no promotion yet.
- Kling credits: user had **140 in total**; 120 spent on this round, **20 left**.
- New film **v4** (47.58 s) = shot1 | orbit (right → front → left) | P free cut-out exit (ship leaves frame) | *cut* | N (left side → rear at the nebula) | shot5-take-a (rear, into the storm) | T1 0–72 (out of the storm, behind the ship, station far ahead) | T2 (round the back to the right side) | shot7 (docking) | shot8. Details, joins and verdicts in `inspiration/scroll/log.txt` (STEP 6–9); chosen clips in `03-chosen/`; master `04-film/aurora-flight-v4.mp4`.
- New keyframes: `L-ship-left-at-nebula.jpg`, `S-behind-ship-station-far.jpg`, `S2-shotT1-frame72.jpg`. New tools: `cutL.cjs` (cut-out), `keyL.cjs`, `keyS.cjs`, `makeP.cjs`, `seams2.cjs` (join check for any clip list), `webenc3.cjs` (final web settings + poster).
- `Flight.tsx` CHAPTERS retimed for v4; Delegate/Monitor panels moved bottom-left and Decide to a new left position (`panel--l`) because the ship now fills the right half in those chapters.
- Possible next: paid Kling version of P (30 credits) if the flat cut-out exit bothers the user; T2 mid-swing lighting is slightly brighter for ~1 s (accepted).
