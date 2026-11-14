/* =========================================================
   App logic
   Web Dev: Zero to Grandmaster - by Aadarsh Joshi
   ========================================================= */

const app = document.getElementById("app");
const toastsEl = document.getElementById("toasts");
const confettiLayer = document.getElementById("confetti-layer");
const confettiCanvas = document.getElementById("confetti-canvas");
const topXpEl = document.getElementById("top-xp");
const topStreakEl = document.getElementById("top-streak");
const mainNav = document.getElementById("main-nav");
const menuBtn = document.getElementById("menu-btn");

const DEFAULT_STATE = {
  version: 1,
  studentName: "",
  xp: 0,
  completedLessons: {},
  quizScores: {},
  bosses: {},
  exam: { passed: false, score: 0, total: 0, date: null, attempts: 0, bestScore: 0 },
  badges: [],
  streak: { count: 0, lastDate: null },
  snippets: [],
  downloadedSamples: [],
  settings: { sound: true, motion: true, guide: true },
  certificate: { code: null, date: null, name: "", score: 0 }
};

let state = loadState();
let currentRoute = "home";
let confettiPieces = [];
let confettiRunning = false;
let playgroundIframe = null;
let guideTargetEl = null;

/* ----------------------------- State helpers ----------------------------- */

function loadState() {
  try {
    const raw = localStorage.getItem("wd-grandmaster-state");
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    return mergeState(structuredClone(DEFAULT_STATE), parsed);
  } catch (e) {
    return structuredClone(DEFAULT_STATE);
  }
}

function mergeState(base, incoming) {
  if (!incoming || typeof incoming !== "object") return base;
  for (const key of Object.keys(incoming)) {
    if (incoming[key] && typeof incoming[key] === "object" && !Array.isArray(incoming[key]) && base[key] && typeof base[key] === "object" && !Array.isArray(base[key])) {
      mergeState(base[key], incoming[key]);
    } else {
      base[key] = incoming[key];
    }
  }
  return base;
}

function saveState() {
  try { localStorage.setItem("wd-grandmaster-state", JSON.stringify(state)); } catch (e) {}
}

function findWorld(id) { return COURSE.worlds.find(w => w.id === id); }
function findLesson(id) {
  for (const w of COURSE.worlds) {
    const l = w.lessons.find(x => x.id === id);
    if (l) return { world: w, lesson: l };
  }
  return null;
}

function isWorldUnlocked(world) {
  if (world.num === 1) return true;
  const prev = COURSE.worlds.find(w => w.num === world.num - 1);
  return !!prev && !!state.bosses[prev.id] && state.bosses[prev.id].passed;
}

function worldLessonsComplete(worldId) {
  const w = findWorld(worldId);
  return w.lessons.every(l => state.completedLessons[l.id]);
}

function worldComplete(worldId) {
  return worldLessonsComplete(worldId) && !!(state.bosses[worldId] && state.bosses[worldId].passed);
}

function totalLessons() { return COURSE.worlds.reduce((n, w) => n + w.lessons.length, 0); }
function completedLessonCount() { return Object.keys(state.completedLessons).length; }

function getNextLesson() {
  for (const w of COURSE.worlds) {
    if (!isWorldUnlocked(w)) break;
    for (const l of w.lessons) {
      if (!state.completedLessons[l.id]) return { world: w, lesson: l };
    }
  }
  return null;
}

function adjacentLessons(worldId, lessonId) {
  const w = findWorld(worldId);
  const idx = w.lessons.findIndex(l => l.id === lessonId);
  if (idx > 0) return { prev: { world: w, lesson: w.lessons[idx - 1] }, next: idx < w.lessons.length - 1 ? { world: w, lesson: w.lessons[idx + 1] } : null };
  // first lesson: prev could be last lesson of previous world
  const prevWorld = COURSE.worlds.find(x => x.num === w.num - 1);
  const prev = prevWorld ? { world: prevWorld, lesson: prevWorld.lessons[prevWorld.lessons.length - 1] } : null;
  const next = idx < w.lessons.length - 1 ? { world: w, lesson: w.lessons[idx + 1] } : (COURSE.worlds.find(x => x.num === w.num + 1) ? { world: COURSE.worlds.find(x => x.num === w.num + 1), lesson: COURSE.worlds.find(x => x.num === w.num + 1).lessons[0] } : null);
  return { prev, next };
}

/* ----------------------------- Utilities ----------------------------- */

function esc(v) {
  return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function attr(v) { return esc(v); }
function formatText(text) {
  let s = esc(text);
  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
  s = s.replace(/\n/g, "<br>");
  return s;
}
function money(n) { return Number(n).toFixed(2); }

const RANKS = [
  { xp: 0, name: "Newbie" },
  { xp: 80, name: "Explorer" },
  { xp: 180, name: "Maker" },
  { xp: 300, name: "Styler" },
  { xp: 450, name: "Coder" },
  { xp: 620, name: "Debugger" },
  { xp: 800, name: "Architect" },
  { xp: 980, name: "Wizard" },
  { xp: 1180, name: "Legend" },
  { xp: 1500, name: "Grandmaster" }
];
function rankFor(xp) {
  let r = RANKS[0];
  for (const rank of RANKS) if (xp >= rank.xp) r = rank; else break;
  return r;
}
function nextRank(xp) {
  for (const rank of RANKS) if (xp < rank.xp) return rank;
  return null;
}

function toast(title, body, type) {
  type = type || "good";
  const el = document.createElement("div");
  el.className = "toast " + type;
  el.innerHTML = `<div class="t-icon">${type === "bad" ? "!" : type === "good" ? "+" : "i"}</div><div><strong>${esc(title)}</strong><span>${esc(body)}</span></div>`;
  toastsEl.appendChild(el);
  setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 200); }, 3200);
}

function playSound(kind) {
  if (!state.settings.sound) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    const now = ctx.currentTime;
    if (kind === "success") { o.frequency.setValueAtTime(523, now); o.frequency.exponentialRampToValueAtTime(784, now + 0.12); }
    else if (kind === "badge") { o.frequency.setValueAtTime(659, now); o.frequency.exponentialRampToValueAtTime(988, now + 0.18); }
    else if (kind === "error") { o.frequency.setValueAtTime(220, now); o.frequency.exponentialRampToValueAtTime(160, now + 0.18); }
    else { o.frequency.setValueAtTime(440, now); }
    g.gain.setValueAtTime(0.08, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    o.start(now); o.stop(now + 0.22);
  } catch (e) {}
}

function confettiBurst(count) {
  if (!state.settings.motion) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  confettiLayer.classList.add("on");
  const ctx = confettiCanvas.getContext("2d");
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  const colors = ["#ff6b57", "#ffd166", "#1fb9a6", "#5b8cff", "#9b7bff", "#ff8fbf", "#79c267", "#e8ae2e"];
  confettiPieces = [];
  for (let i = 0; i < (count || 120); i++) {
    confettiPieces.push({
      x: Math.random() * confettiCanvas.width,
      y: -20 - Math.random() * 120,
      vx: -2 + Math.random() * 4,
      vy: 2 + Math.random() * 4,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI,
      vr: -0.1 + Math.random() * 0.2,
      life: 0
    });
  }
  if (!confettiRunning) {
    confettiRunning = true;
    requestAnimationFrame(confettiTick);
  }
  setTimeout(() => { confettiLayer.classList.remove("on"); confettiPieces = []; confettiRunning = false; }, 2600);
}
function confettiTick() {
  if (!confettiPieces.length) return;
  const ctx = confettiCanvas.getContext("2d");
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.rot += p.vr; p.life++;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();
  });
  confettiPieces = confettiPieces.filter(p => p.y < confettiCanvas.height + 40);
  if (confettiPieces.length) requestAnimationFrame(confettiTick);
}

function addXP(amount, reason) {
  state.xp += amount;
  saveState();
  updateTopStats();
  toast("+" + amount + " XP", reason, "good");
  playSound("success");
  checkBadges(false);
}

function completeLesson(lessonId) {
  if (state.completedLessons[lessonId]) return false;
  const found = findLesson(lessonId);
  if (!found) return false;
  state.completedLessons[lessonId] = true;
  saveState();
  addXP(found.lesson.xp, "Mission complete: " + found.lesson.title);
  return true;
}

function completeBoss(worldId, score, total) {
  const passed = total > 0 && score / total >= 2 / 3;
  const prev = state.bosses[worldId] || {};
  state.bosses[worldId] = {
    score: score, total: total, passed: passed,
    attempts: (prev.attempts || 0) + 1,
    date: new Date().toISOString()
  };
  if (passed && !prev.passed) {
    addXP(50, "Boss defeated: " + findWorld(worldId).title);
    confettiBurst(160);
  }
  saveState();
  checkBadges(false);
  return passed;
}

function completeExam(score, total) {
  const passed = total > 0 && score / total >= 0.8;
  state.exam.attempts = (state.exam.attempts || 0) + 1;
  state.exam.lastScore = score;
  state.exam.bestScore = Math.max(state.exam.bestScore || 0, score);
  if (passed) {
    state.exam.passed = true;
    state.exam.score = score;
    state.exam.total = total;
    state.exam.date = new Date().toISOString();
    if (!state.certificate.code) {
      state.certificate.code = makeCertCode(state.studentName || "Student");
      state.certificate.date = state.exam.date;
      state.certificate.name = state.studentName || "Student";
      state.certificate.score = score / total;
    }
    if (!state.badges.includes("graduate")) {
      addXP(200, "Grandmaster exam passed");
    } else {
      state.xp += 0;
    }
    confettiBurst(220);
  }
  saveState();
  checkBadges(false);
  return passed;
}

function makeCertCode(name) {
  const base = (name || "Student").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8) || "STUDENT";
  const d = new Date();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return "AJ-WD-" + d.getFullYear() + "-" + base + "-" + rand;
}

const BADGES = [
  { id: "first-step", name: "First Step", desc: "Finish your first mission.", test: s => Object.keys(s.completedLessons).length >= 1 },
  { id: "html-hero", name: "HTML Hero", desc: "Conquer HTML Island.", test: s => !!s.bosses["html-island"] && s.bosses["html-island"].passed },
  { id: "css-champ", name: "CSS Champion", desc: "Conquer CSS Cove.", test: s => !!s.bosses["css-cove"] && s.bosses["css-cove"].passed },
  { id: "layout-legend", name: "Layout Legend", desc: "Conquer Layout Lagoon.", test: s => !!s.bosses["layout-lagoon"] && s.bosses["layout-lagoon"].passed },
  { id: "logic-lord", name: "Logic Lord", desc: "Conquer JS Jungle.", test: s => !!s.bosses["js-jungle"] && s.bosses["js-jungle"].passed },
  { id: "function-forger", name: "Function Forger", desc: "Conquer Function Factory.", test: s => !!s.bosses["function-factory"] && s.bosses["function-factory"].passed },
  { id: "dom-driver", name: "DOM Driver", desc: "Conquer DOM Dungeon.", test: s => !!s.bosses["dom-dungeon"] && s.bosses["dom-dungeon"].passed },
  { id: "data-dealer", name: "Data Dealer", desc: "Conquer Data Desert.", test: s => !!s.bosses["data-desert"] && s.bosses["data-desert"].passed },
  { id: "memory-keeper", name: "Memory Keeper", desc: "Conquer Browser Basecamp.", test: s => !!s.bosses["browser-basecamp"] && s.bosses["browser-basecamp"].passed },
  { id: "web-wizard", name: "Web Wizard", desc: "Conquer Web Wizardry.", test: s => !!s.bosses["web-wizardry"] && s.bosses["web-wizardry"].passed },
  { id: "peak-climber", name: "Peak Climber", desc: "Conquer Grandmaster Peak.", test: s => !!s.bosses["grandmaster-peak"] && s.bosses["grandmaster-peak"].passed },
  { id: "streak-3", name: "On a Roll", desc: "Learn 3 days in a row.", test: s => (s.streak.count || 0) >= 3 },
  { id: "streak-7", name: "Week Warrior", desc: "Learn 7 days in a row.", test: s => (s.streak.count || 0) >= 7 },
  { id: "perfect-5", name: "Sharpshooter", desc: "Get 5 perfect quiz scores.", test: s => Object.values(s.quizScores).filter(x => x && x.score === x.total).length >= 5 },
  { id: "builder", name: "Builder", desc: "Save a playground project or download a sample.", test: s => (s.snippets || []).length >= 1 || (s.downloadedSamples || []).length >= 1 },
  { id: "graduate", name: "Grandmaster", desc: "Pass the final exam.", test: s => !!s.exam.passed }
];

