<div align="center">

# Leo Magdarag — Developer Portfolio

A modern, dark-mode-first portfolio website built with React, TypeScript, and Tailwind CSS.

**[Live Site](https://leonardomagdarag.github.io/Portfolio-better/)**

</div>

## About

Personal portfolio showcasing full-stack web projects, mobile apps, and experimental work. Features smooth animations, a Material Design-inspired theme system, and a fully functional contact form.

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS 4**
- **Motion** for animations
- **EmailJS** for the contact form
- **GitHub Actions** for CI/CD to GitHub Pages

## Getting Started

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view it in the browser.

## Build & Deploy

```bash
npm run build      # output to dist/
npm run preview    # preview the production build
```

Pushing to `main` triggers the [deploy workflow](.github/workflows/deploy.yml), which builds the site and publishes it to GitHub Pages automatically.

## Project Structure

```
src/
  components/   # Home, About, Skills, Projects, Contact sections
  App.tsx       # Main layout & navigation
  index.css     # Tailwind definitions & design tokens
```

## Contact

- **Email:** leo.baluyot.magdarag039@gmail.com
- **GitHub:** [leonardomagdarag](https://github.com/leonardomagdarag)