// All site copy lives here. Edit, then run: node build/build.mjs
// Sourced from Chris-Robby_Master_Experience_Record.md (sections 1 to 6), the resumes,
// the public repos and the live sites. No em-dashes (record, section 11).

export const site = {
  name: 'Chris-Robby Twungubumwe',
  initials: 'CT',
  email: 'chrisrobby38@gmail.com',
  github: 'https://github.com/chris-robby',
  linkedin: 'https://www.linkedin.com/in/chris-robby-twungubumwe',
  description:
    'Chris-Robby Twungubumwe is a full stack developer in Montreal. Projects, case studies and resumes. Available full time from January 2027.',
};

const pdf = (slug) => `resumes/Chris-Robby_Twungubumwe_${slug}.pdf`;

export const resumes = [
  { id: 'software', title: 'Software Developer', focus: 'Next.js, React, Node.js, Python, SQL, process automation', lang: 'English', pages: 1, file: pdf('Software_Developer_EN'), note: 'The one-page overview. Start here if you are not sure.' },
  { id: 'fullstack', title: 'Full Stack Developer', focus: 'Java, Spring Boot, REST APIs, TypeScript, SQL', lang: 'English', pages: 2, file: pdf('Full_Stack_EN'), note: 'Leads with back end APIs and microservices.' },
  { id: 'frontend', title: 'Front-End Developer', focus: 'React, Next.js, TypeScript, dashboards', lang: 'English', pages: 1, file: pdf('Front_End_EN'), note: 'Leads with interfaces and UI work driven by user feedback.' },
  { id: 'junior', title: 'Junior Software Developer', focus: 'C++, C#/ASP.NET, React, TypeScript, Python', lang: 'English', pages: 2, file: pdf('Junior_Developer_EN'), note: 'The broadest view of languages and fundamentals.' },
  { id: 'python', title: 'Software Application Developer', focus: 'Python, test-driven development, CI/CD', lang: 'English', pages: 2, file: pdf('Python_Testing_EN'), note: 'Leads with testing, pipelines and infrastructure.' },
  { id: 'ai', title: 'Software Engineer, AI Code Review', focus: 'Python, TypeScript, Java, C++, AI evaluation', lang: 'English', pages: 2, file: pdf('AI_Code_Review_EN'), note: 'Leads with multi-agent work and verifying AI output.' },
  { id: 'devops-fr', title: 'Développeur logiciel, automatisation', focus: 'Automatisation, CI/CD, Python, infonuagique', lang: 'Français', pages: 2, file: pdf('Automatisation_DevOps_FR'), note: 'Met de l\'avant le déploiement et le DevOps.' },
  { id: 'ia-fr', title: 'Développeur logiciel, IA agentique', focus: 'IA agentique, Python, TypeScript, infonuagique', lang: 'Français', pages: 2, file: pdf('IA_Agentique_FR'), note: 'Met de l\'avant les pipelines multi-agents.' },
  { id: 'cpp-fr', title: 'Développeur logiciel, C/C++', focus: 'C/C++, vérification, intégration, tests', lang: 'Français', pages: 2, file: pdf('Cpp_Verification_FR'), note: 'Met de l\'avant le C++ et la vérification.' },
];
const resume = (id) => resumes.find((r) => r.id === id);