function checkBadges(silent) {
  let changed = false;
  for (const b of BADGES) {
    if (!state.badges.includes(b.id) && b.test(state)) {
      state.badges.push(b.id);
      changed = true;
      if (!silent) {
        toast("Badge earned!", b.name, "good");
        playSound("badge");
      }
    }
  }
  if (changed) saveState();
}

function touchStreak() {
  const today = new Date().toISOString().slice(0, 10);
  if (state.streak.lastDate === today) return;
  const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (state.streak.lastDate === y) state.streak.count = (state.streak.count || 0) + 1;
  else state.streak.count = 1;
  state.streak.lastDate = today;
  saveState();
}

/* ----------------------------- Top stats ----------------------------- */

function updateTopStats() {
  topXpEl.textContent = state.xp;
  topStreakEl.textContent = state.streak.count || 0;
}

function updateNavActive() {
  const map = { home: "home", learn: "learn", world: "learn", lesson: "learn", boss: "learn", playground: "playground", samples: "samples", sample: "samples", exam: "exam", certificate: "certificate", achievements: "achievements", settings: "settings", about: "about" };
  const active = map[currentRoute] || "";
  document.querySelectorAll(".main-nav a").forEach(a => {
    const nav = a.dataset.nav;
    a.classList.toggle("active", nav === active || (active === "achievements" && nav === "learn"));
  });
}

/* ----------------------------- Routing ----------------------------- */

