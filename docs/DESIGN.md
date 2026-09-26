# Design System — The AI Project Manager · Aurora Station

Version 2 · 26 Sep 2026 · Status: **draft, awaiting approval**
(Version 1, the plain violet sphere theme, is saved in the Git history.)

This document is the rulebook for how the site looks, moves and behaves. Every
colour, font size, gap and animation in the code must come from here. If
something isn't covered, we add it here first, then build it.

---

## 0. What changed in version 2

The **story is unchanged**: "I don't code. I build with AI." and the six chapters
(Define → Plan → Delegate → Monitor → Decide → Deliver) showing AI agents and a
human project manager delivering a project together.

The **world it's told in** is new: **Aurora Station**, a hospital orbiting
Earth. The glowing PROJECT sphere becomes the **core of the station**. The
project being delivered is a new AI-powered ward coming online.

---

## 1. Design principles

1. **The 3D tells the story.** Every change on the station answers the chapter's
   question. If an effect doesn't explain something, it goes.
2. **Calm, cinematic, credible.** It should feel like a quiet space-station film,
   not a video game. Slow orbital motion. Lots of dark space.
3. **Colour has meaning.** Cyan means the hospital, violet means AI, warm white
   means the human, and amber means risk (section 2).
4. **Words first.** All text is real, readable HTML. The site still tells the
   full story if the 3D fails to load.
5. **The human stays in charge.** The visitor makes the key decision (Chapter 5).
6. **Original and medically honest.** It is inspired by classic sci-fi but copies
   nothing, and it contains no fake medical imagery (section 12).

---

## 2. Colour

### Surfaces and text

| Token | Value | Use |
|---|---|---|
| `--bg-0` | `#04070D` | Deep space: page background, 3D fog |
| `--bg-1` | `#08111B` | Raised areas (launch strip, footer) |
| `--bg-2` | `#0D1824` | Glass panels and cards |
| `--line` | `rgba(214, 236, 242, 0.08)` | Borders, HUD lines |
| `--line-strong` | `rgba(214, 236, 242, 0.18)` | Hovered borders, HUD corner brackets |
| `--text-1` | `#E8F1F4` | Headings and main text |
| `--text-2` | `#9DB0BB` | Body text |
| `--text-3` | `#607482` | Small labels only. Never paragraphs |

### Colour roles (the key rule of this theme)

