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
}

export const hero = {
  eyebrow: 'The AI Project Manager',
  lines: ["I don't code.", 'I build with AI.'],
  intro:
    'This site was designed, written and built by directing AI as a full product team: designer, developer, QA and project manager. I made the calls. Scroll to see how a project comes to life.',
  scrollCue: 'Scroll to begin',
}

export const journey = {
  label: 'The journey',
  title: 'From hospital systems to AI products',
  steps: [
    {
      title: 'Healthcare IT',
      text: 'Where I learned that technology only matters when it works for clinicians and patients.',
    },
    {
      title: 'AI',
      text: 'Where I saw a new kind of teammate: fast, tireless, and in need of clear direction.',
    },
    {
      title: 'Product',
      text: 'Where ideas turn into things people actually use, one iteration at a time.',
    },
    {
      title: 'Project Management',
      text: 'Where it all comes together: people, risk, data and delivery, with a human making the call.',
    },
  ],
}

export const process = {
  label: 'How this site was made',
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

export const chapters = [
  {
    id: 'define',
    title: 'Define',
    question: "What's the problem?",
    text: 'Every project starts as a bare idea. Before any work begins, someone has to write down what success looks like.',
    brief:
      'Project brief: Launch an AI triage assistant across 3 clinics. Reduce patient wait times by 20% within 6 months. Keep patient data safe.',
  },
  {
    id: 'plan',
    title: 'Plan',
    question: 'What needs to happen?',
    text: 'The idea breaks into tasks, and the tasks connect. A plan is a network of dependencies, not a list.',
    stat: '24 tasks · 5 workstreams',
  },
  {
    id: 'delegate',
    title: 'Delegate',
    question: 'Who does what?',
    text: 'Specialist AI agents take on the work they are best at. The project manager decides who owns what.',
    agents: [
      { domain: 'Strategy', agent: 'Strategy Agent', role: 'Keeps every task tied to the goal.' },
      { domain: 'People', agent: 'Stakeholder Agent', role: 'Tracks who needs to know, and who needs to agree.' },
      { domain: 'Data', agent: 'Data Agent', role: 'Checks data quality, access and privacy.' },
      { domain: 'Risk', agent: 'Risk Agent', role: 'Watches for what could go wrong, early.' },
      { domain: 'Execution', agent: 'Delivery Agent', role: 'Moves tasks forward and flags blockers.' },
    ],
  },
  {
    id: 'monitor',
    title: 'Monitor',
    question: 'What could go wrong?',
    text: 'The agents never stop watching. When something drifts, it turns amber, long before it turns into a crisis.',
    warnings: ['Data quality below threshold', 'Clinical sign-off pending'],
  },
  {
    id: 'decide',
    title: 'Decide',
    question: 'Who makes the call?',
    text: 'AI brings the evidence. The human brings the context. Now it is your call.',
    recommendation:
      'AI recommendation: Launch on schedule. 92% of tasks are complete and risk is within tolerance.',
    missing: "What the AI can't see: the clinical team hasn't signed off on the patient-data workflow.",
    accept: 'Accept AI recommendation',
    override: 'Override with human judgement',
  },
  {
    id: 'deliver',
    title: 'Deliver',
    question: 'Did it work?',
    text: 'Delivered. One week later than the AI suggested. Safe launch, clinicians on board.',
    acceptText: 'Delivered on time. But one warning never cleared. The data was right. The context was missing.',
  },
]

export const experiments = {
  label: 'Experiments',
  title: 'What I am building next',
  soon: 'Coming soon',
  cards: [
    { title: 'AI PM', text: 'An AI co-pilot for project status, risks and next steps.' },
    { title: 'Healthcare AI', text: 'Small, safe AI tools for real clinical workflows.' },
    { title: 'AI Agents', text: 'Teams of agents that plan, check and report on work.' },
    { title: 'Vibe Coding', text: 'Ideas built in a weekend by directing AI, documented honestly.' },
  ],
}

export const footer = {
  closing: ["AI doesn't replace the project manager.", 'It changes what the project manager can accomplish.'],
  connect: "Let's talk",
  linkedinLabel: 'LinkedIn profile',
  githubLabel: 'GitHub profile',
  repoLabel: 'See how this site was built',
  credit: 'Designed and built by directing Claude Code.',
}
