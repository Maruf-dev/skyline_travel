# ✈ Skyline Travel

A modern, multi-page travel website built with **React + Vite + Framer Motion**.

---

## 🗂 Project Structure

```
skyline-travel/
├── public/
│   ├── index.html          ← HTML entry point
│   └── favicon.svg         ← Site icon
│
├── src/
│   ├── main.jsx            ← React root mount
│   ├── App.jsx             ← Router + page transitions
│   │
│   ├── context/
│   │   └── index.jsx       ← ThemeContext + LangContext
│   │
│   ├── data/
│   │   ├── translations.js ← EN / RU / UZ strings
│   │   └── content.js      ← Destinations, blogs, deals, testimonials
│   │
│   ├── components/
│   │   ├── Navbar.jsx      ← Fixed nav, language switcher, dark/light toggle
│   │   ├── Hero.jsx        ← Full-screen hero with parallax + search widget
│   │   ├── Footer.jsx      ← Site footer
│   │   ├── SectionHeader.jsx ← Reusable section title component
│   │   └── InView.jsx      ← Scroll-reveal animation wrapper
│   │
│   ├── pages/
│   │   ├── Home.jsx        ← Landing page (all sections)
│   │   ├── Destinations.jsx← Filterable destinations grid
│   │   ├── Blog.jsx        ← Blog articles grid
│   │   ├── About.jsx       ← About + team
│   │   └── Contact.jsx     ← Contact form + map
│   │
│   └── styles/
│       ├── global.css      ← Reset, CSS variables, utility classes
│       ├── navbar.css      ← Navbar styles
│       ├── hero.css        ← Hero + search box styles
│       ├── cards.css       ← All card types (dest, blog, deal, why, testi)
│       └── pages.css       ← Buttons, stats, footer, contact, about, newsletter
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

---

## ✨ Features

| Feature | Details |
|---|---|
| 🌍 **3 Languages** | English, Russian, Uzbek — switch instantly |
| 🌙 **Dark / Light Mode** | Toggle in navbar, CSS variables handle all colors |
| 🎞 **Framer Motion** | `useScroll`, `useTransform`, `staggerChildren`, `AnimatePresence`, `whileHover`, `layoutId` |
| 📄 **5 Pages** | Home, Destinations, Blog, About, Contact |
| 🔍 **Filter** | Destinations and Blog filtered by category with animated transitions |
| 📬 **Contact Form** | Validates fields, shows success animation |
| 🗺 **Map** | OpenStreetMap embed (free, no API key) |
| 📱 **Responsive** | Mobile-friendly layouts |

---

## 🛠 Tech Stack

- **React 18** — UI library
- **Vite** — Fast dev server & bundler
- **Framer Motion 11** — Animations
- **CSS (no Tailwind)** — Modular CSS files per component
- **Unsplash** — Free images (no API key needed)
- **Google Fonts** — Plus Jakarta Sans

---

## 🎨 Customization

- **Colors** → `src/styles/global.css` (`:root` and `body.light`)
- **Text / translations** → `src/data/translations.js`
- **Destinations, blogs, deals** → `src/data/content.js`
- **Logo / brand name** → `src/components/Navbar.jsx` and `src/components/Footer.jsx`
