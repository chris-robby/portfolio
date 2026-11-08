// Generates the static site into site/. No dependencies. Usage: node build/build.mjs
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, resumes, resume, projects, moreWork, about } from './content.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ext = (href) => (/^https?:|\.pdf$/.test(href) ? ' target="_blank" rel="noopener"' : '');
const num = (i) => String(i + 1).padStart(2, '0');
const page = (slug) => `${slug}.html`;

const arrowR = (size = 18, w = 2) => `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`;
const arrowL = `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"></path><path d="m12 19-7-7 7-7"></path></svg>`;

const header = (active) => `<header class="top wrap">
  <a class="brand" href="index.html"><span class="mark">${site.initials}</span><span>${site.name}</span></a>
  <nav aria-label="Main">
    <a href="index.html#projects"${active === 'projects' ? ' class="on" aria-current="page"' : ''}>Projects</a>
    <a href="about.html"${active === 'about' ? ' class="on" aria-current="page"' : ''}>About</a>
    <a href="#contact">Contact</a>
    <a class="pill${active === 'resumes' ? ' pill-on' : ''}" href="resumes.html"${active === 'resumes' ? ' aria-current="page"' : ''}>Résumé</a>
  </nav>
</header>`;

const footer = () => `<footer class="foot" id="contact">
  <p>© 2026 ${site.name}</p>
  <div>
    <a href="${site.github}" target="_blank" rel="noopener">GitHub</a>
    <a href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
    <a href="mailto:${site.email}">Email</a>
    <a href="resumes.html">Résumés</a>
  </div>
</footer>`;