function parseHash() {
  const h = (location.hash || "#/home").replace(/^#/, "");
  const parts = h.split("/").filter(Boolean);
  if (parts.length === 0) return { route: "home", params: [] };
  return { route: parts[0], params: parts.slice(1) };
}

function navigate(hash) {
  if (location.hash === hash) handleRoute();
  else location.hash = hash;
}

function handleRoute() {
  const { route, params } = parseHash();
  currentRoute = route;
  const views = {
    home: renderHome,
    learn: renderLearn,
    world: () => renderWorld(params[0]),
    lesson: () => renderLesson(params[0], params[1]),
    boss: () => renderBoss(params[0]),
    playground: renderPlayground,
    samples: renderSamples,
    sample: () => renderSampleDetail(params[0]),
    exam: renderExam,
    certificate: renderCertificate,
    achievements: renderAchievements,
    settings: renderSettings,
    about: renderAbout
  };
  const fn = views[route] || renderHome;
  fn();
  // close mobile nav
  mainNav.classList.remove("open");
  document.body.classList.remove("nav-open");
}

function mount(html, init) {
  app.innerHTML = html;
  window.scrollTo(0, 0);
  app.focus();
  updateTopStats();
  updateNavActive();
  if (init) init();
  updateGuide(currentRoute);
}

/* ----------------------------- Home ----------------------------- */

function renderHome() {
  const next = getNextLesson();
  const lessonsDone = completedLessonCount();
  const total = totalLessons();
  const pct = total ? Math.round((lessonsDone / total) * 100) : 0;
  const rank = rankFor(state.xp);
  const nr = nextRank(state.xp);
  const worldsDone = COURSE.worlds.filter(w => worldComplete(w.id)).length;
  const recentBadges = BADGES.filter(b => state.badges.includes(b.id)).slice(-6).reverse();

  mount(`
    <div class="page">
      <div class="wrap">
        <section class="hero">
          <div>
            <div class="eyebrow">Course by Aadarsh Joshi</div>
            <h1>Build the web,<br><span class="accent">one mission at a time.</span></h1>
            <p class="hero-sub">A friendly, hands-on journey from your first HTML tag to a real deployed website. Learn by doing, save your progress, and earn a certificate at the end.</p>
            <div class="hero-actions">
              <a href="#/learn" class="btn primary" id="start-learning">${lessonsDone === 0 ? "Start learning" : "Continue learning"}</a>
              <a href="#/playground" class="btn ghost">Open playground</a>
              <a href="#/samples" class="btn ghost">See sample sites</a>
            </div>
            <div class="hero-meta">
              <span><i></i> ${COURSE.worlds.length} worlds</span>
              <span><i></i> ${total} missions</span>
              <span><i></i> 6 sample sites</span>
              <span><i></i> 1 certificate</span>
            </div>
          </div>
          <div class="hero-panel">
            <div class="panel-top">
              <strong>Your progress</strong>
              <span>Rank: ${rank.name}</span>
            </div>
            <div class="ring-wrap">
              <svg class="ring" viewBox="0 0 120 120" aria-hidden="true">
                <circle class="track" cx="60" cy="60" r="52"></circle>
                <circle class="value" id="home-ring" cx="60" cy="60" r="52"></circle>
              </svg>
              <div class="ring-text">
                <strong>${pct}%</strong>
                <span>Complete</span>
                <small>${lessonsDone} of ${total} missions</small>
              </div>
            </div>
            <div class="divider"></div>
            <div class="next-up">
              <div class="mini-num">${next ? next.world.num : "✓"}</div>
              <div>
                <strong>${next ? next.lesson.title : "All missions complete!"}</strong>
                <span>${next ? next.world.title + " - " + next.lesson.minutes + " min" : "Take the final exam for your certificate."}</span>
              </div>
            </div>
            <div class="divider"></div>
            <div style="display:flex;justify-content:space-between;align-items:baseline;">
              <span style="font-size:0.72rem;text-transform:uppercase;letter-spacing:0.1em;color:#b9c5da;font-weight:800;">XP</span>
              <strong style="font-size:1.3rem;">${state.xp} / 1500</strong>
            </div>
            <div class="progress" style="margin-top:8px;"><span style="width:${Math.min(100, Math.round(state.xp / 1500 * 100))}%"></span></div>
            <small style="color:#b9c5da;display:block;margin-top:6px;">${nr ? "Next rank: " + nr.name + " at " + nr.xp + " XP" : "Max rank reached"}</small>
          </div>
        </section>

        <div class="quick-stats">
          <div class="qstat"><div class="qnum">${lessonsDone}</div><div class="qlabel">Missions done</div></div>
          <div class="qstat"><div class="qnum">${worldsDone}</div><div class="qlabel">Worlds cleared</div></div>
          <div class="qstat"><div class="qnum">${state.badges.length}</div><div class="qlabel">Badges earned</div></div>
          <div class="qstat"><div class="qnum">${state.streak.count || 0}</div><div class="qlabel">Day streak</div></div>
        </div>

        ${lessonsDone > 0 ? `
        <div class="resume-banner">
          <div class="rb-copy">
            <div class="rb-badge">${next ? next.world.num : "✓"}</div>
            <div>
              <h3>${next ? "Resume: " + next.lesson.title : "All done - take the exam"}</h3>
              <p>${next ? next.world.title + " - about " + next.lesson.minutes + " minutes" : "You have completed every mission."}</p>
            </div>
          </div>
          <a href="${next ? "#/lesson/" + next.world.id + "/" + next.lesson.id : "#/exam"}" class="btn primary">${next ? "Continue" : "Take exam"}</a>
        </div>` : ""}

        <section class="section">
          <div class="section-head">
            <div>
              <div class="eyebrow">How it works</div>
              <h2>Three steps to grandmaster</h2>
            </div>
          </div>
          <div class="how-grid">
            <div class="card how-card">
              <div class="how-num">1</div>
              <h3>Learn</h3>
              <p>Short missions explain one idea at a time. Read, look at the live example, then try it yourself in the playground.</p>
            </div>
            <div class="card how-card">
              <div class="how-num">2</div>
              <h3>Build</h3>
              <p>Six sample sites and a full playground let you experiment safely. Break things, fix them, and learn why.</p>
            </div>
            <div class="card how-card">
              <div class="how-num">3</div>
              <h3>Prove</h3>
              <p>Pass world bosses, a final exam, and earn a certificate signed by Aadarsh Joshi.</p>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-head">
            <div>
              <div class="eyebrow">Your journey</div>
              <h2>World map</h2>
            </div>
            <a href="#/learn" class="btn ghost small">View all worlds</a>
          </div>
          <div class="world-grid">
            ${COURSE.worlds.map(w => worldCardHtml(w, true)).join("")}
          </div>
        </section>

        ${recentBadges.length ? `
        <section class="section">
          <div class="section-head">
            <div><div class="eyebrow">Recent badges</div><h2>Badges</h2></div>
            <a href="#/achievements" class="btn ghost small">View all</a>
          </div>
          <div class="badge-grid">
            ${recentBadges.map(b => badgeHtml(b, true)).join("")}
          </div>
        </section>` : ""}
      </div>
    </div>
  `);

  // ring animation
  const ring = document.getElementById("home-ring");
  if (ring) {
    const c = 2 * Math.PI * 52;
    ring.style.strokeDasharray = c;
    ring.style.strokeDashoffset = c * (1 - pct / 100);
  }
}

function worldCardHtml(w, mini) {
  const unlocked = isWorldUnlocked(w);
  const lessonsDone = w.lessons.filter(l => state.completedLessons[l.id]).length;
  const pct = Math.round((lessonsDone / w.lessons.length) * 100);
  const bossPassed = !!(state.bosses[w.id] && state.bosses[w.id].passed);
  const current = isWorldUnlocked(w) && !worldComplete(w.id) && (w.num === 1 || COURSE.worlds.find(x => x.num === w.num - 1 && state.bosses[x.id] && state.bosses[x.id].passed));
  const classes = ["world-card"];
  if (mini) classes.push("mini");
  if (!unlocked) classes.push("locked");
  if (current) classes.push("current");
  const inner = `
    <div class="world-top" style="background:${w.color}">
      <span class="world-num">World ${w.num}</span>
      <h3>${esc(w.title)}</h3>
    </div>
    <div class="world-body">
      <p>${esc(w.tagline)}</p>
      <div class="world-meta">
        <span>${lessonsDone}/${w.lessons.length} missions</span>
        <span>${bossPassed ? "Boss cleared" : unlocked ? "Unlocked" : "Locked"}</span>
      </div>
      <div class="world-bar"><span style="width:${pct}%;background:${w.color}"></span></div>
    </div>
  `;
  if (!unlocked) return `<div class="${classes.join(" ")}" style="--world:${w.color}">${inner}<div class="lock-note" style="position:absolute;bottom:12px;right:14px;">Locked</div></div>`;
  return `<a class="${classes.join(" ")}" style="--world:${w.color}" href="#/world/${w.id}">${inner}</a>`;
}

function badgeHtml(b, small) {
  const earned = state.badges.includes(b.id);
  return `<div class="badge-card ${earned ? "" : "locked"}">
    <div class="badge-icon">${earned ? "OK" : "?"}</div>
    <div>
      <h4>${esc(b.name)}</h4>
      <p>${esc(b.desc)}</p>
    </div>
  </div>`;
}

/* ----------------------------- Learn ----------------------------- */

function renderLearn() {
  const lessonsDone = completedLessonCount();
  const total = totalLessons();
  const pct = total ? Math.round((lessonsDone / total) * 100) : 0;
  mount(`
    <div class="page">
      <div class="wrap">
        <div class="learn-head">
          <div>
            <div class="eyebrow">Course map</div>
            <h1>Choose your next world</h1>
            <p>Worlds unlock in order. Finish every mission in a world, then defeat its boss to open the next one. Your progress saves automatically.</p>
          </div>
          <div class="card learn-progress-card">
            <div class="lp-row"><strong>${lessonsDone}</strong><span>Missions done</span></div>
            <div class="progress"><span style="width:${pct}%"></span></div>
            <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:0.78rem;color:var(--ink-3);font-weight:700;">
              <span>${COURSE.worlds.filter(w => worldComplete(w.id)).length} worlds cleared</span>
              <span>${state.xp} XP</span>
            </div>
          </div>
        </div>
        <div class="world-grid">
          ${COURSE.worlds.map(w => worldCardHtml(w, false)).join("")}
        </div>
        <div class="legend">
          <span><i style="background:var(--teal)"></i> Unlocked</span>
          <span><i style="background:#d9d4c8"></i> Locked</span>
          <span><i style="background:var(--yellow)"></i> Current</span>
        </div>
      </div>
    </div>
  `);
}

function renderWorld(id) {
  const w = findWorld(id);
  if (!w) { navigate("#/learn"); return; }
  if (!isWorldUnlocked(w)) {
    mount(`
      <div class="page"><div class="wrap">
        <div class="empty">
          <h2>This world is locked</h2>
          <p>Finish the previous world and defeat its boss to unlock ${esc(w.title)}.</p>
          <a href="#/learn" class="btn primary" style="margin-top:12px;">Back to course map</a>
        </div>
      </div></div>
    `);
    return;
  }
  const lessonsDone = w.lessons.filter(l => state.completedLessons[l.id]).length;
  const pct = Math.round((lessonsDone / w.lessons.length) * 100);
  const boss = state.bosses[w.id];
  mount(`
    <div class="page">
      <div class="wrap">
        <div class="crumbs">
          <a href="#/learn">Course</a><span class="sep">/</span><span>${esc(w.title)}</span>
        </div>
        <div class="lesson-head-card" style="--world:${w.color}">
          <div class="lh-band"></div>
          <div class="lh-inner">
            <div class="lh-meta">
              <span class="pill" style="background:${w.color};border-color:var(--ink);color:var(--ink);">World ${w.num}</span>
              <span class="pill">${w.lessons.length} missions</span>
              <span class="pill">${boss && boss.passed ? "Boss cleared" : "Boss locked"}</span>
            </div>
            <h1>${esc(w.title)}</h1>
            <p class="lesson-goal"><strong>${esc(w.tagline)}</strong> ${esc(w.intro)}</p>
            <div class="progress" style="margin-top:14px;"><span style="width:${pct}%"></span></div>
            <small class="muted">${lessonsDone} of ${w.lessons.length} missions complete</small>
          </div>
        </div>

        <div class="grid" style="grid-template-columns:1fr;gap:12px;">
          ${w.lessons.map((l, i) => {
            const done = !!state.completedLessons[l.id];
            const qs = state.quizScores[l.id];
            return `
            <a href="#/lesson/${w.id}/${l.id}" class="card" style="padding:16px 18px;display:flex;align-items:center;gap:14px;text-decoration:none;color:inherit;">
              <div style="width:40px;height:40px;border-radius:12px;border:2px solid var(--ink);background:${done ? w.color : "var(--paper-3)"};display:grid;place-items:center;font-weight:800;flex:0 0 auto;">${done ? "✓" : i + 1}</div>
              <div style="flex:1;min-width:0;">
                <h3 style="margin:0 0 2px;font-size:1.05rem;">${esc(l.title)}</h3>
                <p class="muted" style="margin:0;font-size:0.82rem;">${esc(l.goal)}</p>
              </div>
              <div style="text-align:right;font-size:0.75rem;font-weight:800;color:var(--ink-3);">
                <div>${l.minutes} min</div>
                <div>${l.xp} XP</div>
                ${qs ? `<div style="color:${qs.score === qs.total ? "var(--success)" : "var(--ink-3)"};">Quiz ${qs.score}/${qs.total}</div>` : ""}
              </div>
            </a>`;
          }).join("")}
        </div>

        <div class="card" style="margin-top:22px;padding:20px 22px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
          <div>
            <h3 style="margin:0 0 4px;">World boss: ${esc(w.boss.title)}</h3>
            <p class="muted" style="margin:0;font-size:0.85rem;">${esc(w.boss.intro)}</p>
            ${boss ? `<p style="margin:6px 0 0;font-size:0.82rem;font-weight:700;color:${boss.passed ? "var(--success)" : "var(--danger)"};">Last attempt: ${boss.score}/${boss.total} ${boss.passed ? "- Passed" : "- Try again"}</p>` : ""}
          </div>
          <a href="#/boss/${w.id}" class="btn ${worldLessonsComplete(w.id) ? "primary" : "ghost"}" ${worldLessonsComplete(w.id) ? "" : "aria-disabled='true' onclick='return false;'"}>${worldLessonsComplete(w.id) ? "Fight boss" : "Finish missions first"}</a>
        </div>
      </div>
    </div>
  `);
}

/* ----------------------------- Lesson ----------------------------- */

function renderLesson(worldId, lessonId) {
  const found = findLesson(lessonId);
  if (!found || found.world.id !== worldId) { navigate("#/learn"); return; }
  const w = found.world;
  const l = found.lesson;
  if (!isWorldUnlocked(w)) { navigate("#/world/" + w.id); return; }

  const done = !!state.completedLessons[l.id];
  const adj = adjacentLessons(w.id, l.id);
  const quizId = "quiz-" + l.id;

  mount(`
    <div class="page">
      <div class="wrap">
        <div class="crumbs">
          <a href="#/learn">Course</a><span class="sep">/</span>
          <a href="#/world/${w.id}">${esc(w.title)}</a><span class="sep">/</span>
          <span>${esc(l.title)}</span>
        </div>

        <div class="lesson-layout">
          <div class="lesson-main">
            <div class="lesson-head-card" style="--world:${w.color}">
              <div class="lh-band"></div>
              <div class="lh-inner">
                <div class="lh-meta">
                  <span class="pill" style="background:${w.color};border-color:var(--ink);color:var(--ink);">World ${w.num}</span>
                  <span class="pill">${l.minutes} min</span>
                  <span class="pill">${l.xp} XP</span>
                  ${done ? '<span class="pill green">Completed</span>' : ""}
                </div>
                <h1>${esc(l.title)}</h1>
                <p class="lesson-goal"><strong>Goal:</strong> ${esc(l.goal)}</p>
              </div>
            </div>

            <div class="lesson-body">
              ${l.sections.map(s => `
                <div class="card content-card">
                  <h2>${esc(s.h)}</h2>
                  <p class="lead">${formatText(s.p)}</p>
                  ${s.code ? codeBlockHtml(s.code) : ""}
                </div>
              `).join("")}

              ${l.demo ? demoBoxHtml(l.demo, l.id) : ""}

              <div class="challenge-card">
                <div class="ch-head">
                  <h3>Your turn</h3>
                  <span class="pill yellow">Challenge</span>
                </div>
                <div class="ch-body">
                  <p>${esc(l.challenge.text)}</p>
                  <ul class="ch-checks">
                    ${l.challenge.steps.map(step => `<li>${esc(step)}</li>`).join("")}
                  </ul>
                  <div class="btn-row">
                    <button class="btn primary small" data-action="open-playground" data-lesson="${l.id}">Open in playground</button>
                    <button class="btn ghost small" data-action="copy-challenge" data-lesson="${l.id}">Copy starter code</button>
                  </div>
                </div>
              </div>

              <div class="quiz-card" id="${quizId}">
                <h3><span class="qmark">?</span>Quick check</h3>
                <p class="quiz-q">${esc(l.quiz.q)}</p>
                <div class="quiz-options">
                  ${l.quiz.options.map((opt, i) => `
                    <button class="quiz-option" data-quiz="${l.id}" data-index="${i}">
                      <span class="ol">${String.fromCharCode(65 + i)}</span>
                      <span>${esc(opt)}</span>
                    </button>
                  `).join("")}
                </div>
                <div class="quiz-feedback" id="qfb-${l.id}" style="display:none;"></div>
                ${done ? `<div style="margin-top:12px;"><button class="btn primary" data-action="complete-lesson" data-lesson="${l.id}">Mark complete again</button></div>` : `<div style="margin-top:12px;"><button class="btn primary" id="complete-btn-${l.id}" style="display:none;" data-action="complete-lesson" data-lesson="${l.id}">Complete mission</button></div>`}
              </div>
            </div>

            <div class="lesson-nav">
              ${adj.prev ? `<a href="#/lesson/${adj.prev.world.id}/${adj.prev.lesson.id}" class="btn ghost"><small>Previous</small>${esc(adj.prev.lesson.title)}</a>` : `<span></span>`}
              ${adj.next ? `<a href="#/lesson/${adj.next.world.id}/${adj.next.lesson.id}" class="btn primary"><small>Next</small>${esc(adj.next.lesson.title)}</a>` : `<a href="#/world/${w.id}" class="btn primary"><small>World</small>Back to ${esc(w.title)}</a>`}
            </div>
          </div>

          <aside class="lesson-aside">
            <div class="card aside-card">
              <h3>Missions in this world</h3>
              <ul class="aside-list">
                ${w.lessons.map((x, i) => `
                  <li>
                    <a href="#/lesson/${w.id}/${x.id}" class="${x.id === l.id ? "current" : ""}">
                      <span class="a-num">${i + 1}</span>
                      <span>${esc(x.title)}</span>
                      ${state.completedLessons[x.id] ? '<span class="a-check">✓</span>' : ""}
                    </a>
                  </li>
                `).join("")}
              </ul>
            </div>
            <div class="card aside-card">
              <h3>Tips</h3>
              <p class="muted" style="font-size:0.82rem;margin:0;">Press Run in the live example. Change one thing at a time and watch what happens. Mistakes are how you learn.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `, () => {
    initLessonInteractions(w, l, quizId);
  });
}

function codeBlockHtml(code) {
  return `
    <div class="code-block">
      <div class="code-head">
        <span class="code-lang">${esc(code.lang || "code")}</span>
        <button class="copy-btn" data-copy-code>Copy</button>
      </div>
      <pre><code>${esc(code.text)}</code></pre>
    </div>
  `;
}

function demoBoxHtml(demo, id) {
  const src = srcdocOf(demo);
  const files = ["html", "css", "js"].filter(k => demo[k] && demo[k].trim());
  return `
    <div class="demo-box" data-demo="${id}">
      <div class="demo-head">
        <div class="demo-title"><span class="demo-dots"><i></i><i></i><i></i></span> Live example</div>
        <div class="demo-actions">
          <button type="button" data-demo-run="${id}">Run again</button>
          <button type="button" data-demo-toggle="${id}">Code</button>
        </div>
      </div>
      <div class="demo-frame-wrap">
        <iframe class="demo-frame" data-demo-frame="${id}" sandbox="allow-scripts allow-same-origin" srcdoc="${attr(src)}"></iframe>
      </div>
      <div class="demo-code" data-demo-code="${id}">
        <div class="demo-tabs">
          ${files.map((f, i) => `<button type="button" data-demo-tab="${id}:${f}" class="${i === 0 ? "active" : ""}">${f}</button>`).join("")}
        </div>
        ${files.map((f, i) => `<pre data-demo-panel="${id}:${f}" style="${i === 0 ? "" : "display:none;"}"><code>${esc(demo[f])}</code></pre>`).join("")}
      </div>
    </div>
  `;
}

function srcdocOf(demo) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${demo.css || ""}</style></head><body>${demo.html || ""}<script>${demo.js || ""}<\/script></body></html>`;
}

function initLessonInteractions(w, l, quizId) {
  // copy buttons
  document.querySelectorAll("[data-copy-code]").forEach(btn => {
    btn.addEventListener("click", () => {
      const code = btn.closest(".code-block").querySelector("code").textContent;
      copyText(code);
      toast("Copied", "Code copied to clipboard.", "good");
    });
  });

  // demo run/toggle/tabs
  document.querySelectorAll(`[data-demo-run="${l.id}"]`).forEach(btn => {
    btn.addEventListener("click", () => {
      const frame = document.querySelector(`[data-demo-frame="${l.id}"]`);
      frame.srcdoc = srcdocOf(l.demo);
    });
  });
  document.querySelectorAll(`[data-demo-toggle="${l.id}"]`).forEach(btn => {
    btn.addEventListener("click", () => {
      const code = document.querySelector(`[data-demo-code="${l.id}"]`);
      code.classList.toggle("open");
    });
  });
  document.querySelectorAll(`[data-demo-tab^="${l.id}:"]`).forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.demoTab.split(":")[1];
      document.querySelectorAll(`[data-demo-tab^="${l.id}:"]`).forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(`[data-demo-panel^="${l.id}:"]`).forEach(p => {
        p.style.display = p.dataset.demoPanel.endsWith(":" + key) ? "" : "none";
      });
    });
  });

  // quiz
  const quizButtons = document.querySelectorAll(`[data-quiz="${l.id}"]`);
  quizButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const chosen = Number(btn.dataset.index);
      const correct = l.quiz.answer;
      quizButtons.forEach(b => { b.disabled = true; });
      quizButtons.forEach((b, i) => {
        if (i === correct) b.classList.add("correct");
        if (i === chosen && chosen !== correct) b.classList.add("wrong");
      });
      const fb = document.getElementById("qfb-" + l.id);
      fb.style.display = "";
      if (chosen === correct) {
        fb.className = "quiz-feedback good";
        fb.innerHTML = "<strong>Correct!</strong>" + esc(l.quiz.why);
        state.quizScores[l.id] = { score: 1, total: 1 };
        const cbtn = document.getElementById("complete-btn-" + l.id);
        if (cbtn) cbtn.style.display = "";
        playSound("success");
        if (!state.completedLessons[l.id]) {
          completeLesson(l.id);
          const cbtn2 = document.getElementById("complete-btn-" + l.id);
          if (cbtn2) cbtn2.style.display = "none";
        }
      } else {
        fb.className = "quiz-feedback bad";
        fb.innerHTML = "<strong>Not quite.</strong>" + esc(l.quiz.why);
        state.quizScores[l.id] = { score: 0, total: 1 };
        playSound("error");
      }
      saveState();
      checkBadges(false);
      updateTopStats();
    });
  });

  // complete lesson button
  document.querySelectorAll('[data-action="complete-lesson"]').forEach(btn => {
    btn.addEventListener("click", () => {
      completeLesson(btn.dataset.lesson);
      toast("Mission complete", l.title, "good");
      confettiBurst(80);
      renderLesson(worldId, lessonId);
    });
  });

  // open playground with starter
  document.querySelectorAll('[data-action="open-playground"]').forEach(btn => {
    btn.addEventListener("click", () => {
      state.pendingPlayground = { name: l.title + " starter", html: l.challenge.starter.html, css: l.challenge.starter.css, js: l.challenge.starter.js };
      saveState();
      navigate("#/playground");
    });
  });

  // copy challenge starter
  document.querySelectorAll('[data-action="copy-challenge"]').forEach(btn => {
    btn.addEventListener("click", () => {
      const text = l.challenge.starter.html + "\n\n/* CSS */\n" + l.challenge.starter.css + "\n\n/* JS */\n" + l.challenge.starter.js;
      copyText(text);
      toast("Copied", "Starter code copied.", "good");
    });
  });
}

function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
      return;
    }
  } catch (e) {}
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } catch (e) {}
  ta.remove();
}

/* ----------------------------- Boss ----------------------------- */

function renderBoss(worldId) {
  const w = findWorld(worldId);
  if (!w) { navigate("#/learn"); return; }
  if (!isWorldUnlocked(w)) { navigate("#/learn"); return; }
  if (!worldLessonsComplete(w.id)) {
    mount(`
      <div class="page"><div class="wrap">
        <div class="empty">
          <h2>Finish all missions first</h2>
          <p>You need to complete every mission in ${esc(w.title)} before fighting the boss.</p>
          <a href="#/world/${w.id}" class="btn primary" style="margin-top:12px;">Back to world</a>
        </div>
      </div></div>
    `);
    return;
  }
  const boss = w.boss;
  const prev = state.bosses[w.id];
  mount(`
    <div class="page">
      <div class="wrap">
        <div class="crumbs">
          <a href="#/learn">Course</a><span class="sep">/</span>
          <a href="#/world/${w.id}">${esc(w.title)}</a><span class="sep">/</span>
          <span>${esc(boss.title)}</span>
        </div>
        <div class="boss-head" style="--world:${w.color}">
          <span class="pill">Boss battle</span>
          <h1>${esc(boss.title)}</h1>
          <p>${esc(boss.intro)}</p>
          <div class="boss-meta">
            <span class="pill" style="border-color:rgba(255,255,255,0.4);color:#dbe4f3;">${boss.questions.length} questions</span>
            <span class="pill" style="border-color:rgba(255,255,255,0.4);color:#dbe4f3;">Need ${Math.ceil(boss.questions.length * 0.6667)} to pass</span>
            ${prev ? `<span class="pill" style="border-color:rgba(255,255,255,0.4);color:#dbe4f3;">Best: ${prev.score}/${prev.total}</span>` : ""}
          </div>
        </div>

        <form id="boss-form" class="exam-form">
          ${boss.questions.map((q, qi) => `
            <div class="card question-card">
              <div class="q-top">
                <div>
                  <div class="q-num">Question ${qi + 1} of ${boss.questions.length}</div>
                  <h3>${esc(q.q)}</h3>
                </div>
              </div>
              <div class="quiz-options">
                ${q.options.map((opt, oi) => `
                  <label class="quiz-option" style="cursor:pointer;">
                    <input type="radio" name="bq${qi}" value="${oi}" style="display:none;">
                    <span class="ol">${String.fromCharCode(65 + oi)}</span>
                    <span>${esc(opt)}</span>
                  </label>
                `).join("")}
              </div>
            </div>
          `).join("")}
          <div class="exam-sticky">
            <div class="progress"><span id="boss-progress" style="width:0%"></span></div>
            <button type="submit" class="btn primary">Submit answers</button>
          </div>
        </form>
        <div id="boss-result"></div>
      </div>
    </div>
  `, () => {
    initBossInteractions(w, boss);
  });
}

function initBossInteractions(w, boss) {
  const form = document.getElementById("boss-form");
  // make option labels clickable
  document.querySelectorAll(".quiz-option").forEach(label => {
    label.addEventListener("click", () => {
      const input = label.querySelector("input");
      if (!input) return;
      input.checked = true;
      label.closest(".question-card").querySelectorAll(".quiz-option").forEach(l => l.style.borderColor = "rgba(21,32,51,0.35)");
      label.style.borderColor = "var(--ink)";
      updateBossProgress();
    });
  });
  function updateBossProgress() {
    const answered = form.querySelectorAll("input:checked").length;
    const pct = Math.round((answered / boss.questions.length) * 100);
    document.getElementById("boss-progress").style.width = pct + "%";
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let score = 0;
    const answers = [];
    boss.questions.forEach((q, qi) => {
      const sel = form.querySelector(`input[name="bq${qi}"]:checked`);
      const val = sel ? Number(sel.value) : -1;
      answers.push(val);
      if (val === q.answer) score++;
    });
    const passed = completeBoss(w.id, score, boss.questions.length);
    // show result
    const result = document.getElementById("boss-result");
    result.innerHTML = `
      <div class="card exam-result" style="margin-top:20px;">
        <div class="big-score" style="color:${passed ? "var(--success)" : "var(--danger)"};">${score}/${boss.questions.length}</div>
        <h2>${passed ? "Boss defeated!" : "Not quite - try again"}</h2>
        <p class="muted">${passed ? "The next world is unlocked." : "You need " + Math.ceil(boss.questions.length * 0.6667) + " correct. Review the questions below."}</p>
        <div class="review-list">
          ${boss.questions.map((q, qi) => {
            const ok = answers[qi] === q.answer;
            return `<div class="review-item ${ok ? "good" : "bad"}">
              <div class="ri-q">${esc(q.q)}</div>
              <div class="ri-a">${ok ? "Correct" : "Your answer: " + (answers[qi] >= 0 ? esc(q.options[answers[qi]]) : "none") + " - Correct: " + esc(q.options[q.answer])}</div>
              <div class="ri-a">${esc(q.why)}</div>
            </div>`;
          }).join("")}
        </div>
        <div class="result-actions">
          ${passed ? `<a href="#/world/${COURSE.worlds.find(x => x.num === w.num + 1)?.id || w.id}" class="btn primary">Next world</a>` : `<button class="btn primary" data-action="retry-boss">Retry boss</button>`}
          <a href="#/world/${w.id}" class="btn ghost">Back to world</a>
        </div>
      </div>
    `;
    form.style.display = "none";
    if (passed) { confettiBurst(160); playSound("success"); }
    else playSound("error");
    document.querySelectorAll('[data-action="retry-boss"]').forEach(b => b.addEventListener("click", () => {
      form.style.display = "";
      result.innerHTML = "";
      form.reset();
      updateBossProgress();
    }));
  });
}

/* ----------------------------- Playground ----------------------------- */

function renderPlayground() {
  const pending = state.pendingPlayground;
  if (pending) {
    // load into editors
    state._pgName = pending.name;
    state._pgHtml = pending.html;
    state._pgCss = pending.css;
    state._pgJs = pending.js;
    delete state.pendingPlayground;
    saveState();
  }
  const name = state._pgName || "Untitled project";
  const html = state._pgHtml || "";
  const css = state._pgCss || "";
  const js = state._pgJs || "";

  mount(`
    <div class="page">
      <div class="wrap">
        <div class="pg-head">
          <div>
            <div class="eyebrow">Playground</div>
            <h1>Build anything</h1>
            <p>Write HTML, CSS and JavaScript, then press Run. Your code runs in a safe preview. Progress and snippets save in your browser.</p>
          </div>
        </div>

        <div class="pg-toolbar">
          <input class="name-input" id="pg-name" value="${attr(name)}" aria-label="Project name">
          <select id="pg-template" aria-label="Starter template">
            <option value="">Starter templates</option>
            <option value="blank">Blank page</option>
            <option value="card">Profile card</option>
            <option value="quiz">Mini quiz</option>
            <option value="todo">To-do list</option>
            <option value="flex">Flexbox gallery</option>
          </select>
          <label style="display:inline-flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:700;color:var(--ink-2);">
            <input type="checkbox" id="pg-autorun" checked> Auto-run
          </label>
          <div class="toolbar-spacer"></div>
          <button class="btn small" data-pg="run">Run</button>
          <button class="btn small" data-pg="save">Save</button>
          <button class="btn small" data-pg="download">Download</button>
          <button class="btn small ghost" data-pg="new">New</button>
        </div>

        <div class="pg-body">
          <div class="pg-editor">
            <div class="pg-tabs">
              <button type="button" data-pg-tab="html" class="active">HTML</button>
              <button type="button" data-pg-tab="css">CSS</button>
              <button type="button" data-pg-tab="js">JS</button>
              <button type="button" class="run-btn" data-pg="run">Run</button>
            </div>
            <textarea id="pg-html" spellcheck="false" placeholder="<!-- HTML -->">${esc(html)}</textarea>
            <textarea id="pg-css" spellcheck="false" placeholder="/* CSS */" style="display:none;">${esc(css)}</textarea>
            <textarea id="pg-js" spellcheck="false" placeholder="// JavaScript" style="display:none;">${esc(js)}</textarea>
            <div class="editor-status">
              <span id="pg-status">Ready. Press Ctrl+Enter to run.</span>
              <span id="pg-chars">0 chars</span>
            </div>
          </div>
          <div class="pg-preview">
            <div class="pg-preview-head">
              <span>Preview</span>
              <button class="btn small ghost" data-pg="fullscreen">Fullscreen</button>
            </div>
            <iframe id="pg-frame" sandbox="allow-scripts allow-same-origin allow-modals allow-forms" srcdoc=""></iframe>
            <div class="pg-console" id="pg-console"><div class="c-empty">Console output appears here.</div></div>
          </div>
        </div>

        <div class="saved-row" id="pg-saved"></div>
      </div>
    </div>
  `, () => {
    initPlayground();
  });
}

function initPlayground() {
  const htmlTa = document.getElementById("pg-html");
  const cssTa = document.getElementById("pg-css");
  const jsTa = document.getElementById("pg-js");
  const frame = document.getElementById("pg-frame");
  const consoleEl = document.getElementById("pg-console");
  playgroundIframe = frame;
  let activeTab = "html";
  let autoRunTimer = null;

  function getEditors() { return { html: htmlTa.value, css: cssTa.value, js: jsTa.value }; }
  function updateChars() {
    const total = htmlTa.value.length + cssTa.value.length + jsTa.value.length;
    document.getElementById("pg-chars").textContent = total + " chars";
  }
  updateChars();
  [htmlTa, cssTa, jsTa].forEach(ta => ta.addEventListener("input", () => { updateChars(); scheduleAutoRun(); }));

  // tab switching
  document.querySelectorAll("[data-pg-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      activeTab = btn.dataset.pgTab;
      document.querySelectorAll("[data-pg-tab]").forEach(b => b.classList.toggle("active", b === btn));
      htmlTa.style.display = activeTab === "html" ? "" : "none";
      cssTa.style.display = activeTab === "css" ? "" : "none";
      jsTa.style.display = activeTab === "js" ? "" : "none";
    });
  });

  // tab key inserts spaces
  [htmlTa, cssTa, jsTa].forEach(ta => {
    ta.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        ta.value = ta.value.slice(0, start) + "  " + ta.value.slice(end);
        ta.selectionStart = ta.selectionEnd = start + 2;
        ta.dispatchEvent(new Event("input"));
      }
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        runPreview();
      }
    });
  });

  function buildSrcdoc(code) {
    const bootstrap = `<script>
(function(){
  function send(type,args){
    try{ parent.postMessage({__pg:true,type:type,args:args.map(function(a){
      try{ return typeof a === 'undefined' ? 'undefined' : (typeof a === 'function' ? a.toString() : JSON.stringify(a)); }
      catch(e){ return String(a); }
    })}, '*'); }catch(e){}
  }
  ['log','info','warn','error'].forEach(function(m){
    var orig = console[m];
    console[m] = function(){ var args=[].slice.call(arguments); send(m,args); if(orig) orig.apply(console,args); };
  });
  window.onerror = function(msg,src,line,col,err){ send('error',[msg + ' (line ' + line + ')']); return false; };
})();
<\/script>`;
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${code.css || ""}</style></head><body>${code.html || ""}${bootstrap}<script>${code.js || ""}<\/script></body></html>`;
  }

  function runPreview() {
    const code = getEditors();
    frame.srcdoc = buildSrcdoc(code);
    consoleEl.innerHTML = '<div class="c-empty">Running...</div>';
    document.getElementById("pg-status").textContent = "Preview updated.";
    // persist editors
    state._pgName = document.getElementById("pg-name").value;
    state._pgHtml = code.html;
    state._pgCss = code.css;
    state._pgJs = code.js;
    saveState();
  }
  window._runPreview = runPreview;

  function scheduleAutoRun() {
    if (!document.getElementById("pg-autorun").checked) return;
    clearTimeout(autoRunTimer);
    autoRunTimer = setTimeout(runPreview, 700);
  }

  // message listener
  window.addEventListener("message", (e) => {
    if (!e.data || e.data.__pg !== true) return;
    if (e.source !== frame.contentWindow) return;
    const type = e.data.type;
    const args = e.data.args || [];
    const line = document.createElement("div");
    line.className = "c-line " + (type === "error" ? "error" : type === "warn" ? "warn" : "");
    line.textContent = "[" + type + "] " + args.join(" ");
    if (consoleEl.querySelector(".c-empty")) consoleEl.innerHTML = "";
    consoleEl.appendChild(line);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  });

  // actions
  document.querySelectorAll("[data-pg]").forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.pg;
      if (action === "run") runPreview();
      if (action === "save") {
        const code = getEditors();
        const name = document.getElementById("pg-name").value.trim() || "Untitled project";
        const snippet = { id: "sn-" + Date.now(), name: name, html: code.html, css: code.css, js: code.js, updated: new Date().toISOString() };
        state.snippets = state.snippets || [];
        state.snippets.unshift(snippet);
        if (state.snippets.length > 20) state.snippets = state.snippets.slice(0, 20);
        saveState();
        renderSaved();
        toast("Saved", name + " saved.", "good");
        checkBadges(false);
      }
      if (action === "download") {
        const code = getEditors();
        const blob = new Blob([buildSrcdoc(code)], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = (document.getElementById("pg-name").value.trim() || "project") + ".html";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        toast("Downloaded", "Your project was downloaded as an HTML file.", "good");
      }
      if (action === "new") {
        if (!confirm("Start a new project? Unsaved changes will be lost.")) return;
        htmlTa.value = "";
        cssTa.value = "";
        jsTa.value = "";
        document.getElementById("pg-name").value = "Untitled project";
        updateChars();
        runPreview();
      }
      if (action === "fullscreen") {
        frame.requestFullscreen?.();
      }
    });
  });

  // template select
  document.getElementById("pg-template").addEventListener("change", (e) => {
    const v = e.target.value;
    const templates = {
      blank: { html: "", css: "", js: "" },
      card: {
        html: `<div class="card">
  <h1>Hello</h1>
  <p>Edit me in the playground.</p>
  <button id="btn">Click me</button>
</div>`,
        css: `body { font-family: Verdana, sans-serif; padding: 24px; background: #fff8e7; }
.card { background: white; border: 2px solid #152033; border-radius: 14px; padding: 20px; max-width: 360px; }
button { font: inherit; padding: 8px 12px; border: 2px solid #152033; border-radius: 8px; background: #ff6b57; color: white; font-weight: bold; }`,
        js: `document.getElementById("btn").addEventListener("click", function () {
  alert("Hello from your playground!");
});`
      },
      quiz: {
        html: `<h1>Mini Quiz</h1>
<p id="q">What is 2 + 2?</p>
<button data-answer="4">4</button>
<button data-answer="5">5</button>
<p id="out">...</p>`,
        css: `body { font-family: Verdana, sans-serif; padding: 24px; }
button { font: inherit; padding: 8px 12px; margin-right: 6px; border: 2px solid #152033; border-radius: 8px; background: #ffd166; font-weight: bold; }`,
        js: `document.querySelectorAll("button").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const out = document.getElementById("out");
    out.textContent = btn.dataset.answer === "4" ? "Correct!" : "Try again.";
  });
});`
      },
      todo: {
        html: `<h1>To-Do</h1>
<form id="f"><input id="t" placeholder="Task"><button>Add</button></form>
<ul id="list"></ul>`,
        css: `body { font-family: Verdana, sans-serif; padding: 24px; }
input, button { font: inherit; padding: 8px 10px; border: 2px solid #152033; border-radius: 8px; margin-right: 6px; }
ul { list-style: none; padding: 0; }
li { padding: 8px; border: 2px solid #152033; border-radius: 8px; margin-bottom: 6px; }`,
        js: `document.getElementById("f").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("t");
  const li = document.createElement("li");
  li.textContent = input.value;
  document.getElementById("list").appendChild(li);
  input.value = "";
});`
      },
      flex: {
        html: `<div class="row">
  <div class="card">One</div>
  <div class="card">Two</div>
  <div class="card">Three</div>
</div>`,
        css: `body { font-family: Verdana, sans-serif; padding: 24px; }
.row { display: flex; gap: 12px; flex-wrap: wrap; }
.card { flex: 1; min-width: 120px; padding: 24px; text-align: center; background: #fff5d6; border: 2px solid #152033; border-radius: 12px; font-weight: bold; }`,
        js: ""
      }
    };
    const t = templates[v];
    if (t) {
      htmlTa.value = t.html;
      cssTa.value = t.css;
      jsTa.value = t.js;
      updateChars();
      runPreview();
    }
    e.target.value = "";
  });

  function renderSaved() {
    const row = document.getElementById("pg-saved");
    if (!state.snippets || !state.snippets.length) {
      row.innerHTML = '<span class="muted" style="font-size:0.8rem;">No saved projects yet.</span>';
      return;
    }
    row.innerHTML = state.snippets.map(s => `
      <span class="saved-chip">
        ${esc(s.name)}
        <button type="button" data-load-snippet="${s.id}" title="Load">Load</button>
        <button type="button" data-delete-snippet="${s.id}" title="Delete">x</button>
      </span>
    `).join("");
    row.querySelectorAll("[data-load-snippet]").forEach(btn => {
      btn.addEventListener("click", () => {
        const sn = state.snippets.find(x => x.id === btn.dataset.loadSnippet);
        if (!sn) return;
        htmlTa.value = sn.html;
        cssTa.value = sn.css;
        jsTa.value = sn.js;
        document.getElementById("pg-name").value = sn.name;
        updateChars();
        runPreview();
        toast("Loaded", sn.name, "good");
      });
    });
    row.querySelectorAll("[data-delete-snippet]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.snippets = state.snippets.filter(x => x.id !== btn.dataset.deleteSnippet);
        saveState();
        renderSaved();
      });
    });
  }
  renderSaved();
  runPreview();
}

