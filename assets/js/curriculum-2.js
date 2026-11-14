/* =========================================================
   Course content, part 2 (Worlds 6-10 + final exam)
   Web Dev: Zero to Grandmaster - by Aadarsh Joshi
   ========================================================= */

COURSE.worlds.push(
  {
    id: "dom-dungeon",
    num: 6,
    title: "DOM Dungeon",
    tagline: "Make the page react to people.",
    color: "#ff8fbf",
    intro: "The DOM is the live copy of your page. Learn to find elements, change them, and respond to clicks, typing and forms.",
    lessons: [
      {
        id: "d1",
        title: "Meet the DOM",
        minutes: 7,
        xp: 20,
        goal: "Find elements in the page and change their text.",
        sections: [
          {
            h: "The browser keeps a live copy",
            p: "When the browser reads your HTML, it builds a **DOM**, a tree of objects representing every element. JavaScript can read and change that tree. Change the DOM and the page changes instantly, without reloading."
          },
          {
            h: "Find elements with querySelector",
            p: "`document.querySelector(\"#title\")` returns the first element with that ID. `document.querySelectorAll(\".card\")` returns all matching elements as a list. You can also find by tag, like `document.querySelector(\"button\")`."
          },
          {
            h: "Change text safely",
            p: "`element.textContent = \"New text\"` replaces the text inside. Use `textContent` instead of `innerHTML` when you are showing plain text, because textContent does not run HTML or scripts. It is safer and faster."
          }
        ],
        demo: {
          html: `<h1 id="title">Old title</h1>
<p class="note">This note will change.</p>
<button id="go">Change the page</button>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
h1 { color: #c2185b; }
button { font: inherit; padding: 8px 14px; border: 2px solid #152033; border-radius: 8px; background: #ff8fbf; font-weight: bold; }`,
          js: `const title = document.querySelector("#title");
const note = document.querySelector(".note");

document.getElementById("go").addEventListener("click", function () {
  title.textContent = "New title!";
  note.textContent = "The text changed without reloading.";
});`
        },
        challenge: {
          text: "Make a button that changes two parts of the page.",
          steps: [
            "Give an h1 an id and select it with querySelector.",
            "Give a paragraph a class and select it too.",
            "Change both with textContent when a button is clicked.",
            "Use different text each time or add a counter."
          ],
          starter: {
            html: `<h1 id="title">Before</h1>
<p class="note">Waiting...</p>
<button id="go">Update</button>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
button { font: inherit; padding: 8px 14px; border: 2px solid #152033; border-radius: 8px; background: #ff8fbf; font-weight: bold; }`,
            js: `const title = document.querySelector("#title");
const note = document.querySelector(".note");

document.getElementById("go").addEventListener("click", function () {
  title.textContent = "After";
  note.textContent = "Updated at " + new Date().toLocaleTimeString();
});`
          }
        },
        quiz: {
          q: "Which method selects the first element with id=\"score\"?",
          options: ["document.querySelector(\"#score\")", "document.querySelectorAll(\"#score\")", "document.getElementById(\".score\")", "document.find(\"score\")"],
          answer: 0,
          why: "querySelector uses CSS selectors, so #score selects an ID. querySelectorAll returns a list."
        }
      },
      {
        id: "d2",
        title: "Change Styles and Classes",
        minutes: 7,
        xp: 20,
        goal: "Update appearance with style and classList.",
        sections: [
          {
            h: "style changes one thing",
            p: "`element.style.color = \"red\"` changes a single CSS property. It is useful for small live changes like a progress bar width. Property names use camelCase in JavaScript: `backgroundColor`, not `background-color`."
          },
          {
            h: "classList is usually better",
            p: "`element.classList.add(\"active\")`, `.remove(\"active\")`, `.toggle(\"active\")` and `.contains(\"active\")` manage classes. Put your real styling in CSS classes and let JavaScript turn them on and off. This keeps styling in one place."
          },
          {
            h: "Avoid inline style spam",
            p: "Setting ten inline styles from JavaScript becomes hard to maintain. A better pattern is: define `.on`, `.off`, `.error` and `.success` classes in CSS, then toggle them. Your code stays short and your design stays consistent."
          }
        ],
        demo: {
          html: `<div class="box" id="box">Click me</div>
<button id="toggle">Toggle glow</button>
<button id="color">Change color</button>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
.box {
  width: 180px;
  height: 180px;
  display: grid;
  place-items: center;
  background: #fff5d6;
  border: 3px solid #152033;
  border-radius: 18px;
  font-weight: bold;
  transition: transform 150ms ease;
}
.glow { box-shadow: 0 0 0 6px rgba(255, 107, 87, 0.35); transform: scale(1.05); }`,
          js: `const box = document.getElementById("box");
const toggle = document.getElementById("toggle");
const color = document.getElementById("color");

toggle.addEventListener("click", function () {
  box.classList.toggle("glow");
});

color.addEventListener("click", function () {
  box.style.background = "#9bd9c7";
  box.style.color = "#152033";
});`
        },
        challenge: {
          text: "Make a button that toggles a warning style.",
          steps: [
            "Create a card with a normal class.",
            "Add a second class called warning to CSS.",
            "Toggle it with classList.toggle.",
            "Change one inline style as well."
          ],
          starter: {
            html: `<div class="box" id="box">Status</div>
<button id="toggle">Toggle warning</button>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
.box { padding: 16px; border: 2px solid #152033; border-radius: 12px; background: #fff5d6; font-weight: bold; }
.warning { background: #ffebe7; color: #a43022; }`,
            js: `const box = document.getElementById("box");
document.getElementById("toggle").addEventListener("click", function () {
  box.classList.toggle("warning");
  box.style.transform = box.classList.contains("warning") ? "rotate(2deg)" : "none";
});`
          }
        },
        quiz: {
          q: "Which line toggles a class called open on an element?",
          options: [
            "element.style.open = true;",
            "element.classList.toggle(\"open\");",
            "element.class = \"open\";",
            "element.toggleClass(\"open\");"
          ],
          answer: 1,
          why: "classList.toggle adds the class if it is missing and removes it if it is present."
        }
      },
      {
        id: "d3",
        title: "Events",
        minutes: 8,
        xp: 20,
        goal: "Respond to clicks, typing and form submissions.",
        sections: [
          {
            h: "addEventListener listens for actions",
            p: "`element.addEventListener(\"click\", function () { ... })` runs the function when the click happens. The browser passes an **event object** with details like which key was pressed or where the mouse clicked."
          },
          {
            h: "Common events",
            p: "`click` for buttons, `input` for live typing, `change` when a field finishes, `submit` for forms, `keydown` for keyboard keys, `mouseover` and `mouseout` for hover. Start with click and input; they cover most beginner needs."
          },
          {
            h: "Stop the default action",
            p: "A form submit reloads the page by default. Call `event.preventDefault();` inside the submit handler to stop it. The same trick stops links from navigating. You need this whenever you want JavaScript to handle the action instead."
          }
        ],
        demo: {
          html: `<form id="form">
  <input id="name" placeholder="Your name" aria-label="Your name">
  <button type="submit">Say hi</button>
</form>
<p id="out">...</p>
<input id="live" placeholder="Type here" aria-label="Type here">
<p id="live-out">...</p>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
input, button { font: inherit; padding: 8px 10px; border: 2px solid #152033; border-radius: 8px; margin-right: 6px; }
button { background: #ff6b57; color: white; font-weight: bold; }
#out, #live-out { font-weight: bold; margin-top: 10px; }`,
          js: `document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  document.getElementById("out").textContent = name ? "Hi, " + name + "!" : "Please type a name.";
});

document.getElementById("live").addEventListener("input", function (event) {
  document.getElementById("live-out").textContent = "You typed: " + event.target.value;
});`
        },
        challenge: {
          text: "Build a tiny greeting form.",
          steps: [
            "Create a form with one input and a submit button.",
            "Prevent the page reload on submit.",
            "Show a greeting using the typed name.",
            "Add a live character counter using the input event."
          ],
          starter: {
            html: `<form id="form">
  <input id="name" placeholder="Name" aria-label="Name">
  <button type="submit">Greet</button>
</form>
<p id="out">...</p>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
input, button { font: inherit; padding: 8px 10px; border: 2px solid #152033; border-radius: 8px; }`,
            js: `document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  document.getElementById("out").textContent = name ? "Hello, " + name + "!" : "Please type a name.";
});`
          }
        },
        quiz: {
          q: "Why call event.preventDefault() in a form submit handler?",
          options: [
            "To stop JavaScript from running",
            "To stop the browser from reloading the page",
            "To clear the input",
            "To make the button bigger"
          ],
          answer: 1,
          why: "Forms reload the page by default. preventDefault lets your JavaScript handle the submission instead."
        }
      },
      {
        id: "d4",
        title: "Build a Color Switch Game",
        minutes: 10,
        xp: 20,
        goal: "Combine DOM selection, events, classes and state in a small game.",
        sections: [
          {
            h: "State lives in a variable",
            p: "The game needs to remember the current color. Store it in a variable called `currentColor`. When the player clicks a button, update the variable and the screen together. If the variable and the screen disagree, bugs appear."
          },
          {
            h: "Generate choices",
            p: "Pick a target color, then create three or four buttons, one of which is correct. You can hard-code the choices for a first version and randomize later. Working code first, clever code second."
          },
          {
            h: "Feedback matters",
            p: "Tell the player whether they were right or wrong immediately. Add a score and a streak. Small feedback loops make games feel alive and keep people playing."
          }
        ],
        demo: {
          html: `<h1>Color Switch</h1>
<p>Click the color that matches the word.</p>
<div class="word" id="word">coral</div>
<div id="choices" class="choices"></div>
<p id="score">Score: 0 | Streak: 0</p>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; text-align: center; }
.word { font-size: 30px; font-weight: bold; margin: 14px 0; }
.choices { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.choice { width: 70px; height: 70px; border: 3px solid #152033; border-radius: 12px; cursor: pointer; }
#score { font-weight: bold; margin-top: 14px; }`,
          js: `const colors = ["#ff6b57", "#ffd166", "#1fb9a6", "#5b8cff"];
const names = ["coral", "yellow", "teal", "blue"];
let score = 0;
let streak = 0;
let target = 0;

function setup() {
  target = Math.floor(Math.random() * colors.length);
  document.getElementById("word").textContent = names[target];
  document.getElementById("word").style.color = colors[target];
  const choices = document.getElementById("choices");
  choices.innerHTML = "";
  colors.forEach((color, index) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.style.background = color;
    btn.addEventListener("click", () => guess(index));
    choices.appendChild(btn);
  });
}

function guess(index) {
  const result = document.getElementById("score");
  if (index === target) {
    score++;
    streak++;
    result.textContent = "Correct! Score: " + score + " | Streak: " + streak;
  } else {
    streak = 0;
    result.textContent = "Try again. Score: " + score + " | Streak: 0";
  }
  setup();
}

setup();`
        },
        challenge: {
          text: "Build a simpler version with three fixed colors.",
          steps: [
            "Pick a target color name and show it.",
            "Create three colored buttons.",
            "Check if the clicked color matches the target.",
            "Update a score message for right and wrong answers."
          ],
          starter: {
            html: `<h1>Color Switch</h1>
<p id="target">Click coral</p>
<div class="choices">
  <button class="choice" data-color="coral" style="background:#ff6b57"></button>
  <button class="choice" data-color="teal" style="background:#1fb9a6"></button>
  <button class="choice" data-color="blue" style="background:#5b8cff"></button>
</div>
<p id="out">Score: 0</p>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; text-align: center; }
.choices { display: flex; gap: 10px; justify-content: center; }
.choice { width: 70px; height: 70px; border: 3px solid #152033; border-radius: 12px; cursor: pointer; }`,
            js: `let score = 0;
const target = "coral";

document.querySelectorAll(".choice").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const out = document.getElementById("out");
    if (btn.dataset.color === target) {
      score++;
      out.textContent = "Correct! Score: " + score;
    } else {
      out.textContent = "Nope. Score: " + score;
    }
  });
});`
          }
        },
        quiz: {
          q: "What is the best way to remember the current color in the game?",
          options: [
            "Store it in a CSS class only",
            "Store it in a JavaScript variable",
            "Store it in the HTML title",
            "Store it in the font size"
          ],
          answer: 1,
          why: "A JavaScript variable keeps the current state. The screen should mirror that variable, not be the source of truth."
        }
      }
    ],
    boss: {
      title: "The Event Wraith",
      intro: "The Wraith appears only when something happens. Prove you can catch it.",
      questions: [
        {
          q: "Which method adds a click handler to a button?",
          options: [
            "button.onClick = run;",
            "button.addEventListener(\"click\", run);",
            "button.listen(\"click\", run);",
            "button.addEvent(\"click\", run);"
          ],
          answer: 1,
          why: "addEventListener is the standard method. It allows multiple handlers and clean removal."
        },
        {
          q: "Why is classList.toggle better than setting style directly for a theme switch?",
          options: [
            "It is always faster",
            "It keeps styling in CSS and logic in JavaScript",
            "It works without a browser",
            "It prevents forms from submitting"
          ],
          answer: 1,
          why: "Classes move visual rules into CSS. JavaScript only decides which state is active."
        },
        {
          q: "What does event.preventDefault() do on a form submit?",
          options: [
            "Stops the page from reloading",
            "Clears all inputs",
            "Sends the data to the server",
            "Disables the button"
          ],
          answer: 0,
          why: "It cancels the browser's default action, which for a form is a page reload."
        }
      ]
    }
  },
  {
    id: "data-desert",
    num: 7,
    title: "Data Desert",
    tagline: "Store and shape information.",
    color: "#ff9f43",
    intro: "Arrays and objects are how programs remember lists, players, products and scores. Learn to store data and transform it.",
    lessons: [
      {
        id: "a1",
        title: "Arrays",
        minutes: 7,
        xp: 20,
        goal: "Create arrays, read items, and change them.",
        sections: [
          {
            h: "Arrays hold lists",
            p: "An array is an ordered list in square brackets: `const colors = [\"red\", \"green\", \"blue\"]`. Items are separated by commas. Arrays can hold strings, numbers, booleans, objects, even other arrays."
          },
          {
            h: "Indexes start at zero",
            p: "The first item is at index 0. `colors[0]` is \"red\". `colors.length` tells you how many items there are. The last item is at `colors.length - 1`. Off-by-one errors are common, so check carefully."
          },
          {
            h: "Change, add, remove",
            p: "`colors[1] = \"yellow\"` replaces an item. `colors.push(\"purple\")` adds to the end. `colors.pop()` removes the last item. `colors.unshift()` adds to the start. For serious work, prefer methods that do not mutate the original when you can."
          }
        ],
        demo: {
          html: `<h1>Snack List</h1>
<input id="new" placeholder="Add a snack" aria-label="Add a snack">
<button id="add">Add</button>
<button id="remove">Remove last</button>
<ul id="list"></ul>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
input, button { font: inherit; padding: 8px 10px; border: 2px solid #152033; border-radius: 8px; margin-right: 6px; margin-bottom: 8px; }
button { background: #ff9f43; font-weight: bold; }
li { margin: 4px 0; }`,
          js: `const snacks = ["apple", "toast"];
const list = document.getElementById("list");

function render() {
  list.innerHTML = "";
  snacks.forEach(function (snack, index) {
    const item = document.createElement("li");
    item.textContent = index + ": " + snack;
    list.appendChild(item);
  });
}

document.getElementById("add").addEventListener("click", function () {
  const value = document.getElementById("new").value.trim();
  if (value) snacks.push(value);
  document.getElementById("new").value = "";
  render();
});

document.getElementById("remove").addEventListener("click", function () {
  snacks.pop();
  render();
});

render();`
        },
        challenge: {
          text: "Build a list manager.",
          steps: [
            "Start with an array of three items.",
            "Render them with forEach.",
            "Add a button that pushes a new item.",
            "Add a button that removes the last item."
          ],
          starter: {
            html: `<h1>My List</h1>
<ul id="list"></ul>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
li { margin: 4px 0; }`,
            js: `const items = ["one", "two", "three"];
const list = document.getElementById("list");

function render() {
  list.innerHTML = "";
  items.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

render();`
          }
        },
        quiz: {
          q: "What is the index of the first item in an array?",
          options: ["1", "0", "-1", "first"],
          answer: 1,
          why: "JavaScript arrays are zero-based. The first item is at index 0."
        }
      },
      {
        id: "a2",
        title: "Objects",
        minutes: 8,
        xp: 20,
        goal: "Group related information into objects.",
        sections: [
          {
            h: "Objects are key-value pairs",
            p: "An object groups related information. `const player = { name: \"Mochi\", score: 12, ready: true };`. Each key is a name, and each value can be any type. Objects are the building blocks of almost every real program."
          },
          {
            h: "Read and write properties",
            p: "Use a dot: `player.name` gives \"Mochi\". Use brackets when the key is stored in a variable: `player[\"score\"]`. You can add or change properties at any time: `player.lives = 3;`."
          },
          {
            h: "Objects inside objects",
            p: "Values can be objects too. `player.inventory = { coins: 10, keys: 1 };`. Arrays can hold objects, which is how you represent a list of players, products or posts. This is the shape of real data."
          }
        ],
        demo: {
          html: `<h1>Player Profile</h1>
<div id="card" class="card">Loading...</div>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
.card {
  background: white;
  border: 2px solid #152033;
  border-radius: 14px;
  padding: 20px;
  max-width: 320px;
  box-shadow: 5px 5px 0 #152033;
}
.card h2 { margin-top: 0; color: #b35b1d; }`,
          js: `const player = {
  name: "Mochi",
  score: 128,
  ready: true,
  inventory: { coins: 14, keys: 2 }
};

const card = document.getElementById("card");
card.innerHTML = "<h2>" + player.name + "</h2>" +
  "<p>Score: " + player.score + "</p>" +
  "<p>Ready: " + player.ready + "</p>" +
  "<p>Coins: " + player.inventory.coins + "</p>";`
        },
        challenge: {
          text: "Create an object for something you care about.",
          steps: [
            "Create an object with at least four properties.",
            "Include one nested object.",
            "Read two properties and show them on the page.",
            "Change one property and show the new value."
          ],
          starter: {
            html: `<h1>My Object</h1>
<p id="out">...</p>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }`,
            js: `const book = {
  title: "The Lost Star",
  author: "A. Joshi",
  pages: 210,
  rating: { stars: 5, reviews: 12 }
};

const out = document.getElementById("out");
out.textContent = book.title + " by " + book.author + " has " + book.pages + " pages.";`
          }
        },
        quiz: {
          q: "How do you read the name property of an object called user?",
          options: ["user[name]", "user.name", "user->name", "user::name"],
          answer: 1,
          why: "Dot notation reads a known property. Bracket notation is for dynamic keys."
        }
      },
      {
        id: "a3",
        title: "Array Power Tools",
        minutes: 9,
        xp: 20,
        goal: "Transform arrays with forEach, map and filter.",
        sections: [
          {
            h: "forEach does something for each item",
            p: "`items.forEach(function (item) { console.log(item); });` runs the function once per item. It is good for displaying or updating. It does not return a new array. Use it when you want side effects, not results."
          },
          {
            h: "map transforms into a new array",
            p: "`const doubled = numbers.map(function (n) { return n * 2; });` returns a new array with the same length, where each item has been transformed. `map` never changes the original array."
          },
          {
            h: "filter keeps what passes",
            p: "`const big = numbers.filter(function (n) { return n > 10; });` returns a new array containing only items where the function returns true. Combine map and filter to build powerful data pipelines."
          }
        ],
        demo: {
          html: `<h1>Number Tools</h1>
<div class="row">
  <div><h3>Original</h3><ul id="original"></ul></div>
  <div><h3>Doubled</h3><ul id="doubled"></ul></div>
  <div><h3>Big (over 5)</h3><ul id="big"></ul></div>
</div>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
.row { display: flex; gap: 24px; flex-wrap: wrap; }
ul { list-style: none; padding: 0; }
li { background: #fff5d6; border: 2px solid #152033; border-radius: 8px; padding: 6px 10px; margin: 4px 0; }`,
          js: `const numbers = [2, 5, 8, 11, 3];

function renderList(id, values) {
  const ul = document.getElementById(id);
  ul.innerHTML = "";
  values.forEach(function (value) {
    const li = document.createElement("li");
    li.textContent = value;
    ul.appendChild(li);
  });
}

renderList("original", numbers);
renderList("doubled", numbers.map(function (n) { return n * 2; }));
renderList("big", numbers.filter(function (n) { return n > 5; }));`
        },
        challenge: {
          text: "Transform an array of names.",
          steps: [
            "Create an array of five names.",
            "Use map to make them all uppercase.",
            "Use filter to keep names longer than four letters.",
            "Render both results on the page."
          ],
          starter: {
            html: `<h1>Name Tools</h1>
<h3>Uppercase</h3><ul id="upper"></ul>
<h3>Long names</h3><ul id="long"></ul>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }`,
            js: `const names = ["Mochi", "Ana", "Ravi", "Zara", "Bo"];
const upper = names.map(function (name) { return name.toUpperCase(); });
const longNames = names.filter(function (name) { return name.length > 4; });

function render(id, values) {
  const ul = document.getElementById(id);
  ul.innerHTML = "";
  values.forEach(function (value) {
    const li = document.createElement("li");
    li.textContent = value;
    ul.appendChild(li);
  });
}

render("upper", upper);
render("long", longNames);`
          }
        },
        quiz: {
          q: "Which method returns a new array of the same length with each item changed?",
          options: ["forEach", "filter", "map", "pop"],
          answer: 2,
          why: "map transforms every item and returns a new array. forEach returns nothing. filter returns a shorter array."
        }
      },
      {
        id: "a4",
        title: "Build a Study Checklist",
        minutes: 10,
        xp: 20,
        goal: "Render an array of objects and update it when the user interacts.",
        sections: [
          {
            h: "Data drives the screen",
            p: "Store the checklist as an array of objects, each with an id, text and done boolean. Render the array to the page. When the user toggles an item, change the data and re-render. The data is the truth; the screen follows."
          },
          {
            h: "Render by clearing and rebuilding",
            p: "For small lists, the simplest approach is to clear the container with `innerHTML = \"\"` and rebuild it each time. It is easy to reason about. For huge lists, you would update only the changed item, but that optimization comes later."
          },
          {
            h: "Keep ids stable",
            p: "Give each item a unique id so you can find it later. `Date.now()` or a counter works. Stable ids matter when you add, remove or reorder items. Without them, you will toggle the wrong row."
          }
        ],
        demo: {
          html: `<h1>Study Checklist</h1>
<form id="add-form">
  <input id="new-task" placeholder="New task" aria-label="New task">
  <button type="submit">Add</button>
</form>
<p id="stats">0 of 0 done</p>
<ul id="list"></ul>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
form { display: flex; gap: 8px; flex-wrap: wrap; }
input, button { font: inherit; padding: 8px 10px; border: 2px solid #152033; border-radius: 8px; }
button { background: #ff9f43; font-weight: bold; }
ul { list-style: none; padding: 0; margin-top: 14px; }
li { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border: 2px solid #152033; border-radius: 8px; margin-bottom: 8px; background: #fffdf7; }
li.done span { text-decoration: line-through; color: #8a94a6; }
li button { margin-left: auto; background: #ffebe7; color: #a43022; font-weight: bold; }`,
          js: `let tasks = [
  { id: 1, text: "Read HTML lesson", done: true },
  { id: 2, text: "Build a bio page", done: false },
  { id: 3, text: "Practice CSS", done: false }
];
let nextId = 4;

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", function () {
      task.done = checkbox.checked;
      render();
    });
    const span = document.createElement("span");
    span.textContent = task.text;
    const remove = document.createElement("button");
    remove.textContent = "x";
    remove.addEventListener("click", function () {
      tasks = tasks.filter(function (t) { return t.id !== task.id; });
      render();
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(remove);
    list.appendChild(li);
  });
  const done = tasks.filter(function (t) { return t.done; }).length;
  document.getElementById("stats").textContent = done + " of " + tasks.length + " done";
}

document.getElementById("add-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.getElementById("new-task");
  const text = input.value.trim();
  if (text) tasks.push({ id: nextId++, text: text, done: false });
  input.value = "";
  render();
});

render();`
        },
        challenge: {
          text: "Build a task list from an array of objects.",
          steps: [
            "Create an array of task objects with id, text and done.",
            "Render them with a checkbox and label.",
            "Toggle done when the checkbox changes.",
            "Show how many tasks are complete."
          ],
          starter: {
            html: `<h1>Tasks</h1>
<ul id="list"></ul>
<p id="stats">0 done</p>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }`,
            js: `const tasks = [
  { id: 1, text: "Learn arrays", done: false },
  { id: 2, text: "Learn objects", done: false }
];

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = task.done;
    cb.addEventListener("change", function () {
      task.done = cb.checked;
      render();
    });
    const span = document.createElement("span");
    span.textContent = task.text;
    li.appendChild(cb);
    li.appendChild(span);
    list.appendChild(li);
  });
  const done = tasks.filter(function (t) { return t.done; }).length;
  document.getElementById("stats").textContent = done + " of " + tasks.length + " done";
}

render();`
          }
        },
        quiz: {
          q: "In the checklist pattern, what should be the source of truth?",
          options: ["The HTML on the screen", "The CSS classes", "The JavaScript data array", "The browser URL"],
          answer: 2,
          why: "Keep the data in JavaScript and render from it. The screen is a view of the data, not the data itself."
        }
      }
    ],
    boss: {
      title: "The Data Sphinx",
      intro: "The Sphinx asks riddles about lists and shapes. Answer all three to cross the desert.",
      questions: [
        {
          q: "What is the value of items[items.length - 1] for const items = [\"a\", \"b\", \"c\"]?",
          options: ["\"a\"", "\"b\"", "\"c\"", "undefined"],
          answer: 2,
          why: "length is 3, so length - 1 is 2, which is the last index. That holds \"c\"."
        },
        {
          q: "Which method returns a new array with only the items that pass a test?",
          options: ["map", "filter", "forEach", "push"],
          answer: 1,
          why: "filter keeps items where the callback returns true and returns a new array."
        },
        {
          q: "How do you read the color property of an object called car?",
          options: ["car[color]", "car.color", "car->color", "car::color"],
          answer: 1,
          why: "Dot notation reads a known property name from an object."
        }
      ]
    }
  },
  {
    id: "browser-basecamp",
    num: 8,
    title: "Browser Basecamp",
    tagline: "Remember things between visits.",
    color: "#79c267",
    intro: "Save data in the browser, validate forms, and learn to find bugs before they find you.",
    lessons: [
      {
        id: "b1",
        title: "localStorage",
        minutes: 7,
        xp: 20,
        goal: "Save and load simple values that survive a page refresh.",
        sections: [
          {
            h: "localStorage is a tiny cupboard",
            p: "The browser can store small pieces of text between visits. `localStorage.setItem(\"name\", \"Mochi\")` saves a value. `localStorage.getItem(\"name\")` reads it back. `localStorage.removeItem(\"name\")` deletes it. The data stays even after you close the tab."
          },
          {
            h: "Only strings",
            p: "localStorage stores strings only. To save a number, store it and convert back with `Number(...)`. To save an object, convert it with `JSON.stringify` first. We will do that in the next lesson."
          },
          {
            h: "Handle missing data",
            p: "If a key does not exist, `getItem` returns `null`. Always check before using the value. A good pattern is: load the value, and if it is null, use a sensible default."
          }
        ],
        demo: {
          html: `<h1>Remember Me</h1>
<input id="name" placeholder="Your name" aria-label="Your name">
<button id="save">Save</button>
<button id="clear">Clear</button>
<p id="out">...</p>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
input, button { font: inherit; padding: 8px 10px; border: 2px solid #152033; border-radius: 8px; margin-right: 6px; margin-bottom: 8px; }
button { background: #79c267; font-weight: bold; }`,
          js: `const input = document.getElementById("name");
const out = document.getElementById("out");

function load() {
  const saved = localStorage.getItem("playerName");
  out.textContent = saved ? "Welcome back, " + saved + "!" : "No saved name yet.";
}

document.getElementById("save").addEventListener("click", function () {
  localStorage.setItem("playerName", input.value.trim());
  load();
});

document.getElementById("clear").addEventListener("click", function () {
  localStorage.removeItem("playerName");
  load();
});

load();`
        },
        challenge: {
          text: "Save a favorite color and reload the page to see it.",
          steps: [
            "Create an input for a color name.",
            "Save it to localStorage when a button is clicked.",
            "On page load, read it and show a message.",
            "Add a clear button that removes it."
          ],
          starter: {
            html: `<h1>Favorite Color</h1>
<input id="color" placeholder="Color" aria-label="Color">
<button id="save">Save</button>
<p id="out">...</p>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }`,
            js: `const input = document.getElementById("color");
const out = document.getElementById("out");

function load() {
  const saved = localStorage.getItem("favColor");
  out.textContent = saved ? "Your favorite color is " + saved + "." : "No saved color yet.";
}

document.getElementById("save").addEventListener("click", function () {
  localStorage.setItem("favColor", input.value.trim());
  load();
});

load();`
          }
        },
        quiz: {
          q: "What does localStorage.getItem return if the key does not exist?",
          options: ["0", "false", "null", "undefined"],
          answer: 2,
          why: "Missing keys return null. Check for null before using the value."
        }
      },
      {
        id: "b2",
        title: "JSON",
        minutes: 8,
        xp: 20,
        goal: "Convert between objects and strings for storage and APIs.",
        sections: [
          {
            h: "JSON is a text format for data",
            p: "**JSON** stands for JavaScript Object Notation. It looks like JavaScript object literals but is just text. It is the standard way to send data between programs and to store structured data as a string."
          },
          {
            h: "stringify and parse",
            p: "`JSON.stringify({ name: \"Mochi\" })` turns an object into a JSON string. `JSON.parse(\"{\\\"name\\\":\\\"Mochi\\\"}\")` turns a JSON string back into an object. These two functions are your bridge between objects and storage."
          },
          {
            h: "Use it with localStorage",
            p: "To save an object: `localStorage.setItem(\"player\", JSON.stringify(player))`. To load it: `const player = JSON.parse(localStorage.getItem(\"player\"))`. Wrap parsing in a try/catch so a corrupted value does not crash the page."
          }
        ],
        demo: {
          html: `<h1>Save a Player</h1>
<button id="save">Save player</button>
<button id="load">Load player</button>
<button id="clear">Clear</button>
<pre id="out">...</pre>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
button { font: inherit; padding: 8px 10px; border: 2px solid #152033; border-radius: 8px; margin-right: 6px; margin-bottom: 8px; background: #79c267; font-weight: bold; }
pre { background: #152033; color: #9bd9c7; padding: 14px; border-radius: 10px; overflow-x: auto; }`,
          js: `const player = { name: "Mochi", score: 140, badges: ["first", "hero"] };
const out = document.getElementById("out");

document.getElementById("save").addEventListener("click", function () {
  localStorage.setItem("player", JSON.stringify(player));
  out.textContent = "Saved: " + JSON.stringify(player);
});

document.getElementById("load").addEventListener("click", function () {
  const raw = localStorage.getItem("player");
  try {
    const loaded = JSON.parse(raw);
    out.textContent = "Loaded: " + JSON.stringify(loaded, null, 2);
  } catch (error) {
    out.textContent = "Could not parse saved data.";
  }
});

document.getElementById("clear").addEventListener("click", function () {
  localStorage.removeItem("player");
  out.textContent = "Cleared.";
});`
        },
        challenge: {
          text: "Save and load a settings object.",
          steps: [
            "Create an object with at least three settings.",
            "Save it with JSON.stringify and localStorage.",
            "Load it with JSON.parse and show it.",
            "Wrap parsing in try/catch."
          ],
          starter: {
            html: `<h1>Settings</h1>
<button id="save">Save</button>
<button id="load">Load</button>
<pre id="out">...</pre>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
button { font: inherit; padding: 8px 10px; border: 2px solid #152033; border-radius: 8px; margin-right: 6px; }
pre { background: #152033; color: #9bd9c7; padding: 14px; border-radius: 10px; }`,
            js: `const settings = { theme: "dark", sound: true, volume: 7 };

document.getElementById("save").addEventListener("click", function () {
  localStorage.setItem("settings", JSON.stringify(settings));
  document.getElementById("out").textContent = "Saved.";
});

document.getElementById("load").addEventListener("click", function () {
  const raw = localStorage.getItem("settings");
  try {
    const loaded = JSON.parse(raw);
    document.getElementById("out").textContent = JSON.stringify(loaded, null, 2);
  } catch (e) {
    document.getElementById("out").textContent = "No valid settings found.";
  }
});`
          }
        },
        quiz: {
          q: "Which function turns a JavaScript object into a string?",
          options: ["JSON.parse", "JSON.stringify", "toString", "Object.string"],
          answer: 1,
          why: "JSON.stringify serializes an object into JSON text. JSON.parse does the reverse."
        }
      },
      {
        id: "b3",
        title: "Forms and Validation",
        minutes: 9,
        xp: 20,
        goal: "Check user input before accepting it.",
        sections: [
          {
            h: "Validate before you trust",
            p: "Never trust input from a user. Check that required fields are filled, that numbers are in range, and that text is not empty. Validation can happen in the browser for quick feedback and on the server for safety."
          },
          {
            h: "Show helpful errors",
            p: "Do not just say \"invalid\". Say what is wrong and how to fix it: \"Please enter a name with at least 2 letters.\" Put the error next to the field, not in a popup. Clear the error as soon as the user fixes the input."
          },
          {
            h: "Use HTML helpers",
            p: "HTML has built-in validation: `required`, `min`, `max`, `type=\"email\"`, `pattern`. These give free feedback and work even if JavaScript fails. Use them as the first layer, then add custom checks in JavaScript."
          }
        ],
        demo: {
          html: `<form id="signup" novalidate>
  <div class="field">
    <label for="name">Name</label>
    <input id="name" required minlength="2">
    <p class="error" id="name-error"></p>
  </div>
  <div class="field">
    <label for="age">Age</label>
    <input id="age" type="number" min="5" max="120">
    <p class="error" id="age-error"></p>
  </div>
  <button type="submit">Join</button>
  <p id="success" class="success"></p>
</form>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; max-width: 400px; }
.field { margin-bottom: 14px; }
label { display: block; font-weight: bold; margin-bottom: 4px; }
input { width: 100%; padding: 8px; border: 2px solid #152033; border-radius: 8px; font: inherit; }
.error { color: #a43022; font-size: 0.8rem; margin: 4px 0 0; min-height: 1em; }
.success { color: #177a5e; font-weight: bold; }`,
          js: `document.getElementById("signup").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const age = Number(document.getElementById("age").value);
  let valid = true;

  if (name.length < 2) {
    document.getElementById("name-error").textContent = "Name needs at least 2 letters.";
    valid = false;
  } else {
    document.getElementById("name-error").textContent = "";
  }

  if (Number.isNaN(age) || age < 5 || age > 120) {
    document.getElementById("age-error").textContent = "Enter an age between 5 and 120.";
    valid = false;
  } else {
    document.getElementById("age-error").textContent = "";
  }

  if (valid) {
    document.getElementById("success").textContent = "Welcome, " + name + "!";
  } else {
    document.getElementById("success").textContent = "";
  }
});`
        },
        challenge: {
          text: "Validate a signup form.",
          steps: [
            "Add required and minlength to the name input.",
            "Check the age is between 5 and 120.",
            "Show a message under each field when invalid.",
            "Show a success message only when everything is valid."
          ],
          starter: {
            html: `<form id="form" novalidate>
  <input id="name" placeholder="Name" aria-label="Name">
  <input id="age" type="number" placeholder="Age" aria-label="Age">
  <button type="submit">Submit</button>
  <p id="out">...</p>
</form>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
input, button { font: inherit; padding: 8px 10px; border: 2px solid #152033; border-radius: 8px; margin-right: 6px; }`,
            js: `document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const age = Number(document.getElementById("age").value);
  const out = document.getElementById("out");

  if (name.length < 2) { out.textContent = "Name too short."; return; }
  if (Number.isNaN(age) || age < 5 || age > 120) { out.textContent = "Bad age."; return; }
  out.textContent = "Welcome, " + name + "!";
});`
          }
        },
        quiz: {
          q: "Which HTML attribute marks a field as required?",
          options: ["required", "mandatory", "needed", "validate"],
          answer: 0,
          why: "required is a built-in HTML attribute. Browsers will block submission and show a message when it is missing."
        }
      },
      {
        id: "b4",
        title: "Debugging",
        minutes: 8,
        xp: 20,
        goal: "Find and fix bugs using console, breakpoints and careful reading.",
        sections: [
          {
            h: "Read the error first",
            p: "When something breaks, open the console and read the red message. It usually includes the file, line number and a hint. Fix the first error first; later errors may be caused by it."
          },
          {
            h: "console.log is your flashlight",
            p: "Print the value of a variable before the line that fails. `console.log(\"score is\", score)` tells you what the program actually sees. Remove or comment out debug logs once the bug is fixed."
          },
          {
            h: "Common beginner bugs",
            p: "Typos in variable names, missing closing brackets, using `=` instead of `===`, forgetting that `querySelector` can return null, and off-by-one loop errors. When stuck, explain the code out loud line by line. Saying it out loud often reveals the problem."
          }
        ],
        demo: {
          html: `<h1>Bug Finder</h1>
<button id="run">Run buggy code</button>
<p id="out">...</p>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
button { font: inherit; padding: 8px 14px; border: 2px solid #152033; border-radius: 8px; background: #79c267; font-weight: bold; }
#out { font-weight: bold; }`,
          js: `function safeDivide(a, b) {
  if (b === 0) return "Cannot divide by zero.";
  return a / b;
}

document.getElementById("run").addEventListener("click", function () {
  const out = document.getElementById("out");
  const result = safeDivide(10, 2);
  console.log("result:", result);
  out.textContent = "10 / 2 = " + result;
});`
        },
        challenge: {
          text: "Fix three planted bugs in a small script.",
          steps: [
            "Fix a typo in a variable name.",
            "Fix a missing closing bracket.",
            "Fix a comparison that uses = instead of ===.",
            "Add a console.log to check a value."
          ],
          starter: {
            html: `<h1>Debug Practice</h1>
<p id="out">...</p>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }`,
            js: `const score = 85;
const out = document.getElementById("out");

if (score = 90) {
  out.textContent = "Gold";
} else {
  out.textContent = "Not gold.";
}

console.log("score is", score);`
          }
        },
        quiz: {
          q: "What should you do first when a script stops working?",
          options: [
            "Rewrite the whole file",
            "Open the console and read the error",
            "Delete all variables",
            "Refresh the page 10 times"
          ],
          answer: 1,
          why: "The console usually points directly to the problem. Read it before changing code."
        }
      }
    ],
    boss: {
      title: "The Cache Keeper",
      intro: "The Cache Keeper hides data in cupboards. Show you can save, load and validate it.",
      questions: [
        {
          q: "Which pair saves and loads an object correctly?",
          options: [
            "localStorage.setItem(\"p\", player); const p = localStorage.getItem(\"p\");",
            "localStorage.setItem(\"p\", JSON.stringify(player)); const p = JSON.parse(localStorage.getItem(\"p\"));",
            "localStorage.save(\"p\", player); const p = localStorage.load(\"p\");",
            "localStorage.setItem(\"p\", player.toString()); const p = eval(localStorage.getItem(\"p\"));"
          ],
          answer: 1,
          why: "localStorage stores strings, so you stringify on save and parse on load."
        },
        {
          q: "Which HTML attribute gives free built-in validation for an email field?",
          options: ["type=\"email\"", "validate=\"email\"", "format=\"email\"", "check=\"email\""],
          answer: 0,
          why: "type=\"email\" tells the browser to check the format automatically."
        },
        {
          q: "What does JSON.parse do?",
          options: ["Turns an object into a string", "Turns a JSON string into a value", "Saves data to localStorage", "Deletes a key"],
          answer: 1,
          why: "parse converts JSON text back into a JavaScript value. stringify does the opposite."
        }
      ]
    }
  },
  {
    id: "web-wizardry",
    num: 9,
    title: "Web Wizardry",
    tagline: "Talk to the world.",
    color: "#48c6d9",
    intro: "Fetch data, handle loading and errors, build accessible pages, and write code that stays fast.",
    lessons: [
      {
        id: "x1",
        title: "Fetch and APIs",
        minutes: 9,
        xp: 20,
        goal: "Request data from a server with fetch and async/await.",
        sections: [
          {
            h: "An API is a conversation",
            p: "An **API** is a way for programs to talk to each other. Your page sends a request to a server. The server sends back data, usually JSON. `fetch(\"https://api.example.com/data\")` starts that conversation."
          },
          {
            h: "async and await",
            p: "Network requests take time. `async function load() { const response = await fetch(url); const data = await response.json(); }` pauses until the data arrives. The `await` keyword only works inside a function marked `async`."
          },
          {
            h: "Always handle failure",
            p: "Networks fail, servers crash, and URLs change. Wrap fetch in `try { ... } catch (error) { ... }`. Check `response.ok` before reading the data. Show a friendly message instead of a blank screen."
          }
        ],
        demo: {
          html: `<h1>Fake API Demo</h1>
<button id="load">Load data</button>
<p id="status">Waiting...</p>
<pre id="out">...</pre>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
button { font: inherit; padding: 8px 14px; border: 2px solid #152033; border-radius: 8px; background: #48c6d9; font-weight: bold; }
pre { background: #152033; color: #9bd9c7; padding: 14px; border-radius: 10px; overflow-x: auto; }
#status { font-weight: bold; }`,
          js: `function fakeFetch() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({
        ok: true,
        json: function () {
          return Promise.resolve({ name: "Mochi", score: 140, city: "Delhi" });
        }
      });
    }, 700);
  });
}

async function load() {
  const status = document.getElementById("status");
  const out = document.getElementById("out");
  status.textContent = "Loading...";
  try {
    const response = await fakeFetch();
    if (!response.ok) throw new Error("Bad response");
    const data = await response.json();
    status.textContent = "Loaded!";
    out.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    status.textContent = "Could not load data.";
    out.textContent = error.message;
  }
}

document.getElementById("load").addEventListener("click", load);`
        },
        challenge: {
          text: "Build a loader with states.",
          steps: [
            "Create an async function that waits for fake data.",
            "Show a loading message first.",
            "Show the data when it arrives.",
            "Show an error message if something fails."
          ],
          starter: {
            html: `<h1>Loader</h1>
<button id="load">Load</button>
<p id="status">Waiting...</p>
<pre id="out">...</pre>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
button { font: inherit; padding: 8px 14px; border: 2px solid #152033; border-radius: 8px; background: #48c6d9; font-weight: bold; }
pre { background: #152033; color: #9bd9c7; padding: 14px; border-radius: 10px; }`,
            js: `async function load() {
  const status = document.getElementById("status");
  const out = document.getElementById("out");
  status.textContent = "Loading...";
  try {
    await new Promise(function (resolve) { setTimeout(resolve, 600); });
    const data = { name: "Mochi", score: 140 };
    status.textContent = "Loaded!";
    out.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    status.textContent = "Failed.";
    out.textContent = error.message;
  }
}

document.getElementById("load").addEventListener("click", load);`
          }
        },
        quiz: {
          q: "Where can you use the await keyword?",
          options: ["Anywhere in JavaScript", "Only inside an async function", "Only in CSS", "Only in HTML"],
          answer: 1,
          why: "await pauses execution until a promise resolves, and it only works inside a function declared async."
        }
      },
      {
        id: "x2",
        title: "Async and Loading States",
        minutes: 8,
        xp: 20,
        goal: "Design interfaces that handle loading, empty and error states gracefully.",
        sections: [
          {
            h: "Every request has three states",
            p: "A good UI handles **loading**, **success** and **error**. Loading shows a spinner or message. Success shows the data. Error shows what went wrong and a retry button. Empty is a fourth state: the request succeeded but there is nothing to show."
          },
          {
            h: "Disable buttons while busy",
            p: "Prevent double submissions by disabling the button and changing its text to \"Loading...\". Re-enable it when the request finishes, in both success and error cases. A finally block is perfect for cleanup."
          },
          {
            h: "Do not block the whole page",
            p: "Show loading only where the new data belongs. If a small widget is loading, spin the widget, not the entire screen. Users can keep interacting with the rest of the page."
          }
        ],
        demo: {
          html: `<h1>States Demo</h1>
<button id="load">Load posts</button>
<div id="area" class="area">Nothing loaded yet.</div>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
button { font: inherit; padding: 8px 14px; border: 2px solid #152033; border-radius: 8px; background: #48c6d9; font-weight: bold; }
.area { margin-top: 16px; padding: 16px; border: 2px dashed #152033; border-radius: 12px; min-height: 60px; }
.loading { color: #66738b; font-style: italic; }
.error { color: #a43022; font-weight: bold; }`,
          js: `async function loadPosts() {
  const button = document.getElementById("load");
  const area = document.getElementById("area");
  button.disabled = true;
  button.textContent = "Loading...";
  area.className = "area loading";
  area.textContent = "Loading posts...";

  try {
    await new Promise(function (resolve) { setTimeout(resolve, 900); });
    const posts = ["First post", "Second post", "Third post"];
    area.className = "area";
    area.innerHTML = "<ul>" + posts.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ul>";
  } catch (error) {
    area.className = "area error";
    area.textContent = "Failed to load. Try again.";
  } finally {
    button.disabled = false;
    button.textContent = "Load posts";
  }
}

document.getElementById("load").addEventListener("click", loadPosts);`
        },
        challenge: {
          text: "Build a loader with a retry button.",
          steps: [
            "Show a loading message while waiting.",
            "Show an error message on failure.",
            "Add a retry button in the error state.",
            "Disable the main button while loading."
          ],
          starter: {
            html: `<h1>Loader</h1>
<button id="load">Load</button>
<div id="area" class="area">Ready.</div>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
.area { margin-top: 16px; padding: 16px; border: 2px dashed #152033; border-radius: 12px; min-height: 60px; }`,
            js: `document.getElementById("load").addEventListener("click", async function () {
  const area = document.getElementById("area");
  area.textContent = "Loading...";
  await new Promise(function (resolve) { setTimeout(resolve, 700); });
  area.textContent = "Loaded successfully.";
});`
          }
        },
        quiz: {
          q: "Which block runs no matter whether a try succeeds or fails?",
          options: ["catch", "finally", "else", "default"],
          answer: 1,
          why: "finally runs after try and catch, whether or not an error happened. It is perfect for cleanup like re-enabling buttons."
        }
      },
      {
        id: "x3",
        title: "Accessibility",
        minutes: 8,
        xp: 20,
        goal: "Make pages usable by everyone, including keyboard and screen reader users.",
        sections: [
          {
            h: "Accessibility is not an extra",
            p: "Accessibility means everyone can use your page. It is not a feature you add at the end. Many accessibility wins are free: semantic HTML, labels, alt text and good contrast. They also make your page better for every user."
          },
          {
            h: "Keyboard and focus",
            p: "Every action should work with a keyboard. Use real `<button>` and `<a>` elements instead of clickable divs. Move through the page with Tab. Make sure the focus outline is visible. Never remove the outline without replacing it."
          },
          {
            h: "Labels, contrast and structure",
            p: "Every input needs a `<label>`. Text contrast should be at least 4.5 to 1. Use headings in order. Add `aria-live` to areas that update dynamically so screen readers announce changes. Test your page with only the keyboard."
          }
        ],
        demo: {
          html: `<h1>Accessible Form</h1>
<form>
  <div class="field">
    <label for="email">Email address</label>
    <input id="email" type="email" required aria-describedby="email-help">
    <p id="email-help" class="hint">We will never share your email.</p>
  </div>
  <button type="submit">Subscribe</button>
</form>
<p aria-live="polite" id="status"></p>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; max-width: 420px; }
.field { margin-bottom: 14px; }
label { display: block; font-weight: bold; margin-bottom: 4px; }
input { width: 100%; padding: 8px; border: 2px solid #152033; border-radius: 8px; font: inherit; }
input:focus { outline: 3px solid #5b8cff; outline-offset: 2px; }
.hint { color: #66738b; font-size: 0.8rem; margin: 4px 0 0; }
button { font: inherit; padding: 8px 14px; border: 2px solid #152033; border-radius: 8px; background: #48c6d9; font-weight: bold; }
button:focus-visible { outline: 3px solid #5b8cff; outline-offset: 3px; }`,
          js: `document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("status").textContent = "Thanks! You are subscribed.";
});`
        },
        challenge: {
          text: "Make a page keyboard-friendly.",
          steps: [
            "Replace a clickable div with a real button.",
            "Add labels to every input.",
            "Keep the focus outline visible.",
            "Add aria-live to a status area."
          ],
          starter: {
            html: `<h1>Keyboard Test</h1>
<button id="btn">I am a real button</button>
<p id="status" aria-live="polite">...</p>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
button:focus-visible { outline: 3px solid #5b8cff; outline-offset: 3px; }`,
            js: `document.getElementById("btn").addEventListener("click", function () {
  document.getElementById("status").textContent = "Button activated with keyboard or mouse.";
});`
          }
        },
        quiz: {
          q: "Which element should you use for a clickable action?",
          options: ["<div>", "<span>", "<button>", "<p>"],
          answer: 2,
          why: "button is focusable, keyboard-activatable and announced correctly by screen readers. Clickable divs require extra work and are easy to get wrong."
        }
      },
      {
        id: "x4",
        title: "Performance and Clean Code",
        minutes: 8,
        xp: 20,
        goal: "Keep pages fast and code readable.",
        sections: [
          {
            h: "Fast pages feel respectful",
            p: "Compress images, use modern formats, and do not load huge libraries for one feature. Defer non-critical scripts with `defer` or `async`. A page that loads in one second keeps users. A page that takes eight seconds loses them."
          },
          {
            h: "Clean code is a kindness",
            p: "Name things clearly. `getUserScore()` is better than `g()`. Keep functions short. Remove dead code. Comment the why, not the what. A stranger should be able to read your code and understand it."
          },
          {
            h: "Measure before you optimize",
            p: "Do not guess. Use browser DevTools to measure load time, layout shifts and slow scripts. Fix the biggest problem first. Premature optimization wastes time and often makes code harder to read."
          }
        ],
        demo: {
          html: `<h1>Clean Code Example</h1>
<p id="out">...</p>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }`,
          js: `function getUserScore(user) {
  if (!user || typeof user.score !== "number") return 0;
  return user.score;
}

const user = { name: "Mochi", score: 140 };
const score = getUserScore(user);

document.getElementById("out").textContent = user.name + "'s score is " + score + ".";`
        },
        challenge: {
          text: "Refactor a messy script into clean functions.",
          steps: [
            "Rename unclear variables.",
            "Split one long function into two.",
            "Add a guard for missing data.",
            "Add a comment explaining why."
          ],
          starter: {
            html: `<h1>Clean Code</h1>
<p id="out">...</p>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }`,
            js: `function getUserScore(user) {
  // Guard against missing or malformed data.
  if (!user || typeof user.score !== "number") return 0;
  return user.score;
}

const currentUser = { name: "Mochi", score: 140 };
document.getElementById("out").textContent =
  currentUser.name + " scored " + getUserScore(currentUser) + ".";`
        },
        },
        quiz: {
          q: "Which script tag attribute lets the browser download a script without blocking HTML parsing?",
          options: ["async", "defer", "lazy", "wait"],
          answer: 1,
          why: "defer downloads in parallel and runs after HTML parsing finishes. async downloads in parallel and runs as soon as it is ready."
        }
      }
    ],
    boss: {
      title: "The Lighthouse Keeper",
      intro: "The Keeper shines a light on slow, broken and inaccessible pages. Prove yours is clean.",
      questions: [
        {
          q: "Which function pauses inside an async function until a fetch finishes?",
          options: ["wait", "pause", "await", "sleep"],
          answer: 2,
          why: "await pauses until the promise resolves. It only works inside an async function."
        },
        {
          q: "What is the best element for a clickable button?",
          options: ["<div onclick>", "<button>", "<span>", "<p>"],
          answer: 1,
          why: "button is keyboard accessible and announced correctly by assistive technology."
        },
        {
          q: "Which check belongs in a try block around fetch?",
          options: [
            "Only checking response.ok",
            "Only parsing JSON",
            "Checking response.ok and catching errors",
            "Disabling the button forever"
          ],
          answer: 2,
          why: "Check response.ok before reading data, and catch network or parsing errors with try/catch."
        }
      ]
    }
  },
  {
    id: "grandmaster-peak",
    num: 10,
    title: "Grandmaster Peak",
    tagline: "Ship a real project.",
    color: "#e8ae2e",
    intro: "Plan, build, test and ship. The final world turns everything you have learned into one project you can show to anyone.",
    lessons: [
      {
        id: "g1",
        title: "Plan a Project",
        minutes: 8,
        xp: 20,
        goal: "Turn an idea into a small, buildable plan.",
        sections: [
          {
            h: "Start with the user",
            p: "Who is this for, and what problem does it solve? Write one sentence: \"This site helps ___ do ___.\" If you cannot write that sentence, the idea is too vague. Narrow it until you can."
          },
          {
            h: "List the features, then cut",
            p: "Write every feature you want. Then keep only the ones needed for the first version, called the **MVP**. A working small project beats a half-finished big one. You can always add more later."
          },
          {
            h: "Sketch before you code",
            p: "Draw the page on paper. Where does the title go? Where is the button? What happens when it is clicked? A five-minute sketch saves an hour of guessing. Code is expensive; thinking is cheap."
          }
        ],
        demo: {
          html: `<h1>Project Plan Template</h1>
<div class="card">
  <h2>Mochi's Habit Tracker</h2>
  <p><strong>For:</strong> Kids who want to build a daily habit.</p>
  <p><strong>Problem:</strong> It is hard to remember to practice.</p>
  <p><strong>MVP:</strong> Add habits, check them off, see today's progress.</p>
  <p><strong>Sketch:</strong> Title, input, list, progress bar.</p>
</div>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
.card { background: #fffdf7; border: 2px solid #152033; border-radius: 14px; padding: 20px; max-width: 520px; box-shadow: 5px 5px 0 #152033; }
.card h2 { color: #b35b1d; margin-top: 0; }`,
          js: ""
        },
        challenge: {
          text: "Write a plan for your own project.",
          steps: [
            "Write one sentence describing who it is for and what it does.",
            "List five possible features.",
            "Choose three for the first version.",
            "Sketch the layout on paper or in a comment."
          ],
          starter: {
            html: `<h1>My Project Plan</h1>
<div class="card">
  <p><strong>For:</strong> ___</p>
  <p><strong>Problem:</strong> ___</p>
  <p><strong>MVP:</strong> ___</p>
  <p><strong>Sketch:</strong> ___</p>
</div>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
.card { background: #fffdf7; border: 2px solid #152033; border-radius: 14px; padding: 20px; max-width: 520px; }`,
            js: ""
          }
        },
        quiz: {
          q: "What does MVP stand for?",
          options: ["Most Valuable Player", "Minimum Viable Product", "Maximum Visual Polish", "My Very Perfect page"],
          answer: 1,
          why: "MVP is the smallest version that still solves the problem. Ship it first, then improve."
        }
      },
      {
        id: "g2",
        title: "Build the Capstone",
        minutes: 12,
        xp: 20,
        goal: "Build a small complete project that uses HTML, CSS and JavaScript together.",
        sections: [
          {
            h: "Use everything you know",
            p: "A good capstone is small and complete: a habit tracker, a quiz game, a recipe finder, or a flashcard app. It should use semantic HTML, clean CSS, JavaScript state, and localStorage. Small and finished beats big and broken."
          },
          {
            h: "Build in slices",
            p: "First make the HTML and CSS look right with fake data. Then add the JavaScript that renders real data. Then add interactions. Then add saving. Each slice should work before you move on. Do not write 200 lines before pressing Run."
          },
          {
            h: "Name your functions well",
            p: "Functions like `renderHabits`, `addHabit` and `toggleHabit` tell the story of the app. If you read only the function names, you should understand what the app does. Good names are documentation."
          }
        ],
        demo: {
          html: `<h1>Habit Tracker</h1>
<form id="add-form">
  <input id="habit" placeholder="New habit" aria-label="New habit">
  <button type="submit">Add</button>
</form>
<p id="stats">0 of 0 done</p>
<ul id="list"></ul>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; max-width: 520px; }
form { display: flex; gap: 8px; }
input, button { font: inherit; padding: 8px 10px; border: 2px solid #152033; border-radius: 8px; }
button { background: #e8ae2e; font-weight: bold; }
ul { list-style: none; padding: 0; margin-top: 14px; }
li { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border: 2px solid #152033; border-radius: 8px; margin-bottom: 8px; background: #fffdf7; }
li.done span { text-decoration: line-through; color: #8a94a6; }
li button { margin-left: auto; background: #ffebe7; color: #a43022; font-weight: bold; }`,
          js: `let habits = JSON.parse(localStorage.getItem("habits") || "[]");
let nextId = habits.length ? Math.max(...habits.map(function (h) { return h.id; })) + 1 : 1;

function save() { localStorage.setItem("habits", JSON.stringify(habits)); }

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";
  habits.forEach(function (habit) {
    const li = document.createElement("li");
    if (habit.done) li.classList.add("done");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = habit.done;
    cb.addEventListener("change", function () { habit.done = cb.checked; save(); render(); });
    const span = document.createElement("span");
    span.textContent = habit.text;
    const remove = document.createElement("button");
    remove.textContent = "x";
    remove.addEventListener("click", function () {
      habits = habits.filter(function (h) { return h.id !== habit.id; });
      save(); render();
    });
    li.appendChild(cb); li.appendChild(span); li.appendChild(remove);
    list.appendChild(li);
  });
  const done = habits.filter(function (h) { return h.done; }).length;
  document.getElementById("stats").textContent = done + " of " + habits.length + " done";
}

document.getElementById("add-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.getElementById("habit");
  const text = input.value.trim();
  if (text) habits.push({ id: nextId++, text: text, done: false });
  input.value = "";
  save(); render();
});

render();`
        },
        challenge: {
          text: "Build your own capstone in the playground.",
          steps: [
            "Pick a small project idea.",
            "Build the HTML and CSS with fake data.",
            "Add JavaScript that renders real data.",
            "Add one interaction and one localStorage save."
          ],
          starter: {
            html: `<h1>My Capstone</h1>
<p>Start small. Make it work. Then make it nice.</p>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }`,
            js: `console.log("My capstone starts here.");`
          }
        },
        quiz: {
          q: "What is the best order for building a small app?",
          options: [
            "Write all JavaScript first, then HTML and CSS",
            "Build HTML and CSS with fake data, then add JavaScript, then interactions, then saving",
            "Add localStorage first, then everything else",
            "Write 500 lines before pressing Run"
          ],
          answer: 1,
          why: "Build in slices. Each layer should work before you add the next one."
        }
      },
      {
        id: "g3",
        title: "Test and Polish",
        minutes: 8,
        xp: 20,
        goal: "Check your project across devices, inputs and edge cases.",
        sections: [
          {
            h: "Test like a user",
            p: "Click every button. Type weird input. Try empty fields. Try very long text. Try it on a phone. Try it with only the keyboard. Bugs hide in the cases you did not think about."
          },
          {
            h: "Check the edges",
            p: "What happens with zero items? With one hundred items? With a name that is only spaces? With an emoji? With no internet? Good software handles the boring cases gracefully."
          },
          {
            h: "Polish the details",
            p: "Consistent spacing, readable text, clear focus states, helpful empty states, and a friendly error message. Polish is not decoration; it is removing friction so the user never has to think."
          }
        ],
        demo: {
          html: `<h1>Test Checklist</h1>
<ul>
  <li>Empty state shows a helpful message.</li>
  <li>Long text does not break the layout.</li>
  <li>Keyboard can reach every control.</li>
  <li>Errors are clear and next to the field.</li>
  <li>Works on a narrow screen.</li>
</ul>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; max-width: 620px; }
li { margin-bottom: 8px; line-height: 1.45; }`,
          js: ""
        },
        challenge: {
          text: "Run through a test checklist on your own project.",
          steps: [
            "Try empty input and very long input.",
            "Try it on a narrow screen.",
            "Navigate using only the keyboard.",
            "Fix one bug you find."
          ],
          starter: {
            html: `<h1>My Test Notes</h1>
<p>Write what you tested and what you fixed.</p>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }`,
            js: ""
          }
        },
        quiz: {
          q: "Which case should you test before shipping?",
          options: ["Only the happy path", "Only on a large monitor", "Empty input, long text, keyboard use and narrow screens", "Only with perfect data"],
          answer: 2,
          why: "Real users do unexpected things. Test the edges, not just the ideal case."
        }
      },
      {
        id: "g4",
        title: "Deploy and Share",
        minutes: 7,
        xp: 20,
        goal: "Put your site on the internet so anyone can visit it.",
        sections: [
          {
            h: "Static sites are easy to host",
            p: "A site made of HTML, CSS and JavaScript files is called a **static site**. You can host it for free on GitHub Pages, Netlify or Vercel. Upload your files, get a URL, and share it with the world."
          },
          {
            h: "Keep your project tidy",
            p: "Use clear file names: `index.html`, `style.css`, `script.js`. Put images in an `assets` folder. Write a short README explaining what the project does and how to run it. Future you will thank present you."
          },
          {
            h: "Share and learn",
            p: "Show your project to a friend or family member. Watch them use it without helping. Where do they get stuck? That is your next improvement. Building is half the work; learning from users is the other half."
          }
        ],
        demo: {
          html: `<h1>Project Checklist</h1>
<ul>
  <li>index.html, style.css, script.js</li>
  <li>assets folder for images</li>
  <li>README with how to run</li>
  <li>No console errors</li>
  <li>Works on phone and desktop</li>
  <li>Shared with one real person</li>
</ul>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; max-width: 520px; }
li { margin-bottom: 8px; }`,
          js: ""
        },
        challenge: {
          text: "Prepare your capstone for sharing.",
          steps: [
            "Rename files clearly and organize assets.",
            "Write a short README.",
            "Check for console errors.",
            "Show it to one person and note their feedback."
          ],
          starter: {
            html: `<h1>Ready to Ship</h1>
<p>Small, working and shared beats perfect and hidden.</p>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }`,
            js: ""
          }
        },
        quiz: {
          q: "What is the simplest way to host a static site for free?",
          options: ["Buy a server rack", "Use GitHub Pages, Netlify or Vercel", "Email the files", "Print the code"],
          answer: 1,
          why: "Static files can be hosted for free on many services. Pick one, upload your folder, and you get a live URL."
        }
      }
    ],
    boss: {
      title: "The Final Gatekeeper",
      intro: "The Gatekeeper guards the peak. Answer all three to earn your final exam.",
      questions: [
        {
          q: "What is the MVP of a project?",
          options: [
            "The most complex version",
            "The smallest version that still solves the problem",
            "The version with the most animations",
            "The final polished version"
          ],
          answer: 1,
          why: "Ship the smallest useful version first, then improve it based on feedback."
        },
        {
          q: "Why is it useful to build a project in slices?",
          options: [
            "It lets you write more code faster",
            "Each part works before you add the next one",
            "It avoids using CSS",
            "It removes the need for testing"
          ],
          answer: 1,
          why: "Working slices keep you moving and make bugs easier to find."
        },
        {
          q: "Which file should be the entry point of a static site?",
          options: ["main.js", "index.html", "style.css", "README.md"],
          answer: 1,
          why: "Servers look for index.html as the default page. Name your main page that."
        }
      ]
    }
  }
);

