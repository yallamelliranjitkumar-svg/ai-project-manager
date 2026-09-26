# Design System — The AI Project Manager

Version 1 · 26 Sep 2026 · Status: **draft, awaiting approval**

This document is the rulebook for how the site looks, moves and behaves. Every
colour, font size, gap and animation in the code must come from here. If
something isn't covered, we add it here first, then build it.

---

## 1. Design principles

1. **The 3D tells the story.** Every change to the sphere answers the chapter's
   question. If a visual effect doesn't explain something, it goes.
2. **Calm, not flashy.** Slow, smooth movement. Lots of dark space. One glow.
3. **One accent.** Violet is the only "brand" colour. Amber appears only as a
   warning in Chapter 4 (Monitor) and is gone by Chapter 6.
4. **Words first.** All text is real, readable HTML. The site still tells the
   full story if the 3D fails to load.
5. **The human stays in charge.** The visitor makes the key decision (Chapter 5).
   The design always frames AI as a team the project manager directs.

---

## 2. Colour

A near-black background with a faint violet tint, so the dark feels deliberate
rather than empty.

### Surfaces and text

| Token | Value | Use |
|---|---|---|
| `--bg-0` | `#07060B` | Page background, 3D fog colour |
| `--bg-1` | `#0E0C16` | Raised areas (process strip, footer) |
| `--bg-2` | `#16131F` | Cards |
| `--line` | `rgba(237, 234, 245, 0.08)` | Borders and dividers |
| `--line-strong` | `rgba(237, 234, 245, 0.16)` | Hovered borders |
| `--text-1` | `#EDEAF5` | Headings and main text |
| `--text-2` | `#A7A1B8` | Body text and descriptions |
| `--text-3` | `#6E6882` | Small labels only. Never use it for paragraphs (too low contrast) |

### Accent (violet)

| Token | Value | Use |
|---|---|---|
| `--accent` | `#8B5CF6` | Buttons, active states, sphere rim light |
| `--accent-bright` | `#A78BFA` | Hover states, focus rings, links |
| `--accent-glow` | `#C4B5FD` | Brightest glow: sphere core, highlighted agents |
| `--accent-deep` | `#4C1D95` | Dark glows and gradients behind the sphere |
| `--accent-soft` | `rgba(139, 92, 246, 0.14)` | Tinted backgrounds (selected card, tag) |

### Status (use only where the story needs it)

| Token | Value | Use |
|---|---|---|
| `--warn` | `#F5A524` | Chapter 4 risk nodes and warning labels only |
| `--warn-soft` | `rgba(245, 165, 36, 0.14)` | Warning tag background |
| `--human` | `#F4F1FF` | "Human signal" in Chapter 5: a warm white, distinct from the AI's violet |

**Contrast check:** `--text-1` and `--text-2` both pass the WCAG AA accessibility
standard on every background. `--accent` passes AA for text of 16px and above.

---

## 3. Typography

Two typefaces, as the brief asks. Both are free and served from our own site
(no calls to Google), which keeps loading fast and private.

| Role | Font | Weights | Character |
|---|---|---|---|
| **Display** | **Unbounded** | 500, 700 | Wide, geometric and futuristic. Used for big titles only |
| **Body** | **Inter** | 400, 500, 600 | Clean, highly readable sans. Used for everything else |

### Type scale

Sizes are "fluid": they grow smoothly from phone to desktop.

| Token | Font | Size (phone → desktop) | Line height | Use |
|---|---|---|---|---|
| `--type-hero` | Unbounded 700 | 44px → 120px | 0.95 | "I don't code. I build with AI." |
| `--type-chapter` | Unbounded 700 | 40px → 88px | 1.0 | Chapter titles (Define, Plan…) |
| `--type-h2` | Unbounded 500 | 28px → 44px | 1.1 | Section titles |
| `--type-h3` | Inter 600 | 20px → 24px | 1.3 | Card titles |
| `--type-body-l` | Inter 400 | 18px → 20px | 1.6 | Intro paragraphs, chapter questions |
| `--type-body` | Inter 400 | 16px → 17px | 1.6 | Standard text |
| `--type-small` | Inter 400 | 14px | 1.5 | Captions, footer |
| `--type-label` | Inter 600, UPPERCASE, +0.14em spacing | 12px | 1.2 | Chapter numbers ("01 / 06"), tags, agent names |

Rules:
- Paragraphs are never wider than **60 characters** (comfortable reading).
- Only headings use the display font. Never use it for sentences.
- Chapter numbers use Inter's evenly spaced ("tabular") digits so they don't
  wobble as they change.

---

## 4. Spacing and layout