/* ----------------------------- Samples ----------------------------- */

function renderSamples() {
  mount(`
    <div class="page">
      <div class="wrap">
        <div class="section-head" style="margin-bottom:18px;">
          <div>
            <div class="eyebrow">Sample sites</div>
            <h1>Six sites to study and remix</h1>
            <p style="color:var(--ink-2);max-width:62ch;margin:8px 0 0;">Each one is a complete mini website. Open it, read the code, run it in the playground, or download it.</p>
          </div>
        </div>
        <div class="sample-grid">
          ${SAMPLES.map(s => `
            <a class="card sample-card" href="#/sample/${s.id}">
              <div class="sample-art" style="--art:${s.art}">
                <div class="art-window">
                  <div class="art-bar"><i></i><i></i><i></i></div>
                  <div class="art-content">
                    <i></i><i></i><i></i><i></i>
                  </div>
                </div>
              </div>
              <div class="sample-info">
                <h3>${esc(s.title)}</h3>
                <p>${esc(s.blurb)}</p>
                <div class="sample-foot">
                  <span class="pill">${esc(s.level)}</span>
                  <span style="font-size:0.75rem;font-weight:700;color:var(--ink-3);">${s.concepts.join(" / ")}</span>
                </div>
              </div>
            </a>
          `).join("")}
        </div>
      </div>
    </div>
  `);
}

