# Scroll Animation Plan: The Flight to Aurora Station

Status: **idea only, nothing built** · 26 Sep 2026
Inputs: three reference images in `AI-WEB-LAB/inspiration/hero/`

---

## 1. The idea in one paragraph

As the visitor scrolls, a spaceship carrying the PROJECT flies through the six
stages of the workflow (Define, Plan, Delegate, Monitor, Decide, Deliver) and
finally **docks at Aurora Station**. Docking delivers the project. The
camera pulls back, the station lights up stage by stage, and it becomes the
summary of the whole workflow. Scrolling down plays the flight forward;
scrolling up rewinds it. The visitor controls the pace.

---

## 2. The three images

| Image | What it shows | Role in the story | What works | What needs fixing |
|---|---|---|---|---|
| **Spaceship** | A grey cruiser above Earth's clouds, glowing cyan-blue | **The project**: the hero of the flight | Cyan lights match the "hospital" colour. Dramatic angle. Earth below = departure | Looks like a warship, not a hospital ship (optional: add subtle "AURORA MEDICAL" markings) |
| **Space dock** | A tall tower with three stacked rings above Earth, small ships around it | **Aurora Station**: the destination and the final summary | Grand and memorable. Earth's curve matches our Earth. The three rings can light up in stages | **"Apolo 13" is painted on it twice.** That's a misspelled real NASA mission name, so it must be removed or replaced with "AURORA". The engines at the bottom look like a rocket; they may need softening |
| **Nebula** | A blue and violet cloud with lightning, stars | **Deep space**: the backdrop for the middle of the journey | Its violet is our "AI" colour, so it's ideal behind the Delegate and Decide chapters. Its lightning can become the Monitor "hazard" | None. It's the easiest to use |

**Sizes:** the "upscaled 8x" versions are about 13,000 pixels wide and 80–95 MB
each. A website needs about 2,560 pixels at most. We keep the big files as
**masters** and make small web copies from them.

**Style change to note:** this station (stacked rings on a tower) replaces the
single-ring "Stanford torus" station in DESIGN.md v2. The design document would
need a small update once this plan is approved.

---

## 3. The key question: how do flat pictures become motion?

There are three ways:

| | **A. Parallax layers ("2.5D")** | **B. AI video, scrubbed by scroll** (recommended) | **C. Turn the pictures into 3D models** |
|---|---|---|---|
| How it works | Cut each image into layers (ship, station, nebula, stars). Place them at different depths and move the camera through them as you scroll | Use an AI video tool to animate the images into short film clips (ship flying, docking), then play the film forward and backward as you scroll | Use an AI image-to-3D tool to create real 3D models of the ship and station, then fly them in our existing 3D scene |
| Looks like | A moving illustration or graphic novel | **A cinematic film** that you control by scrolling | A real-time 3D scene (quality depends on the model) |
| Quality ceiling | Medium: the ship can't turn, it's seen from one side | **High**: matches the images | Medium to high: backs and sides are guessed and often messy |
| Interactivity | Hover and click on HTML overlays | Hover and click on HTML overlays placed over the film | Full: click the ship, orbit the station |
| Page weight | Light (~2–4 MB) | Heavier (~8–15 MB desktop, ~4–6 MB phone, loaded in stages) | Medium (~3–8 MB) |
| Your effort | Low | **Medium: you generate clips in a video tool; I do the rest** | Medium to high |
| Cost | Free | About $10–30 for one month of a video tool | About $10–20 for one month of a 3D tool |
| Well-known examples | Many portfolio sites | Apple's product pages (e.g. AirPods scroll videos) | Game-style 3D sites |

**Recommendation: B.** It's the only option that keeps the quality of your
images. It's also a strong "built with AI" story for LinkedIn: images from AI,
motion from AI, and a website from AI, directed by a human.

**Option A as a free first test:** before paying for anything, I can build a
quick parallax prototype from your three stills. That lets us test the scroll
timing and chapter panels, and we'd swap in the film later. (Nothing gets
built until you say so.)

---

## 4. The shot list: one continuous flight

The film is **7 shots joined end to end**. The key rule for a seamless film:
**the last frame of each shot is the first frame of the next.** Most AI video
tools let you upload a "first frame" and a "last frame" and animate between them.

