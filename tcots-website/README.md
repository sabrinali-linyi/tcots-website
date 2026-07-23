# TCOTS Website - Content Management Guide

A static website for The Church of The Seattleites. All content is managed by editing JavaScript data files in the `data/` folder. No backend, no database, no build step — just edit a file and refresh your browser.

## Quick Start

```bash
cd tcots-website
npx serve .
```

Open `http://localhost:3000` in your browser.

## Project Structure

```
tcots-website/
├── index.html              # Homepage
├── about.html              # About page
├── sunday-service.html     # Sunday service + sermons
├── events.html             # Events listing
├── gallery.html            # Photo gallery
├── videos.html             # YouTube videos
├── testimonies.html        # Member testimonies
├── resources.html          # Resources & study materials
├── contact.html            # Contact & location
├── announcements.html      # All announcements
├── data/                   # ← EDIT THESE FILES TO CHANGE CONTENT
│   ├── site.js             # Site settings, contact info, beliefs
│   ├── posts.js            # Announcements
│   ├── events.js           # Events (upcoming + past)
│   ├── orientation-schedule.js # UW Fall orientation schedule
│   ├── sermons.js          # Sunday service sermons
│   ├── gallery.js          # Photo albums
│   ├── videos.js           # YouTube videos
│   ├── testimonies.js      # Member testimonies
│   └── resources.js        # Study materials & links
├── js/                     # Shared scripts (don't edit unless changing layout)
│   ├── app.js              # Nav, footer, helpers
│   ├── filter.js           # Category filtering
│   └── gallery-lightbox.js # Photo lightbox
├── css/
│   └── custom.css          # Custom styles
├── images/                 # Image assets
└── docs/                   # Downloadable PDFs
```

---

## How to Edit Each Section

### Site Settings (name, address, service times, etc.)

**File:** `data/site.js`

This file controls information that appears across multiple pages (nav, footer, about, contact).

| Field | Where it appears |
|-------|-----------------|
| `name` | Nav bar, footer, page titles |
| `shortName` | Footer logo |
| `tagline` | Footer subtitle |
| `address` | Contact page, footer |
| `email` | Contact page, footer |
| `phone` | Contact page (leave `""` to hide) |
| `instagram` / `instagramHandle` | Footer |
| `studentGroup` | UW student group link and homepage callout |
| `serviceTimes.sunday` | About page, contact page |
| `serviceTimes.wednesday` | About page, contact page |
| `mission` | Homepage "Who We Are", about page |
| `missionStatement` | About page |
| `churchDefinition` | About page "The Church" statement |
| `beliefs` | Homepage, about page "What We Believe" |
| `communityDescription` | Homepage, about page |
| `givingInfo` | Contact page giving section |
| `givingMethods` | Contact page giving cards |

**Example — change service time:**
```js
serviceTimes: {
  sunday: "10:30 AM",      // was "10:00 AM"
  wednesday: "7:30 PM"     // was "7:00 PM"
},
```

**Example — add a belief:**
```js
beliefs: [
  // ... existing beliefs ...
  {
    title: "The Second Coming of Christ",
    description: "We believe in the personal, visible return of Jesus Christ to the earth.",
    icon: "sunrise"   // options: book, trinity, cross, sunrise, church
  }
],
```

**Example — add a giving method:**
```js
givingMethods: [
  // ... existing methods ...
  {
    method: "Venmo",
    detail: "@tcots-church"
  }
],
```

---

### Announcements / Posts

**File:** `data/posts.js`

Shown on the homepage (first 3) and the announcements page (all).

**Add a new post** by adding an object to the **top** of the array (newest first):

```js
export const posts = [
  {
    id: "spring-retreat-2026",                        // unique ID, use lowercase-with-dashes
    title: "Spring Retreat 2026",                     // display title
    date: "2026-04-15",                               // YYYY-MM-DD format
    excerpt: "Join us for a weekend of fellowship...",  // short summary (1-2 sentences)
    content: `
      <p>We are excited to announce our Spring Retreat!</p>
      <p>Details:</p>
      <ul>
        <li><strong>Date:</strong> April 15-17, 2026</li>
        <li><strong>Location:</strong> Camp Hope, WA</li>
      </ul>
      <p>Contact <a href="mailto:info@tcots.org">info@tcots.org</a> to register.</p>
    `,
    image: "images/posts/spring-retreat-2026.jpg"     // optional, used on homepage cards
  },
  // ... existing posts below ...
];
```