function renderSampleDetail(id) {
  const s = SAMPLES.find(x => x.id === id);
  if (!s) { navigate("#/samples"); return; }
  const src = srcdocOf(s);
  mount(`
    <div class="page">
      <div class="wrap">
        <div class="crumbs">
          <a href="#/samples">Sample sites</a><span class="sep">/</span>
          <span>${esc(s.title)}</span>
        </div>
        <div class="sample-detail-head">
          <div>
            <div class="eyebrow">${esc(s.level)}</div>
            <h1>${esc(s.title)}</h1>
            <p>${esc(s.blurb)}</p>
            <div class="sample-concepts">${s.concepts.map(c => `<span class="tag">${esc(c)}</span>`).join("")}</div>
          </div>
          <div class="btn-row">
            <button class="btn primary small" data-sample="remix" data-id="${s.id}">Open in playground</button>
            <button class="btn small" data-sample="download" data-id="${s.id}">Download</button>
          </div>
        </div>

        <div class="sample-runner">
          <div class="runner-bar">
            <span style="font-weight:800;font-size:0.8rem;">Live preview</span>
            <span style="font-size:0.75rem;color:var(--ink-3);">Runs in your browser</span>
          </div>
          <iframe sandbox="allow-scripts allow-same-origin" srcdoc="${attr(src)}"></iframe>
        </div>

        <div class="section">
          <div class="section-head"><div><h2>Code</h2><p>Read it, then change it in the playground.</p></div></div>
          <div class="demo-tabs" style="border-radius:12px 12px 0 0;overflow:hidden;">
            <button class="active" data-sample-tab="${s.id}:html">HTML</button>
            <button data-sample-tab="${s.id}:css">CSS</button>
            <button data-sample-tab="${s.id}:js">JS</button>
          </div>
          <pre id="sample-code-${s.id}" style="background:#162034;color:#e8eefb;padding:16px;border-radius:0 0 12px 12px;overflow-x:auto;font-size:0.82rem;line-height:1.6;margin:0;">${esc(s.html)}</pre>
        </div>
      </div>
    </div>
  `, () => {
    const codeEl = document.getElementById("sample-code-" + s.id);
    const store = { html: s.html, css: s.css, js: s.js };
    document.querySelectorAll(`[data-sample-tab^="${s.id}:"]`).forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(`[data-sample-tab^="${s.id}:"]`).forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const key = btn.dataset.sampleTab.split(":")[1];
        codeEl.textContent = store[key];
      });
    });
    document.querySelectorAll("[data-sample]").forEach(btn => {
      btn.addEventListener("click", () => {
        const sample = SAMPLES.find(x => x.id === btn.dataset.id);
        if (btn.dataset.sample === "remix") {
          state.pendingPlayground = { name: sample.title, html: sample.html, css: sample.css, js: sample.js };
          saveState();
          if (!state.downloadedSamples.includes(sample.id)) state.downloadedSamples.push(sample.id);
          saveState();
          checkBadges(false);
          navigate("#/playground");
        }
        if (btn.dataset.sample === "download") {
          const blob = new Blob([srcdocOf(sample)], { type: "text/html" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = sample.id + ".html";
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
          if (!state.downloadedSamples.includes(sample.id)) state.downloadedSamples.push(sample.id);
          saveState();
          checkBadges(false);
          toast("Downloaded", sample.title + " downloaded.", "good");
        }
      });
    });
  });
}