| Shot | Chapter | Start frame → End frame | Camera and motion | Background | HUD panel on top (HTML) |
|---|---|---|---|---|---|
| 0 | **Hero** | Spaceship image → same ship, slightly closer | Very slow push-in; engines glow brighter | Earth's clouds (spaceship image) | "I don't code. I build with AI." |
| 1 | **Define** | Ship over Earth → ship climbing into space, Earth falling away | Ship rises; camera follows from behind | Earth → black space | The project brief types in |
| 2 | **Plan** | Ship in space → ship with a glowing cyan route ahead (added as a web overlay, not in the film) | Steady cruise, camera slowly circles to the side | Stars | "24 TASKS · 5 WORKSTREAMS" |
| 3 | **Delegate** | Ship cruising → ship with small escort craft in formation (the small ships from the dock image) | The escorts fly in one by one | **Nebula** begins (violet = AI) | Five agents appear |
| 4 | **Monitor** | Ship in nebula → ship slowing near nebula lightning | Lightning flickers ahead = hazards; ship slows | Nebula, lightning | Amber alerts |
| 5 | **Decide** | Ship paused before the storm | Near-still: engines idle, a moment of tension | Nebula | AI recommendation + the two buttons |
| 6 | **Deliver** | Ship leaving the nebula → station in view → **docking** | Station grows larger; ship aligns and docks at a ring | Space dock image | "Delivered." |
| 7 | **Finale** | Docked ship → wide shot of the whole station over Earth (dock image) | Camera pulls back slowly | Space dock image | The station's rings light up with the stage names, then the closing line |

**Chapter 5's two endings:** we generate **two versions of shot 6**. "Override"
gets a calm, all-cyan docking. "Accept" gets a docking with one amber warning
light still blinking. The site plays whichever matches the visitor's choice.

**What's film vs what's web overlay:** anything with words, numbers or
clickable things stays in HTML on top of the film. That includes the route
line, agent names, alerts, buttons and the stage labels at the end. Keeping
text out of the film means it stays sharp, readable, editable, accessible, and
never garbled the way AI-generated text often is.

---

## 5. The pipeline: from three images to a scroll film

| Step | What happens | Who | Tools (examples, all have free or cheap options) |
|---|---|---|---|
| **1. Clean the images** | Remove "Apolo 13". Make wide (16:9) and tall (9:16, for phones) versions of each image by extending the edges with AI | You, with my step-by-step guidance | Adobe Firefly / Photoshop Generative Fill, Canva Magic Edit, or Photopea (free) |
| **2. Make the in-between frames** | Create the stills the shot list needs that don't exist yet: the ship in space, the ship with escorts, the ship at the docking port | You (I write the image prompts) | The same image tool you used for the originals |
| **3. Generate the clips** | For each shot, upload the start and end frames and a short motion prompt, e.g. *"slow, steady camera following the ship, no cuts, no shaking, cinematic"* | You (I write every prompt) | Any image-to-video tool with first- and last-frame support (e.g. Kling, Luma Dream Machine, Runway) |
| **4. Pick the best takes** | AI video sometimes changes the ship's shape between clips. Generate 2–3 takes per shot and keep the most consistent | You and me together | — |
| **5. Join the film** | Put the 7 shots in order, match colours, trim glitches, and export one master film | You, with guidance, or I do it with a free command-line tool (ffmpeg) | CapCut or DaVinci Resolve (both free) |
| **6. Prepare it for the web** | Turn the film into a scroll-friendly format: either a video where every frame can be jumped to instantly, or a sequence of compressed still frames. Make a smaller version for phones | Me | ffmpeg, image compression |
| **7. Build the scroll component** | A full-screen film pinned in place while the chapters scroll past. Scroll position → film frame. HUD panels appear at the right moments | Me | GSAP ScrollTrigger + Lenis (smooth scrolling), React |

**Timeline estimate:** steps 1–5 take about 2–4 evenings of your time, mostly
generating and choosing clips. Steps 6–7 take about 1–2 building sessions.

---

## 6. How the scroll component works (plain English)

1. **The film is a flipbook.** The page stores the film as a stack of frames
   (e.g. 240 pictures). Scroll 50% of the way and the page shows picture 120.
   That's why scrolling back rewinds perfectly.
2. **It's pinned.** The film stays fixed on screen while the chapters scroll
   over it, like a stage with the text passing in front.
3. **Timed overlays.** Each chapter panel is tied to a frame range. For
   example, the Monitor panel shows between frames 130 and 165.
4. **Smart loading.** The first frames load immediately, so the hero appears
   fast. The rest load in the background while the visitor reads. On phones
   the film is smaller and lighter.
5. **Reduced motion.** Visitors who switch on "reduce motion" see one still
   picture per chapter, fading between them, with no fast movement.
6. **Fallback.** If the film can't load, each chapter shows its still image.

---

## 7. How this fits the current website

- **Replaces:** the code-drawn Earth, the ring station and the stars behind the
  hero and the six chapters. The film's photoreal look and the code-drawn look
  would clash side by side.
- **Keeps:** all the words, the colour roles (cyan hospital / violet AI / warm
  white human / amber risk), the HUD panels, the Chapter 5 choice, the journey,
  the launch countdown, the research modules and the footer.
