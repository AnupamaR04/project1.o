# The Daily Planet Newsroom 📰
*The Independent Student Voice of Planet University — Established 1894*

A responsive, multi-page digital campus newspaper built exclusively with **vanilla HTML5, CSS3, and modern JavaScript (no external frameworks or libraries)**.

---

## 🏛️ Design System & Editorial Aesthetics

- **Typography**:
  - **Headlines & Editorial Callouts**: `Playfair Display` (Classic serif with high editorial contrast).
  - **Masthead Crest & Volume Headers**: `Cinzel` & `Playfair Display`.
  - **Body & Interface Elements**: `Inter` (Legible, contemporary grotesque sans-serif).
- **Color Palette**:
  - **Light Mode**: Cream/off-white background (`#fcfbf7`), crisp paper white cards (`#ffffff`), rich charcoal text (`#161616`), and single deep newspaper crimson accent (`#8b0000`).
  - **Dark Mode**: Deep charcoal/ink background (`#121316`), slate surface cards (`#1b1c22`), parchment white text (`#f4f4f6`), and high-contrast crimson (`#d13636`).
- **Editorial Elements**:
  - Classic double-rule borders and issue line (`Vol. CXLII, No. 48`).
  - Auto-generated today's date formatted to local calendar.
  - Drop cap initial letter on lead article paragraphs.
  - Pull quotes with crimson rule borders and italic serif typography.

---

## 📂 Project Structure

```
daily-planet-newsroom/
├── index.html                     # Homepage (Hero, ticker, latest grid, trending, editor's picks)
├── pages/
│   ├── campus-news.html           # Campus News desk (Hostels, union elections, dining, library)
│   ├── technology.html            # Technology desk (AI lab, hackathon drone, solar, cybersecurity)
│   ├── sports.html                # Sports desk (Varsity football finals, track, badminton, intramurals)
│   ├── culture.html               # Culture desk (Aura fest, art exhibits, film society, battle of bands)
│   ├── article.html               # Dynamic article reader (Progress bar, like counter, comments, related)
│   └── saved.html                 # Bookmarked articles reading archive (Clear all, remove individual)
├── css/
│   └── styles.css                 # Complete responsive stylesheet, CSS variables, dark mode & animations
├── js/
│   ├── articles-data.js           # API loader from data/articles.json + smart fallback & localStorage
│   ├── main.js                    # Global header, theme toggler, date generator, search modal, bookmarks
│   ├── ticker.js                  # Continuous breaking news ticker with pause-on-hover & manual controls
│   ├── home.js                    # Homepage dynamic renderer, category filter chips & sort
│   ├── category.js                # Category desk renderer with subtopic chips & sorting
│   ├── article.js                 # Article reader view: scroll progress bar, like counter, comments form
│   └── saved.js                   # Saved articles page controller
├── data/
│   └── articles.json              # 16 realistic fictional college articles (4 per desk)
├── assets/
│   ├── logo.svg                   # Ornate newspaper press crest seal
│   └── favicon.svg                # Press 'P' monogram icon
└── README.md                      # Documentation & instructions
```

---

## ✨ Features & Capabilities

1. **Dynamic JSON Data Layer (`/data/articles.json`)**:
   - Contains 16 realistic, detailed campus stories with headlines, subheadings, pull quotes, bylines, author avatars, high-resolution Unsplash photography, and tags.
   - Dual-mode loader (`js/articles-data.js`): Fetches `data/articles.json` over HTTP, with a seamless embedded fallback for direct `file://` offline viewing without CORS blocks.

2. **Auto-scrolling Breaking News Ticker**:
   - Continuous marquee animation displaying breaking campus headlines.
   - Pauses seamlessly on mouse hover or keyboard focus.
   - Next/Previous buttons for manual navigation.

3. **Live Search with Real-time Highlighting**:
   - Accessible via search buttons or the `/` keyboard shortcut.
   - Instant search across article titles, summaries, tags, and reporter names.
   - Highlights query matches dynamically.

4. **Category Filtering & Sorting**:
   - Category filter chips: *All*, *Campus News*, *Technology*, *Sports*, *Culture*.
   - Subtopic chips on desk pages (e.g. *Hostels*, *AI Lab*, *Football*, *Film Society*).
   - Dynamic sorting: *Newest First*, *Most Popular (by views)*, and *Quickest Read*.

5. **Reading Progress Bar**:
   - Fixed 4px deep crimson bar atop the viewport on `pages/article.html`.
   - Real-time calculation based on document scroll depth.

6. **Interactive Likes & Campus Discussion (Local Storage)**:
   - Like button with persistent counters and heart animation.
   - Comment form allowing students to submit reactions with their name and major.
   - Displays real-time comments along with initial seeded campus comments.

7. **Reading Archive / Bookmarks**:
   - Bookmark button on all cards and article headers.
   - Live counter badge in the navigation bar.
   - Dedicated `pages/saved.html` to manage your reading list.

8. **Theme Toggle (Light / Dark Mode)**:
   - Remembers user preference in `localStorage`.
   - Automatically detects system OS preferences (`prefers-color-scheme`).

9. **Accessibility & Responsive Quality**:
   - Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`, `<figure>`).
   - Accessible skip link, ARIA labels, focus rings, and screen-reader status live-regions.
   - Mobile navigation drawer with animated hamburger toggle.

---

## 🚀 How to Run the Website

### Option 1: Using Any Local Web Server (Recommended)

Run any lightweight web server inside the `daily-planet-newsroom` directory:

#### Using Node.js / npx:
```bash
npx serve
```
or
```bash
npx http-server
```

#### Using Python 3:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

#### Using VS Code Live Server:
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

### Option 2: Direct Browser Opening (`file://`)
You can also directly double-click `index.html` (or open it with Chrome, Edge, Safari, or Firefox). Thanks to the smart data fallback layer in `js/articles-data.js`, all articles, search, bookmarks, likes, and comments work immediately even without a web server.