/* ----------------------------- Exam ----------------------------- */

function renderExam() {
  const questions = COURSE.exam.questions;
  const passPct = COURSE.exam.passPercent;
  mount(`
    <div class="page">
      <div class="wrap">
        <div class="crumbs">
          <a href="#/home">Home</a><span class="sep">/</span>
          <span>Final exam</span>
        </div>
        <div class="boss-head" style="--world:#e8ae2e">
          <span class="pill">Final exam</span>
          <h1>Grandmaster Exam</h1>
          <p>${questions.length} questions across every world. You need ${passPct}% to pass and earn your certificate.</p>
          <div class="boss-meta">
            <span class="pill" style="border-color:rgba(255,255,255,0.4);color:#dbe4f3;">${questions.length} questions</span>
            <span class="pill" style="border-color:rgba(255,255,255,0.4);color:#dbe4f3;">Pass: ${passPct}%</span>
            ${state.exam.attempts ? `<span class="pill" style="border-color:rgba(255,255,255,0.4);color:#dbe4f3;">Attempts: ${state.exam.attempts}</span>` : ""}
            ${state.exam.passed ? `<span class="pill" style="border-color:rgba(255,255,255,0.4);color:#dbe4f3;">Best: ${state.exam.bestScore}/${state.exam.total}</span>` : ""}
          </div>
        </div>

        ${state.exam.passed ? `
          <div class="card" style="padding:18px 20px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;">
            <div>
              <strong style="color:var(--success);">You already passed!</strong>
              <p class="muted" style="margin:2px 0 0;font-size:0.82rem;">You can retake for practice or go straight to your certificate.</p>
            </div>
            <a href="#/certificate" class="btn primary small">View certificate</a>
          </div>
        ` : ""}

        <form id="exam-form" class="exam-form">
          ${questions.map((q, qi) => `
            <div class="card question-card">
              <div class="q-top">
                <div>
                  <div class="q-num">Question ${qi + 1} of ${questions.length}</div>
                  <h3>${esc(q.q)}</h3>
                </div>
              </div>
              <div class="quiz-options">
                ${q.options.map((opt, oi) => `
                  <label class="quiz-option" style="cursor:pointer;">
                    <input type="radio" name="eq${qi}" value="${oi}" style="display:none;">
                    <span class="ol">${String.fromCharCode(65 + oi)}</span>
                    <span>${esc(opt)}</span>
                  </label>
                `).join("")}
              </div>
            </div>
          `).join("")}
          <div class="exam-sticky">
            <div class="progress"><span id="exam-progress" style="width:0%"></span></div>
            <span style="font-size:0.8rem;font-weight:700;color:var(--ink-3);" id="exam-answered">0 / ${questions.length} answered</span>
            <button type="submit" class="btn primary">Submit exam</button>
          </div>
        </form>
        <div id="exam-result"></div>
      </div>
    </div>
  `, () => {
    initExamInteractions(questions);
  });
}

function initExamInteractions(questions) {
  const form = document.getElementById("exam-form");
  document.querySelectorAll(".quiz-option").forEach(label => {
    label.addEventListener("click", () => {
      const input = label.querySelector("input");
      if (!input) return;
      input.checked = true;
      label.closest(".question-card").querySelectorAll(".quiz-option").forEach(l => l.style.borderColor = "rgba(21,32,51,0.35)");
      label.style.borderColor = "var(--ink)";
      updateExamProgress();
    });
  });
  function updateExamProgress() {
    const answered = form.querySelectorAll("input:checked").length;
    const pct = Math.round((answered / questions.length) * 100);
    document.getElementById("exam-progress").style.width = pct + "%";
    document.getElementById("exam-answered").textContent = answered + " / " + questions.length + " answered";
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let score = 0;
    const answers = [];
    questions.forEach((q, qi) => {
      const sel = form.querySelector(`input[name="eq${qi}"]:checked`);
      const val = sel ? Number(sel.value) : -1;
      answers.push(val);
      if (val === q.answer) score++;
    });
    const passed = completeExam(score, questions.length);
    const result = document.getElementById("exam-result");
    result.innerHTML = `
      <div class="card exam-result" style="margin-top:20px;">
        <div class="big-score" style="color:${passed ? "var(--success)" : "var(--danger)"};">${score}/${questions.length}</div>
        <h2>${passed ? "You are a Grandmaster!" : "Not yet - keep practicing"}</h2>
        <p class="muted">${passed ? "Score " + Math.round(score / questions.length * 100) + "%. Your certificate is ready." : "You need " + COURSE.exam.passPercent + "%. Review the questions below and try again."}</p>
        <div class="review-list">
          ${questions.map((q, qi) => {
            const ok = answers[qi] === q.answer;
            return `<div class="review-item ${ok ? "good" : "bad"}">
              <div class="ri-q">${esc(q.q)}</div>
              <div class="ri-a">${ok ? "Correct" : "Your answer: " + (answers[qi] >= 0 ? esc(q.options[answers[qi]]) : "none") + " - Correct: " + esc(q.options[q.answer])}</div>
              <div class="ri-a">${esc(q.why)}</div>
            </div>`;
          }).join("")}
        </div>
        <div class="result-actions">
          ${passed ? `<a href="#/certificate" class="btn primary">View certificate</a>` : `<button class="btn primary" data-action="retry-exam">Retry exam</button>`}
          <a href="#/learn" class="btn ghost">Back to course</a>
        </div>
      </div>
    `;
    form.style.display = "none";
    if (passed) { confettiBurst(220); playSound("success"); }
    else playSound("error");
    document.querySelectorAll('[data-action="retry-exam"]').forEach(b => b.addEventListener("click", () => {
      form.style.display = "";
      result.innerHTML = "";
      form.reset();
      updateExamProgress();
    }));
  });
}

/* ----------------------------- Certificate ----------------------------- */