COURSE.exam = {
  passPercent: 80,
  questions: [
    {
      q: "Which language is the skeleton of a web page?",
      options: ["HTML", "CSS", "JavaScript", "Python"],
      answer: 0,
      why: "HTML provides the structure and content."
    },
    {
      q: "What does CSS control?",
      options: ["Logic and calculations", "Colors, spacing, fonts and layout", "Server requests", "Database storage"],
      answer: 1,
      why: "CSS handles presentation."
    },
    {
      q: "Which heading is the most important on a page?",
      options: ["<h6>", "<h1>", "<head>", "<title>"],
      answer: 1,
      why: "h1 is the top-level heading."
    },
    {
      q: "What does the alt attribute on an image do?",
      options: ["Changes its size", "Describes the image for people who cannot see it", "Adds a border", "Makes it load faster"],
      answer: 1,
      why: "alt provides a text description."
    },
    {
      q: "Which rule makes a class selector for class=\"card\"?",
      options: [".card", "#card", "card", "*card"],
      answer: 0,
      why: "A dot starts a class selector."
    },
    {
      q: "What is the box model order from inside to outside?",
      options: ["Margin, border, padding, content", "Content, padding, border, margin", "Border, content, padding, margin", "Padding, content, margin, border"],
      answer: 1,
      why: "Content sits inside padding, which sits inside the border, which sits inside the margin."
    },
    {
      q: "Which display value hides an element completely?",
      options: ["display: block", "display: inline", "display: none", "display: flex"],
      answer: 2,
      why: "display: none removes the element from the layout."
    },
    {
      q: "Which property aligns flex items along the main axis?",
      options: ["align-items", "justify-content", "text-align", "line-height"],
      answer: 1,
      why: "justify-content distributes items along the main axis."
    },
    {
      q: "What does 1fr mean in CSS Grid?",
      options: ["One fixed row", "One fraction of available space", "One pixel", "One font size"],
      answer: 1,
      why: "fr stands for fraction."
    },
    {
      q: "Which keyword creates a value that should not be reassigned?",
      options: ["let", "const", "var", "static"],
      answer: 1,
      why: "const creates a constant binding."
    },
    {
      q: "Which operator checks whether two values are equal in type and value?",
      options: ["=", "==", "===", "=>"],
      answer: 2,
      why: "=== is the strict equality operator."
    },
    {
      q: "What does a function return if it has no return statement?",
      options: ["0", "null", "undefined", "An error"],
      answer: 2,
      why: "Functions return undefined by default."
    },
    {
      q: "Which method selects the first element matching a CSS selector?",
      options: ["querySelector", "querySelectorAll", "getElementById", "select"],
      answer: 0,
      why: "querySelector returns the first match."
    },
    {
      q: "Which method toggles a class on an element?",
      options: ["classList.toggle", "style.toggle", "className.toggle", "element.toggleClass"],
      answer: 0,
      why: "classList.toggle adds or removes a class."
    },
    {
      q: "What does event.preventDefault() do on a form submit?",
      options: ["Clears the inputs", "Stops the page from reloading", "Sends the data", "Disables the button"],
      answer: 1,
      why: "It cancels the default form submission."
    },
    {
      q: "What is the index of the first item in a JavaScript array?",
      options: ["1", "0", "-1", "first"],
      answer: 1,
      why: "Arrays are zero-based."
    },
    {
      q: "Which method returns a new array with each item transformed?",
      options: ["forEach", "filter", "map", "push"],
      answer: 2,
      why: "map transforms every item and returns a new array."
    },
    {
      q: "What does JSON.stringify do?",
      options: ["Turns a string into an object", "Turns an object into a string", "Saves data to localStorage", "Parses JSON"],
      answer: 1,
      why: "stringify serializes a value into JSON text."
    },
    {
      q: "Which keyword pauses inside an async function until a promise resolves?",
      options: ["wait", "pause", "await", "sleep"],
      answer: 2,
      why: "await pauses execution inside an async function."
    },
    {
      q: "What is the MVP of a project?",
      options: [
        "The most complex version",
        "The smallest version that still solves the problem",
        "The version with the most animations",
        "The final polished version"
      ],
      answer: 1,
      why: "Ship the smallest useful version first."
    }
  ]
};
