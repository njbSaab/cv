# Najib Saab — Interactive CV

Modern interactive CV built with **React + Vite**.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

- 🌙 Dark / ☀️ Light theme toggle
- 💼 Work experience cards with **Quick view** (inline expand) and **Full details** (modal)
- 🗂 Project cases as clickable cards opening detailed modals with accordion sections
- ⚙️ DevOps sidebar with accordion details per technology
- ⌨️ Keyboard accessible (Escape closes modals, click-outside closes modals)

## Project Structure

```
src/
├── components/
│   ├── CaseCard.jsx        # Project case card + modal trigger
│   ├── Chip.jsx            # Tech tag chip
│   ├── DevopsAccordion.jsx # DevOps sidebar accordion
│   ├── Header.jsx          # Page header with name + contacts
│   ├── JobCard.jsx         # Work experience card
│   ├── Modal.jsx           # Shared modal with accordion
│   ├── SectionLabel.jsx    # Section divider label
│   └── Sidebar.jsx         # Left sidebar (skills, devops, languages)
├── data/
│   ├── cases.js            # Project cases data
│   ├── devops.js           # DevOps items data
│   └── jobs.js             # Work experience data
├── hooks/
│   └── useClickOutside.js  # Click-outside hook for modals
├── styles/
│   ├── global.css          # Global reset + keyframes
│   └── themes.js           # Dark / Light theme tokens
├── App.jsx                 # Main app layout
└── main.jsx                # Entry point
```