export const projects = [
  {
    slug: 'art-of-consistency',
    name: 'The Art of Consistency',
    category: 'SaaS product',
    thumb: { img: 'assets/reclaim-landing.png' },
    summary: 'A bilingual accountability product with real users, where showing up every day earns your deposit back.',
    role: 'Solo founder and developer',
    stack: 'Next.js, TypeScript, Node.js, PostgreSQL, Stripe, Claude API',
    links: [
      { label: 'Live site', href: 'https://theartofconsistency.app' },
      { label: 'First version', href: 'https://github.com/chris-robby/BluePrint' },
    ],
    resume: 'fullstack',
    hero: { img: 'assets/reclaim-landing.png', alt: 'Landing page of the live product, headed "Become dangerously consistent", with cards showing refund progress on days 1, 12 and 21.', caption: 'The live site at theartofconsistency.app, where the product currently goes by the name Reclaim.' },
    problem: 'Skipping a habit usually costs nothing, so it is easy to skip. This product puts something at stake: you deposit money against a 21-day challenge and earn it back one day at a time by checking in and writing honestly about how it went.',
    built: {
      intro: 'I designed, built and run the whole product myself, from data model to payments to the screens people see each day.',
      items: [
        'Daily check-ins with journaling, where each completed day returns $1 and a skipped day forfeits it',
        'AI feedback on journal entries through two Claude API features: vision OCR and an LLM-driven weekly evaluation, each with scoped prompts',
        'Google OAuth sign-in, and Stripe payments and webhooks for the deposits',
        'Chart.js dashboards so people can see their progress at a glance',
        'A bilingual interface, which grew out of BluePrint, a first version built as a React mobile app',
      ],
    },
    flow: [
      [{ t: 'Next.js front end', d: 'TypeScript, Chart.js, bilingual' }],
      [{ t: 'Node.js back end', d: 'REST APIs' }],
      [{ t: 'PostgreSQL', d: 'Application data' }, { t: 'Google OAuth', d: 'Sign-in' }, { t: 'Stripe', d: 'Payments and webhooks' }, { t: 'Claude API', d: 'Vision OCR, weekly evaluation' }],
    ],
    flowCaption: 'How the main pieces connect.',
    how: 'Jest tests and a GitHub Actions pipeline gate every change. I develop with Claude Code and Codex, guided by a CLAUDE.md I maintain. When an agent gets something wrong, I check its sources, research the question independently and redirect it, rather than trusting the output.',
    metrics: [
      { v: '21', l: 'days in a challenge' },
      { v: '2', l: 'Claude API features in production' },
      { v: '$1', l: 'earned back per journaled day' },
    ],
    outcome: 'Real people used it and the feedback was positive, but it also showed me what needed work. UI inconsistencies were causing bad experiences, so I fixed them and made the screens less intimidating. The biggest lesson was that real users find problems that tests never will.',
  },
  {
    slug: 'your-dj',
    name: 'Your DJ',
    category: 'Progressive web app',
    thumb: { big: 'On the beat', small: 'mixes by time of day, movement and taste' },
    summary: 'A phone app that plays an EP the way a DJ would: it picks the order and how much of each song to play, then mixes the music videos on the beat, based on the time of day, your movement and what it learns from you.',
    role: 'Solo build',
    stack: 'JavaScript, Web Audio (AudioWorklet), PWA, Python, GitHub Actions, Vercel',
    links: [
      { label: 'Live app', href: 'https://your-dj-psi.vercel.app' },
    ],
    resume: 'frontend',
    problem: 'A playlist plays the same songs the same way whether you are sitting still at night or running in the afternoon. A DJ reads the room, chooses what comes next and mixes into it on the beat. I wanted an EP that does that by itself, on a phone.',
    built: {
      intro: 'An installable phone app, plus the tools that analyze the music and test the DJ before a change goes live.',
      items: [
        'A Python analyzer that measures each song\'s tempo, downbeats, musical key (in Camelot notation), an energy curve with builds and drops, and the points where it can be mixed in and out',
        'A DJ "brain" that scores every version of every song on energy, tempo, key, mood and walking or running pace, avoids repeats and makes sure every song comes round',
        'A mixing engine on the browser\'s audio thread (an AudioWorklet), so blends and echo transitions land exactly on the downbeat, with the basslines swapped halfway through a blend',
        'Motion detection from the phone\'s sensor that tells the DJ whether you are still, walking or running, and your steps per minute',
        'Learning from what you do (early skips, likes, replays, going back 5 seconds), kept only on the phone and stored separately for each activity and time of day',
      ],
    },
    flow: [
      [{ t: 'Python analyzer', d: 'Tempo, key, energy, mix points' }],
      [{ t: 'Time of day', d: 'Morning, day, evening, night' }, { t: 'Motion sensor', d: 'Still, walking or running' }, { t: 'What it learned', d: 'Skips, likes, replays' }],
      [{ t: 'DJ brain', d: 'Scores every song and version' }],
      [{ t: 'AudioWorklet mixer', d: 'Transitions on the downbeat, synced video' }],
    ],
    flowCaption: 'How the app decides what to play next and mixes into it.',
    how: 'The rules are the artist\'s taste written as numbers, all in one place at the top of one file. Learning only nudges those rules, and every nudge is capped, so the DJ adapts to you without drifting away from what the artist intended. The DJ exists twice, in Python for analysis and simulation and in JavaScript in the app, and a GitHub Actions check confirms on every change that both make the same choices.',
    code: { lang: 'js', source: 'app/js/dj.js', text: `export const WEIGHTS = {
  energy: 45,       // how well the song fits the listener's energy
  tempo: 20,        // similar BPM to the current song = smoother mix
  key: 15,          // harmonically compatible key = smoother mix
  mood: 15,         // song is tagged with the listener's mood
  stride: 10,       // tempo matches walking/running pace
  recent: -60,      // played in the last few songs: avoid repeats
  skipped: -35,     // listener skipped this song (this session)
  learned: 20,      // what the DJ learned about this song over time (up to +-20)
  // ...
};` },
    metrics: [
      { v: '14', l: 'factors in every song choice' },
      { v: '3', l: 'activity states read from the motion sensor' },
      { v: '2', l: 'versions of the DJ, checked against each other' },
    ],
    outcome: 'It is live as an installable app. Before a change goes live, a simulation shows what the DJ would play in sample sessions, such as an evening walk and an afternoon run, so tuning its taste is based on evidence rather than guesswork.',
  },
  {
    slug: 'touchgrass',
    name: 'touchgrass',
    category: 'Automated website',
    thumb: { img: 'assets/touchgrass.jpg' },
    summary: 'Free and $10-and-under things to do in Montreal and Ottawa, rebuilt automatically every morning from public sources.',
    role: 'Solo build',
    stack: 'TypeScript, Python, GitHub Actions, GitHub Pages',
    links: [
      { label: 'Live site', href: 'https://chris-robby.github.io/touchgrass/' },
      { label: 'Code', href: 'https://github.com/chris-robby/touchgrass' },
    ],
    resume: 'frontend',
    hero: { img: 'assets/touchgrass.jpg', alt: 'The touchgrass home page, showing the heading "Free things to do", filters and a list of today\'s events in Montreal.', caption: 'The live site in English, showing 2,950 events on November 6, 2026.' },
    problem: 'Free events exist all over Montreal and Ottawa, but they are scattered across city datasets and university calendars. Finding something to do tonight means checking many sites, and paid events often do not state a price.',
    built: {
      intro: 'A bilingual site that gathers those events in one place, with several ways to browse them.',
      items: [
        'List, calendar and map views, with filters for date, category, audience and borough',
        'A swipe-style Discover page for browsing on a phone',
        'Separate pages and data for each city, in French and English',
        'A strict price rule: an event only appears if it is free or its stated price is $10 or under',
      ],
    },
    flow: [
      [{ t: '8 public sources', d: 'City open data and university calendars' }],
      [{ t: 'Python pipeline', d: 'Fetch, filter, dedupe, sanity checks' }],
      [{ t: 'Tests and build', d: 'A failure stops the deploy' }],
      [{ t: 'GitHub Pages', d: 'TypeScript site, live each morning' }],
    ],
    flowCaption: 'The daily run, scheduled with GitHub Actions.',
    how: 'The most important decision was what happens when something breaks, because nobody is watching at 5 a.m. Any failed download, empty result, sharp drop in event count, failed test or failed build stops the deployment, and the live site keeps the previous day\'s version.',
    code: { lang: 'yaml', source: '.github/workflows/daily.yml', repo: 'https://github.com/chris-robby/touchgrass', text: `# Rebuilds the event data and the site every morning, then deploys to GitHub Pages.
#
# If any step fails (download error, zero events, count dropped by half, tests,
# build), nothing is deployed and the live site keeps yesterday's version.
# GitHub emails the repo owner when a scheduled run fails.
name: Daily build & deploy

on:
  schedule:
    # 10:00 UTC = 5–6 a.m. in Montréal. The city refreshes its dataset around midnight.
    - cron: "0 10 * * *"` },
    metrics: [
      { v: '8', l: 'public data sources' },
      { v: '2', l: 'cities, kept separate' },
      { v: 'Daily', l: 'automatic rebuild' },
    ],
    outcome: 'The site maintains itself. The README also records the sources I checked and rejected, and why, so future decisions start from evidence.',
  },
  {
    slug: 'goalachiever',
    name: 'GoalAchiever',
    category: 'AI mobile app',
    thumb: { big: 'Goal → plan', small: 'and a plan that adapts when you miss a day' },
    summary: 'A mobile app that turns a goal described in plain language into a phased roadmap and daily tasks, then adjusts the plan when a task is missed.',
    role: 'Solo build',
    stack: 'React Native (Expo), TypeScript, Zustand, Supabase, PostgreSQL, Gemini API',
    links: [
      { label: 'Code', href: 'https://github.com/chris-robby/productivity_app' },
    ],
    resume: 'ai',
    problem: 'Long-term goals usually fail in the middle, not at the start. A plan made on day one does not account for the days that go wrong, and most to-do apps just carry a missed task forward without asking why it was missed.',
    built: {
      intro: 'A mobile app where an AI sets up the plan with you, then keeps adjusting it as real days happen.',
      items: [
        'Conversational goal setup: the AI rewrites the goal as a clear statement and asks 3 to 5 questions about timeline, current situation and constraints',
        'Roadmap generation with 2 to 3 phases, weekly milestones and daily tasks for the first week, each with a priority and a time estimate',
        'Failure analysis: when a task is missed, the user says why, and the AI categorizes the reason, looks for patterns and reschedules or adjusts the task',
        'Progress analytics with completion rates, failure patterns and 7-day trends',
      ],
    },
    flow: [
      [{ t: 'Expo app', d: 'TypeScript, Zustand, React Native Paper' }],
      [{ t: 'Supabase Edge Functions', d: 'Goal setup, roadmap, plan adjustment' }],
      [{ t: 'Gemini 2.5 Flash', d: 'Plans and failure analysis' }, { t: 'PostgreSQL', d: 'Row level security on every table' }],
    ],
    flowCaption: 'The AI runs on the server side, never in the app.',
    how: 'The three AI features run in Supabase Edge Functions rather than in the app, so the API key never ships to the phone. Every table uses row level security, so a user can only read and write their own goals, tasks and failure history. Missed tasks are stored with their reasons, which gives the AI a history to find patterns in.',
    metrics: [
      { v: '3', l: 'AI edge functions' },
      { v: '7', l: 'database tables, all with row level security' },
      { v: '3 to 5', l: 'clarifying questions per goal' },
    ],
    outcome: 'The core idea is that a plan should react to missed days, not just record them. Asking why a task failed turns each bad day into information the next version of the plan can use.',
  },
  {
    slug: 'goal-journal',
    name: 'The Goal Journal',
    category: 'AI web app',
    thumb: { big: 'The Mirror', small: 'AI that reflects your own entries back to you' },
    summary: 'A goal journal laid out like a shelf of notebooks, with an AI panel called The Mirror that reads your entries and shows you the patterns in your own writing.',
    role: 'Solo build',
    stack: 'Next.js, TypeScript, Prisma, NextAuth, Vercel AI SDK, Claude and Gemini APIs',
    links: [
      { label: 'Code', href: 'https://github.com/chris-robby/goal-journal' },
    ],
    resume: 'ai',
    problem: 'The project starts from one line: life can only be lived forward but only understood backwards. People write about their goals every day but rarely reread what they wrote, so the patterns in their own entries stay invisible to them.',
    built: {
      intro: 'A journaling app with one notebook per goal, and an AI that reads the notebook back to you.',
      items: [
        'A notebook for each goal on a shelf, with a lined page for each day and a short template: what I did, what worked, what did not, and tomorrow',
        'The Mirror, a panel that slides in beside the page, reads every entry in the journal and returns patterns, gaps and one specific next action, with a chat for follow-up questions',
        'Scanning of handwritten pages: a photo of a paper journal is read with Claude vision and turned into dated entries, checked against a Zod schema',
        'Sign-in with NextAuth and a Prisma data model for users, journals and entries',
      ],
    },
    flow: [
      [{ t: 'Next.js app', d: 'Shelf, journal pages, Mirror panel' }],
      [{ t: 'API routes', d: 'Journals, entries, scan, Mirror' }],
      [{ t: 'AI provider', d: 'Gemini by default, Claude or OpenAI by setting' }, { t: 'Prisma', d: 'Users, journals, entries, cached readings' }],
    ],
    flowCaption: 'How a reading from The Mirror is produced.',
    how: 'The Mirror is designed not to coach: it only reflects what is already in the writing. Its readings are cached for each journal, so reopening the panel does not trigger a new AI call every time. The AI provider is a single setting, so the same code can run on Gemini, Claude or OpenAI.',
    metrics: [
      { v: '3', l: 'AI providers behind one setting' },
      { v: '4', l: 'prompts in every daily entry' },
      { v: '1', l: 'specific next action per reading' },
    ],
    outcome: 'I wrote a detailed spec for The Mirror first, covering layout, interactions and where it connects to the app, then built it with Claude Code in focused steps and checked each step against the spec.',
  },
  {
    slug: 'task-manager',
    name: 'Full stack task manager',
    category: 'Full stack',
    thumb: { big: 'Spring Boot + React', small: 'JWT sign-in, private tasks for each user' },
    summary: 'A task manager with a Spring Boot REST API secured with JWT and a React front end, where each user manages their own tasks, priorities and due dates.',
    role: 'Solo build',
    stack: 'Java, Spring Boot, Spring Security, JPA, JWT, React, Vite',
    links: [
      { label: 'Code', href: 'https://github.com/chris-robby/To-Do_App' },
    ],
    resume: 'fullstack',
    problem: 'A task list is only useful if it is private. Each person must see only their own tasks, and the API has to enforce that itself, not leave it to the interface.',
    built: {
      intro: 'A complete application, from database to interface.',
      items: [
        'A Spring Boot REST API to register, sign in and get the current user, plus endpoints to create, read, update, toggle, filter and delete tasks',
        'Stateless authentication with JWT: a filter checks the token on every request and Spring Security protects the task routes',
        'A JPA data model where every task belongs to a user, with a priority level, a due date and a creation time set automatically',
        'Request validation on DTOs, so the API never exposes its database entities directly',
        'A React front end with protected routes, an authentication context and a dashboard for managing tasks',
      ],
    },
    flow: [
      [{ t: 'React (Vite)', d: 'Protected routes, dashboard' }],
      [{ t: 'Spring Security', d: 'JWT filter on every request' }],
      [{ t: 'Controllers and services', d: 'Validation, ownership checks' }],
      [{ t: 'JPA', d: 'H2 in development, PostgreSQL driver included' }],
    ],
    flowCaption: 'A layered application with a clear API boundary.',
    how: 'The layers follow the standard Spring structure: controllers handle HTTP, services hold the rules, repositories talk to the database, and dependency injection wires them together. Every task is looked up by its ID together with the signed-in user, so nobody can read or change another user\'s task by guessing an ID.',
    metrics: [
      { v: '10', l: 'REST endpoints' },
      { v: 'JWT', l: 'stateless authentication' },
    ],
    outcome: 'This is where I practiced the Spring stack end to end: security, persistence and API design, connected to a React client.',
  },
  {
    slug: 'banking-app',
    name: 'Banking web application',
    category: 'Full stack course project',
    thumb: { big: '3 roles', small: 'customer, teller and administrator' },
    summary: 'A banking system built for a software engineering course, with a Java REST API, a React dashboard for each role and a domain model that follows a UML design.',
    role: 'Developer',
    stack: 'Java, Javalin, React, REST APIs, UML',
    links: [
      { label: 'Code', href: 'https://github.com/chris-robby/Banking_Application' },
    ],
    resume: 'fullstack',
    problem: 'Banking data leaves little room for error. The API has to reject invalid input, refuse actions a user is not allowed to take and handle failures predictably.',
    built: {
      intro: 'A complete application built from the course\'s UML diagram and use cases.',
      items: [
        'A Java REST API built with Javalin, organized around the use cases: sign-in, accounts, deposits, withdrawals, transfers, card management, audit logs and spending by category',
        'Role-based access for customers, tellers and administrators, enforced by the API itself',
        'A domain model (accounts, savings, cards, checks, transactions, branches) that follows the project\'s UML diagram',
        'A separate React dashboard for each of the three roles',
      ],
    },
    flow: [
      [{ t: 'React', d: 'Customer, teller and admin dashboards' }],
      [{ t: 'Javalin REST API', d: 'Role checks, clear error codes' }],
      [{ t: 'Domain model', d: 'Follows the UML design' }, { t: 'Data store', d: 'In memory, behind one class' }],
    ],
    flowCaption: 'A layered application with a clear API boundary.',
    how: 'Errors are explicit: wrong credentials return 401, a role attempting an action it does not have returns 403, a missing account returns 404, and a rejected transaction returns 400 with the reason. Data is kept in memory behind a single DatabaseManager class, so a real database can replace it in one place.',
    metrics: [
      { v: '19', l: 'REST endpoints' },
      { v: '3', l: 'user roles with their own dashboards' },
    ],
    outcome: 'The project was practice in turning a UML design and a list of use cases into working software, and in designing an API around the failures it has to handle as well as the normal path.',
  },
];