**Content field tips:**
- Uses HTML inside a template literal (backticks `` ` ``)
- You can use `<p>`, `<ul>`, `<li>`, `<strong>`, `<em>`, `<a href="...">`, `<h3>`, etc.
- Place the actual image file in the `images/posts/` directory

---

### Events

**File:** `data/events.js`

Shown on the homepage (upcoming only) and the events page (upcoming + past).

**Add an event:**

```js
{
  id: "summer-conference-2026",
  title: "Summer Conference 2026",
  date: "2026-07-10",               // YYYY-MM-DD, or text like "Every Sunday" for recurring
  description: "A three-day conference on the experience of Christ in the church life.",
  location: "14224 Bel-Red Rd, Bellevue, WA 98007",
  type: "upcoming",                  // "upcoming" or "past"
  image: "images/events/summer-conference-2026.jpg"
},
```

**Important:** When an event passes, change its `type` from `"upcoming"` to `"past"` so it moves to the past events section.

---

### UW Fall Orientation Schedule

**Files:** `data/orientation-schedule.js` and `calendar/fall-2026-orientation.ics`

The schedule appears on the homepage and Events page. Edit the JavaScript data file to change what visitors see. Update the matching `.ics` calendar file at the same time so calendar downloads stay accurate. Dates use `YYYY-MM-DD`; a multi-day event also has an `endDate`.

The `christiansinseattle.org` link is stored once in `data/site.js` under `studentGroup.url` and appears in the navigation, homepage, and footer.

---

### Sermons

**File:** `data/sermons.js`

Shown on the Sunday Service page. The most recent sermon (by date) is featured at the top.

**Add a sermon:**

```js
{
  id: "the-divine-dispensing",
  title: "The Divine Dispensing of the Divine Trinity",
  date: "2026-02-16",               // YYYY-MM-DD
  speaker: "Brother Wang",
  youtubeId: "YOUR_YOUTUBE_ID",      // the part after ?v= in a YouTube URL
  outline: `The Divine Dispensing

1. The Father as the source
   - John 3:16

2. The Son as the course
   - Ephesians 3:8

3. The Spirit as the flow
   - John 7:38-39`,
  transcript: ""                     // optional, leave empty if not available
},
```

**How to get the YouTube ID:** From a URL like `https://www.youtube.com/watch?v=abc123XYZ`, the ID is `abc123XYZ`.

---

### Photo Gallery

**File:** `data/gallery.js`

Shown on the gallery page with album filtering and lightbox, and previewed on the homepage.

**Add a new album:**

```js
{
  album: "Spring Gospel Meeting 2026",     // album name (also used as filter label)
  date: "2026-03-22",
  description: "Photos from our Spring Gospel Meeting.",
  photos: [
    {
      src: "images/gallery/2026-03/photo1.jpg",   // path to image file
      caption: "Saints singing hymns together"      // caption shown in lightbox
    },
    {
      src: "images/gallery/2026-03/photo2.jpg",
      caption: "Gospel message being shared"
    }
  ]
},
```

**Add photos to an existing album:** Find the album in the array and add new objects to its `photos` array.

**Image files:** Place photos in `images/gallery/` (organize by subfolder like `2026-03/` if desired).

---

### YouTube Videos

**File:** `data/videos.js`

Shown on the videos page with category filtering. The most recent video is also shown on the homepage.

**Add a video:**

```js
{
  id: "hymn-amazing-grace",
  title: "Amazing Grace - Church Singing",
  youtubeId: "YOUR_YOUTUBE_ID",
  category: "Hymns",                // must be one of: "Sermons", "Hymns", "Conferences", "Testimonies"
  date: "2026-02-10",
  description: "The saints singing 'Amazing Grace' during a Lord's Day meeting."
},
```

**Categories** must match exactly (capitalized): `"Sermons"`, `"Hymns"`, `"Conferences"`, `"Testimonies"`.

---

### Testimonies

**File:** `data/testimonies.js`

Shown on the testimonies page with expandable stories.

**Add a testimony:**

```js
{
  id: "brother-mark",
  name: "Brother Mark",
  photo: "images/testimonies/mark.jpg",     // square photo works best
  excerpt: "After years of searching, I found true peace in Christ through the church life.",
  story: `
    <p>First paragraph of the full testimony...</p>
    <p>Second paragraph...</p>
    <p><em>"For God so loved the world..." — John 3:16</em></p>
    <p>Final paragraph...</p>
  `
},
```

**Photo:** Place a square photo in `images/testimonies/`. If no photo is available, a placeholder icon will show automatically.

---

### Resources

**File:** `data/resources.js`

Shown on the resources page with category filtering.

**Add a resource:**

```js
{
  id: "life-study-genesis",
  title: "Life-Study of Genesis",
  category: "study-materials",       // one of: "biblical-truths", "hymns", "conferences", "study-materials"
  description: "A comprehensive study of the book of Genesis and the experience of the divine life.",
  type: "link",                      // "link" (external URL) or "pdf" (downloadable file)
  url: "https://example.com/resource"     // URL or path to PDF
},
```

**For PDFs:** Place the file in the `docs/` folder and set the URL to the relative path:
```js
type: "pdf",
url: "docs/my-document.pdf"
```

**Categories:** `"biblical-truths"`, `"hymns"`, `"conferences"`, `"study-materials"`

---

## General Tips

1. **Always use the `YYYY-MM-DD` date format** (e.g., `2026-03-15`) unless using text like `"Every Sunday"` for recurring events.

2. **Add new items to the top of the array** so the newest content appears first.

3. **Use backtick template literals** (`` ` ``) for multi-line content like `content`, `story`, and `outline` fields. Regular quotes (`"`) work for single-line text.

4. **HTML is supported** in `content`, `story`, and `description` fields. Common tags:
   - `<p>` for paragraphs
   - `<strong>` for bold
   - `<em>` for italic
   - `<a href="...">` for links
   - `<ul><li>` for bullet lists
   - `<h3>` for sub-headings

5. **Images:** Place files in the appropriate `images/` subfolder. Use relative paths starting from the project root (e.g., `images/gallery/2026-03/photo.jpg`).

6. **Test your changes:** After editing a data file, refresh the browser. If the page is blank or broken, open the browser console (F12) to check for JavaScript errors — usually a missing comma or unclosed quote.

7. **Special characters:** Use Unicode escapes for special characters if needed, or just type them directly inside backtick strings:
   - Em dash: `—` or `\u2014`
   - Right single quote: `'` or `\u2019`

## Changing the Logo

The logo image is displayed in the top-left of the navigation bar and in the footer.

**File:** `images/logo.png`

Replace this file with your own logo. The image is rendered at 40px height and auto-width, so any aspect ratio works. A square or landscape image with a transparent background works best against the dark navy nav bar.

To adjust the logo size, edit the `<img>` tag in `js/app.js` — look for `class="h-10 w-auto rounded"` and change `h-10` (40px) to another Tailwind height class (e.g., `h-8` for 32px, `h-12` for 48px).

---

## Changing Colors and Styles

The site uses two primary colors throughout. To change the look, you only need to do a find-and-replace across the project.

### Color System

| Role | Current Value | Where Used |
|------|--------------|------------|
| **Primary dark** (backgrounds, headings) | `#9d174d` (dark rose) | Nav bar, footer, page header banners, card text |
| **Accent** (buttons, highlights, borders) | `#ec4899` (pink) | Buttons, dates, active states, border accents, filter pills |
| **Light background** (alternating sections) | `#f8fafc` | Every other section on the homepage |
| **Text** | `text-gray-800` / `text-gray-600` | Body text, card descriptions |

### How to Change Colors

**Change the accent color** (pink to something else):

1. Find-and-replace `#ec4899` across all `.html` files and `js/app.js`
2. Also replace in `css/custom.css` (the `.text-pink-accent`, `.bg-pink-accent`, `.border-pink-accent` helpers)

**Change the primary dark color** (dark rose to something else):

1. Find-and-replace `#9d174d` across all `.html` files and `js/app.js`

**Example — change accent from pink to teal:**
- Replace `#ec4899` with `#14b8a6` everywhere
- Replace `bg-[#ec4899]` with `bg-[#14b8a6]`
- Replace `text-[#ec4899]` with `text-[#14b8a6]`

### Custom CSS

**File:** `css/custom.css`

This file contains styles for:
- Hero section (full-screen with gradient overlay)
- Card hover effects (lift + shadow)
- Lightbox overlay and controls
- Hamburger menu animation
- Fade-in animations
- Color helper classes (`.text-gold`, `.bg-gold`, `.border-gold`)
- Button styles (`.btn-primary`, `.btn-secondary`)

Most visual styling uses Tailwind utility classes directly in the HTML. The `custom.css` file handles things Tailwind can't do inline (animations, pseudo-elements, complex hover states).

### Tailwind CSS Reference

The site uses [Tailwind CSS](https://tailwindcss.com/docs) via CDN. Common classes used:

- **Spacing:** `p-4`, `px-6`, `py-16`, `mb-4`, `mt-8`, `gap-8`
- **Text:** `text-sm`, `text-lg`, `text-xl`, `font-bold`, `font-semibold`
- **Colors:** `text-white`, `text-gray-600`, `bg-white`, `bg-[#1e293b]`
- **Layout:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, `flex`, `max-w-7xl mx-auto`
- **Responsive:** `md:` prefix for tablet, `lg:` prefix for desktop

---

## Deployment

Push to a GitHub repository and enable GitHub Pages (Settings > Pages > Source: main branch). The site will be live at `https://your-username.github.io/tcots-website/` at no cost.