**Base unit: 4px.** Every gap is one of these steps:

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192`
(tokens `--space-1` to `--space-11`)

| Rule | Phone (<640px) | Tablet (640–1023px) | Desktop (≥1024px) |
|---|---|---|---|
| Side gutter | 16px | 24px | 48px |
| Section spacing (top and bottom) | 96px | 128px | 192px |
| Max content width | full | full | 1200px, centred |
| Grid | 4 columns | 8 columns | 12 columns, 24px gaps |

**Corners:** `--radius-s: 8px` (buttons, tags), `--radius-m: 16px` (cards),
`--radius-pill: 999px` (chips, agent labels).

**Glass panels:** cards over the 3D use `--bg-2` at 70% opacity with a 12px
background blur. On phones the blur is dropped (it's expensive) and opacity
goes to 92%.

**Glow (for UI, not 3D):** `--glow: 0 0 32px rgba(139, 92, 246, 0.35)`. Use it
only on the primary button and the currently selected item.

---

## 5. Page structure

| # | Section | Layout | 3D behind it |
|---|---|---|---|
| 1 | **Hero** | Huge "I don't code. / I build with AI." left-aligned; one line of intro; a small "Scroll to begin" cue | Sphere small and dim, off to the right, gently breathing |
| 2 | **Journey** | Four steps on a horizontal line: Healthcare IT → AI → Product → Project Management. Stacked vertically on phones | Sphere drifts toward the centre |
| 3 | **Process strip** | Idea → Prompt → Claude → Code → Iteration → Product, as six chips joined by a thin violet line that "draws" as you scroll | Particles slowly gather |
| 4 | **The six chapters** | Each chapter is one screen tall. Text panel on the left (right on alternate chapters); the sphere is the centre of attention | Full cinematic story (section 6) |
| 5 | **Experiments** | Four cards (AI PM, Healthcare AI, AI Agents, Vibe Coding), 2×2 on desktop, 1 column on phones, each tagged "Coming soon" | Stable sphere faded to 30%, far back |
| 6 | **Footer** | Closing line large; LinkedIn and GitHub links; "Built with Claude Code" credit | None (fades out) |

**Navigation:** a slim top bar with your name on the left and a "Connect" link
(to LinkedIn) on the right. During the chapters, a thin progress rail on the
right edge shows six dots (01–06), and clicking a dot jumps to that chapter.

---

## 6. The 3D scene

### Building blocks (all generated in code, with no model files)

| Element | Description |
|---|---|
| **PROJECT sphere** | Smooth sphere with a violet rim glow (brighter at the edges, like an atmosphere) and a soft bright core. Its surface ripples slowly. The word PROJECT floats just below it |
| **Domain nodes** | Five small glowing orbs orbiting the sphere: **Strategy, People, Data, Risk, Execution** |
| **Agents** | Each domain has an AI agent: Strategy Agent, Stakeholder Agent (People), Data Agent, Risk Agent, Delivery Agent (Execution). Together they make up the "AI Agents" team. *(This joins up the brief's two name lists; see open question 1.)* |
| **Task network** | About 24 small nodes joined by thin lines, formed from the sphere's surface |
| **Particles** | A slow field of faint dust that gives depth. 3,000 on desktop, 800 on phones |
| **Fog** | Fades distant objects into `--bg-0`, so the scene has no hard edges |

### Chapter states

The scroll position moves the scene smoothly *between* these states; nothing
jumps.

| Ch | Title | Question | Sphere and scene | Camera | Text panel |
|---|---|---|---|---|---|
| 1 | **Define** | What's the problem? | Bare sphere, dim, slowly breathing. Nothing orbits yet | Front-on, far | The project brief types itself in, letter by letter |
| 2 | **Plan** | What needs to happen? | Sphere breaks apart into the task network: nodes spread out and lines connect them | Pulls back and turns about 30° | "24 tasks · 5 workstreams" counts up |
| 3 | **Delegate** | Who does what? | The five domain nodes light up one by one, each labelled with its agent. Tasks link to their agent | Slow orbit | Each agent's name appears as it lights up; hovering an agent shows what it does |
| 4 | **Monitor** | What could go wrong? | 2–3 nodes (Risk, Data) pulse **amber**. Their lines flicker. Particles slow down | Moves closer to the amber nodes | Warning tags: "Data quality below threshold", "Stakeholder sign-off pending" |
| 5 | **Decide** | Who makes the call? | Two streams move toward the centre: violet (AI signal) and warm white (human signal). They pause before meeting | Front-on, close | The AI's recommendation, plus two buttons (see section 7) |
| 6 | **Deliver** | Did it work? | The network pulls back into one smooth, bright, **stable** sphere with a calm ring around it. Amber is gone | Pulls back to a wide, settled shot | "Delivered." then the closing line |

### Lighting and glow

- Dark background; the light comes mostly from the objects themselves.
- Bloom (the soft halo around bright objects) is gentle: it should look like a
  glow, not a blur. It is **off on phones**, where a cheaper fake glow is used.
- One optional small lighting file (Poly Haven, ≤1 MB). Only added if the sphere
  looks flat without it.

---

## 7. Chapter 5: the decision

The scenario uses a healthcare example that fits your background:

> **AI recommendation:** "Launch on schedule. 92% of tasks are complete and
> risk is within tolerance."
> **What the AI can't see:** the clinical team hasn't signed off on the
> patient-data workflow.

Two buttons:
- **Accept AI recommendation** (secondary style)
- **Override with human judgement** (primary style, violet glow). This is the
  path the story is built around.

What happens next:
- **Override:** the white human signal leads, the amber node settles, and
  Chapter 6 shows a clean, stable delivery. Message: "One week later. Safe
  launch. Clinicians on board."
- **Accept:** the project delivers, but one amber node stays lit in Chapter 6.
  Message: "The data was right. The context was missing." A small link offers
  "Try the other call".

Both paths end with the same closing line:
**"AI doesn't replace the project manager. It changes what the project manager
can accomplish."**

If the visitor scrolls past without choosing, the story continues as if they
chose **Override**.

---

## 8. Motion

**Two kinds of motion, two tools:**
- **Cinematic (GSAP):** camera and sphere changes. These are *tied to the
  scroll position*: scroll back and they rewind. They are never on a timer.
- **Interface (Motion):** hover, click, cards appearing. These run on short
  timers.

| Token | Duration | Use |
|---|---|---|
| `--dur-micro` | 150ms | Hover colour and border changes |
| `--dur-ui` | 300ms | Buttons, tags, tooltips |
| `--dur-enter` | 600ms | Cards and text fading in |
| `--dur-story` | 1200ms | Chapter 5 result, typing brief |

| Token | Curve | Feel |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Things arriving: fast start, soft landing |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Things moving from A to B |
| GSAP scroll | `power2.inOut` | Camera moves |

Rules:
1. Text appears by fading in and moving up 16px. Never slide in from the sides.
2. Only **one** thing pulls attention at a time.
3. Loops are slow (at least 4 seconds per cycle). The only exception is the
   amber warning pulse (1.2 seconds), which is meant to feel urgent.
4. Hover never moves the layout. It only changes colour, glow or scale (max 1.05
   for cards, 1.2 for 3D agents).
5. **Reduced motion:** if a visitor has "reduce motion" switched on in their
   device settings, the camera doesn't fly, chapters crossfade instead, the
   brief appears instantly instead of typing, and the amber stays still.

---

## 9. Interactive elements

| Element | Default | Hover | Keyboard focus | Pressed/Selected |
|---|---|---|---|---|
| Primary button | `--accent` fill, `--text-1` text, `--radius-s` | `--accent-bright` + `--glow` | 2px `--accent-bright` ring, 3px gap | Scale 0.98 |
| Secondary button | Transparent, 1px `--line-strong` border | Border `--accent-bright` | Same ring | Scale 0.98 |
| Link | `--text-1`, underline on hover | `--accent-bright` | Same ring | — |
| Card | `--bg-2`, 1px `--line` | Border `--line-strong`, lifts 4px | Same ring | — |
| 3D agent | Soft glow, label hidden | Scale 1.2, label shows, pointer cursor | Reachable by keyboard through a matching hidden list of agent buttons | Info card opens |

Minimum tap target on phones: **44×44px**.

---

## 10. Mobile and performance

| Setting | Desktop | Phone |
|---|---|---|
| Particles | 3,000 | 800 |
| Task network nodes | 24 | 16 |
| Bloom | On (gentle) | Off (fake glow) |
| Render sharpness (pixel ratio) | Up to 2× | Max 1.5× |
| Glass blur | On | Off |

Budgets: first text on screen in **under 1.5 seconds** on 4G; the whole site
under **1 MB** of JavaScript (compressed); smooth 60 frames per second on a
recent laptop, and at least 30 on a mid-range phone. If a device can't run
3D, it shows a still violet-glow image and the full text story.

---

## 11. Voice and tone (for all site text)

- First person, short sentences, plain words. ("I direct. AI builds.")
- Confident, not boastful. Show the process; don't claim genius.
- No jargon without a reason. Healthcare, AI and PM terms are used where a
  hiring manager in those fields would expect them.

---

## 12. Accessibility checklist

- Text contrast meets WCAG AA.
- Everything clickable works with the keyboard and shows a visible focus ring.
- The 3D canvas is marked decorative. Its story is told fully in the text.
- Reduced-motion support (section 8).
- Links have clear names ("LinkedIn profile", not "click here").

---

## Open questions for approval

1. **Agent names:** the brief lists orbiters *Strategy, People, Data, Risk,
   Execution, AI Agents* and Chapter 3 agents *Strategy, Data, Risk,
   Stakeholder, Delivery*. This document joins them up as 5 domains, each with
   its own agent (section 6). OK?
2. **Display font:** Unbounded (wide, futuristic). OK, or should it be more
   restrained?
3. **Name in the top bar:** "Ranjit Kumar Yallamelli", or a shorter form?
4. **Inspiration folder:** it's currently empty. If you add examples later, this
   document gets a refinement pass. It doesn't block Phase 1.