export const moreWork = [
  { name: 'Digital library for a choir', tags: 'Vue.js, Supabase, REST APIs', text: 'Scores and audio in one place for a 30+ member choir, with contribution tracking for every member and a spreadsheet-style admin view. Built as four independently deployed services (authentication, storage, admin view and members view) that communicate over REST.' },
  { name: 'Cloud-native microservices platform', tags: 'Docker, Kubernetes, Terraform, OpenShift', text: 'Containerized microservices deployed to Google Kubernetes Engine with Terraform, with autoscaling and load balancing, then migrated to Red Hat OpenShift with Source-to-Image builds and Routes. CI/CD with GitHub Actions and Google Artifact Registry.' },
  { name: 'Multi-agent AI pipeline', tags: 'Graph orchestration, function calling', text: 'Researcher, executor and validator agents collaborating through graph-based orchestration, with outputs validated against schemas, self-correction, and hard loop limits that keep latency and API cost in check.' },
  { name: 'TimeTrack', tags: 'Next.js, TypeScript, IndexedDB', href: 'https://github.com/chris-robby/timetasker', text: 'A daily schedule with a timeline, timers, alarms and recurring tasks, stored in the browser with IndexedDB. It tracks work sessions and interruptions and shows stats on how the day actually went.' },
  { name: 'Defog', tags: 'React, TypeScript, Vite', href: 'https://github.com/chris-robby/defog', text: 'A cognitive check-up with five short tests (reaction time, digit span, Stroop, symbol matching and patterns) that scores each area and gives a recommendation for it.' },
  { name: 'Campus events application', tags: 'Python, FastAPI, PyTest', text: 'Unit and integration tests covering REST endpoints and permissions, with a test SQLite database and pytest-mock. They made it possible to refactor the authentication middleware without breaking routes.' },
  { name: 'Software engineering course project', tags: 'Java, Cucumber, Docker', text: 'Team lead for a team of 4 through an agile cycle, with code reviews, BDD acceptance tests and Docker.' },
  { name: 'C++ projects', tags: 'C++', text: 'A hierarchical file system simulator and a key-value store. I traced an intermittent segfault to a shallow copy in a custom copy constructor that led to a double free.' },
  { name: 'Real-time fleet simulation and pricing', tags: 'Java, Apache Kafka', text: 'About 100 simulated drivers and 20 to 30 requests per minute, with a consumer computing demand-based pricing.' },
  { name: 'Terraform infrastructure', tags: 'Terraform, AWS, Azure', text: 'A personal project provisioning infrastructure on AWS and Microsoft Azure.' },
  { name: 'C# and ASP.NET web project', tags: 'C#, ASP.NET', text: 'A complete university web project applying object-oriented design.' },
  { name: 'Hardware and physics', tags: 'C++, Arduino', text: 'Arduino work with sensors and hardware I/O, and cars with electromagnetic motors built in a physics course.' },
];