const doc = ({ title, description, active, body }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Crect width='36' height='36' rx='10' fill='%2316181D'/%3E%3Ctext x='18' y='24' font-family='sans-serif' font-size='15' font-weight='700' text-anchor='middle' fill='%23F6F5F2'%3ECT%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Space+Grotesk:wght@500;600;700&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="shell">
${header(active)}
<main id="main">
${body}
</main>
<div class="wrap">${footer()}</div>
</div>
</body>
</html>
`;

const flow = (p) => `<figure class="fig">
  <div class="flow ph">
    ${p.flow.map((stage) => `<div class="stage">${stage.map((n) => `<div class="node"><strong>${esc(n.t)}</strong><span>${esc(n.d)}</span></div>`).join('')}</div>`).join(`<div class="arrow">${arrowR(22)}</div>`)}
  </div>
  <figcaption>${esc(p.flowCaption)}</figcaption>
</figure>`;

const block = (h, inner) => `<section class="split"><h2>${h}</h2><div class="split-body">${inner}</div></section>`;

const projectPage = (p, i) => {
  const next = projects[(i + 1) % projects.length];
  const r = resume(p.resume);
  const links = [...p.links, { label: `Résumé (${r.title})`, href: r.file }];
  return doc({
    title: `${p.name} | ${site.name}`,
    description: p.summary,
    active: 'projects',
    body: `<section class="wrap intro">
  <a class="back" href="index.html#projects">${arrowL} All projects</a>
  <p class="eyebrow">${num(i)} / ${esc(p.category)}</p>
  <h1>${esc(p.name)}</h1>
  <p class="lede">${esc(p.summary)}</p>
  <dl class="meta">
    <div><dt>Role</dt><dd>${esc(p.role)}</dd></div>
    <div><dt>Stack</dt><dd>${esc(p.stack)}</dd></div>
    <div class="meta-links"><dt>Links</dt><dd>${links.map((l) => `<a href="${esc(l.href)}"${ext(l.href)}>${esc(l.label)}</a>`).join('')}</dd></div>
  </dl>
</section>
${p.hero ? `<section class="wrap hero-media"><figure class="fig"><img src="${p.hero.img}" alt="${esc(p.hero.alt)}"><figcaption>${esc(p.hero.caption)}</figcaption></figure></section>` : `<section class="wrap hero-media">${flow(p)}</section>`}
<article class="wrap case">
  ${block('The problem', `<p>${esc(p.problem)}</p>`)}
  ${block('What I built', `<p>${esc(p.built.intro)}</p><ul class="feat">${p.built.items.map((x) => `<li><span>→</span><span>${esc(x)}</span></li>`).join('')}</ul>`)}
  ${p.hero ? flow(p) : ''}
  ${block('How it works', `<p>${esc(p.how)}</p>${p.code ? `<pre><code>${esc(p.code.text)}</code></pre><p class="src">From <a href="https://github.com/chris-robby/touchgrass/blob/HEAD/${esc(p.code.source)}" target="_blank" rel="noopener">${esc(p.code.source)}</a></p>` : ''}`)}
  ${block('Outcome', `${p.metrics.length ? `<div class="metrics">${p.metrics.map((m) => `<div class="metric"><p class="v">${esc(m.v)}</p><p class="l">${esc(m.l)}</p></div>`).join('')}</div>` : ''}<p${p.metrics.length ? ' class="after"' : ''}>${esc(p.outcome)}</p>`)}
</article>
<section class="wrap closing">
  <a class="next" href="${page(next.slug)}">
    <span><span class="next-k">Next project</span><span class="next-v">${esc(next.name)}</span></span>
    ${arrowR(40, 1.75)}
  </a>
</section>`,
  });
};

const thumb = (p) => (p.thumb.img
  ? `<img src="${p.thumb.img}" alt="" loading="lazy">`
  : `<span class="thumb-text"><strong>${esc(p.thumb.big)}</strong><span>${esc(p.thumb.small)}</span></span>`);

const resumeChips = resumes.slice(0, 6).map((r) => `<a class="chip" href="${r.file}" target="_blank" rel="noopener">${esc(r.title)}</a>`).join('');

const home = doc({
  title: `${site.name} | Full stack developer in Montreal`,
  description: site.description,
  active: 'projects',
  body: `<section class="wrap home-hero">
  <p class="eyebrow">Full stack developer in Montreal. Available full time from January 2027.</p>
  <h1>I build software people actually use.</h1>
  <p class="lede">I am a Concordia Computer Science student graduating in December 2026. I run a SaaS product with real users on my own, and I built a library used by a 30+ member choir.</p>
  <div class="cta">
    <a class="btn btn-dark" href="resumes.html">View résumés ${arrowR()}</a>
    <a class="btn" href="#projects">See projects</a>
    <a class="btn" href="mailto:${site.email}">Email me</a>
  </div>
</section>
<section class="wrap" id="projects">
  <div class="sec-head"><h2>Selected projects</h2><a href="${site.github}" target="_blank" rel="noopener">All code on GitHub</a></div>
  <div class="cards">
    ${projects.map((p, i) => `<a class="card" href="${page(p.slug)}">
      <span class="thumb ph">${thumb(p)}</span>
      <span class="eyebrow small">${num(i)} / ${esc(p.category)}</span>
      <span class="card-t">${esc(p.name)}</span>
      <span class="card-d">${esc(p.summary)}</span>
      <span class="card-s">${esc(p.stack)}</span>
    </a>`).join('\n    ')}
  </div>
</section>
<section class="wrap band">
  <div class="sec-head"><h2>More work</h2></div>
  <ul class="more">
    ${moreWork.map((m) => `<li><div><h3>${esc(m.name)}</h3><p class="tags">${esc(m.tags)}</p></div><p>${esc(m.text)}</p></li>`).join('\n    ')}
  </ul>
</section>
<section class="wrap band">
  <div class="panel">
    <p class="next-k">Résumés</p>
    <h2>Pick the version that fits the role.</h2>
    <p class="panel-d">Each one opens as a PDF. There are also three versions in French.</p>
    <div class="chips">${resumeChips}</div>
    <a class="panel-link" href="resumes.html">Compare and preview all ${resumes.length} ${arrowR()}</a>
  </div>
</section>`,
});

const resumesPage = doc({
  title: `Résumés | ${site.name}`,
  description: `Nine versions of ${site.name}'s resume, in English and French, for different kinds of software roles.`,
  active: 'resumes',
  body: `<section class="wrap intro">
  <p class="eyebrow">Résumés</p>
  <h1>Pick the one closest to your role.</h1>
  <p class="lede">Each version covers the same background, ordered for a different kind of work. Open any of them as a PDF or download it.</p>
</section>
<section class="wrap res-wrap">
  <ul class="res-list">
    ${resumes.map((r, i) => `<li class="res${i === 0 ? ' sel' : ''}" data-file="${r.file}" data-title="${esc(r.title)}">
      <div class="res-top"><h2>${esc(r.title)}</h2><span class="badge">${r.lang === 'English' ? 'EN' : 'FR'}</span></div>
      <p class="res-f">${esc(r.focus)}</p>
      <p class="res-n">${esc(r.note)} ${r.pages} page${r.pages > 1 ? 's' : ''}.</p>
      <div class="res-a">
        <button type="button" class="prev-btn"${i === 0 ? ' aria-pressed="true"' : ' aria-pressed="false"'}>Preview</button>
        <a href="${r.file}" target="_blank" rel="noopener">Open PDF</a>
        <a href="${r.file}" download>Download</a>
      </div>
    </li>`).join('\n    ')}
  </ul>
  <div class="viewer" aria-label="Resume preview">
    <iframe id="pdf" src="${resumes[0].file}#view=FitH" title="Preview of ${esc(resumes[0].title)} resume" loading="lazy"></iframe>
  </div>
</section>
<script>
document.querySelectorAll('.prev-btn').forEach(function (b) {
  b.addEventListener('click', function () {
    var li = b.closest('.res'), f = document.getElementById('pdf');
    if (getComputedStyle(f.parentNode).display === 'none') { window.open(li.dataset.file, '_blank', 'noopener'); return; }
    f.src = li.dataset.file + '#view=FitH';
    f.title = 'Preview of ' + li.dataset.title + ' resume';
    document.querySelectorAll('.res').forEach(function (x) {
      x.classList.toggle('sel', x === li);
      x.querySelector('.prev-btn').setAttribute('aria-pressed', x === li);
    });
  });
});
</script>`,
});

