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
    slug: 'choir-library',
    name: 'Digital library for a choir',
    category: 'Real-world web app',
    thumb: { big: '30+', small: 'choir members' },
    summary: 'A shared home for a choir\'s scores and audio that also tracks every member\'s contribution, replacing manual tracking.',
    role: 'Developer',
    stack: 'Vue.js, Supabase, REST APIs',
    links: [],
    resume: 'software',
    problem: 'A choir of more than 30 members needs its music scores and audio in one place, and its organizers need to know where each member\'s contribution stands. Doing that by hand takes time and is hard to keep consistent.',
    built: {
      intro: 'A web application with one view for members and another for the people running the choir.',
      items: [
        'A member view for finding music scores and audio',
        'An admin overview, laid out like a spreadsheet, showing every member\'s contribution at once',
        'Contribution tracking for each member, replacing the manual process',
      ],
    },
    flow: [
      [{ t: 'Members view', d: 'Scores, audio, contribution' }, { t: 'Admin view', d: 'Spreadsheet-style overview' }],
      [{ t: 'REST', d: 'Between services' }],
      [{ t: 'Auth service', d: 'Who can see what' }, { t: 'Storage service', d: 'Scores and audio' }],
    ],
    flowCaption: 'Four independently deployed services that communicate over REST.',
    how: 'Instead of one application, I split the system into four services that deploy independently and communicate over REST: authentication, storage, the admin view and the members view.',
    metrics: [
      { v: '30+', l: 'members using it' },
      { v: '4', l: 'independently deployed services' },
    ],
    outcome: 'The choir saved time and gained efficiency, consistency and a stronger sense of unity. Building for people I know also meant the tool had to work for them day to day.',
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
    code: { lang: 'yaml', source: '.github/workflows/daily.yml', text: `# Rebuilds the event data and the site every morning, then deploys to GitHub Pages.
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
    slug: 'cloud-platform',
    name: 'Cloud-native microservices platform',
    category: 'DevOps and infrastructure',
    thumb: { big: 'GKE → OpenShift', small: 'same services, two platforms' },
    summary: 'Containerized microservices deployed to Google Kubernetes Engine with Terraform, then migrated to Red Hat OpenShift.',
    role: 'Developer',
    stack: 'Docker, Kubernetes, GKE, OpenShift, Terraform, GitHub Actions',
    links: [],
    resume: 'python',
    problem: 'Running services reliably takes more than getting them to start. They need repeatable infrastructure, scaling and automated delivery, and they should keep working when moved to a stricter enterprise environment.',
    built: {
      intro: 'The full path from a Dockerfile to a running, scaled deployment, on two different platforms.',
      items: [
        'Dockerfiles for each microservice',
        'Google Kubernetes Engine infrastructure defined with Terraform, with Kubernetes manifests for autoscaling and load balancing',
        'A migration to Red Hat OpenShift using Source-to-Image builds and OpenShift Routes, under enterprise security policies',
        'CI/CD with GitHub Actions and Google Artifact Registry',
      ],
    },
    flow: [
      [{ t: 'Docker', d: 'Containerized services' }],
      [{ t: 'GitHub Actions', d: 'Automated builds and deploys' }],
      [{ t: 'Artifact Registry', d: 'Google Artifact Registry' }],
      [{ t: 'GKE', d: 'Terraform, autoscaling, load balancing' }, { t: 'Red Hat OpenShift', d: 'Source-to-Image, Routes' }],
    ],
    flowCaption: 'From container to deployment on both platforms.',
    how: 'The migration was the real test. Moving to OpenShift meant adapting to enterprise security policies and replacing the delivery path with Source-to-Image builds and OpenShift Routes. When pods failed, I debugged them down to the root cause.',
    metrics: [
      { v: '2', l: 'Kubernetes platforms deployed to' },
    ],
    outcome: 'The project gave me hands-on experience with the whole path from container to production-style deployment, and with how much the target platform shapes that path.',
  },
  {
    slug: 'multi-agent-pipeline',
    name: 'Multi-agent AI pipeline',
    category: 'Applied AI',
    thumb: { big: '3 agents', small: 'researcher, executor, validator' },
    summary: 'Specialized AI agents that collaborate through graph-based orchestration, with limits that keep latency and API cost in check.',
    role: 'Developer',
    stack: 'Graph-based orchestration, function calling, schema validation',
    links: [],
    resume: 'ai',
    problem: 'A single chain of LLM calls is rigid and fragile: one bad output affects everything after it, and an unchecked retry loop can run up latency and API costs.',
    built: {
      intro: 'A pipeline where specialized agents collaborate dynamically in a graph instead of following a fixed sequence.',
      items: [
        'Researcher, executor and validator agents, each with a defined job',
        'Function calling so agents can query external tools',
        'Outputs validated against schemas, with self-correction when they fail',
        'Asynchronous execution of tasks that do not depend on each other',
      ],
    },
    flow: [
      [{ t: 'Researcher', d: 'Gathers information' }, { t: 'Executor', d: 'Does the work' }, { t: 'Validator', d: 'Checks against schemas' }],
      [{ t: 'Strict shared state', d: 'Graph orchestration, loop limits' }],
      [{ t: 'External tools', d: 'Through function calling' }],
    ],
    flowCaption: 'Agents coordinate through managed state and reach tools through function calling.',
    how: 'The key decisions were about control. Strict state management keeps the agents consistent with each other, and hard loop limits stop self-correction from turning into runaway latency or API spend.',
    metrics: [
      { v: '3', l: 'specialized agent roles' },
    ],
    outcome: 'The project taught me to treat autonomy as something to design limits for. Validation and loop limits are what make an agent system dependable.',
  },
  {
    slug: 'banking-app',
    name: 'Banking web application',
    category: 'Full stack',
    thumb: { big: 'Java + React', small: 'REST API, database, tests' },
    summary: 'A full stack banking application with a Spring Boot REST API, a relational database and a React front end.',
    role: 'Developer',
    stack: 'Java, Spring Boot, React, SQL',
    links: [],
    resume: 'fullstack',
    problem: 'Banking data leaves little room for error. The API has to reject invalid input and handle failures predictably.',
    built: {
      intro: 'A complete application, from database to interface.',
      items: [
        'A REST API with CRUD operations and deliberate endpoint design',
        'Data validation and exception handling across the API',
        'Database integration behind the API',
        'A React front end connected through the REST API',
      ],
    },
    flow: [
      [{ t: 'React', d: 'Front end' }],
      [{ t: 'Spring Boot REST API', d: 'Validation, exception handling' }],
      [{ t: 'Relational database', d: 'Transactions, balances, user data' }],
    ],
    flowCaption: 'A layered application with a clear API boundary.',
    how: 'Spring dependency injection keeps the code modular and testable, which made it practical to cover the application with both unit and integration tests.',
    metrics: [],
    outcome: 'This project gave me practice with every layer of a typical back end, and with designing an API around the failures it has to handle, as well as the normal path.',
  },
];

export const moreWork = [
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