function renderCertificate() {
  if (!state.exam.passed) {
    mount(`
      <div class="page"><div class="wrap">
        <div class="crumbs"><a href="#/home">Home</a><span class="sep">/</span><span>Certificate</span></div>
        <div class="cert-gate">
          <div class="card cert-locked">
            <div class="lock-big">LOCKED</div>
            <h2>Certificate not ready yet</h2>
            <p class="muted">Pass the final exam with at least ${COURSE.exam.passPercent}% to unlock your certificate.</p>
            <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
              <a href="#/exam" class="btn primary">Take the exam</a>
              <a href="#/learn" class="btn ghost">Continue learning</a>
            </div>
            <div style="margin-top:20px;">
              <div class="progress"><span style="width:${Math.round((completedLessonCount() / totalLessons()) * 100)}%"></span></div>
              <small class="muted">${completedLessonCount()} of ${totalLessons()} missions complete</small>
            </div>
          </div>
        </div>
      </div></div>
    `);
    return;
  }

  const cert = state.certificate;
  if (!cert.code) {
    cert.code = makeCertCode(state.studentName || "Student");
    cert.date = state.exam.date;
    cert.name = state.studentName || "Student";
    cert.score = state.exam.score / state.exam.total;
    saveState();
  }
  const name = state.studentName || cert.name || "Student";

  mount(`
    <div class="page">
      <div class="wrap">
        <div class="crumbs"><a href="#/home">Home</a><span class="sep">/</span><span>Certificate</span></div>
        <div class="section-head" style="margin-bottom:18px;">
          <div>
            <div class="eyebrow">Certificate of completion</div>
            <h1>Your certificate</h1>
            <p style="color:var(--ink-2);max-width:62ch;margin:8px 0 0;">You passed the Grandmaster exam. Enter your name exactly as you want it printed, then download or print.</p>
          </div>
        </div>
        <div class="cert-wrap">
          <div class="cert-stage">
            <canvas id="cert-canvas" width="1600" height="1131"></canvas>
            <p class="cert-note">Preview. Download as PNG or print to PDF from your browser.</p>
          </div>
          <div class="cert-controls">
            <div class="card" style="padding:18px;">
              <div class="field">
                <label for="cert-name">Name on certificate</label>
                <input id="cert-name" value="${attr(name)}" maxlength="40">
                <span class="hint">Use your full name.</span>
              </div>
              <div class="btn-row" style="margin-top:12px;">
                <button class="btn primary" data-cert="download">Download PNG</button>
                <button class="btn" data-cert="print">Print</button>
              </div>
            </div>
            <div class="card" style="padding:18px;">
              <h3 style="margin:0 0 6px;">Details</h3>
              <p style="font-size:0.85rem;color:var(--ink-2);margin:0 0 4px;"><strong>Course:</strong> Web Dev: Zero to Grandmaster</p>
              <p style="font-size:0.85rem;color:var(--ink-2);margin:0 0 4px;"><strong>Instructor:</strong> Aadarsh Joshi</p>
              <p style="font-size:0.85rem;color:var(--ink-2);margin:0 0 4px;"><strong>Score:</strong> ${state.exam.score}/${state.exam.total} (${Math.round(state.exam.score / state.exam.total * 100)}%)</p>
              <p style="font-size:0.85rem;color:var(--ink-2);margin:0 0 4px;"><strong>Date:</strong> ${new Date(state.exam.date).toLocaleDateString()}</p>
              <p style="font-size:0.85rem;color:var(--ink-2);margin:0;"><strong>ID:</strong> ${esc(cert.code)}</p>
            </div>
            <div class="card" style="padding:18px;">
              <h3 style="margin:0 0 6px;">Share</h3>
              <p class="muted" style="font-size:0.82rem;margin:0 0 10px;">Post your certificate and tag the course. You earned it.</p>
              <button class="btn small ghost" data-cert="copyid">Copy certificate ID</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `, () => {
    const canvas = document.getElementById("cert-canvas");
    const nameInput = document.getElementById("cert-name");
    function redraw() {
      drawCertificate(canvas, nameInput.value.trim() || "Student", cert.code, state.exam, state.xp);
      state.studentName = nameInput.value.trim();
      state.certificate.name = nameInput.value.trim();
      saveState();
    }
    nameInput.addEventListener("input", redraw);
    redraw();

    document.querySelectorAll("[data-cert]").forEach(btn => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.cert;
        if (action === "download") {
          const url = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = url;
          a.download = "web-dev-certificate.png";
          document.body.appendChild(a);
          a.click();
          a.remove();
          toast("Downloaded", "Certificate saved as PNG.", "good");
        }
        if (action === "print") {
          printCertificate(canvas);
        }
        if (action === "copyid") {
          copyText(cert.code);
          toast("Copied", "Certificate ID copied.", "good");
        }
      });
    });
  });
}

function drawCertificate(canvas, name, code, exam, xp) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  // background
  ctx.fillStyle = "#fffdf7";
  ctx.fillRect(0, 0, w, h);

  // decorative border
  ctx.strokeStyle = "#152033";
  ctx.lineWidth = 12;
  ctx.strokeRect(40, 40, w - 80, h - 80);
  ctx.strokeStyle = "#e8ae2e";
  ctx.lineWidth = 4;
  ctx.strokeRect(60, 60, w - 120, h - 120);

  // corner ornaments
  ctx.fillStyle = "#e8ae2e";
  [[80, 80], [w - 80, 80], [80, h - 80], [w - 80, h - 80]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fill();
  });

  // title
  ctx.textAlign = "center";
  ctx.fillStyle = "#152033";
  ctx.font = 'bold 44px "Trebuchet MS", "Segoe UI", sans-serif';
  ctx.fillText("CERTIFICATE OF COMPLETION", w / 2, 150);

  ctx.font = '600 26px "Trebuchet MS", "Segoe UI", sans-serif';
  ctx.fillStyle = "#66738b";
  ctx.fillText("This is proudly presented to", w / 2, 230);

  // name
  ctx.fillStyle = "#152033";
  let fontSize = 74;
  ctx.font = `bold ${fontSize}px "Trebuchet MS", "Segoe UI", sans-serif`;
  while (ctx.measureText(name).width > w - 240 && fontSize > 36) {
    fontSize -= 2;
    ctx.font = `bold ${fontSize}px "Trebuchet MS", "Segoe UI", sans-serif`;
  }
  ctx.fillText(name, w / 2, 330);

  // underline
  ctx.strokeStyle = "#e8ae2e";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 260, 345);
  ctx.lineTo(w / 2 + 260, 345);
  ctx.stroke();

  ctx.fillStyle = "#33415c";
  ctx.font = '22px "Trebuchet MS", "Segoe UI", sans-serif';
  ctx.fillText("for successfully completing", w / 2, 410);

  ctx.fillStyle = "#152033";
  ctx.font = 'bold 40px "Trebuchet MS", "Segoe UI", sans-serif';
  ctx.fillText("Web Dev: Zero to Grandmaster", w / 2, 470);

  ctx.fillStyle = "#33415c";
  ctx.font = '20px "Trebuchet MS", "Segoe UI", sans-serif';
  const lines = [
    "A hands-on course covering HTML, CSS, JavaScript, the DOM, data,",
    "accessibility, performance, and shipping a real project.",
    "Created and signed by Aadarsh Joshi."
  ];
  lines.forEach((ln, i) => ctx.fillText(ln, w / 2, 520 + i * 30));

  // score badge
  ctx.fillStyle = "#152033";
  ctx.beginPath();
  ctx.arc(w / 2, 660, 74, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffd166";
  ctx.font = 'bold 34px "Trebuchet MS", "Segoe UI", sans-serif';
  ctx.fillText(Math.round(exam.score / exam.total * 100) + "%", w / 2, 672);
  ctx.fillStyle = "#f7f4ea";
  ctx.font = 'bold 14px "Trebuchet MS", "Segoe UI", sans-serif';
  ctx.fillText("EXAM SCORE", w / 2, 700);

  // signatures
  ctx.textAlign = "left";
  ctx.fillStyle = "#152033";
  ctx.font = 'italic 26px "Trebuchet MS", "Segoe UI", sans-serif';
  ctx.fillText("Aadarsh Joshi", 150, h - 150);
  ctx.strokeStyle = "#152033";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(150, h - 130);
  ctx.lineTo(360, h - 130);
  ctx.stroke();
  ctx.font = '14px "Trebuchet MS", "Segoe UI", sans-serif';
  ctx.fillStyle = "#66738b";
  ctx.fillText("Instructor", 150, h - 105);

  ctx.textAlign = "right";
  ctx.fillStyle = "#152033";
  ctx.font = 'italic 22px "Trebuchet MS", "Segoe UI", sans-serif';
  ctx.fillText(new Date(exam.date).toLocaleDateString(), w - 150, h - 150);
  ctx.beginPath();
  ctx.moveTo(w - 360, h - 130);
  ctx.lineTo(w - 150, h - 130);
  ctx.stroke();
  ctx.font = '14px "Trebuchet MS", "Segoe UI", sans-serif';
  ctx.fillStyle = "#66738b";
  ctx.fillText("Date issued", w - 150, h - 105);

  // footer code
  ctx.textAlign = "center";
  ctx.fillStyle = "#8a94a6";
  ctx.font = '13px "Consolas", monospace';
  ctx.fillText("Certificate ID: " + code, w / 2, h - 60);
}

function printCertificate(canvas) {
  const url = canvas.toDataURL("image/png");
  const win = window.open("", "_blank");
  if (!win) { toast("Popup blocked", "Allow popups to print.", "bad"); return; }
  win.document.write(`<!doctype html><html><head><title>Certificate</title><style>body{margin:0;display:grid;place-items:center;background:#fff;}img{max-width:100%;height:auto;}</style></head><body><img src="${url}" onload="window.focus();window.print();"></body></html>`);
  win.document.close();
}

/* ----------------------------- Achievements ----------------------------- */

function renderAchievements() {
  const rank = rankFor(state.xp);
  const nr = nextRank(state.xp);
  mount(`
    <div class="page">
      <div class="wrap">
        <div class="crumbs"><a href="#/home">Home</a><span class="sep">/</span><span>Achievements</span></div>
        <div class="section-head" style="margin-bottom:18px;">
          <div>
            <div class="eyebrow">Your progress</div>
            <h1>Badges and rank</h1>
          </div>
        </div>

        <div class="card rank-card" style="margin-bottom:22px;">
          <div class="rank-row">
            <div class="rank-medal">${rank.name.slice(0, 2).toUpperCase()}</div>
            <div>
              <h3>${esc(rank.name)}</h3>
              <p>${state.xp} XP${nr ? " - " + (nr.xp - state.xp) + " XP to " + nr.name : " - Max rank"}</p>
            </div>
          </div>
          <div class="progress"><span style="width:${Math.min(100, Math.round(state.xp / 1500 * 100))}%"></span></div>
          <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:0.78rem;color:var(--ink-3);font-weight:700;">
            <span>${completedLessonCount()} missions complete</span>
            <span>${state.badges.length} of ${BADGES.length} badges</span>
          </div>
        </div>

        <div class="achievements-grid">
          ${BADGES.map(b => badgeHtml(b)).join("")}
        </div>
      </div>
    </div>
  `);
}

/* ----------------------------- Settings ----------------------------- */

function renderSettings() {
  mount(`
    <div class="page">
      <div class="wrap">
        <div class="crumbs"><a href="#/home">Home</a><span class="sep">/</span><span>Settings</span></div>
        <div class="section-head" style="margin-bottom:18px;">
          <div>
            <div class="eyebrow">Progress and settings</div>
            <h1>Make it yours</h1>
          </div>
        </div>

        <div class="settings-grid">
          <div class="card settings-card">
            <h2>Preferences</h2>
            <div class="switch-row">
              <div><strong>Sound effects</strong><p class="muted" style="margin:0;font-size:0.8rem;">Small beeps for success and errors.</p></div>
              <label class="switch"><input type="checkbox" id="set-sound" ${state.settings.sound ? "checked" : ""}><span></span></label>
            </div>
            <div class="switch-row">
              <div><strong>Motion</strong><p class="muted" style="margin:0;font-size:0.8rem;">Confetti and animations.</p></div>
              <label class="switch"><input type="checkbox" id="set-motion" ${state.settings.motion ? "checked" : ""}><span></span></label>
            </div>
            <div class="switch-row">
              <div><strong>Squishy guide</strong><p class="muted" style="margin:0;font-size:0.8rem;">Pip the guide points you to the next step.</p></div>
              <label class="switch"><input type="checkbox" id="set-guide" ${state.settings.guide ? "checked" : ""}><span></span></label>
            </div>
          </div>

          <div class="card settings-card">
            <h2>Your progress</h2>
            <p class="muted" style="font-size:0.85rem;">Your progress is saved in this browser. Export a backup code to move it to another device.</p>
            <div class="btn-row" style="margin-top:10px;">
              <button class="btn small" data-set="export">Export progress</button>
              <button class="btn small ghost" data-set="import">Import progress</button>
            </div>
            <textarea id="progress-code" class="textarea" style="margin-top:12px;min-height:110px;font-family:var(--font-mono);font-size:0.75rem;" placeholder="Progress code appears here."></textarea>
            <p class="hint" style="font-size:0.72rem;color:var(--ink-3);margin-top:6px;">To import, paste a code above and click Import.</p>
          </div>

          <div class="card settings-card danger-zone">
            <h2>Reset progress</h2>
            <p style="font-size:0.85rem;color:#a52f24;margin:0 0 12px;">This deletes all progress, badges, snippets and your certificate. This cannot be undone.</p>
            <button class="btn small" style="background:#ffebe7;color:#a52f24;border-color:#c23b2e;" data-set="reset">Reset everything</button>
          </div>
        </div>
      </div>
    </div>
  `, () => {
    document.getElementById("set-sound").addEventListener("change", (e) => { state.settings.sound = e.target.checked; saveState(); });
    document.getElementById("set-motion").addEventListener("change", (e) => { state.settings.motion = e.target.checked; saveState(); });
    document.getElementById("set-guide").addEventListener("change", (e) => { state.settings.guide = e.target.checked; saveState(); updateGuide(currentRoute); });

    document.querySelectorAll("[data-set]").forEach(btn => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.set;
        if (action === "export") {
          document.getElementById("progress-code").value = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
          toast("Exported", "Copy the code and keep it safe.", "good");
        }
        if (action === "import") {
          const code = document.getElementById("progress-code").value.trim();
          try {
            const parsed = JSON.parse(decodeURIComponent(escape(atob(code))));
            state = mergeState(structuredClone(DEFAULT_STATE), parsed);
            saveState();
            toast("Imported", "Progress restored.", "good");
            setTimeout(() => handleRoute(), 400);
          } catch (e) {
            toast("Import failed", "That code is not valid.", "bad");
          }
        }
        if (action === "reset") {
          if (!confirm("Reset all progress? This cannot be undone.")) return;
          localStorage.removeItem("wd-grandmaster-state");
          state = structuredClone(DEFAULT_STATE);
          saveState();
          toast("Reset", "Progress cleared.", "good");
          setTimeout(() => navigate("#/home"), 300);
        }
      });
    });
  });
}