| Role | Tokens | Means | Used for |
|---|---|---|---|
| **Station / hospital** | `--cyan #3DD9EB` · `--cyan-bright #8DEFF7` · `--cyan-deep #0E5F73` · `--cyan-soft rgba(61,217,235,0.12)` · `--clinic-white #EAF8FB` | The hospital: calm, clinical, trustworthy | Station structure lights, the PROJECT core, buttons, links, focus rings, HUD lines |
| **AI** | `--ai #8B5CF6` · `--ai-bright #A78BFA` · `--ai-glow #C4B5FD` · `--ai-deep #4C1D95` · `--ai-soft rgba(139,92,246,0.14)` | Anything the AI does | The five agents, the AI's signal in Chapter 5, the "I build with AI." line, the AI recommendation tag |
| **Human** | `--human #FFF1DC` (warm white) | The project manager's judgement | The human signal in Chapter 5, the "Override with human judgement" result |
| **Risk** | `--warn #F5A524` · `--warn-soft rgba(245,165,36,0.14)` | Something needs attention | Chapter 4 alerts only. Gone by Chapter 6 (unless the visitor accepted the AI's call) |

**Contrast check:** `--text-1`, `--text-2`, `--cyan` and `--ai-bright` all pass
the WCAG AA accessibility standard on every background. `--text-3` is for small
decorative labels only.

---

## 3. Typography

Three free typefaces (all under the SIL Open Font License), served from our own
site.

| Role | Font | Weights | Use |
|---|---|---|---|
| **Display** | **Unbounded** | 500, 700 | Big titles only: the hero, chapter titles, section titles |
| **Body** | **Inter** | 400, 500, 600 | All sentences and buttons |
| **HUD** | **JetBrains Mono** | 400, 500 | Screen-style readouts only: chapter counters ("01 / 06"), numbers ("92% complete"), status tags ("ALERT"), coordinates. Never full sentences |

### Type scale

| Token | Font | Size (phone → desktop) | Line height | Use |
|---|---|---|---|---|
| `--type-hero` | Unbounded 700 | 44px → 120px | 0.95 | "I don't code. I build with AI." |
| `--type-chapter` | Unbounded 700 | 40px → 88px | 1.0 | Chapter titles |
| `--type-h2` | Unbounded 500 | 28px → 44px | 1.1 | Section titles |
| `--type-h3` | Inter 600 | 20px → 24px | 1.3 | Card titles |
| `--type-body-l` | Inter 400 | 18px → 20px | 1.6 | Intros, chapter questions |
| `--type-body` | Inter 400 | 16px → 17px | 1.6 | Standard text |
| `--type-small` | Inter 400 | 14px | 1.5 | Captions, footer |
| `--type-hud` | JetBrains Mono 500, UPPERCASE, +0.12em | 12px | 1.2 | Labels, counters, readouts |

Paragraphs are never wider than 60 characters.

---

## 4. Spacing and layout

These are unchanged from version 1. The base unit is 4px, with steps of
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192`.

| Rule | Phone (<640px) | Tablet (640–1023px) | Desktop (≥1024px) |
|---|---|---|---|
| Side gutter | 16px | 24px | 48px |
| Section spacing | 96px | 128px | 192px |
| Max content width | full | full | 1200px |

**Corners:** these are tighter than in version 1, to feel more like engineered
hardware: `--radius-s: 4px`, `--radius-m: 10px`, `--radius-pill: 999px`.

### HUD panel style (the station's screens)

All text panels over the 3D share one look:
- Glass: `--bg-2` at 65% opacity with a 14px background blur (dropped on phones,
  where opacity goes to 92%).
- A 1px `--line` border, plus **corner brackets**: short L-shaped lines in
  `--line-strong` at each corner, like a viewfinder.
- A HUD header row in JetBrains Mono, e.g. `WARD 03 · DIAGNOSTICS · 01 / 06`.
- Thin glowing dividers: 1px lines fading from `--cyan` to transparent.

This is **original**: the site uses no rounded coloured bar systems and no
screen designs from any existing franchise.

---

## 5. Page structure

| # | Section | In the space hospital | 3D behind it |
|---|---|---|---|
| 1 | **Hero** | "I don't code. / I build with AI." ("with AI" in violet). Intro line. Cue: **"Begin approach"** | Earth fills the lower part of the screen, turning slowly. Aurora Station floats in orbit on the right, its core glowing |
| 2 | **Journey** | A **flight path**: four waypoints on a curved dotted line rising from Earth to orbit. Healthcare IT (ground) → AI → Product → Project Management (station) | The camera rises from Earth toward the station |
| 3 | **Process strip** | A **launch sequence**: Idea → Prompt → Claude → Code → Iteration → Product, as numbered HUD steps (`T-5 … T-0`). Claude glows violet (AI) | The station grows closer |
| 4 | **The six chapters** | HUD panels, alternating left and right, each headed with its ward name | The full station story (section 7) |
| 5 | **Experiments** | **Research modules**: four docked module cards, tagged `STATUS · IN DEVELOPMENT` | The camera drifts past the station's outer ring |
| 6 | **Footer** | The closing line large, over Earth at sunrise. Links under **"Open a channel"**: LinkedIn and GitHub | A wide shot: Earth, sunrise glow and the station |

**Navigation:** a slim top bar with your name on the left and "Connect" on the
right. During the chapters, a thin **HUD progress rail** runs down the right
edge with six ticks labelled `01`–`06`. Clicking one jumps to that chapter.

**Small space touches in wording** (the main text stays the same):
- "Scroll to begin" → "Begin approach"
- "Coming soon" → "In development"
- "Let's talk" → "Open a channel"
- Chapter labels gain a ward name, e.g. `03 / 06 · COMMAND DECK`

---

## 6. The 3D world

Everything is built in code except the Earth images (from NASA, public domain).
There are no heavy 3D model files.

### Earth (animated)

| Layer | What it does |
|---|---|
| Day surface | A NASA "Blue Marble" image wrapped on a sphere. Rotates slowly (one full turn in about 4 minutes) |
| Night lights | A NASA "Black Marble" city-lights image, shown only on the night side, so cities glow as they turn out of the sunlight |
| Clouds | A separate, slightly larger see-through layer that drifts a little faster than the ground |
| Atmosphere | A soft cyan-blue glow around Earth's edge, brightest where sunlight hits it |
| Sunlight | One distant "sun" light. In Chapter 6 the camera catches a sunrise over Earth's edge |

Image sizes: 2048×1024 on desktop and 1024×512 on phones. Compressed (WebP),
Earth adds about 1 MB on desktop and 350 KB on phones.

### Aurora Station

The station is based on the **Stanford torus**, a public 1975 NASA design study
for a ring-shaped station. It's a classic, non-branded shape, and our version is
drawn in code:

| Part | Look | Story role |
|---|---|---|
| **The core** | The glowing sphere at the centre (the old PROJECT sphere), now `--clinic-white` with a `--cyan` rim. The label PROJECT floats beneath it | The project itself |
| **Ring** | A slim ring with rows of tiny window lights, turning very slowly | The hospital |
| **Spokes** | Four thin spokes joining the ring to the core | The network the plan travels along |
| **Six wards** | Six modules spaced around the ring. Dark until they come into the story | See below |
| **Solar panels** | Two thin, flat panels on the core's axis | Pure scenery |
| **Stars** | The existing particle field, retuned to a cool blue-white | Depth |

### The six wards and their agents

| Ward | Agent (violet) | Where |
|---|---|---|
| Command Deck | Strategy Agent | Top of the ring |
| Comms Array | Stakeholder Agent | A dish pointing at Earth |
| Diagnostics Lab | Data Agent | Ring, left |
| Safety Systems | Risk Agent | Ring, lower left |
| Docking Bay | Delivery Agent | Ring, bottom, with a docking arm |
| **New AI Ward** | — | Ring, right. This is the project being delivered. Dark until Chapter 6 |

---

## 7. The six chapters on the station

The scroll position moves the scene smoothly *between* these states. Nothing
jumps, and scrolling back rewinds everything.

| Ch | Title · ward label | Question | On the station | Camera | HUD panel |
|---|---|---|---|---|---|
| 1 | **Define** · `CORE` | What's the problem? | The station is dim, running on minimal power. The core powers on with a slow pulse | Approaches the core, front-on | The project brief types itself in, letter by letter |
| 2 | **Plan** · `CORE → RING` | What needs to happen? | The core projects a glowing cyan task network: about 24 nodes that travel along the spokes and spread around the ring | Pulls back to see the whole ring at a 30° angle | `24 TASKS · 5 WORKSTREAMS` counts up |
| 3 | **Delegate** · `COMMAND DECK` | Who does what? | The five agents take their posts one by one: a violet light docks at each ward and lights it | Slow orbit around the ring | Agent list. Hovering an agent (on screen or in the panel) highlights its ward |
| 4 | **Monitor** · `DIAGNOSTICS LAB` | What could go wrong? | Amber alert lights pulse at the Diagnostics Lab and the Comms Array. Their network lines flicker | Moves in close to the amber wards | `ALERT` tags: "Data quality below threshold", "Clinical sign-off pending" |
| 5 | **Decide** · `CORE` | Who makes the call? | A violet stream (AI) and a warm-white stream (human, from the Command Deck) travel toward the core and pause before meeting | Front-on, close to the core | AI recommendation (violet tag), what the AI can't see, and two buttons |
| 6 | **Deliver** · `NEW AI WARD` | Did it work? | The New AI Ward lights up, every light turns steady, and the network settles into the ring. **Override:** everything is calm cyan. **Accept:** one amber light stays on | Pulls back to a wide shot: the station, Earth and a sunrise | "Delivered." then the result message |

---

## 8. Motion

**Two kinds of motion, two tools:**
- **Cinematic (GSAP):** the camera and the station's chapter changes, tied to
  the scroll position.
- **Interface (Motion):** hover, click and panels appearing.
- **Ambient:** Earth turning, clouds drifting, the ring turning and window lights
  twinkling. These are always extremely slow. Space is calm.

| Token | Duration | Use |
|---|---|---|
| `--dur-micro` | 150ms | Hover colour and border changes |
| `--dur-ui` | 300ms | Buttons, tags, tooltips |
| `--dur-enter` | 600ms | Panels fading in |
| `--dur-story` | 1200ms | Chapter 5 result, typing brief |

| Token | Curve | Feel |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Arriving: fast start, soft landing |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Moving from A to B |
| GSAP scroll | `power2.inOut` | Camera moves, like a spacecraft easing thrusters |

Rules:
1. Panels appear by fading in and moving up 16px. HUD lines "draw" from left to
   right (400ms).
2. Only **one** thing pulls attention at a time.
3. Ambient loops are slow (8 seconds or longer). The only exception is the amber
   alert pulse (1.2 seconds).
4. Hover never moves the layout.
5. The camera never spins or shakes. No "warp speed" effects.
6. **Reduced motion:** if the visitor's device asks for less motion, the camera
   doesn't fly (chapters crossfade), Earth and the ring stop turning, the brief
   appears instantly, and alerts glow without pulsing.

---

## 9. Interactive elements

| Element | Default | Hover | Keyboard focus | Pressed/Selected |
|---|---|---|---|---|
| Primary button | `--cyan` outline and text, `--cyan-soft` fill | `--cyan` fill, `--bg-0` text, cyan glow | 2px `--cyan-bright` ring, 3px gap | Scale 0.98 |
| Secondary button | Transparent, 1px `--line-strong` | Border `--cyan` | Same ring | Scale 0.98 |
| Chapter 5 "Override" | Primary style; on selection glows `--human` warm white | — | Same ring | Warm-white glow |
| Chapter 5 "Accept" | Secondary style with a small violet AI dot | — | Same ring | Violet border |
| Link | `--text-1` | `--cyan-bright` | Same ring | — |
| Module card | Glass panel with corner brackets | Brackets turn `--cyan`, card lifts 4px | Same ring | — |
| 3D ward / agent | Soft glow | Scale 1.15, name tag appears | Reachable by keyboard through a matching hidden list | Info panel opens |

Minimum tap target on phones: **44×44px**.

---

## 10. Mobile and performance

| Setting | Desktop | Phone |
|---|---|---|
| Earth images | 2048×1024 | 1024×512 |
| Cloud layer | On | On (lower resolution) |
| Stars | 3,000 | 800 |
| Task network nodes | 24 | 16 |
| Window lights on the ring | 600 | 200 |
| Bloom (glow effect) | On | Off (cheap built-in glow instead) |
| Render sharpness | Up to 2× | Max 1.5× |
| Glass blur | On | Off |

Budgets:
- First text on screen in under 1.5 seconds on 4G.
- JavaScript under 1 MB compressed.
- Earth images under 1.2 MB on desktop, 400 KB on phones, loaded *after* the text.
- 60 frames per second on a recent laptop, at least 30 on a mid-range phone.

If a device can't run 3D, it gets a still image of the scene and the full text
story.

---

## 11. Voice and tone

- First person, short sentences, plain words.
- Space flavour stays in **labels only** (ward names, HUD tags, "Begin
  approach"). The main message stays human and direct.
- Never overpromise medical outcomes. Any numbers on screen are story
  examples, not real results.

---

## 12. Originality, licensing and medical honesty

**Not allowed:**
- No logos, names, symbols, ship shapes or interface styles from Star Trek,
  Star Wars, *2001*, *The Expanse* or any other franchise.
- No LCARS-style rounded colour-bar screens.
- No real patient scans, X-rays or body imagery, and no anatomical drawings.
- No medical claims.

**Assets and licences:**

| Asset | Source | Licence |
|---|---|---|
| Earth day image (Blue Marble) | NASA Visible Earth, visibleearth.nasa.gov | Public domain (NASA media guidelines: credit NASA, no endorsement implied) |
| Earth night lights (Black Marble) | NASA Earth Observatory, earthobservatory.nasa.gov | Public domain (same guidelines) |
| Earth clouds | NASA Visible Earth | Public domain (same guidelines) |
| Unbounded, Inter, JetBrains Mono | Google Fonts / Fontsource | SIL Open Font License 1.1 |
| Three.js, React Three Fiber, drei, React, Vite | npm | MIT |
| GSAP (incl. ScrollTrigger) | gsap.com | GSAP Standard "No Charge" License (free, including commercial use) |
| Motion | motion.dev | MIT |
| Station, core, stars, network | Our own code | Ours |

The footer credits: "Earth imagery: NASA."

---

## 13. Accessibility checklist

- Text contrast meets WCAG AA.
- Everything clickable works with the keyboard and shows a visible focus ring.
- The 3D is marked decorative. The story is told fully in text.
- Reduced-motion support (section 8, rule 6).
- Colour is never the only signal: alerts also say "ALERT", and AI items carry
  an "AI" tag.
- Links have clear names ("LinkedIn profile", not "click here").
