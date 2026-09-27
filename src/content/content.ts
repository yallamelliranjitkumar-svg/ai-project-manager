// ─────────────────────────────────────────────────────────────
// ALL THE WORDS ON THE SITE LIVE HERE.
// To change any text, edit the words between the quote marks.
// Keep the quote marks and commas exactly where they are.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Ranjit Kumar Yallamelli',
  linkedin: 'https://www.linkedin.com/in/ranjit-kumar-yallamelli-6871b2179/',
  github: 'https://github.com/yallamelliranjitkumar-svg',
  repo: 'https://github.com/yallamelliranjitkumar-svg/ai-project-manager',
  station: 'Aurora Station',
}

export const hero = {
  eyebrow: 'The AI Project Manager',
  lines: ["I don't code.", 'I build with AI.'],
  intro:
    'This site was designed, written and built by directing AI as a full product team: designer, developer, QA and project manager. I made the calls. Scroll to see how a project comes to life.',
  scrollCue: 'Begin approach',
  status: 'Aurora Station · Low Earth orbit · 408 km',
  proof: 'This website is the proof. Scroll to see how I built it with AI, from idea to launch.',
}

export const journey = {
  label: 'The journey',
  title: 'From hospital systems to AI products',
  steps: [
    {
      title: 'Healthcare IT',
      altitude: 'ALT 0 KM · EARTH',
      text: 'Where I learned that technology only matters when it works for clinicians and patients.',
    },
    {
      title: 'AI',
      altitude: 'ALT 12 KM',
      text: 'Where I saw a new kind of teammate: fast, tireless, and in need of clear direction.',
    },
    {
      title: 'Product',
      altitude: 'ALT 100 KM',
      text: 'Where ideas turn into things people actually use, one iteration at a time.',
    },
    {
      title: 'Project Management',
      altitude: 'ALT 408 KM · AURORA STATION',
      text: 'Where it all comes together: people, risk, data and delivery, with a human making the call.',
    },
  ],
}

// Home page, after the film: real numbers from building this site (see inspiration/scroll/log.txt and git history)
export const stats = {
  label: 'Mission log',
  title: 'What it took',
  items: [
    { n: 2, suffix: '', label: 'days, idea to launch' },
    { n: 19, suffix: '', label: 'AI video takes (8 made the final film)' },
    { n: 3000, suffix: '+', label: 'lines of code, all written by AI' },
    { n: 0, suffix: '', label: 'lines of code written by me' },
    { n: 6, suffix: '', label: 'build phases' },
  ],
}

// Home page: About me (from Ranjit's LinkedIn experience; client names kept general on purpose)
export const about = {
  label: 'Crew profile',
  title: 'About me',
  intro:
    '7+ years in healthcare IT, supporting the clinical systems hospitals run on. I know how technology fails in real workflows, and how to get it working again. Now I build with AI.',
  steps: [
    {
      years: '2019 – 2021',
      role: 'Technical Analyst',
      org: 'HCL Technologies',
      text: 'Solved application, device and access issues for the staff of a global healthcare company. Learned how systems break, and how to fix them fast.',
    },
    {
      years: '2021',
      role: 'Senior Technical Analyst',
      org: 'HCL Technologies',
      text: 'First point of contact for Level 1 analysts. Coached a team of 10+ to production-ready, ran root cause analysis and kept SLAs on track.',
    },
    {
      years: '2022 – 2026',
      role: 'Clinical Applications Senior Analyst',
      org: 'HCL Technologies · Accenture',
      text: 'Cerner Millennium EHR support for a US health system: provider profiles, interfaces, ServiceNow dashboards, and root cause analysis across clinical teams.',
    },
    {
      years: '2026 – now',
      role: 'Packaged App Development Specialist',
      org: 'Accenture',
      text: 'Working with clients to optimise workflows and cut turnaround time, and exploring how generative AI can improve clinical tech support.',
    },
  ],
  skills: ['Cerner Millennium', 'EHR / EMR', 'ServiceNow', 'Root cause analysis', 'Team coaching', 'Generative AI'],
  cta: 'Connect on LinkedIn',
}

export const process = {
  label: 'Launch sequence · How this site was made',
  title: 'Idea to product, directed by a human',
  steps: [
    { title: 'Idea', text: 'A creative brief, written in plain English.' },
    { title: 'Prompt', text: 'Clear instructions, one phase at a time.' },
    { title: 'Claude', text: 'AI acting as architect, designer and developer.' },
    { title: 'Code', text: 'React, Three.js and GSAP, written by AI.' },
    { title: 'Iteration', text: 'I review, question and redirect.' },
    { title: 'Product', text: 'The site you are scrolling right now.' },
  ],
}

