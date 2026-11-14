/* =========================================================
   Course content, part 1 (Worlds 1-5)
   Web Dev: Zero to Grandmaster - by Aadarsh Joshi
   ========================================================= */

const COURSE = {
  title: "Web Dev: Zero to Grandmaster",
  author: "Aadarsh Joshi",
  version: 1,
  totalXp: 1500,
  worlds: [],
  exam: { passPercent: 80, questions: [] }
};

COURSE.worlds.push(
  {
    id: "html-island",
    num: 1,
    title: "HTML Island",
    tagline: "Give your page a skeleton.",
    color: "#ff6b57",
    intro: "Every website starts as a stack of elements. Learn the tags that hold words, pictures, links and lists in place.",
    lessons: [
      {
        id: "h1",
        title: "How a Web Page Appears",
        minutes: 6,
        xp: 20,
        goal: "Understand what HTML, CSS and JavaScript each do, and make your first page.",
        sections: [
          {
            h: "Three languages, one page",
            p: "A web page is built from three ingredients. **HTML** is the skeleton: it holds the words and pictures. **CSS** is the paint: it chooses colors, sizes and spacing. **JavaScript** is the brain: it makes the page react when you click or type. You will learn all three, one small step at a time."
          },
          {
            h: "What the browser does",
            p: "When you type an address, your browser asks a computer called a **server** for some files. The server sends them back. The browser reads the HTML, applies the CSS, runs the JavaScript, and draws the result on your screen. That whole trip usually takes less than a second."
          },
          {
            h: "Your first element",
            p: "HTML is written with **tags**. A tag is a label inside angle brackets. Most tags come in pairs: an opening tag like `<h1>` and a closing tag like `</h1>`. Whatever sits between them is the content. Try changing the words in the live example below."
          }
        ],
        demo: {
          html: `<h1>Hello, explorer!</h1>
<p>This is my first web page. It is built from HTML.</p>
<p class="note">The orange heading is styled with CSS.</p>`,
          css: `body {
  font-family: Verdana, sans-serif;
  background: #fff8e7;
  padding: 24px;
}
h1 {
  color: #e8553f;
  margin-bottom: 4px;
}
.note {
  background: #ffd166;
  padding: 8px;
  border-radius: 6px;
}`,
          js: ""
        },
        challenge: {
          text: "Open the playground and make this page yours.",
          steps: [
            "Change the h1 text to your own name.",
            "Change the paragraph to one true fact about you.",
            "Change the background color to a color you like.",
            "Press Run and check the preview."
          ],
          starter: {
            html: `<h1>Hello, my name is ___</h1>
<p>One fact about me: ___</p>`,
            css: `body {
  font-family: Verdana, sans-serif;
  background: #fff8e7;
  padding: 24px;
}
h1 {
  color: #e8553f;
}`,
            js: ""
          }
        },
        quiz: {
          q: "Which language decides that a heading should be orange?",
          options: ["HTML", "CSS", "JavaScript", "The server"],
          answer: 1,
          why: "CSS handles colors, spacing, fonts and layout. HTML supplies the content; JavaScript adds behavior."
        }
      },
      {
        id: "h2",
        title: "Tags, Text and Headings",
        minutes: 7,
        xp: 20,
        goal: "Use headings, paragraphs and emphasis tags to organize writing.",
        sections: [
          {
            h: "A page needs a outline",
            p: "Headings work like a book's table of contents. `<h1>` is the biggest, most important heading. `<h2>` is a section inside it, `<h3>` is a subsection, and so on down to `<h6>`. Use them in order instead of picking a size just because it looks cool. CSS can make any heading any size later."
          },
          {
            h: "Paragraphs and emphasis",
            p: "Wrap normal writing in `<p>` tags. Use `<strong>` for something important and `<em>` for emphasis. Browsers usually show strong text as bold and em text as italic, but the real point is meaning: screen readers can announce emphasis too."
          },
          {
            h: "Comments are notes to yourself",
            p: "A comment starts with `<!--` and ends with `-->`. The browser ignores it. Comments are useful for leaving a note like `<!-- profile section starts here -->`. They are not secret, though. Anyone can view your page source, so never put passwords in a comment."
          }
        ],
        demo: {
          html: `<h1>My Field Notebook</h1>
<h2>Things I have spotted</h2>
<p>Yesterday I saw a <strong>huge</strong> beetle. It was <em>very</em> shiny.</p>
<h3>Next adventure</h3>
<p>I want to find a frog. <!-- this is a comment: nobody sees it on the page --></p>`,
          css: `body {
  font-family: Georgia, serif;
  max-width: 540px;
  margin: 30px auto;
  padding: 0 18px;
  color: #23304a;
}
h1 { color: #1d6b5c; }
h2 { border-bottom: 2px solid #ffd166; }`,
          js: ""
        },
        challenge: {
          text: "Turn the starter into a mini notebook entry.",
          steps: [
            "Add a main h1 title.",
            "Add at least two h2 sections.",
            "Use strong and em somewhere in a paragraph.",
            "Add a comment that only you can see in the code."
          ],
          starter: {
            html: `<h1>My Notebook</h1>
<h2>Today</h2>
<p>Write something here.</p>`,
            css: `body {
  font-family: Georgia, serif;
  max-width: 540px;
  margin: 30px auto;
  padding: 0 18px;
}`,
            js: ""
          }
        },
        quiz: {
          q: "Which heading is the most important one on a page?",
          options: ["<h6>", "<head>", "<h1>", "<big>"],
          answer: 2,
          why: "h1 is the top-level heading. h2 to h6 are for sections inside it. head is a different element that holds page information."
        }
      },
      {
        id: "h3",
        title: "Links, Images and Lists",
        minutes: 8,
        xp: 20,
        goal: "Connect pages with links, show pictures with alt text, and organize ideas in lists.",
        sections: [
          {
            h: "Links go places",
            p: "A link uses an `<a>` tag. The `href` attribute says where it goes: `<a href=\"https://example.com\">Visit</a>`. An **attribute** is extra information inside the opening tag. If the link goes to another website, add `target=\"_blank\"` to open it in a new tab."
          },
          {
            h: "Images need words too",
            p: "An image uses `<img src=\"picture.jpg\" alt=\"A red fox in the snow\">`. The `src` is the file path. The `alt` text describes the image for people who cannot see it, or when the image fails to load. Write what matters about the picture, not just \"image\"."
          },
          {
            h: "Lists keep things tidy",
            p: "Use `<ul>` for a bullet list and `<ol>` for a numbered list. Each item goes inside `<li>`. Lists are perfect for steps, ingredients, top-five rankings, or rules for a game."
          }
        ],
        demo: {
          html: `<h1>Meet Mochi</h1>
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 180'%3E%3Crect width='300' height='180' fill='%23ffd166'/%3E%3Ccircle cx='150' cy='90' r='48' fill='%23ff6b57'/%3E%3Ccircle cx='134' cy='78' r='7' fill='%23152033'/%3E%3Ccircle cx='166' cy='78' r='7' fill='%23152033'/%3E%3Cpath d='M132 106 Q150 122 168 106' fill='none' stroke='%23152033' stroke-width='6' stroke-linecap='round'/%3E%3C/svg%3E" alt="A simple drawing of a round orange creature">
<p>Mochi is a small creature who loves three things:</p>
<ul>
  <li>Warm rocks</li>
  <li>Crunchy leaves</li>
  <li>Naps</li>
</ul>
<p><a href="https://developer.mozilla.org" target="_blank">Look up more HTML on MDN</a></p>`,
          css: `body {
  font-family: Verdana, sans-serif;
  max-width: 520px;
  margin: 26px auto;
  padding: 0 18px;
}
img {
  border: 3px solid #152033;
  border-radius: 14px;
}
a { color: #b33224; font-weight: bold; }`,
          js: ""
        },
        challenge: {
          text: "Build a small page about something you like.",
          steps: [
            "Add a picture. Use the demo image or any image address you have.",
            "Write helpful alt text for it.",
            "Add a bullet list of three favorites.",
            "Add one link to a website you enjoy."
          ],
          starter: {
            html: `<h1>My Favorite Thing</h1>
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 180'%3E%3Crect width='300' height='180' fill='%231fb9a6'/%3E%3C/svg%3E" alt="A teal rectangle">
<p>Write a short introduction.</p>
<ul>
  <li>First favorite</li>
  <li>Second favorite</li>
  <li>Third favorite</li>
</ul>`,
            css: `body {
  font-family: Verdana, sans-serif;
  max-width: 520px;
  margin: 26px auto;
  padding: 0 18px;
}
img { border: 3px solid #152033; border-radius: 14px; }`,
            js: ""
          }
        },
        quiz: {
          q: "What is the alt attribute for?",
          options: [
            "It changes the image size.",
            "It describes the image for people who cannot see it.",
            "It makes the image load faster.",
            "It adds a border around the image."
          ],
          answer: 1,
          why: "alt provides a text description. It helps screen reader users and appears if the image cannot load."
        }
      },
      {
        id: "h4",
        title: "Build a Bio Page",
        minutes: 10,
        xp: 20,
        goal: "Combine HTML structure and semantics to build a complete one-page profile.",
        sections: [
          {
            h: "Semantic tags name the parts",
            p: "A page has regions. `<header>` holds the top area and title. `<main>` holds the important content. `<section>` groups related ideas. `<footer>` holds the bottom line. These tags look like plain boxes, but they tell browsers and screen readers what each part is for."
          },
          {
            h: "Nesting is like boxes inside boxes",
            p: "When one element sits inside another, it must close before the outer element closes. Think of packing a lunchbox: the sandwich goes inside the box, not halfway through the lid. Indent nested elements by two spaces so your code stays readable."
          },
          {
            h: "Content first, decoration later",
            p: "Write a page that makes sense with no CSS at all. Clear headings, short paragraphs, real links and useful alt text do more for a site than fancy colors. Once the skeleton is solid, styling is easy."
          }
        ],
        demo: {
          html: `<header>
  <h1>Ravi's Rock Collection</h1>
  <p>Small stones, big stories.</p>
</header>
<main>
  <section>
    <h2>About me</h2>
    <p>I am Ravi. I collect rocks from every walk I take.</p>
  </section>
  <section>
    <h2>Top three finds</h2>
    <ol>
      <li>A striped pebble from the river</li>
      <li>A shiny black stone from the beach</li>
      <li>A mystery rock that might be a fossil</li>
    </ol>
  </section>
</main>
<footer>
  <p>Made by Ravi. Last updated today.</p>
</footer>`,
          css: `body {
  font-family: Verdana, sans-serif;
  max-width: 620px;
  margin: 0 auto;
  padding: 24px;
  background: #f6f2e8;
}
header {
  background: #152033;
  color: white;
  padding: 22px;
  border-radius: 16px;
}
header p { color: #ffd166; margin: 0; }
section {
  background: white;
  border: 2px solid #152033;
  border-radius: 14px;
  padding: 16px;
  margin-top: 16px;
}
footer { text-align: center; color: #66738b; margin-top: 20px; }`,
          js: ""
        },
        challenge: {
          text: "Build your own bio page. This is your first real project.",
          steps: [
            "Use header, main, section and footer.",
            "Write an h1 with your name and a short tagline.",
            "Add an About section and a Favorites section.",
            "Add a link or an image. Style it with at least five CSS properties."
          ],
          starter: {
            html: `<header>
  <h1>Your Name</h1>
  <p>Your tagline goes here.</p>
</header>
<main>
  <section>
    <h2>About me</h2>
    <p>Write two sentences about yourself.</p>
  </section>
  <section>
    <h2>My favorites</h2>
    <ul>
      <li>Favorite food</li>
      <li>Favorite game</li>
      <li>Favorite place</li>
    </ul>
  </section>
</main>
<footer>
  <p>Made by Your Name.</p>
</footer>`,
            css: `body {
  font-family: Verdana, sans-serif;
  max-width: 620px;
  margin: 0 auto;
  padding: 24px;
  background: #f6f2e8;
}
header {
  background: #152033;
  color: white;
  padding: 22px;
  border-radius: 16px;
}
section {
  background: white;
  border: 2px solid #152033;
  border-radius: 14px;
  padding: 16px;
  margin-top: 16px;
}`,
            js: ""
          }
        },
        quiz: {
          q: "Which tag should hold the main content of a page?",
          options: ["<footer>", "<main>", "<head>", "<div>"],
          answer: 1,
          why: "main is the semantic element for the primary content. div is a generic container with no built-in meaning."
        }
      }
    ],
    boss: {
      title: "The Tag Titan",
      intro: "The Tag Titan guards the bridge to CSS Cove. Answer three questions to prove your HTML structure is solid.",
      questions: [
        {
          q: "Which line is written correctly?",
          options: [
            "<p>Hello world</p>",
            "<p>Hello world<p>",
            "</p>Hello world<p>",
            "<p>Hello world"
          ],
          answer: 0,
          why: "Opening tags and closing tags must pair up, and the closing tag includes a forward slash."
        },
        {
          q: "You want a numbered list. Which tag starts it?",
          options: ["<ul>", "<li>", "<ol>", "<list>"],
          answer: 2,
          why: "ol means ordered list, which numbers the items. ul means unordered list, which uses bullets."
        },
        {
          q: "What is wrong with this image tag: <img src=\"cat.jpg\">?",
          options: [
            "It needs a closing </img> tag.",
            "It has no alt text.",
            "It should use href instead of src.",
            "Nothing is wrong."
          ],
          answer: 1,
          why: "Images should have alt text so the content is available to people who cannot see the image."
        }
      ]
    }
  },
  {
    id: "css-cove",
    num: 2,
    title: "CSS Cove",
    tagline: "Paint the skeleton.",
    color: "#ffd166",
    intro: "Colors, spacing, borders and type. Learn how a few CSS rules can turn plain content into a page people want to look at.",
    lessons: [
      {
        id: "c1",
        title: "CSS Basics",
        minutes: 6,
        xp: 20,
        goal: "Write a CSS rule and understand selectors, properties and values.",
        sections: [
          {
            h: "A rule has three parts",
            p: "A CSS rule looks like this: `h1 { color: coral; }`. The **selector** is `h1`. It says what to style. The **property** is `color`. It says what to change. The **value** is `coral`. It says what to change it to. The property and value are joined by a colon, and each declaration ends with a semicolon."
          },
          {
            h: "Where CSS lives",
            p: "You can put CSS in a `<style>` tag inside the page, or in a separate file linked with `<link rel=\"stylesheet\" href=\"style.css\">`. For small experiments, the style tag is quick. For real projects, a separate file keeps things organized."
          },
          {
            h: "Colors have lots of names",
            p: "CSS understands names like `tomato`, `teal` and `gold`. It also understands hex codes like `#ff6b57`, and `rgb(255, 107, 87)`. A hex code is just a precise color recipe. Pick one and stay consistent."
          }
        ],
        demo: {
          html: `<h1>Sunset Rules</h1>
<p>This page is styled by a few CSS rules.</p>
<div class="card">A small card with its own look.</div>`,
          css: `body {
  font-family: Verdana, sans-serif;
  background: #152033;
  color: white;
  padding: 28px;
}
h1 {
  color: #ffd166;
  font-size: 42px;
}
p {
  color: #c7d0e2;
}
.card {
  background: #ff6b57;
  color: #152033;
  padding: 16px;
  border-radius: 12px;
  font-weight: bold;
  max-width: 280px;
}`,
          js: ""
        },
        challenge: {
          text: "Restyle the starter card using your own color recipe.",
          steps: [
            "Change the body background color.",
            "Change the heading color and size.",
            "Give the card a new background and border-radius.",
            "Add one property you have not used before."
          ],
          starter: {
            html: `<h1>My Color Lab</h1>
<p>Testing colors is the fastest way to learn CSS.</p>
<div class="card">My card</div>`,
            css: `body {
  font-family: Verdana, sans-serif;
  background: #fff8e7;
  padding: 28px;
}
h1 { color: #e8553f; }
.card {
  background: #ffd166;
  padding: 16px;
  border-radius: 12px;
}`,
            js: ""
          }
        },
        quiz: {
          q: "In this rule, which part is the selector?  p { color: teal; }",
          options: ["p", "color", "teal", "the semicolon"],
          answer: 0,
          why: "The selector comes before the curly braces and chooses which elements to style. color is the property and teal is the value."
        }
      },
      {
        id: "c2",
        title: "Classes and Selectors",
        minutes: 7,
        xp: 20,
        goal: "Target specific elements with classes, IDs and descendant selectors.",
        sections: [
          {
            h: "Classes are reusable labels",
            p: "Write `<p class=\"warning\">Watch out!</p>` in HTML, then `.warning { color: red; }` in CSS. The dot means \"class\". You can put the same class on many elements. Classes are the workhorse of CSS because they let you style one kind of thing without touching everything else."
          },
          {
            h: "IDs are one-of-a-kind",
            p: "An ID looks like `id=\"hero\"` and is selected with `#hero`. An ID should appear only once per page. Use an ID for a single unique landmark, and classes for anything that repeats."
          },
          {
            h: "Combine selectors",
            p: "`.card p` selects paragraphs inside any element with the card class. `h1, h2` styles both headings with one rule. `a:hover` styles a link while the mouse is over it. Small selector tricks save a lot of repeated code."
          }
        ],
        demo: {
          html: `<h1>Space News</h1>
<article class="card">
  <h2>New moon found</h2>
  <p>Astronomers found a tiny moon around a distant planet.</p>
  <p class="warning">It is moving very fast.</p>
</article>
<article class="card special">
  <h2>Rocket test</h2>
  <p>The launch is scheduled for Friday.</p>
</article>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; background: #eef2ff; }
h1 { color: #234aa9; }
.card {
  background: white;
  border: 2px solid #152033;
  border-radius: 12px;
  padding: 14px 18px;
  margin-bottom: 14px;
}
.card p { color: #33415c; }
.warning {
  color: #a43022 !important;
  font-weight: bold;
}
.special { background: #fff5d6; }
a:hover { color: #ff6b57; }`,
          js: ""
        },
        challenge: {
          text: "Use classes to give two cards different moods.",
          steps: [
            "Give each card a shared class called card.",
            "Give one card an extra class called dark.",
            "Style .card once, then style .dark separately.",
            "Use a descendant selector to change the card paragraph color."
          ],
          starter: {
            html: `<h1>Two Cards</h1>
<div class="card">
  <h2>Light card</h2>
  <p>This one is bright.</p>
</div>
<div class="card dark">
  <h2>Dark card</h2>
  <p>This one is moody.</p>
</div>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
.card {
  border: 2px solid #152033;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 14px;
}
.dark {
  background: #152033;
  color: white;
}`,
            js: ""
          }
        },
        quiz: {
          q: "How do you write a class selector for class=\"hero\"?",
          options: [".hero", "#hero", "hero", "*hero"],
          answer: 0,
          why: "A dot starts a class selector. A hash starts an ID selector."
        }
      },
      {
        id: "c3",
        title: "The Box Model",
        minutes: 8,
        xp: 20,
        goal: "Control size and spacing with content, padding, border and margin.",
        sections: [
          {
            h: "Everything is a box",
            p: "Every element is a rectangular box with four layers. The **content** is the text or image. **Padding** is space inside the border. The **border** is the edge. **Margin** is space outside the border, pushing other boxes away. Picture a framed photo: the photo is content, the mat is padding, the frame is border, and the gap to the next frame is margin."
          },
          {
            h: "The default size is sneaky",
            p: "By default, width and height only measure the content. Add padding and border and the box grows bigger than you asked for. Add `box-sizing: border-box;` to make width include padding and border. Most developers put that rule on every element so sizing behaves the way people expect."
          },
          {
            h: "Spacing creates rhythm",
            p: "Instead of adding random margins everywhere, pick a spacing scale, like 8, 16, 24 and 32 pixels. Use those values again and again. Consistent spacing makes a page feel calm and intentional, even before you add any decoration."
          }
        ],
        demo: {
          html: `<h1>Box Model Lab</h1>
<div class="box">I have padding, a border and margin.</div>
<div class="box tight">I am tighter.</div>`,
          css: `* { box-sizing: border-box; }
body { font-family: Verdana, sans-serif; padding: 24px; background: #f6f2e8; }
h1 { color: #1d6b5c; }
.box {
  background: #ffd166;
  border: 4px solid #152033;
  padding: 20px;
  margin: 18px 0;
  width: 320px;
  max-width: 100%;
  border-radius: 10px;
}
.tight {
  background: #9bd9c7;
  padding: 4px;
  margin-top: 0;
}`,
          js: ""
        },
        challenge: {
          text: "Make a card with deliberate spacing.",
          steps: [
            "Add box-sizing: border-box to everything.",
            "Give the card 24px of padding and a 3px border.",
            "Set a max-width so it does not stretch too wide.",
            "Add 16px of space between two cards with margin."
          ],
          starter: {
            html: `<h1>Spacing Practice</h1>
<div class="card">Card one</div>
<div class="card">Card two</div>`,
            css: `* { box-sizing: border-box; }
body { font-family: Verdana, sans-serif; padding: 24px; }
.card {
  background: #fff;
  border: 3px solid #152033;
  padding: 24px;
  max-width: 380px;
  margin-bottom: 16px;
  border-radius: 12px;
}`,
            js: ""
          }
        },
        quiz: {
          q: "Which layer sits outside the border?",
          options: ["Content", "Padding", "Margin", "The text"],
          answer: 2,
          why: "Margin is the outer spacing. Padding is inside the border, around the content."
        }
      },
      {
        id: "c4",
        title: "Type, Color and Shadow",
        minutes: 8,
        xp: 20,
        goal: "Make a good-looking card with font, color, radius and shadow choices.",
        sections: [
          {
            h: "Type sets the mood",
            p: "`font-family` chooses the typeface. `font-size` sets size. `font-weight` sets boldness. `line-height` sets the space between lines. A line-height around 1.5 makes paragraphs comfortable to read. Keep body text at 16 pixels or larger."
          },
          {
            h: "Contrast is not optional",
            p: "Dark text on a light background, or light text on a dark background, is readable. Light gray text on white looks stylish and is often impossible to read. Test your page in bright light or on a small screen. If you have to squint, fix it."
          },
          {
            h: "Soft edges and shadows",
            p: "`border-radius` rounds corners. `box-shadow` adds a shadow behind a box. A subtle shadow makes a card feel lifted off the page. Too many shadows make everything look like it is floating away. Pick one shadow style and repeat it."
          }
        ],
        demo: {
          html: `<div class="profile">
  <div class="avatar">AJ</div>
  <h1>Anaya's Art Corner</h1>
  <p>I draw comics, build tiny worlds, and drink too much cocoa.</p>
  <a href="#">See my sketchbook</a>
</div>`,
          css: `body {
  font-family: "Trebuchet MS", Verdana, sans-serif;
  background: #e9fbf7;
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin: 0;
}
.profile {
  background: #fffdf7;
  border: 2px solid #152033;
  border-radius: 20px;
  padding: 28px;
  max-width: 360px;
  box-shadow: 8px 8px 0 #152033;
}
.avatar {
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  background: #ffd166;
  border: 2px solid #152033;
  border-radius: 50%;
  font-weight: bold;
  margin-bottom: 14px;
}
h1 {
  font-size: 28px;
  margin: 0 0 8px;
  letter-spacing: -0.5px;
}
p {
  color: #33415c;
  line-height: 1.5;
}
a {
  display: inline-block;
  background: #ff6b57;
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 16px;
  border-radius: 9px;
  border: 2px solid #152033;
}`,
          js: ""
        },
        challenge: {
          text: "Design a profile card from scratch. Small page, strong style.",
          steps: [
            "Pick a background color and a card color with good contrast.",
            "Use a large heading and comfortable line-height for the paragraph.",
            "Add border-radius and one box-shadow.",
            "Add a button-style link with padding and a border."
          ],
          starter: {
            html: `<div class="card">
  <h1>Your Name</h1>
  <p>A short introduction goes here. Keep it friendly.</p>
  <a href="#">My link</a>
</div>`,
            css: `body {
  font-family: "Trebuchet MS", Verdana, sans-serif;
  background: #eef2ff;
  padding: 40px;
}
.card {
  background: white;
  border: 2px solid #152033;
  border-radius: 18px;
  padding: 26px;
  max-width: 360px;
  box-shadow: 6px 6px 0 #152033;
}
a {
  display: inline-block;
  background: #5b8cff;
  color: white;
  padding: 9px 15px;
  border-radius: 8px;
  text-decoration: none;
}`,
            js: ""
          }
        },
        quiz: {
          q: "Which line-height is usually most comfortable for body text?",
          options: ["0.5", "1.0", "1.5", "4.0"],
          answer: 2,
          why: "A line-height around 1.5 gives paragraphs room to breathe. 1.0 is cramped and 4.0 is far too loose."
        }
      }
    ],
    boss: {
      title: "The Cascade Phantom",
      intro: "The Phantom changes colors when you are not looking. Prove you understand selectors and the box model to pass.",
      questions: [
        {
          q: "Which selector has the highest priority here: p, .note, or #intro?",
          options: ["p", ".note", "#intro", "They are all equal"],
          answer: 2,
          why: "IDs are more specific than classes, and classes are more specific than element selectors. Avoid fighting specificity by keeping styles simple."
        },
        {
          q: "You set width: 300px, padding: 20px, and border: 5px, with default box-sizing. How wide is the visible box?",
          options: ["300px", "325px", "350px", "370px"],
          answer: 2,
          why: "Default box-sizing adds padding on both sides (40px) and border on both sides (10px), for 350px total. border-box would keep it at 300px."
        },
        {
          q: "Which CSS rule makes all paragraphs inside .card blue?",
          options: [".card p { color: blue; }", "p.card { color: blue; }", ".card > blue { }", "p + .card { color: blue; }"],
          answer: 0,
          why: "A space between selectors means descendant. .card p selects every paragraph inside an element with class card."
        }
      ]
    }
  },
  {
    id: "layout-lagoon",
    num: 3,
    title: "Layout Lagoon",
    tagline: "Put things where they belong.",
    color: "#1fb9a6",
    intro: "Flexbox, Grid and responsive design. Learn how to arrange a page that looks good on a phone, a tablet and a big screen.",
    lessons: [
      {
        id: "l1",
        title: "Block, Inline and Display",
        minutes: 6,
        xp: 20,
        goal: "Understand how elements flow on a page and when to change display.",
        sections: [
          {
            h: "Block elements take the whole line",
            p: "Headings, paragraphs, divs and sections are **block** elements. Each one starts on a new line and stretches as wide as it can. That is why two paragraphs stack instead of sitting side by side."
          },
          {
            h: "Inline elements sit in the sentence",
            p: "Links, strong text and spans are **inline** elements. They only take the width of their content and sit inside a line of text. You cannot give an inline element a width or height until you change its display."
          },
          {
            h: "display changes the rules",
            p: "`display: block;` makes an element stack. `display: inline-block;` lets it sit in a line but accept width and height. `display: none;` hides it completely. `display: flex;` and `display: grid;` unlock layout superpowers, which come next."
          }
        ],
        demo: {
          html: `<h1>Display Lab</h1>
<p>This paragraph is a block. It takes the full line.</p>
<span class="chip">inline chip</span>
<span class="chip blocky">inline-block chip</span>
<span class="chip">another chip</span>
<div class="hidden-box">You should not see me.</div>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
h1 { color: #1d6b5c; }
.chip {
  background: #ffd166;
  border: 2px solid #152033;
  border-radius: 999px;
  padding: 4px 10px;
  margin: 4px;
}
.blocky {
  display: inline-block;
  width: 160px;
  text-align: center;
}
.hidden-box { display: none; }`,
          js: ""
        },
        challenge: {
          text: "Make three labels sit in a row and give one a fixed width.",
          steps: [
            "Put three spans in the HTML.",
            "Style them as pills with padding and a border.",
            "Give one span display: inline-block and a width of 150px.",
            "Add display: none to a fourth element and confirm it disappears."
          ],
          starter: {
            html: `<h1>Labels</h1>
<span class="label">One</span>
<span class="label wide">Two</span>
<span class="label">Three</span>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
.label {
  background: #9bd9c7;
  border: 2px solid #152033;
  border-radius: 999px;
  padding: 5px 12px;
}
.wide { display: inline-block; width: 150px; text-align: center; }`,
            js: ""
          }
        },
        quiz: {
          q: "Which display value hides an element completely?",
          options: ["display: block", "display: inline", "display: none", "display: flex"],
          answer: 2,
          why: "display: none removes the element from the layout. visibility: hidden would leave an empty space instead."
        }
      },
      {
        id: "l2",
        title: "Flexbox",
        minutes: 9,
        xp: 20,
        goal: "Arrange items in a row or column with alignment and gaps.",
        sections: [
          {
            h: "Flexbox works on a parent",
            p: "Set `display: flex;` on a container. Its direct children become flex items and line up in a row by default. The parent controls the group. This is perfect for navigation bars, button rows, cards and centering."
          },
          {
            h: "The two big alignment properties",
            p: "`justify-content` moves items along the main line. `align-items` moves them across it. In a row, justify-content is left-to-right and align-items is top-to-bottom. Try `center`, `space-between` and `flex-start` to see the difference."
          },
          {
            h: "Gap and wrapping",
            p: "Use `gap` to add space between items without margin math. Add `flex-wrap: wrap;` so items move to the next line when they run out of room. `flex: 1;` tells an item to grow and share the leftover space."
          }
        ],
        demo: {
          html: `<nav class="bar">
  <strong>Mochi's Cafe</strong>
  <div class="links">
    <a href="#">Menu</a>
    <a href="#">About</a>
    <a href="#">Visit</a>
  </div>
</nav>
<div class="cards">
  <div class="card">Tea</div>
  <div class="card">Toast</div>
  <div class="card">Cake</div>
</div>`,
          css: `body { font-family: Verdana, sans-serif; padding: 20px; background: #f6f2e8; }
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: #152033;
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
}
.links { display: flex; gap: 12px; }
.links a { color: #ffd166; text-decoration: none; font-weight: bold; }
.cards { display: flex; gap: 14px; margin-top: 18px; flex-wrap: wrap; }
.card {
  flex: 1;
  min-width: 120px;
  background: white;
  border: 2px solid #152033;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  font-weight: bold;
}`,
          js: ""
        },
        challenge: {
          text: "Build a flexible card row that wraps on small screens.",
          steps: [
            "Make a container with display: flex.",
            "Add gap: 14px and flex-wrap: wrap.",
            "Give each card flex: 1 and min-width: 140px.",
            "Center the text inside each card."
          ],
          starter: {
            html: `<h1>Pick a Topic</h1>
<div class="row">
  <div class="card">HTML</div>
  <div class="card">CSS</div>
  <div class="card">JavaScript</div>
</div>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
.row { display: flex; gap: 14px; flex-wrap: wrap; }
.card {
  flex: 1;
  min-width: 140px;
  background: #fff5d6;
  border: 2px solid #152033;
  border-radius: 12px;
  padding: 22px;
  text-align: center;
  font-weight: bold;
}`,
            js: ""
          }
        },
        quiz: {
          q: "Which property spaces out flex items along the main line?",
          options: ["align-items", "justify-content", "text-align", "line-height"],
          answer: 1,
          why: "justify-content distributes items along the main axis. align-items handles the cross axis."
        }
      },
      {
        id: "l3",
        title: "CSS Grid",
        minutes: 9,
        xp: 20,
        goal: "Build two-dimensional layouts with rows and columns.",
        sections: [
          {
            h: "Grid is for rows and columns",
            p: "Flexbox is best for one direction. Grid handles two. Set `display: grid;` on a parent and use `grid-template-columns: 1fr 1fr 1fr;` to make three equal columns. The `fr` unit means \"one share of the free space\"."
          },
          {
            h: "Repeat is your friend",
            p: "`grid-template-columns: repeat(3, 1fr);` is short for three equal columns. `repeat(auto-fit, minmax(220px, 1fr));` creates as many columns as fit, each at least 220 pixels wide. That one line gives you a responsive card gallery."
          },
          {
            h: "Place items with intent",
            p: "Items flow into cells automatically. You can also make one item span two columns with `grid-column: span 2;`. Use grid for page sections, photo galleries and dashboards. Use it when the design needs both rows and columns, not just a line."
          }
        ],
        demo: {
          html: `<h1>Photo Wall</h1>
<div class="gallery">
  <div class="tile a">A</div>
  <div class="tile b">B</div>
  <div class="tile c">C</div>
  <div class="tile d">D</div>
  <div class="tile e">E</div>
</div>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; background: #f6f2e8; }
h1 { color: #1d6b5c; }
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.tile {
  display: grid;
  place-items: center;
  min-height: 100px;
  border: 2px solid #152033;
  border-radius: 12px;
  font-size: 24px;
  font-weight: bold;
  background: #ffd166;
}
.a { grid-column: span 2; background: #ff6b57; }
.b { background: #9bd9c7; }
.c { background: #b9caff; }`,
          js: ""
        },
        challenge: {
          text: "Create a three-column gallery with one wide feature tile.",
          steps: [
            "Set the gallery to display: grid.",
            "Use repeat(3, 1fr) for the columns and a 12px gap.",
            "Make the first tile span two columns.",
            "Add min-height and place-items: center to every tile."
          ],
          starter: {
            html: `<h1>Gallery</h1>
<div class="gallery">
  <div class="tile">1</div>
  <div class="tile">2</div>
  <div class="tile">3</div>
  <div class="tile">4</div>
  <div class="tile">5</div>
</div>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.tile {
  min-height: 100px;
  display: grid;
  place-items: center;
  background: #fff5d6;
  border: 2px solid #152033;
  border-radius: 12px;
}`,
            js: ""
          }
        },
        quiz: {
          q: "What does 1fr mean in a grid column?",
          options: [
            "One fixed row",
            "One fraction of the available space",
            "One pixel",
            "One font size"
          ],
          answer: 1,
          why: "fr stands for fraction. Columns share the free space based on their fr values."
        }
      },
      {
        id: "l4",
        title: "Responsive Design",
        minutes: 9,
        xp: 20,
        goal: "Make a layout that adapts to phones, tablets and desktops.",
        sections: [
          {
            h: "Start with the phone",
            p: "Most people visit websites on a phone. Design the small screen first, then add space and columns as the screen grows. It is easier to add than to remove. This approach is called **mobile-first** design."
          },
          {
            h: "Media queries add rules",
            p: "A media query applies CSS only when a condition is true. `@media (min-width: 700px) { .row { display: flex; } }` means: when the viewport is at least 700 pixels wide, use these rules. The viewport is the visible page area."
          },
          {
            h: "Fluid beats fixed",
            p: "Use `max-width: 100%` on images, `clamp()` for text that scales, and `auto-fit` grids for card rows. A few flexible rules can replace dozens of tiny breakpoints. Test by dragging your browser window narrower and watching what breaks."
          }
        ],
        demo: {
          html: `<h1>Responsive Beach</h1>
<div class="row">
  <div class="card"><h2>Sand</h2><p>Warm and soft.</p></div>
  <div class="card"><h2>Waves</h2><p>Loud and blue.</p></div>
  <div class="card"><h2>Shells</h2><p>Small and shiny.</p></div>
</div>`,
          css: `body { font-family: Verdana, sans-serif; padding: 20px; background: #e9fbf7; }
h1 { font-size: clamp(28px, 6vw, 48px); color: #1d6b5c; }
.row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
.card {
  background: white;
  border: 2px solid #152033;
  border-radius: 12px;
  padding: 16px;
}
@media (min-width: 640px) {
  .row { grid-template-columns: repeat(3, 1fr); }
  .card { padding: 22px; }
}`,
          js: ""
        },
        challenge: {
          text: "Make a one-column page become three columns on wider screens.",
          steps: [
            "Start with grid-template-columns: 1fr.",
            "Add a media query at min-width: 700px.",
            "Inside it, switch to three columns.",
            "Use clamp() to make the heading grow smoothly."
          ],
          starter: {
            html: `<h1>My Responsive Page</h1>
<div class="row">
  <div class="card">One</div>
  <div class="card">Two</div>
  <div class="card">Three</div>
</div>`,
            css: `body { font-family: Verdana, sans-serif; padding: 20px; }
h1 { font-size: clamp(28px, 6vw, 48px); }
.row { display: grid; grid-template-columns: 1fr; gap: 12px; }
.card {
  background: #fff5d6;
  border: 2px solid #152033;
  border-radius: 12px;
  padding: 18px;
}
@media (min-width: 700px) {
  .row { grid-template-columns: repeat(3, 1fr); }
}`,
            js: ""
          }
        },
        quiz: {
          q: "What does a mobile-first media query usually use?",
          options: ["max-width", "min-width", "font-size", "display: none"],
          answer: 1,
          why: "Mobile-first styles start small and add complexity with min-width queries as the screen gets wider."
        }
      }
    ],
    boss: {
      title: "The Grid Gremlin",
      intro: "The Gremlin scrambles layouts for fun. Show that you can put the pieces back in order.",
      questions: [
        {
          q: "Which is the best tool for a navigation bar with items in one row?",
          options: ["display: grid", "display: flex", "position: fixed", "font-weight"],
          answer: 1,
          why: "Flexbox is designed for one-dimensional rows or columns. Grid is also possible, but flex is the natural fit for a nav bar."
        },
        {
          q: "Which grid line creates a responsive card gallery without a media query?",
          options: [
            "grid-template-columns: 300px 300px;",
            "grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));",
            "grid-template-rows: 1fr;",
            "display: inline;"
          ],
          answer: 1,
          why: "auto-fit and minmax let the browser create as many columns as fit. It is a compact responsive layout trick."
        },
        {
          q: "What is the main axis in a flex row?",
          options: ["Top to bottom", "Left to right", "Diagonal", "Depends on the border"],
          answer: 1,
          why: "In a row, the main axis runs left to right. justify-content moves items along that axis."
        }
      ]
    }
  },
  {
    id: "js-jungle",
    num: 4,
    title: "JavaScript Jungle",
    tagline: "Teach the page to think.",
    color: "#5b8cff",
    intro: "Variables, decisions and loops. This is where your page stops being a poster and starts being a machine.",
    lessons: [
      {
        id: "j1",
        title: "JavaScript Basics",
        minutes: 6,
        xp: 20,
        goal: "Run your first JavaScript and read a console message.",
        sections: [
          {
            h: "Scripts run instructions",
            p: "JavaScript is a list of instructions, run from top to bottom. Put it inside a `<script>` tag or in a separate `.js` file. Each instruction is called a **statement**. A semicolon at the end is optional, but using one keeps lines clear."
          },
          {
            h: "Say hello to the console",
            p: "`console.log(\"Hello\");` prints a message to the browser's console. Open developer tools with F12 or right-click and choose Inspect, then find the Console tab. The console is where you test ideas and read error messages."
          },
          {
            h: "Errors are clues",
            p: "If something breaks, JavaScript stops at the first error. Read the message and the line number. A red message is not a punishment; it is a note telling you exactly where to look."
          }
        ],
        demo: {
          html: `<h1>Console Lab</h1>
<p>Open the console to see the messages.</p>
<pre id="out">Output will appear here too.</pre>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
pre { background: #152033; color: #9bd9c7; padding: 14px; border-radius: 10px; }`,
          js: `console.log("Hello from JavaScript!");
console.log(2 + 3);

const out = document.getElementById("out");
out.textContent = "The script ran. 2 + 3 = " + (2 + 3);`
        },
        challenge: {
          text: "Print three messages, then make one calculation.",
          steps: [
            "Use console.log to print your name.",
            "Print your favorite number.",
            "Print the result of 12 * 8.",
            "Write the result into the page with textContent."
          ],
          starter: {
            html: `<h1>JS Test</h1>
<pre id="out">Waiting...</pre>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
pre { background: #152033; color: #9bd9c7; padding: 14px; border-radius: 10px; }`,
            js: `console.log("My name is ___");
console.log("My favorite number is ___");
console.log(12 * 8);

document.getElementById("out").textContent = "JavaScript is running.";`
          }
        },
        quiz: {
          q: "Where do console.log messages appear?",
          options: ["On the page automatically", "In the browser console", "In the CSS file", "In the server's inbox"],
          answer: 1,
          why: "console.log writes to the developer console. It does not appear on the page unless you also put it there."
        }
      },
      {
        id: "j2",
        title: "Variables and Types",
        minutes: 8,
        xp: 20,
        goal: "Store text, numbers and true/false values in named boxes.",
        sections: [
          {
            h: "Variables are labeled boxes",
            p: "A variable stores a value under a name. `let score = 10;` creates a box called score with 10 inside. `const name = \"Mochi\";` creates a box that cannot be reassigned. Use `const` by default and `let` when the value must change."
          },
          {
            h: "Three everyday types",
            p: "A **string** is text, wrapped in quotes: `\"hello\"`. A **number** is a numeric value: `42` or `3.14`. A **boolean** is either `true` or `false`. Names are case-sensitive, so `score` and `Score` are different boxes."
          },
          {
            h: "Template literals join text",
            p: "Backticks let you drop values into a string: `` `Score: ${score}` ``. The `${...}` part is replaced with the value. This is much easier to read than gluing strings together with plus signs."
          }
        ],
        demo: {
          html: `<h1>Player Card</h1>
<div class="card" id="card">Loading...</div>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; background: #eef2ff; }
.card {
  background: white;
  border: 2px solid #152033;
  border-radius: 14px;
  padding: 20px;
  max-width: 320px;
  box-shadow: 5px 5px 0 #152033;
}`,
          js: `const player = "Mochi";
let score = 12;
const isReady = true;

console.log(player, score, isReady);

const card = document.getElementById("card");
card.innerHTML = "<h2>" + player + "</h2><p>Score: " + score + "</p>";

score = score + 8;
console.log("New score:", score);`
        },
        challenge: {
          text: "Build a player card with variables.",
          steps: [
            "Create a const for a player name.",
            "Create a let for a score, then add 5 to it.",
            "Create a boolean for whether the player is ready.",
            "Show all three values in the card using template literals."
          ],
          starter: {
            html: `<h1>Player</h1>
<div class="card" id="card">...</div>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
.card { background: #fff5d6; border: 2px solid #152033; border-radius: 14px; padding: 20px; max-width: 320px; }`,
            js: `const player = "___";
let score = 10;
const ready = true;

// add 5 to score here

const card = document.getElementById("card");
card.innerHTML = "<p>Player: " + player + "</p>";`
          }
        },
        quiz: {
          q: "Which keyword creates a value that should not be reassigned?",
          options: ["let", "const", "var", "change"],
          answer: 1,
          why: "const creates a constant binding. let creates a variable that can be reassigned."
        }
      },
      {
        id: "j3",
        title: "Decisions",
        minutes: 8,
        xp: 20,
        goal: "Use comparisons and if statements to make the page choose.",
        sections: [
          {
            h: "Comparisons produce booleans",
            p: "`5 > 3` is true. `5 === 3` is false. Use three equals signs to compare values in JavaScript. One equals sign assigns a value; three checks it. `!==` means \"not equal\". Also useful: `>=`, `<=`, `<` and `>`."
          },
          {
            h: "if, else if, else",
            p: "An `if` statement runs a block only when a condition is true. Add `else if` for another possibility, and `else` for everything left over. Only the first true branch runs."
          },
          {
            h: "Combining conditions",
            p: "`&&` means both sides must be true. `||` means at least one side must be true. `!` flips true to false. Parentheses make your intention clear: `if ((age >= 10) && hasTicket) { ... }`."
          }
        ],
        demo: {
          html: `<h1>Ride Check</h1>
<p id="result">Enter your height.</p>
<input id="height" type="number" placeholder="Height in cm">
<button id="check">Check</button>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
input, button { font: inherit; padding: 7px 10px; border: 2px solid #152033; border-radius: 8px; }
button { background: #ffd166; font-weight: bold; }
#result { font-weight: bold; margin-top: 14px; }`,
          js: `const result = document.getElementById("result");
const input = document.getElementById("height");

document.getElementById("check").addEventListener("click", function () {
  const height = Number(input.value);

  if (height >= 120) {
    result.textContent = "You can ride!";
  } else if (height >= 100) {
    result.textContent = "You can ride with an adult.";
  } else {
    result.textContent = "Not yet. Try the small ride.";
  }
});`
        },
        challenge: {
          text: "Write a score checker with three outcomes.",
          steps: [
            "Create a score variable.",
            "If score is 90 or more, show \"Gold\".",
            "If score is 70 or more, show \"Silver\".",
            "Otherwise show \"Keep practicing\"."
          ],
          starter: {
            html: `<h1>Score Checker</h1>
<p id="out">...</p>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
#out { font-size: 22px; font-weight: bold; }`,
            js: `const score = 85;
const out = document.getElementById("out");

if (score >= 90) {
  out.textContent = "Gold";
} else if (score >= 70) {
  out.textContent = "Silver";
} else {
  out.textContent = "Keep practicing";
}`
          }
        },
        quiz: {
          q: "Which operator checks whether two values are equal?",
          options: ["=", "==", "===", "=>"],
          answer: 2,
          why: "=== checks value and type, which is the safest comparison. = assigns. => is used in arrow functions."
        }
      },
      {
        id: "j4",
        title: "Loops",
        minutes: 8,
        xp: 20,
        goal: "Repeat instructions with for and while loops.",
        sections: [
          {
            h: "Loops repeat work",
            p: "A loop runs the same block of code many times. A `for` loop has three parts: where to start, when to keep going, and how to change each time. `for (let i = 1; i <= 5; i++)` counts from 1 to 5."
          },
          {
            h: "The counter is a variable",
            p: "The `i` in a for loop is just a variable. `i++` adds one. `i += 2` adds two. The condition is checked before every pass. If the condition never becomes false, the loop runs forever and the page freezes. Always make progress toward the end."
          },
          {
            h: "while and break",
            p: "A `while` loop keeps going as long as a condition is true. Use it when you do not know the number of repeats in advance. `break` exits the loop immediately. Use loops to build lists, count things, or repeat an action."
          }
        ],
        demo: {
          html: `<h1>Countdown</h1>
<button id="go">Start countdown</button>
<ul id="list"></ul>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
button { font: inherit; padding: 8px 14px; border: 2px solid #152033; border-radius: 8px; background: #9bd9c7; font-weight: bold; }
li { margin: 4px 0; }`,
          js: `document.getElementById("go").addEventListener("click", function () {
  const list = document.getElementById("list");
  list.innerHTML = "";

  for (let i = 5; i >= 1; i--) {
    const item = document.createElement("li");
    item.textContent = i + "...";
    list.appendChild(item);
  }

  const boom = document.createElement("li");
  boom.textContent = "Liftoff!";
  list.appendChild(boom);
});`
        },
        challenge: {
          text: "Use a loop to print the 3 times table.",
          steps: [
            "Create an empty list in the HTML.",
            "Write a for loop from 1 to 5.",
            "Inside the loop, create an li with 3 * i.",
            "Append each li to the list."
          ],
          starter: {
            html: `<h1>3 Times Table</h1>
<ul id="list"></ul>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }`,
            js: `const list = document.getElementById("list");

for (let i = 1; i <= 5; i++) {
  const item = document.createElement("li");
  item.textContent = "3 x " + i + " = " + (3 * i);
  list.appendChild(item);
}`
          }
        },
        quiz: {
          q: "What does i++ do?",
          options: ["Adds 2 to i", "Adds 1 to i", "Checks if i is true", "Stops the loop"],
          answer: 1,
          why: "i++ increases i by one after each pass. It is the same as i = i + 1."
        }
      }
    ],
    boss: {
      title: "The Loop Serpent",
      intro: "The Serpent coils around the path. Break the loop with three correct answers.",
      questions: [
        {
          q: "What will this print? let x = 4; x = x * 2; console.log(x);",
          options: ["4", "6", "8", "x * 2"],
          answer: 2,
          why: "x starts at 4, then is reassigned to 4 * 2, which is 8."
        },
        {
          q: "Which condition means \"score is at least 50 and lives are greater than 0\"?",
          options: [
            "score >= 50 || lives > 0",
            "score >= 50 && lives > 0",
            "score > 50 && lives >= 0",
            "score = 50 && lives = 0"
          ],
          answer: 1,
          why: ">= means at least, > means greater than, and && requires both conditions to be true."
        },
        {
          q: "What is the danger of a while loop whose condition never becomes false?",
          options: ["It runs once", "It runs forever and can freeze the page", "It automatically stops after 10 tries", "It changes into a for loop"],
          answer: 1,
          why: "A loop needs a path to ending. If the condition stays true, the browser keeps working and the page can lock up."
        }
      ]
    }
  },
  {
    id: "function-factory",
    num: 5,
    title: "Function Factory",
    tagline: "Build reusable machines.",
    color: "#9b7bff",
    intro: "A function takes input, does a job, and gives back a result. Once you can build functions, you can build anything.",
    lessons: [
      {
        id: "f1",
        title: "Functions",
        minutes: 7,
        xp: 20,
        goal: "Write, call and reuse a function.",
        sections: [
          {
            h: "A function is a recipe",
            p: "A function is a named block of code that does one job. You write it once, then **call** it whenever you need it. `function greet() { console.log(\"Hello!\"); }` defines the recipe. `greet();` runs it."
          },
          {
            h: "Why not just copy the code?",
            p: "Copying works until you need to change something. Then you have to find every copy. A function gives one place to make the change. It also gives the job a name, which makes your code easier to read."
          },
          {
            h: "Good functions do one thing",
            p: "A function called `calculateTotal` should calculate a total. It should not also change the page, send an email, and play a sound. Small focused functions are easier to test and easier to combine."
          }
        ],
        demo: {
          html: `<h1>Greeting Machine</h1>
<button id="btn">Say hello</button>
<p id="out">...</p>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
button { font: inherit; padding: 8px 14px; border: 2px solid #152033; border-radius: 8px; background: #ffd166; font-weight: bold; }
#out { font-size: 20px; font-weight: bold; }`,
          js: `function greet() {
  console.log("Hello from the function!");
  return "Hello, explorer!";
}

document.getElementById("btn").addEventListener("click", function () {
  document.getElementById("out").textContent = greet();
});

console.log("The page is ready.");`
        },
        challenge: {
          text: "Write two functions and call each one.",
          steps: [
            "Write a function called cheer that writes a message to the page.",
            "Write a function called showDate that writes today's date.",
            "Add a button that calls cheer.",
            "Call showDate once when the page loads."
          ],
          starter: {
            html: `<h1>Function Practice</h1>
<button id="cheer">Cheer</button>
<p id="out">...</p>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
button { font: inherit; padding: 8px 14px; border: 2px solid #152033; border-radius: 8px; background: #9bd9c7; font-weight: bold; }`,
            js: `function cheer() {
  document.getElementById("out").textContent = "You can do it!";
}

document.getElementById("cheer").addEventListener("click", cheer);`
          }
        },
        quiz: {
          q: "What is the correct way to call a function named start?",
          options: ["start;", "start();", "call start;", "function start();"],
          answer: 1,
          why: "Parentheses run the function. Writing start without parentheses refers to the function itself but does not call it."
        }
      },
      {
        id: "f2",
        title: "Parameters and Return",
        minutes: 8,
        xp: 20,
        goal: "Give functions inputs and get useful values back.",
        sections: [
          {
            h: "Parameters are inputs",
            p: "`function greet(name) { ... }` takes one parameter. When you call `greet(\"Mochi\")`, the value \"Mochi\" is copied into name. Parameters make one function work for many different inputs."
          },
          {
            h: "return sends a value back",
            p: "`return` stops the function and hands a value to whoever called it. `const total = add(2, 3);` stores the returned 5. If a function has no return, it returns `undefined`. A `console.log` inside a function does not count as returning."
          },
          {
            h: "Inputs, job, output",
            p: "Before writing a function, finish this sentence: \"Given ___, this function returns ___.\" If you cannot fill both blanks, the function is probably trying to do too much."
          }
        ],
        demo: {
          html: `<h1>Tip Machine</h1>
<p id="out">...</p>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
#out { font-size: 20px; font-weight: bold; background: #fff5d6; padding: 14px; border-radius: 10px; max-width: 360px; }`,
          js: `function tip(total, percent) {
  return total * (percent / 100);
}

function money(amount) {
  return "$" + amount.toFixed(2);
}

const meal = 24;
const tipAmount = tip(meal, 15);

document.getElementById("out").textContent =
  "Meal: " + money(meal) + " | Tip: " + money(tipAmount) + " | Total: " + money(meal + tipAmount);`
        },
        challenge: {
          text: "Write a function that converts minutes to seconds.",
          steps: [
            "Create a function called toSeconds with one parameter.",
            "Return the parameter multiplied by 60.",
            "Call it with 5 and show the result in the page.",
            "Call it again with 12 and show that result too."
          ],
          starter: {
            html: `<h1>Time Converter</h1>
<p id="out">...</p>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }`,
            js: `function toSeconds(minutes) {
  return minutes * 60;
}

document.getElementById("out").textContent = "5 minutes = " + toSeconds(5) + " seconds";`
          }
        },
        quiz: {
          q: "What does a function return if it has no return statement?",
          options: ["0", "null", "undefined", "An error"],
          answer: 2,
          why: "JavaScript functions return undefined by default. If you need a value, use return."
        }
      },
      {
        id: "f3",
        title: "Scope and Arrow Functions",
        minutes: 7,
        xp: 20,
        goal: "Understand where variables live and write shorter functions.",
        sections: [
          {
            h: "Scope is where a variable can be seen",
            p: "A variable created inside a function only exists inside that function. This is **local scope**. A variable created outside all functions is global and can be seen in more places. Keep variables local when possible so different functions cannot accidentally overwrite each other."
          },
          {
            h: "Arrow functions are a shortcut",
            p: "`const double = (n) => n * 2;` is a compact function. If there is one parameter, the parentheses are optional. If the body is one expression, the return is automatic. Arrow functions are great for short operations and for callbacks."
          },
          {
            h: "Readable beats clever",
            p: "A one-line arrow function is clear. A five-operation arrow function squeezed onto one line is not. Use the form that makes the job obvious to the next person reading it, including future you."
          }
        ],
        demo: {
          html: `<h1>Arrow Lab</h1>
<p id="out">...</p>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
#out { background: #eef2ff; padding: 14px; border-radius: 10px; font-weight: bold; }`,
          js: `const double = (n) => n * 2;
const shout = (text) => text.toUpperCase() + "!";
const isBig = (n) => n > 100;

const out = document.getElementById("out");
out.textContent = double(21) + " | " + shout("hello") + " | " + isBig(150);`
        },
        challenge: {
          text: "Rewrite three functions as arrow functions.",
          steps: [
            "Write an arrow function called square.",
            "Write an arrow function called addFive.",
            "Write an arrow function called isEven that returns a boolean.",
            "Show the results on the page."
          ],
          starter: {
            html: `<h1>Short Functions</h1>
<p id="out">...</p>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }`,
            js: `const square = (n) => n * n;
const addFive = (n) => n + 5;
const isEven = (n) => n % 2 === 0;

document.getElementById("out").textContent =
  square(6) + " | " + addFive(10) + " | " + isEven(8);`
          }
        },
        quiz: {
          q: "Where can a variable created inside a function be used?",
          options: ["Everywhere on the page", "Only inside that function", "Only in CSS", "Only after the page reloads"],
          answer: 1,
          why: "Function-local variables are scoped to that function. Code outside cannot see them."
        }
      },
      {
        id: "f4",
        title: "Build a Score Machine",
        minutes: 10,
        xp: 20,
        goal: "Combine functions, parameters, decisions and return values in one mini project.",
        sections: [
          {
            h: "Break the job into steps",
            p: "A score machine needs to take a score, decide a rank, and produce a message. That is three small jobs. Build a function for each job, then connect them. Big problems become manageable when you slice them into small functions."
          },
          {
            h: "Return first, display later",
            p: "A function that calculates a rank should return the rank, not write it to the page. Keeping calculation separate from display means you can reuse the calculation in a game, a quiz, or a report. Display is just the final step."
          },
          {
            h: "Test the edges",
            p: "Check a normal score, a very low score, and a score exactly on a boundary. Boundary bugs are common: does 90 count as gold? Decide, write it down, and test it. A function you trust is worth ten you hope work."
          }
        ],
        demo: {
          html: `<h1>Score Machine</h1>
<input id="score" type="number" value="85" aria-label="Score">
<button id="check">Rank my score</button>
<div id="out" class="result">...</div>`,
          css: `body { font-family: Verdana, sans-serif; padding: 24px; }
input, button { font: inherit; padding: 8px 10px; border: 2px solid #152033; border-radius: 8px; }
button { background: #9b7bff; color: white; font-weight: bold; }
.result { margin-top: 16px; background: #fff5d6; border: 2px solid #152033; border-radius: 12px; padding: 16px; font-weight: bold; max-width: 360px; }`,
          js: `function getRank(score) {
  if (score >= 90) return "Gold";
  if (score >= 70) return "Silver";
  if (score >= 50) return "Bronze";
  return "Rookie";
}

function getMessage(rank) {
  const messages = {
    Gold: "Outstanding work!",
    Silver: "Strong performance.",
    Bronze: "Good progress. Keep going.",
    Rookie: "Every expert starts here."
  };
  return messages[rank];
}

function makeReport(score) {
  const rank = getRank(score);
  return rank + " - " + getMessage(rank);
}

document.getElementById("check").addEventListener("click", function () {
  const score = Number(document.getElementById("score").value);
  document.getElementById("out").textContent = makeReport(score);
});`
        },
        challenge: {
          text: "Build a score machine for a game.",
          steps: [
            "Write getRank(score) that returns Gold, Silver, Bronze or Rookie.",
            "Write getMessage(rank) that returns a short message.",
            "Write makeReport(score) that combines both.",
            "Show the report when a button is clicked."
          ],
          starter: {
            html: `<h1>Game Rank</h1>
<input id="score" type="number" value="80" aria-label="Score">
<button id="check">Check rank</button>
<div id="out" class="result">...</div>`,
            css: `body { font-family: Verdana, sans-serif; padding: 24px; }
input, button { font: inherit; padding: 8px 10px; border: 2px solid #152033; border-radius: 8px; }
button { background: #9b7bff; color: white; font-weight: bold; }
.result { margin-top: 16px; background: #fff5d6; border: 2px solid #152033; border-radius: 12px; padding: 16px; font-weight: bold; max-width: 360px; }`,
            js: `function getRank(score) {
  if (score >= 90) return "Gold";
  if (score >= 70) return "Silver";
  if (score >= 50) return "Bronze";
  return "Rookie";
}

function getMessage(rank) {
  return "You earned " + rank + "!";
}

function makeReport(score) {
  return getRank(score) + " - " + getMessage(getRank(score));
}

document.getElementById("check").addEventListener("click", function () {
  const score = Number(document.getElementById("score").value);
  document.getElementById("out").textContent = makeReport(score);
});`
          }
        },
        quiz: {
          q: "Why is it useful for getRank to return a value instead of writing to the page?",
          options: [
            "It makes the page load faster.",
            "The calculation can be reused anywhere.",
            "Return values are always shorter.",
            "It stops the function from running."
          ],
          answer: 1,
          why: "Separating calculation from display makes the function reusable. You can show the rank in different ways without rewriting the logic."
        }
      }
    ],
    boss: {
      title: "The Return Machine",
      intro: "The Return Machine only opens for clean inputs and clear outputs. Prove your functions are ready.",
      questions: [
        {
          q: "What will add(3, 4) return? function add(a, b) { return a + b; }",
          options: ["34", "7", "a + b", "undefined"],
          answer: 1,
          why: "The parameters receive 3 and 4, so the function returns their sum, 7."
        },
        {
          q: "Which arrow function correctly doubles a number?",
          options: [
            "const double = n => n * 2;",
            "const double = (n) { n * 2 };",
            "function double => n * 2;",
            "const double = n * 2 => n;"
          ],
          answer: 0,
          why: "An arrow function uses => between the parameters and the body. A single expression is returned automatically."
        },
        {
          q: "A function has console.log(\"done\") but no return. What does it return?",
          options: ["\"done\"", "true", "undefined", "null"],
          answer: 2,
          why: "Logging is not returning. Without return, the function returns undefined."
        }
      ]
    }
  }
);