export const about = {
  intro: [
    'I am a Computer Science student at Concordia University in Montreal, graduating in December 2026. I like building complete things, from the database to the screen, and then improving them based on what real people do with them.',
    'I work with AI coding agents every day, and I verify their work rather than trusting it. I also lead: I led a four-person team on my software engineering project and work as a supervisor at Metro, where the job is to keep people, customers and the cash count in good order.',
  ],
  facts: [
    { k: 'Based in', v: 'Montreal, QC' },
    { k: 'Available', v: 'Full time from January 2027' },
    { k: 'Status', v: 'Canadian citizen' },
    { k: 'Languages', v: 'French and English (fluent), sign language (intermediate)' },
  ],
  experience: [
    { role: 'Supervisor', org: 'Metro', when: 'Sept 2025 to present', text: 'Coordinate with the team, support colleagues on customer service and equipment problems, and handle cash counting, deposits and store closing.' },
    { role: 'Freelance UI Developer', org: 'Chrisland Engineering (Riipen project)', when: '', text: 'Designed and built the UI/UX screens of the company\'s application in JavaScript.' },
    { role: 'Computer Science Content Creator', org: 'TikTok, self-employed', when: '1,000+ followers', text: 'Educational content that explains computer science ideas clearly.' },
  ],
  education: {
    school: 'Concordia University',
    degree: 'BSc, Computer Science',
    when: 'Jan 2024 to Dec 2026 (expected)',
    courses: 'Data Structures and Algorithms (A+), Software Engineering, Databases, Web Development, Introduction to Artificial Intelligence, User Interface Design (in progress).',
  },
  skills: [
    { k: 'Languages', v: 'C++, C#, Java, Python, TypeScript, JavaScript, SQL, HTML/CSS' },
    { k: 'Web and frameworks', v: 'React, Next.js, Vue.js, Node.js (Express), Spring Boot, ASP.NET, FastAPI, REST APIs, Chart.js' },
    { k: 'Data', v: 'PostgreSQL, Supabase, MongoDB, relational design, Apache Kafka' },
    { k: 'Cloud and DevOps', v: 'Docker, Kubernetes (GKE), Red Hat OpenShift, Terraform, AWS, Microsoft Azure, Google Cloud, GitHub Actions' },
    { k: 'Testing', v: 'Jest, PyTest, pytest-mock, Cucumber (BDD), integration tests' },
    { k: 'AI', v: 'Claude API, Claude Code, Codex, multi-agent pipelines, verifying agent output' },
  ],
  beyond: 'Outside of software, I made a short film called "Le Tricheur", and I am learning sign language.',
};

export { resume };
