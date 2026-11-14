/* =========================================================
   Sample websites
   Web Dev: Zero to Grandmaster - by Aadarsh Joshi
   Each sample is a complete, runnable mini site.
   ========================================================= */

const SAMPLES = [
  {
    id: "nebula-card",
    title: "Nebula Bio Card",
    level: "Starter",
    concepts: ["HTML", "CSS", "Flexbox"],
    blurb: "A glowing profile card with a starry background. A great first project to remix.",
    art: "linear-gradient(135deg, #152033 0%, #3a2f6b 55%, #ff6b57 100%)",
    html: `<main class="card">
  <div class="avatar">AJ</div>
  <h1>Aadarsh Joshi</h1>
  <p class="role">Web builder and course creator</p>
  <p class="bio">I make friendly tools that help people learn. This card is pure HTML and CSS.</p>
  <div class="stats">
    <div><strong>12</strong><span>Projects</span></div>
    <div><strong>40</strong><span>Lessons</span></div>
    <div><strong>1</strong><span>Course</span></div>
  </div>
  <a class="btn" href="#">Say hello</a>
</main>`,
    css: `* { box-sizing: border-box; }
body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: "Trebuchet MS", Verdana, sans-serif;
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 209, 102, 0.35), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(31, 185, 166, 0.3), transparent 45%),
    #152033;
  color: #f7f4ea;
  padding: 24px;
}
.card {
  width: min(360px, 100%);
  background: rgba(255, 253, 247, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-radius: 22px;
  padding: 28px;
  text-align: center;
  backdrop-filter: blur(8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}
.avatar {
  width: 74px;
  height: 74px;
  margin: 0 auto 14px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #ffd166;
  color: #152033;
  font-weight: 800;
  font-size: 1.5rem;
  border: 3px solid #152033;
}
h1 { margin: 0 0 4px; font-size: 1.7rem; letter-spacing: -0.03em; }
.role { color: #ffd166; font-weight: 700; margin: 0 0 12px; }
.bio { color: #c7d0e2; font-size: 0.92rem; line-height: 1.5; }
.stats {
  display: flex;
  justify-content: space-around;
  margin: 18px 0;
  padding: 14px 0;
  border-top: 1px solid rgba(255,255,255,0.2);
  border-bottom: 1px solid rgba(255,255,255,0.2);
}
.stats div { display: flex; flex-direction: column; gap: 2px; }
.stats strong { font-size: 1.3rem; }
.stats span { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: #aebbd2; }
.btn {
  display: inline-block;
  background: #ff6b57;
  color: white;
  text-decoration: none;
  font-weight: 800;
  padding: 10px 18px;
  border-radius: 10px;
  border: 2px solid #152033;
}`,
    js: `document.querySelector(".btn").addEventListener("click", function (event) {
  event.preventDefault();
  this.textContent = "Hello there!";
});`
  },
  {
    id: "pizza-planner",
    title: "Pizza Party Planner",
    level: "Beginner",
    concepts: ["JavaScript", "Events", "DOM"],
    blurb: "Pick toppings, watch the price update live, and print a summary. Great practice for events and state.",
    art: "linear-gradient(135deg, #ff9f43, #ff6b57)",
    html: `<main>
  <h1>Pizza Party Planner</h1>
  <p class="sub">Choose your size and toppings.</p>
  <div class="size-row">
    <button class="size active" data-price="8">Small $8</button>
    <button class="size" data-price="11">Medium $11</button>
    <button class="size" data-price="14">Large $14</button>
  </div>
  <div class="toppings">
    <label><input type="checkbox" value="2" data-name="Cheese"> Extra cheese +$2</label>
    <label><input type="checkbox" value="2" data-name="Pepperoni"> Pepperoni +$2</label>
    <label><input type="checkbox" value="1.5" data-name="Mushrooms"> Mushrooms +$1.50</label>
    <label><input type="checkbox" value="1" data-name="Olives"> Olives +$1</label>
    <label><input type="checkbox" value="2.5" data-name="Pineapple"> Pineapple +$2.50</label>
  </div>
  <div class="total">Total: $<span id="total">8.00</span></div>
  <button id="order" class="order">Place order</button>
  <p id="receipt" class="receipt"></p>
</main>`,
    css: `* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Verdana, sans-serif;
  background: #fff8e7;
  color: #152033;
  padding: 24px;
  display: grid;
  place-items: center;
}
main { width: min(460px, 100%); }
h1 { margin: 0 0 4px; }
.sub { color: #66738b; margin: 0 0 16px; }
.size-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.size {
  flex: 1;
  min-width: 90px;
  padding: 10px;
  border: 2px solid #152033;
  border-radius: 10px;
  background: white;
  font-weight: bold;
  cursor: pointer;
}
.size.active { background: #ff9f43; }
.toppings { display: grid; gap: 8px; margin-bottom: 16px; }
.toppings label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: white;
  border: 2px solid #152033;
  border-radius: 10px;
  cursor: pointer;
}
.total { font-size: 1.6rem; font-weight: 800; margin: 12px 0; }
.order {
  width: 100%;
  padding: 12px;
  border: 2px solid #152033;
  border-radius: 10px;
  background: #ff6b57;
  color: white;
  font-weight: 800;
  cursor: pointer;
}
.receipt { margin-top: 14px; background: #fffdf7; border: 2px dashed #152033; border-radius: 10px; padding: 12px; min-height: 1.4em; }`,
    js: `const sizes = document.querySelectorAll(".size");
const toppings = document.querySelectorAll(".toppings input");
const totalEl = document.getElementById("total");
const receipt = document.getElementById("receipt");
let basePrice = 8;

function calculate() {
  let total = basePrice;
  toppings.forEach(function (input) {
    if (input.checked) total += Number(input.value);
  });
  totalEl.textContent = total.toFixed(2);
}

sizes.forEach(function (btn) {
  btn.addEventListener("click", function () {
    sizes.forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    basePrice = Number(btn.dataset.price);
    calculate();
  });
});

toppings.forEach(function (input) {
  input.addEventListener("change", calculate);
});

document.getElementById("order").addEventListener("click", function () {
  const chosen = [];
  toppings.forEach(function (input) {
    if (input.checked) chosen.push(input.dataset.name);
  });
  const size = document.querySelector(".size.active").textContent.split(" ")[0];
  receipt.textContent = "Order placed: " + size + " pizza with " + (chosen.length ? chosen.join(", ") : "no extras") + ". Total $" + totalEl.textContent + ".";
});

calculate();`
  },
  {
    id: "creature-cards",
    title: "Creature Cards",
    level: "Beginner",
    concepts: ["Arrays", "Objects", "Filter"],
    blurb: "A data-driven card gallery with filter buttons. Shows how arrays of objects become a real interface.",
    art: "linear-gradient(135deg, #1fb9a6, #5b8cff)",
    html: `<main>
  <h1>Creature Cards</h1>
  <p class="sub">Filter by habitat.</p>
  <div class="filters">
    <button class="filter active" data-habitat="all">All</button>
    <button class="filter" data-habitat="forest">Forest</button>
    <button class="filter" data-habitat="ocean">Ocean</button>
    <button class="filter" data-habitat="desert">Desert</button>
  </div>
  <div id="grid" class="grid"></div>
</main>`,
    css: `* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Verdana, sans-serif;
  background: #eef8f6;
  color: #152033;
  padding: 24px;
}
h1 { margin: 0 0 4px; }
.sub { color: #66738b; margin: 0 0 16px; }
.filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.filter {
  padding: 8px 12px;
  border: 2px solid #152033;
  border-radius: 999px;
  background: white;
  font-weight: bold;
  cursor: pointer;
}
.filter.active { background: #1fb9a6; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
.card {
  background: white;
  border: 2px solid #152033;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 4px 4px 0 rgba(21, 32, 51, 0.15);
}
.card .emoji { font-size: 2.4rem; display: block; margin-bottom: 6px; }
.card h2 { margin: 0 0 4px; font-size: 1.1rem; }
.card p { margin: 0; color: #66738b; font-size: 0.85rem; }
.card .tag {
  display: inline-block;
  margin-top: 8px;
  padding: 2px 8px;
  background: #eef2ff;
  border: 1px solid #b4c6ff;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
}`,
    js: `const creatures = [
  { name: "Fern Fox", habitat: "forest", emoji: "🦊", fact: "Hides in ferns." },
  { name: "Coral Crab", habitat: "ocean", emoji: "🦀", fact: "Loves tide pools." },
  { name: "Dune Lizard", habitat: "desert", emoji: "🦎", fact: "Basks on hot sand." },
  { name: "Moss Frog", habitat: "forest", emoji: "🐸", fact: "Sleeps under logs." },
  { name: "Ray Ray", habitat: "ocean", emoji: "🐟", fact: "Glides in schools." },
  { name: "Sand Hopper", habitat: "desert", emoji: "🦗", fact: "Jumps at night." }
];

const grid = document.getElementById("grid");

function render(habitat) {
  grid.innerHTML = "";
  const list = habitat === "all" ? creatures : creatures.filter(function (c) { return c.habitat === habitat; });
  list.forEach(function (creature) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      "<span class='emoji'>" + creature.emoji + "</span>" +
      "<h2>" + creature.name + "</h2>" +
      "<p>" + creature.fact + "</p>" +
      "<span class='tag'>" + creature.habitat + "</span>";
    grid.appendChild(card);
  });
}

document.querySelectorAll(".filter").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    render(btn.dataset.habitat);
  });
});

render("all");`
  },
  {
    id: "quiz-quest",
    title: "Quiz Quest",
    level: "Intermediate",
    concepts: ["State", "Events", "Arrays"],
    blurb: "A five-question quiz with score tracking and a restart button. A mini game you can expand.",
    art: "linear-gradient(135deg, #9b7bff, #ff8fbf)",
    html: `<main>
  <h1>Quiz Quest</h1>
  <p id="progress" class="progress-text">Question 1 of 5</p>
  <div id="question" class="question">Loading...</div>
  <div id="choices" class="choices"></div>
  <p id="feedback" class="feedback"></p>
  <button id="next" class="next" disabled>Next</button>
  <div id="result" class="result" hidden>
    <h2>Your score: <span id="score">0</span>/5</h2>
    <button id="restart">Play again</button>
  </div>
</main>`,
    css: `* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Verdana, sans-serif;
  background: #f3efff;
  color: #152033;
  padding: 24px;
  display: grid;
  place-items: center;
}
main { width: min(520px, 100%); }
h1 { margin: 0 0 4px; }
.progress-text { color: #66738b; margin: 0 0 16px; }
.question { font-size: 1.15rem; font-weight: bold; margin-bottom: 14px; }
.choices { display: grid; gap: 8px; }
.choice {
  text-align: left;
  padding: 10px 12px;
  border: 2px solid #152033;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  font: inherit;
}
.choice.correct { background: #e4f8ef; border-color: #177a5e; }
.choice.wrong { background: #ffebe7; border-color: #a43022; }
.feedback { min-height: 1.4em; font-weight: bold; margin: 12px 0; }
.next, .result button {
  padding: 10px 16px;
  border: 2px solid #152033;
  border-radius: 10px;
  background: #9b7bff;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
.result { margin-top: 18px; text-align: center; }`,
    js: `const quiz = [
  { q: "Which tag is a heading?", a: 0, options: ["<h1>", "<p>", "<div>", "<span>"] },
  { q: "Which property changes text color?", a: 1, options: ["font-size", "color", "margin", "padding"] },
  { q: "What does === check?", a: 2, options: ["Assignment", "Loose equality", "Strict equality", "Addition"] },
  { q: "Which method adds to an array's end?", a: 1, options: ["pop", "push", "shift", "slice"] },
  { q: "What does JSON.stringify do?", a: 0, options: ["Object to string", "String to object", "Saves data", "Deletes data"] }
];

let index = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const progressEl = document.getElementById("progress");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

function showQuestion() {
  answered = false;
  nextBtn.disabled = true;
  feedbackEl.textContent = "";
  const item = quiz[index];
  progressEl.textContent = "Question " + (index + 1) + " of " + quiz.length;
  questionEl.textContent = item.q;
  choicesEl.innerHTML = "";
  item.options.forEach(function (option, i) {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = option;
    btn.addEventListener("click", function () { answer(i); });
    choicesEl.appendChild(btn);
  });
}

function answer(choice) {
  if (answered) return;
  answered = true;
  const item = quiz[index];
  const buttons = choicesEl.querySelectorAll(".choice");
  buttons.forEach(function (btn, i) {
    if (i === item.a) btn.classList.add("correct");
    if (i === choice && i !== item.a) btn.classList.add("wrong");
    btn.disabled = true;
  });
  if (choice === item.a) {
    score++;
    feedbackEl.textContent = "Correct!";
  } else {
    feedbackEl.textContent = "The answer was " + item.options[item.a] + ".";
  }
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", function () {
  index++;
  if (index >= quiz.length) {
    questionEl.parentElement.querySelector("#choices").innerHTML = "";
    document.getElementById("question").hidden = true;
    progressEl.hidden = true;
    feedbackEl.hidden = true;
    nextBtn.hidden = true;
    resultEl.hidden = false;
    scoreEl.textContent = score;
  } else {
    showQuestion();
  }
});

document.getElementById("restart").addEventListener("click", function () {
  index = 0;
  score = 0;
  document.getElementById("question").hidden = false;
  progressEl.hidden = false;
  feedbackEl.hidden = false;
  nextBtn.hidden = false;
  resultEl.hidden = true;
  showQuestion();
});

showQuestion();`
  },
  {
    id: "focus-timer",
    title: "Focus Timer",
    level: "Intermediate",
    concepts: ["setInterval", "localStorage", "State"],
    blurb: "A Pomodoro-style timer with a progress ring and a saved session count. Great for learning intervals.",
    art: "linear-gradient(135deg, #2dd4bf, #152033)",
    html: `<main>
  <h1>Focus Timer</h1>
  <div class="ring-wrap">
    <svg class="ring" viewBox="0 0 120 120" aria-hidden="true">
      <circle class="track" cx="60" cy="60" r="52"></circle>
      <circle class="value" id="progress-ring" cx="60" cy="60" r="52"></circle>
    </svg>
    <div class="time" id="time">25:00</div>
  </div>
  <div class="controls">
    <button id="start">Start</button>
    <button id="pause">Pause</button>
    <button id="reset">Reset</button>
  </div>
  <p id="sessions" class="sessions">Sessions completed: 0</p>
</main>`,
    css: `* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Verdana, sans-serif;
  background: #0f1a2b;
  color: #f7f4ea;
  padding: 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
}
main { text-align: center; }
h1 { margin: 0 0 18px; }
.ring-wrap { position: relative; width: 220px; height: 220px; margin: 0 auto 18px; }
.ring { width: 100%; height: 100%; transform: rotate(-90deg); }
.ring circle { fill: none; stroke-width: 10; }
.track { stroke: rgba(255,255,255,0.15); }
.value { stroke: #2dd4bf; stroke-linecap: round; transition: stroke-dashoffset 0.4s linear; }
.time {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}
.controls { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
.controls button {
  padding: 10px 16px;
  border: 2px solid #f7f4ea;
  border-radius: 10px;
  background: transparent;
  color: #f7f4ea;
  font-weight: bold;
  cursor: pointer;
}
.controls button:hover { background: rgba(255,255,255,0.1); }
.sessions { margin-top: 16px; color: #aebbd2; }`,
    js: `const TOTAL = 25 * 60;
let remaining = TOTAL;
let timer = null;
let sessions = 0;

try {
  sessions = Number(localStorage.getItem("focusSessions") || 0);
} catch (e) {
  sessions = 0;
}

const ring = document.getElementById("progress-ring");
const circumference = 2 * Math.PI * 52;
ring.style.strokeDasharray = circumference;
ring.style.strokeDashoffset = 0;

function format(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

function update() {
  document.getElementById("time").textContent = format(remaining);
  const progress = 1 - remaining / TOTAL;
  ring.style.strokeDashoffset = circumference * (1 - progress);
}

function complete() {
  clearInterval(timer);
  timer = null;
  remaining = TOTAL;
  sessions++;
  try { localStorage.setItem("focusSessions", String(sessions)); } catch (e) {}
  document.getElementById("sessions").textContent = "Sessions completed: " + sessions;
  update();
}

document.getElementById("start").addEventListener("click", function () {
  if (timer) return;
  timer = setInterval(function () {
    remaining--;
    if (remaining <= 0) complete();
    else update();
  }, 1000);
});

document.getElementById("pause").addEventListener("click", function () {
  clearInterval(timer);
  timer = null;
});

document.getElementById("reset").addEventListener("click", function () {
  clearInterval(timer);
  timer = null;
  remaining = TOTAL;
  update();
});

document.getElementById("sessions").textContent = "Sessions completed: " + sessions;
update();`
  },
  {
    id: "todo-quest",
    title: "To-Do Quest",
    level: "Intermediate",
    concepts: ["localStorage", "CRUD", "State"],
    blurb: "A localStorage-backed to-do list with add, complete, delete and filter. A classic first real app.",
    art: "linear-gradient(135deg, #ffd166, #ff9f43)",
    html: `<main>
  <h1>To-Do Quest</h1>
  <form id="add-form" class="add-form">
    <input id="new-task" placeholder="New quest..." aria-label="New quest">
    <button type="submit">Add</button>
  </form>
  <div class="filters">
    <button class="filter active" data-filter="all">All</button>
    <button class="filter" data-filter="active">Active</button>
    <button class="filter" data-filter="done">Done</button>
  </div>
  <ul id="list" class="list"></ul>
  <p id="stats" class="stats">0 tasks</p>
</main>`,
    css: `* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Verdana, sans-serif;
  background: #fff8e7;
  color: #152033;
  padding: 24px;
  display: grid;
  place-items: center;
}
main { width: min(520px, 100%); }
h1 { margin: 0 0 12px; }
.add-form { display: flex; gap: 8px; margin-bottom: 12px; }
.add-form input {
  flex: 1;
  padding: 10px;
  border: 2px solid #152033;
  border-radius: 10px;
  font: inherit;
}
.add-form button, .filters button {
  padding: 10px 14px;
  border: 2px solid #152033;
  border-radius: 10px;
  background: #ffd166;
  font-weight: bold;
  cursor: pointer;
}
.filters { display: flex; gap: 8px; margin-bottom: 12px; }
.filters button.active { background: #ff9f43; }
.list { list-style: none; padding: 0; margin: 0; }
.list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: white;
  border: 2px solid #152033;
  border-radius: 10px;
  margin-bottom: 8px;
}
.list li.done span { text-decoration: line-through; color: #8a94a6; }
.list li button {
  margin-left: auto;
  background: #ffebe7;
  color: #a43022;
  border: 2px solid #152033;
  border-radius: 8px;
  padding: 4px 8px;
  font-weight: bold;
  cursor: pointer;
}
.stats { color: #66738b; margin-top: 10px; }`,
    js: `let tasks = [];
let nextId = 1;
let filter = "all";

try {
  tasks = JSON.parse(localStorage.getItem("todoQuest") || "[]");
  nextId = tasks.reduce(function (max, t) { return Math.max(max, t.id); }, 0) + 1;
} catch (e) {
  tasks = [];
}

function save() {
  try { localStorage.setItem("todoQuest", JSON.stringify(tasks)); } catch (e) {}
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";
  const visible = tasks.filter(function (task) {
    if (filter === "active") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });
  visible.forEach(function (task) {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = task.done;
    cb.addEventListener("change", function () {
      task.done = cb.checked;
      save();
      render();
    });
    const span = document.createElement("span");
    span.textContent = task.text;
    const remove = document.createElement("button");
    remove.textContent = "x";
    remove.addEventListener("click", function () {
      tasks = tasks.filter(function (t) { return t.id !== task.id; });
      save();
      render();
    });
    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(remove);
    list.appendChild(li);
  });
  const done = tasks.filter(function (t) { return t.done; }).length;
  document.getElementById("stats").textContent =
    tasks.length + " task" + (tasks.length === 1 ? "" : "s") + " - " + done + " done";
}

document.getElementById("add-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.getElementById("new-task");
  const text = input.value.trim();
  if (text) tasks.push({ id: nextId++, text: text, done: false });
  input.value = "";
  save();
  render();
});

document.querySelectorAll(".filter").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    filter = btn.dataset.filter;
    render();
  });
});

render();`
  }
];