const aboutPage = doc({
  title: `About | ${site.name}`,
  description: `About ${site.name}: education, experience and skills.`,
  active: 'about',
  body: `<section class="wrap intro">
  <p class="eyebrow">About</p>
  <h1>${site.name}</h1>
  <p class="lede">${esc(about.intro[0])}</p>
  <dl class="meta">${about.facts.map((f) => `<div><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join('')}</dl>
</section>
<article class="wrap case about">
  ${block('How I work', `<p>${esc(about.intro[1])}</p>`)}
  ${block('Experience', `<div class="xp">${about.experience.map((x) => `<div><h3>${esc(x.role)}</h3><p class="tags">${esc(x.org)}${x.when ? `, ${esc(x.when)}` : ''}</p><p>${esc(x.text)}</p></div>`).join('')}</div>`)}
  ${block('Education', `<div class="xp"><div><h3>${esc(about.education.school)}</h3><p class="tags">${esc(about.education.degree)}, ${esc(about.education.when)}</p><p>${esc(about.education.courses)}</p></div></div>`)}
  ${block('Skills', `<dl class="skills">${about.skills.map((s) => `<div><dt>${esc(s.k)}</dt><dd>${esc(s.v)}</dd></div>`).join('')}</dl>`)}
  ${block('Beyond code', `<p>${esc(about.beyond)}</p>`)}
</article>
<section class="wrap closing">
  <a class="next" href="resumes.html">
    <span><span class="next-k">Want the full detail?</span><span class="next-v">View résumés</span></span>
    ${arrowR(40, 1.75)}
  </a>
</section>`,
});

const css = `*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:#F6F5F2}
a{color:#16181D}a:hover{color:#2F5BFF}
:focus-visible{outline:2px solid #2F5BFF;outline-offset:3px;border-radius:4px}
img{display:block;max-width:100%}
.ph{background-color:#E9E7E1;background-image:repeating-linear-gradient(135deg,rgba(22,24,29,0.05) 0 1px,transparent 1px 14px)}
.shell{min-height:100vh;background:#F6F5F2;color:#16181D;font-family:Inter,system-ui,sans-serif;font-size:17px;line-height:1.65;overflow-wrap:anywhere}
.wrap{max-width:1200px;margin:0 auto;padding-left:24px;padding-right:24px}
.skip{position:absolute;left:-999px;top:8px;background:#16181D;color:#F6F5F2;padding:10px 16px;border-radius:8px;z-index:10}
.skip:focus{left:8px;color:#F6F5F2}
h1,h2,h3,.card-t,.next-v,.v{font-family:'Space Grotesk',sans-serif}

.top{padding-top:28px;padding-bottom:28px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px}
.brand{display:flex;align-items:center;gap:12px;text-decoration:none;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;color:#16181D}
.mark{width:36px;height:36px;flex:none;border-radius:10px;background:#16181D;color:#F6F5F2;display:flex;align-items:center;justify-content:center;font-size:15px}
.top nav{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
.top nav a{padding:10px 14px;text-decoration:none;font-weight:500}
.top nav a.on{font-weight:600;color:#2F5BFF}
.top nav a.pill{padding:10px 18px;border:1.5px solid #16181D;border-radius:999px;font-weight:600}
.top nav a.pill:hover{border-color:#2F5BFF}
.top nav a.pill-on{background:#16181D;color:#F6F5F2}
.top nav a.pill-on:hover{color:#F6F5F2;border-color:#16181D}

.intro{padding-top:48px}
.back{display:inline-flex;align-items:center;gap:8px;min-height:44px;font-weight:600;text-decoration:none;font-size:15px}
.eyebrow{margin:32px 0 0;font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:600;color:#2F5BFF}
.eyebrow.small{display:block;margin:20px 0 0}
h1{margin:12px 0 0;font-weight:700;font-size:clamp(44px,7vw,88px);line-height:1.02;letter-spacing:-0.03em;overflow-wrap:break-word}
.lede{margin:24px 0 0;max-width:720px;font-size:21px;color:#4F525A;line-height:1.5}
.meta{margin:48px 0 0;padding:28px 0;border-top:1.5px solid #16181D;border-bottom:1px solid #DDDAD3;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:24px}
.meta dt,.skills dt{font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#5E6068}
.meta dd{margin:6px 0 0;font-weight:500}
.meta-links dd{display:flex;flex-wrap:wrap;gap:4px 16px;font-weight:600}

.hero-media{padding-top:48px}
.fig{margin:0}
.fig img{width:100%;border-radius:24px;border:1px solid #DDDAD3}
.fig figcaption{margin-top:10px;font-size:14px;color:#5E6068}
.flow{display:flex;align-items:stretch;gap:12px;padding:32px;border-radius:24px}
.stage{flex:1 1 0;min-width:0;display:grid;gap:12px;align-content:center}
.node{padding:14px 16px;background:#FFFFFF;border:1px solid #DDDAD3;border-radius:16px;line-height:1.35}
.node strong{display:block;font-family:'Space Grotesk',sans-serif;font-size:16px}
.node span{display:block;margin-top:4px;font-size:14px;color:#5E6068}
.arrow{flex:none;display:flex;align-items:center;justify-content:center;color:#2F5BFF}

.case{padding-top:96px;display:grid;gap:80px}
.about.case{padding-top:72px}
.split{display:flex;flex-wrap:wrap;gap:24px 64px}
.split h2{flex:1 1 240px;margin:0;font-size:28px;line-height:1.2;letter-spacing:-0.01em}
.split-body{flex:3 1 480px;min-width:0;color:#3E4148}
.split-body>p{margin:0}
.split-body>p.after{margin-top:24px}
.feat{margin:20px 0 0;padding:0;list-style:none;display:grid;gap:12px;color:#16181D}
.feat li{display:flex;gap:12px}
.feat li span:first-child{color:#2F5BFF;font-weight:700}
pre{margin:24px 0 0;padding:20px 24px;border-radius:14px;background:#16181D;color:#E6E7EA;font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:14px;line-height:1.6;overflow-x:auto;overflow-wrap:normal}
.split-body>p.src{margin-top:10px;font-size:14px;color:#5E6068}
.metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,160px),1fr));gap:16px}
.metric{padding:20px;background:#FFFFFF;border:1px solid #DDDAD3;border-radius:16px}
.metric p{margin:0}
.metric .v{font-size:36px;font-weight:700;line-height:1.1;color:#16181D}
.metric .l{margin-top:6px;font-size:14px;color:#5E6068}

.closing{padding-top:112px}
.next{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:24px;padding:40px;border-radius:24px;background:#16181D;color:#F6F5F2;text-decoration:none}
.next:hover{color:#F6F5F2;background:#23262E}
.next-k{display:block;margin:0;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#A9ACB4}
.next-v{display:block;margin-top:8px;font-size:clamp(28px,4vw,44px);font-weight:700;letter-spacing:-0.02em;line-height:1.15}
.foot{margin-top:72px;margin-bottom:48px;padding-top:24px;border-top:1px solid #DDDAD3;display:flex;flex-wrap:wrap;justify-content:space-between;gap:16px;font-size:14px;color:#5E6068}
.foot p{margin:0}
.foot div{display:flex;flex-wrap:wrap;gap:20px}

.home-hero{padding-top:48px;padding-bottom:96px}
.home-hero .eyebrow{margin-top:0}
.cta{margin-top:36px;display:flex;flex-wrap:wrap;gap:12px}
.btn{display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:10px 22px;border:1.5px solid #16181D;border-radius:999px;font-weight:600;text-decoration:none}
.btn:hover{border-color:#2F5BFF}
.btn-dark{background:#16181D;color:#F6F5F2}
.btn-dark:hover{background:#2F5BFF;color:#FFFFFF}
.sec-head{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:12px;padding-bottom:20px;border-bottom:1.5px solid #16181D}
.sec-head h2{margin:0;font-size:clamp(28px,4vw,44px);line-height:1.15;letter-spacing:-0.02em}
.sec-head a{font-weight:600}
.cards{margin-top:32px;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr));gap:48px 24px}
.card{display:block;text-decoration:none;color:#16181D}
.card:hover .card-t{color:#2F5BFF}
.thumb{display:flex;align-items:center;justify-content:center;aspect-ratio:16/9;border-radius:16px;overflow:hidden;border:1px solid #DDDAD3}
.thumb img{width:100%;height:100%;object-fit:cover;object-position:top left}
.thumb-text{padding:16px;text-align:center}
.thumb-text strong{display:block;font-family:'Space Grotesk',sans-serif;font-size:clamp(30px,4vw,44px);line-height:1.1;letter-spacing:-0.02em}
.thumb-text span{display:block;margin-top:8px;font-size:15px;color:#5C5A55}
.card-t{display:block;margin-top:6px;font-size:28px;font-weight:700;line-height:1.2;letter-spacing:-0.01em}
.card-d{display:block;margin-top:8px;color:#3E4148}
.card-s{display:block;margin-top:10px;font-size:14px;color:#5E6068}
.band{padding-top:112px}
.more{margin:0;padding:0;list-style:none}
.more li{display:flex;flex-wrap:wrap;gap:8px 64px;padding:24px 0;border-bottom:1px solid #DDDAD3}
.more li>div{flex:1 1 240px}
.more li>p{flex:3 1 480px;min-width:0;margin:0;color:#3E4148}
.more h3,.xp h3{margin:0;font-size:19px;line-height:1.3}
.tags{margin:4px 0 0;font-size:14px;color:#5E6068}
.panel{padding:40px;border-radius:24px;background:#16181D;color:#F6F5F2}
.panel h2{margin:8px 0 0;font-size:clamp(28px,4vw,44px);line-height:1.15;letter-spacing:-0.02em}
.panel-d{margin:12px 0 0;color:#A9ACB4}
.chips{margin-top:28px;display:flex;flex-wrap:wrap;gap:10px}
.chip{display:inline-flex;align-items:center;min-height:44px;padding:8px 16px;border:1px solid #5E6068;border-radius:999px;color:#F6F5F2;text-decoration:none;font-weight:500;font-size:15px}
.chip:hover{background:#F6F5F2;color:#16181D;border-color:#F6F5F2}
.panel-link{display:inline-flex;align-items:center;gap:10px;margin-top:28px;min-height:44px;color:#F6F5F2;font-weight:600}
.panel-link:hover{color:#A9B9FF}
.xp{display:grid;gap:28px}
.xp p:not(.tags){margin:8px 0 0}
.skills{margin:0;display:grid;gap:18px}
.skills dd{margin:4px 0 0}

.res-wrap{padding-top:48px;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:32px;align-items:start}
.res-list{margin:0;padding:0;list-style:none;display:grid;gap:12px}
.res{padding:20px;background:#FFFFFF;border:1px solid #DDDAD3;border-radius:16px}
.res.sel{border-color:#2F5BFF;box-shadow:inset 0 0 0 1px #2F5BFF}
.res-top{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
.res h2{margin:0;font-size:20px;line-height:1.25}
.badge{flex:none;padding:2px 8px;border-radius:6px;background:#E9E7E1;font-size:12px;font-weight:600;letter-spacing:0.04em}
.res-f{margin:6px 0 0;font-size:15px;font-weight:500;line-height:1.45}
.res-n{margin:6px 0 0;font-size:14px;color:#5E6068;line-height:1.5}
.res-a{margin-top:12px;display:flex;flex-wrap:wrap;align-items:center;gap:4px 18px;font-size:15px;font-weight:600}
.res-a a,.prev-btn{min-height:32px;display:inline-flex;align-items:center}
.prev-btn{padding:0;border:0;background:none;font:inherit;color:#2F5BFF;text-decoration:underline;cursor:pointer}
.prev-btn[aria-pressed="true"]{color:#16181D;text-decoration:none}
.viewer{position:sticky;top:24px;height:calc(100vh - 48px);min-height:560px;border-radius:16px;overflow:hidden;border:1px solid #DDDAD3;background:#E9E7E1}
.viewer iframe{width:100%;height:100%;border:0;display:block}

@media (max-width:900px){
  .res-wrap{grid-template-columns:minmax(0,1fr)}
  .viewer{display:none}
  .prev-btn{display:none}
}
@media (max-width:720px){
  .flow{flex-direction:column;padding:20px}
  .stage{flex:none}
  .arrow svg{transform:rotate(90deg)}
  .case{padding-top:64px;gap:56px}
  .closing,.band{padding-top:72px}
  .home-hero{padding-bottom:64px}
  .lede{font-size:19px}
  .next,.panel{padding:28px}
  .top nav a{padding:10px}
}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
`;

writeFileSync(join(OUT, 'styles.css'), css);
writeFileSync(join(OUT, 'index.html'), home);
writeFileSync(join(OUT, 'about.html'), aboutPage);
writeFileSync(join(OUT, 'resumes.html'), resumesPage);
projects.forEach((p, i) => writeFileSync(join(OUT, page(p.slug)), projectPage(p, i)));
console.log(`Built ${projects.length + 3} pages into site/`);
