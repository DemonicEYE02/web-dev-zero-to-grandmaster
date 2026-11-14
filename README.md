# Web Dev: Zero to Grandmaster

A friendly, hands-on web development course by **Aadarsh Joshi**.
Built for curious beginners: 10 worlds, 40 missions, 6 sample sites, a playground, 10 bosses, a final exam, and a printable certificate.

## Run it locally

### Windows
Double-click `start.bat`.

### Any OS with Python
```bash
python serve.py
```
or
```bash
python -m http.server 8080
```
Then open http://localhost:8080.

You can also open `index.html` directly in a browser. A local server is recommended for the best experience.

## Features
- No build step, no dependencies, no tracking.
- Saves progress in your browser (localStorage).
- Resume where you left off, daily streak, XP, ranks, badges.
- Pip, a squishy guide, points to the next step.
- Live code playground with preview and console.
- Six complete sample sites with source code.
- Final exam and a downloadable/printable certificate.

## Files
- `index.html` - app shell
- `assets/css/app.css` - styles
- `assets/js/curriculum.js`, `curriculum-2.js` - course content
- `assets/js/samples.js` - sample sites
- `assets/js/app.js` - app logic
- `start.bat`, `serve.py` - local servers

## Reset progress
Open Settings in the app, or clear `wd-grandmaster-state` from your browser's localStorage.