// The six chapters tell the real story of how THIS website was built by directing AI.
export const chapters = [
  {
    id: 'define',
    ward: 'Ideation',
    title: 'Define',
    question: "What's the problem?",
    text: 'Every project starts with a question. Mine: can someone who has never written code build a real product, just by directing AI?',
    brief:
      'Creative brief: a portfolio site that proves I can turn an idea into a working product with AI. Audience: my LinkedIn network and hiring managers in healthcare IT, AI and project management. Rule: the human stays in charge.',
  },
  {
    id: 'plan',
    ward: 'Requirements',
    title: 'Plan',
    question: 'What needs to happen?',
    text: 'Before a single line of code, the AI asked and I answered: audience, colours, fonts, hosting, links. Design came first, then the build, one phase at a time.',
    stat: '1 brief · 1 design system · 6 build phases',
    // The same numbers, counted up on the home page
    stats: [
      { n: 1, label: 'brief' },
      { n: 1, label: 'design system' },
      { n: 6, label: 'build phases' },
    ],
  },
  {
    id: 'delegate',
    ward: 'Team',
    title: 'Delegate',
    question: 'Who does what?',
    text: 'I hired an AI product team. Each member had one job. I decided who did what, and approved every step.',
    agents: [
      { domain: 'Architecture', agent: 'Claude · Architect', role: 'Chose the technology and the structure of the site.' },
      { domain: 'Design', agent: 'Claude · Designer', role: 'Wrote the design system: colours, fonts, layout.' },
      { domain: 'Code', agent: 'Claude · Developer', role: 'Wrote every line of code.' },
      { domain: 'Quality', agent: 'Claude · QA tester', role: 'Checked every page and every film frame.' },
      { domain: 'Film', agent: 'Kling AI · Film crew', role: 'Generated the flight film, 5 seconds at a time.' },
    ],
  },
  {
    id: 'monitor',
    ward: 'QA',
    title: 'Monitor',
    question: 'What could go wrong?',
    text: 'Every AI output was checked, frame by frame. When something drifted, it was caught before it reached you.',
    warnings: ['360° camera orbit: the ship melted', 'Ship suddenly flew the wrong way'],
    // Each alert shows this first, then flips to "Alert"
    checking: 'Checking',
    alert: 'Alert',
  },
  {
    id: 'decide',
    ward: 'Decision',
    title: 'Decide',
    question: 'Who makes the call?',
    text: 'AI brings the evidence. The human brings the judgement. Now it is your call.',
    recommendation:
      'AI check: keep the final shot as it is. Technically clean: no jumps, smooth, ship stays docked.',
    missing: "What the AI can't see: it feels slow. Visitors will scroll past a boring ending.",
    accept: 'Accept AI recommendation',
    override: 'Override with human judgement',
  },
  {
    id: 'deliver',
    ward: 'Launch',
    title: 'Deliver',
    question: 'Did it work?',
    text: 'Launched with the ending at double speed. Same footage, better story. The call was about feeling, not data.',
    acceptText: 'Launched on the first cut. Technically perfect, but the ending dragged and the story lost its pace.',
  },
]

export const experiments = {
  label: 'Research modules',
  title: 'What I am building next',
  soon: 'Status · In development',
  cards: [
    { title: 'AI PM', text: 'An AI co-pilot for project status, risks and next steps.' },
    { title: 'Healthcare AI', text: 'Small, safe AI tools for real clinical workflows.' },
    { title: 'AI Agents', text: 'Teams of agents that plan, check and report on work.' },
    { title: 'Vibe Coding', text: 'Ideas built in a weekend by directing AI, documented honestly.' },
  ],
}

export const footer = {
  closing: ["AI doesn't replace the project manager.", 'It changes what the project manager can accomplish.'],
  connect: 'Open a channel',
  linkedinLabel: 'LinkedIn profile',
  githubLabel: 'GitHub profile',
  repoLabel: 'See how this site was built',
  credit: 'Designed and built by directing Claude Code. Earth imagery: NASA.',
  filmCredit: 'Designed and built by directing Claude Code. Flight film generated with Kling AI.',
  howMade:
    'Built in 2 days by directing AI. Claude Code wrote every line of code, designed the pages and checked the work. Kling AI generated the flight film, 5 seconds at a time. Claude built the start and end frames and joined the shots. My job: the idea, the requirements, the reviews, and every final decision.',
}