function renderAbout() {
  mount(`
    <div class="page">
      <div class="wrap">
        <div class="crumbs"><a href="#/home">Home</a><span class="sep">/</span><span>About</span></div>
        <div class="section-head" style="margin-bottom:18px;">
          <div>
            <div class="eyebrow">About the course</div>
            <h1>Web Dev: Zero to Grandmaster</h1>
            <p style="color:var(--ink-2);max-width:62ch;margin:8px 0 0;">A free, offline, hands-on course by Aadarsh Joshi. Built for curious beginners of any age.</p>
          </div>
        </div>
        <div class="card" style="padding:24px;">
          <h3>What is inside</h3>
          <p>10 worlds, 40 missions, 6 sample sites, a full playground, 10 world bosses, a final exam, and a printable certificate.</p>
          <h3>How to run it</h3>
          <p>Open index.html in any modern browser. For the best experience, run a local server: double-click start.bat on Windows, or run <code class="inline-code">python -m http.server 8080</code> and visit localhost:8080.</p>
          <h3>Progress</h3>
          <p>Everything is saved in your browser with localStorage. Use Settings to export a backup code.</p>
          <h3>Credits</h3>
          <p>Designed and written by <strong>Aadarsh Joshi</strong>. No frameworks, no dependencies, no tracking. Just HTML, CSS and JavaScript.</p>
        </div>
      </div>
    </div>
  `);
}

/* ----------------------------- Guide (Pip) ----------------------------- */

function updateGuide(route) {
  const widget = document.getElementById("guide-widget");
  const highlight = document.getElementById("guide-highlight");
  if (!widget) return;
  if (!state.settings.guide) { widget.classList.add("hidden"); highlight.classList.remove("on"); return; }
  widget.classList.remove("hidden");

  let tip = { text: "Keep going! Every mission brings you closer to grandmaster.", target: null, cta: null, action: null };

  const next = getNextLesson();
  if (route === "home") {
    tip = { text: "Hi, I'm Pip! " + (completedLessonCount() === 0 ? "Click Start learning to begin World 1." : "You have " + completedLessonCount() + " missions done. Continue where you left off."), target: "#start-learning", cta: completedLessonCount() === 0 ? "Start learning" : "Continue", action: () => navigate(next ? "#/lesson/" + next.world.id + "/" + next.lesson.id : "#/learn") };
  } else if (route === "learn") {
    const unlocked = COURSE.worlds.filter(isWorldUnlocked);
    const targetWorld = unlocked.find(w => !worldComplete(w.id)) || unlocked[unlocked.length - 1];
    tip = { text: "Pick a world card. Locked worlds open after you defeat the previous boss.", target: ".world-card:not(.locked)", cta: targetWorld ? "Open " + targetWorld.title : null, action: targetWorld ? () => navigate("#/world/" + targetWorld.id) : null };
  } else if (route === "world") {
    tip = { text: "Work through the missions top to bottom. Then fight the boss at the bottom.", target: "a[href^='#/lesson/']", cta: "Open first mission", action: () => {
      const link = document.querySelector("a[href^='#/lesson/']");
      if (link) link.click();
    } };
  } else if (route === "lesson") {
    const l = findLesson(location.hash.split("/").pop())?.lesson;
    tip = { text: "Read the lesson, run the live example, try the challenge, then answer the quiz to complete the mission.", target: ".quiz-card", cta: "Jump to quiz", action: () => {
      const q = document.querySelector(".quiz-card");
      if (q) q.scrollIntoView({ behavior: "smooth", block: "center" });
    } };
  } else if (route === "boss") {
    tip = { text: "Answer every question, then submit. You need two thirds to pass.", target: "button[type='submit']", cta: "Submit", action: () => {
      const b = document.querySelector("button[type='submit']");
      if (b) b.click();
    } };
  } else if (route === "playground") {
    tip = { text: "Type code in the editor, then press Run or Ctrl+Enter. Try a starter template from the dropdown.", target: "[data-pg='run']", cta: "Run code", action: () => { if (window._runPreview) window._runPreview(); } };
  } else if (route === "samples") {
    tip = { text: "Open a sample site to see it live and read its code.", target: ".sample-card", cta: "Open a sample", action: () => {
      const c = document.querySelector(".sample-card");
      if (c) c.click();
    } };
  } else if (route === "sample") {
    tip = { text: "Remix this sample in the playground to make it yours.", target: "[data-sample='remix']", cta: "Remix", action: () => {
      const b = document.querySelector("[data-sample='remix']");
      if (b) b.click();
    } };
  } else if (route === "exam") {
    tip = { text: "Answer all questions, then submit. You need 80% to earn your certificate.", target: "button[type='submit']", cta: "Submit exam", action: () => {
      const b = document.querySelector("button[type='submit']");
      if (b) b.click();
    } };
  } else if (route === "certificate") {
    tip = { text: "Type your name, then download or print your certificate.", target: "#cert-name", cta: "Focus name", action: () => {
      const i = document.getElementById("cert-name");
      if (i) i.focus();
    } };
  } else if (route === "achievements") {
    tip = { text: "Badges unlock as you learn. You have " + state.badges.length + " of " + BADGES.length + ".", target: ".badge-card", cta: null, action: null };
  } else if (route === "settings") {
    tip = { text: "Export your progress code to back it up or move it to another device.", target: "[data-set='export']", cta: "Export", action: () => {
      const b = document.querySelector("[data-set='export']");
      if (b) b.click();
    } };
  }

  document.getElementById("guide-text").textContent = tip.text;
  const ctaBtn = document.getElementById("guide-cta");
  if (tip.cta && tip.action) {
    ctaBtn.style.display = "";
    ctaBtn.textContent = tip.cta;
    ctaBtn.onclick = tip.action;
  } else {
    ctaBtn.style.display = "none";
  }

  // highlight target
  highlight.classList.remove("on");
  guideTargetEl = null;
  if (tip.target) {
    const el = document.querySelector(tip.target);
    if (el) {
      guideTargetEl = el;
      positionHighlight(el, highlight);
      highlight.classList.add("on");
    }
  }
}

function positionHighlight(el, highlight) {
  const rect = el.getBoundingClientRect();
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  highlight.style.left = (rect.left + scrollX - 6) + "px";
  highlight.style.top = (rect.top + scrollY - 6) + "px";
  highlight.style.width = (rect.width + 12) + "px";
  highlight.style.height = (rect.height + 12) + "px";
}

window.addEventListener("resize", () => {
  if (guideTargetEl) positionHighlight(guideTargetEl, document.getElementById("guide-highlight"));
});
window.addEventListener("scroll", () => {
  if (guideTargetEl) positionHighlight(guideTargetEl, document.getElementById("guide-highlight"));
}, { passive: true });

/* ----------------------------- Global events ----------------------------- */

menuBtn.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  document.body.classList.toggle("nav-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
});

// global action delegation
app.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  const action = el.dataset.action;
  if (action === "open-playground") return; // handled in lesson init
});

// mobile nav close on link click
mainNav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    mainNav.classList.remove("open");
    document.body.classList.remove("nav-open");
  }
});

/* ----------------------------- Init ----------------------------- */

touchStreak();
checkBadges(true);
updateTopStats();

if (!location.hash) location.hash = "#/home";
window.addEventListener("hashchange", handleRoute);
handleRoute();

// Pip widget is in DOM? Inject if not present
if (!document.getElementById("guide-widget")) {
  const widget = document.createElement("div");
  widget.id = "guide-widget";
  widget.className = "guide-widget";
  widget.innerHTML = `
    <div class="guide-avatar" id="guide-avatar" title="Pip the guide">
      <svg viewBox="0 0 120 120" width="74" height="74" aria-hidden="true">
        <defs>
          <radialGradient id="pipBody" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stop-color="#ffd166"/>
            <stop offset="100%" stop-color="#ff9f43"/>
          </radialGradient>
        </defs>
        <ellipse cx="60" cy="72" rx="46" ry="42" fill="url(#pipBody)" stroke="#152033" stroke-width="3"/>
        <ellipse cx="60" cy="40" rx="34" ry="30" fill="url(#pipBody)" stroke="#152033" stroke-width="3"/>
        <circle cx="46" cy="36" r="9" fill="#fff"/>
        <circle cx="74" cy="36" r="9" fill="#fff"/>
        <circle cx="48" cy="37" r="4" fill="#152033"/>
        <circle cx="76" cy="37" r="4" fill="#152033"/>
        <circle cx="49" cy="35" r="1.5" fill="#fff"/>
        <circle cx="77" cy="35" r="1.5" fill="#fff"/>
        <path d="M52 52 Q60 60 68 52" fill="none" stroke="#152033" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="40" cy="46" rx="6" ry="3" fill="#ff8fbf" opacity="0.7"/>
        <ellipse cx="80" cy="46" rx="6" ry="3" fill="#ff8fbf" opacity="0.7"/>
        <circle cx="26" cy="78" r="8" fill="url(#pipBody)" stroke="#152033" stroke-width="2.5"/>
        <circle cx="94" cy="78" r="8" fill="url(#pipBody)" stroke="#152033" stroke-width="2.5"/>
      </svg>
    </div>
    <div class="guide-bubble">
      <p id="guide-text">Hi, I'm Pip!</p>
      <div class="guide-actions">
        <button id="guide-cta" class="btn small primary">Go</button>
        <button id="guide-dismiss" class="btn small ghost">Hide</button>
      </div>
    </div>
  `;
  document.body.appendChild(widget);
  const highlight = document.createElement("div");
  highlight.id = "guide-highlight";
  highlight.className = "guide-highlight";
  document.body.appendChild(highlight);
  // rebind dismiss
  document.getElementById("guide-dismiss").addEventListener("click", () => {
    widget.classList.toggle("minimized");
  });
  updateGuide(currentRoute);
}