- **Loses:** clicking objects *inside* the 3D scene. Interactions move to HTML
  hotspots placed over the film (e.g. hover a glowing marker on an escort ship
  to see which agent it is).
- **Could keep, optionally:** a light layer of live code-drawn particles and HUD
  lines over the film, so it feels alive even when scrolling stops.

---

## 8. Things to settle before building

1. **Where did the three images come from?** If you generated them with an AI
   tool, check that tool's terms allow use on a public website. Most paid plans
   do. If they came from someone else's website or artwork, we can only use
   them as inspiration and must generate our own versions.
2. **"Apolo 13" must go.** It's a misspelling of a real NASA mission name, and
   visible AI-garbled text looks unprofessional.
3. **Hospital or warship?** The ship reads as military. Optional fix: generate
   a version with softer, medical-transport styling. Avoid a red cross symbol:
   it's a legally protected emblem.
4. **Approach:** B (AI video film), starting with the free A prototype to test
   timing first?
5. **Video tool budget:** about $10–30 for one month is typical. Free tiers
   usually add watermarks.
6. **Design update:** once approved, DESIGN.md gets a v3 section for the new
   station shape and the film-based scroll.

---

## 9. Next: all-angle coverage (plan only, budget 115 Kling credits)

**Goal:** show the ship from the right, left, front, back and top as it moves
through the chapters, without it ever looking like it turns back.

**Rule (agreed):** the ship may point left on screen when we see its left side,
as long as a **neutral view** comes first: head-on (front), tail-on (back) or
top-down. Neutral views have no left/right, so changing sides after one reads
as the camera moving, not the ship reversing.

### New flow of views

| Chapter | View sequence | Source | Credits |
|---|---|---|---|
| Define | right side, climbing | existing shot 1 | 0 |
| Plan | right → **front** (neutral) → **left side** | existing shot 2, full orbit restored (frames 0–68) | 0 |
| Delegate | left → **top-down** (neutral) → right, nebula appears | **new shot A** | ~30 |
| Monitor | right → **back** (neutral, four engines, lightning) | existing shot 4c | 0 |
| Decide | back → **left side**, holding at the storm's edge | **new shot C** | ~30 |
| Deliver | left → **front** (neutral, bursting out of the storm) → right, station ahead | **new shot D** | ~30 |
| Deliver | fly to the station and dock | existing shot 7 | 0 |
| Finale | whole station over Earth | existing shot 8 | 0 |

Total: **~90 credits**, leaving ~25 in reserve (not enough for a full retake of a
5-second shot, so a failed shot means pausing to decide: top up, or accept).

### Shot details (all 720p · 5s · Native Audio off · element "spaceship" bound)

**Shot A: Delegate, over the top**
- Start frame: `C2-ship-other-side.jpg` (left side, end of the full orbit)
- End frame: `D-ship-at-nebula.jpg` (right side, nebula ahead)
- Prompt: *The camera rises smoothly up and over the spaceship, looking straight
  down on its top as it flies forward, then descends on its other side as a
  glowing violet and blue nebula rises into view ahead. One continuous move, no
  cuts. The spaceship keeps its exact shape, details and blue lights. No text,
  no logos, no extra ships, no camera shake.*
- Risk: the top view isn't in the element (no free slot). If the top melts,
  swap the element's side angle for `R-ship-top.png` and retry.

**Shot C: Decide, the pause from the other side**
- Start frame: `E3R-shot4c-last-frame.jpg` (tail-on, heading right into the storm)
- End frame: **new keyframe L** (built by Claude): the ship's left side at the
  storm's edge, from the orbit's left-side view, cut out and placed on the nebula
- Prompt: *The spaceship holds position at the edge of the storm, engines
  dimming to a low idle glow. The camera slowly circles from behind the ship
  around to its left side. Lightning flickers quietly deep in the nebula. Tense,
  calm, suspended moment. …(same closing rules)*

**Shot D: Deliver, breaking out head-on**
- Start frame: last frame of shot C (left side)
- End frame: `F-station-ahead.jpg` (right side, station ahead), so it still
  joins the docking shot seamlessly
- Prompt: *The spaceship's engines flare and it bursts out of the storm straight
  toward the camera, head-on, then the camera swings around to its right side as
  it flies on and a ring-shaped space station appears ahead. …(same rules)*

### Order of work
1. Claude: build keyframe L, restore the full orbit in the edit (free).
2. Shot A → review → Shot C → review → Shot D → review (stop if a shot fails;
   the reserve won't cover a retake).
3. Claude: rejoin the film, check joins and views frame by frame, re-encode for
   the web, update the prototype page's chapter timings.
