import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, ProjectCategory } from '../types';

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
};

// ─── Project Data ─────────────────────────────────────────────────────────────
// Featured projects get larger cards and richer detail in the modal.
// All projects appear in the filterable grid below.
const featuredProjects: Project[] = [
  {
    id: 'cooperative-system',
    title: 'Cooperative Management System',
    description:
      'A comprehensive web system for managing cooperative operations — officer administration, member financials, and loan processing. Built as my capstone project.',
    longDescription:
      'Built for Settlers Credit Cooperative as my capstone project, this system streamlines day-to-day cooperative management. Officers can manage member records, process deposits and withdrawals, handle loan applications, and generate financial reports. Members get a dedicated portal to view their account status, track transactions, and submit requests. Developed using the TALL stack (Laravel, Livewire, Alpine.js, Tailwind CSS) without Filament, keeping the UI fully custom.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    tags: ['Laravel', 'Livewire', 'Alpine.js', 'Tailwind CSS', 'MySQL'],
    category: 'web',
    role: 'Full-stack Developer',
  },
  {
    id: 'onefrend',
    title: 'OneFrend IMS',
    description:
      'An integrated management system covering HR, marketing, and operations via a Laravel web admin, connected to a Flutter mobile app for customer ordering and delivery tracking.',
    longDescription:
      'A full-scale integrated management system built for OneFrend. The Laravel web backend handles HR management (employee records, payroll, and request workflows), administrator controls, and marketing operations (expenses, products, orders, and deliveries). Custom REST API endpoints connect the web admin with the customer-facing Flutter mobile app, which enables ordering, real-time delivery tracking, and payment processing. I developed the HR, Administrator, and Marketing web modules, the API layer, and the Flutter mobile app.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['Laravel', 'AJAX', 'Tailwind CSS', 'Flutter', 'Dart'],
    category: 'web',
    role: 'Backend & Mobile Developer',
  },
  {
    id: 'pokenexus',
    title: 'PokeNexus',
    description:
      'A feature-rich Pokédex web app with creature collection, real-time trading, player messaging, trainer profiles, and a gacha summoning system.',
    longDescription:
      'A Pokédex-inspired web application developed for a web development course. Players can browse and collect Pokémon, trade with other users through a real-time exchange system, communicate via built-in messaging, manage their trainer profile, and earn new creatures through a gacha-style summoning mechanic. Built with Laravel Blade, vanilla JavaScript with AJAX for seamless interactions, and styled with Tailwind CSS.',
    image: 'https://images.unsplash.com/photo-1589241064278-1404bbc84f91?auto=format&fit=crop&w=800&q=80',
    tags: ['Laravel', 'Blade', 'JavaScript', 'AJAX', 'Tailwind CSS'],
    category: 'web',
    role: 'Full-stack Developer',
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    description:
      'A responsive, theme-aware portfolio built with React and Tailwind, featuring smooth animations, a contact form, and a dark-mode-first design system.',
    longDescription:
      'This portfolio website — built with React, TypeScript, and Tailwind CSS via Vite. Features a token-based design system, motion-driven page transitions using Framer Motion, and a functional contact form powered by EmailJS. Deployed via GitHub Pages. The design prioritises clarity and speed over visual gimmicks.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'EmailJS'],
    category: 'web',
    role: 'Full-stack Developer',
  },
];

// Additional projects shown only in the filterable "All Projects" grid
const additionalProjects: Project[] = [
  {
    id: 'scpa-inventory',
    title: 'SCPA Inventory',
    description:
      'A Flutter mobile app for inventory management using Google Sheets as a zero-cost backend via Apps Script, with Firebase authentication.',
    longDescription:
      'A lightweight inventory management mobile application. Instead of traditional hosting, it leverages Google Sheets as a data store through Apps Script, keeping infrastructure costs at zero. Firebase handles user authentication while the Flutter frontend provides a clean cross-platform interface for tracking and managing inventory items.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    tags: ['Flutter', 'Dart', 'Firebase', 'Google Sheets', 'Apps Script'],
    category: 'mobile',
    role: 'Full-stack Developer',
  },
  {
    id: 'maze-game',
    title: 'Maze Game',
    description:
      'An ASCII-based maze game built in Turbo C with animations, customisable settings, save files, and highscore tracking.',
    longDescription:
      'A terminal-based maze game developed in pure C using Turbo C as a programming course final project. Features smooth ASCII animations, in-game settings, save file support for resuming progress, and a highscore system to track best completion times.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    tags: ['C', 'Turbo C'],
    category: 'other',
    role: 'Developer',
  },
  {
    id: 'smarts-traffic',
    title: 'SMARTS Traffic System',
    description:
      'An Arduino project using hall effect sensors on a diorama to automatically adapt traffic signal timing based on real-time vehicle detection.',
    longDescription:
      'An Arduino-based smart traffic management system built on an Arduino R3 with a physical diorama. Hall effect sensors embedded underneath the road detect passing vehicles, and the system dynamically adjusts signal timing to optimise flow based on real-time traffic density.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
    tags: ['Arduino', 'C++', 'Hall Effect Sensors'],
    category: 'other',
    role: 'Developer',
  },
  {
    id: 'screenshot-tool',
    title: 'Screenshot Tool',
    description:
      'A Windows screenshot utility with configurable capture counts, screen region selection, key-press triggers, and a live preview panel.',
    longDescription:
      'A Python-based screenshot utility for Windows designed for capturing online library content for offline browsing. Supports configurable capture counts, post-capture key-press actions, screen region selection, and a live preview panel for reviewing captures before saving.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    tags: ['Python'],
    category: 'other',
    role: 'Developer',
  },
  {
    id: 'pokedex-java',
    title: 'Pokédex (Cross-Stack)',
    description:
      'A dual-platform Pokédex combining a Spring Boot backend with a Windows Forms frontend, demonstrating cross-language integration.',
    longDescription:
      'An educational Pokédex application bridging two distinct technology stacks. The backend is built with Java and Spring Boot in IntelliJ IDEA, while the frontend uses C# and Windows Forms in Visual Studio — demonstrating cross-language and cross-platform integration.',
    image: 'https://images.unsplash.com/photo-1589241064278-1404bbc84f91?auto=format&fit=crop&w=800&q=80',
    tags: ['Java', 'Spring Boot', 'C#', 'Windows Forms'],
    category: 'other',
    role: 'Developer',
  },
];

const allProjects: Project[] = [...featuredProjects, ...additionalProjects];

// ─── Filter Categories ────────────────────────────────────────────────────────
const categories: { label: string; id: ProjectCategory; icon: string }[] = [
  { label: 'All', id: 'all', icon: 'apps' },
  { label: 'Web', id: 'web', icon: 'globe' },
  { label: 'Mobile', id: 'mobile', icon: 'phone_android' },
  { label: 'Other', id: 'other', icon: 'terminal' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Tag badge — used consistently across card and modal */
function Tag({ label, children: _c }: { label: string; key?: React.Key; children?: never }) {
  return (
    <span className="px-2 py-0.5 bg-surface-container-low border border-outline-variant/20 rounded text-[10px] font-mono text-tertiary">
      {label}
    </span>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Filter applies to allProjects; featured section is always static
  const filtered =
    selectedCategory === 'all'
      ? allProjects
      : allProjects.filter((p) => p.category === selectedCategory);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-20 px-5 lg:px-10 max-w-[1200px] mx-auto py-16 md:py-24"
    >
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <motion.header variants={itemVariants} className="space-y-3 max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-primary-container" aria-hidden="true" />
          <span className="text-xs font-semibold text-primary-container uppercase tracking-widest">
            Work
          </span>
        </div>
        <h1 className="font-headline-xl text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
          Projects
        </h1>
        <p className="text-base text-on-surface-variant leading-relaxed">
          A selection of work spanning full-stack web, mobile apps, and experimental
          builds. Click any project for more detail.
        </p>
      </motion.header>

      {/* ── Featured Projects ────────────────────────────────────────────────── */}
      {/*
        Featured projects get a two-column grid with taller image previews.
        The first project (capstone) is most important and gets visual prominence
        through the larger image and first position.
      */}
      <section aria-labelledby="featured-heading" className="space-y-6">
        <motion.h2
          variants={itemVariants}
          id="featured-heading"
          className="font-headline-md text-xl font-bold text-on-surface flex items-center gap-3"
        >
          <span className="w-8 h-px bg-primary-container" aria-hidden="true" />
          Featured
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredProjects.map((project) => (
            <motion.button
              key={project.id}
              variants={itemVariants}
              onClick={() => setActiveProject(project)}
              className="card-surface rounded-xl overflow-hidden flex flex-col group text-left w-full cursor-pointer focus-ring transition-[border-color,box-shadow] duration-250"
              aria-label={`View details for ${project.title}`}
            >
              {/* Project thumbnail */}
              <div className="h-52 relative overflow-hidden bg-surface-container-high">
                <img
                  src={project.image}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {project.role && (
                  <span className="absolute bottom-3 left-3 text-[10px] font-semibold text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {project.role}
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col gap-3 flex-grow">
                <h3 className="font-headline-md text-base font-bold text-on-surface group-hover:text-primary-container transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-primary-container font-semibold group-hover:gap-2.5 transition-all duration-200 pt-1">
                  View details
                  <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                    arrow_forward
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── All Projects (Filterable Grid) ───────────────────────────────────── */}
      <section aria-labelledby="all-projects-heading" className="space-y-6">
        <motion.h2
          variants={itemVariants}
          id="all-projects-heading"
          className="font-headline-md text-xl font-bold text-on-surface flex items-center gap-3"
        >
          <span className="w-8 h-px bg-primary-container" aria-hidden="true" />
          All Projects
        </motion.h2>

        {/* Category filter buttons */}
        {/*
          Filter sits on its own row and wraps cleanly on narrow viewports.
          Active state uses background fill rather than just border colour for
          stronger visual distinction.
        */}
        <motion.div
          variants={itemVariants}
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded border transition-all duration-200 active:scale-95 cursor-pointer focus-ring ${
                selectedCategory === cat.id
                  ? 'bg-primary-container/12 text-primary-container border-primary-container/40'
                  : 'border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high bg-transparent'
              }`}
              aria-pressed={selectedCategory === cat.id}
            >
              <span
                className="material-symbols-outlined text-[14px]"
                aria-hidden="true"
              >
                {cat.icon}
              </span>
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Filtered project grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.button
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onClick={() => setActiveProject(project)}
                className="card-surface rounded-xl overflow-hidden flex flex-col group text-left w-full cursor-pointer focus-ring transition-[border-color,box-shadow] duration-250"
                aria-label={`View details for ${project.title}`}
              >
                {/* Thumbnail */}
                <div className="h-40 relative overflow-hidden bg-surface-container-high">
                  <img
                    src={project.image}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Category badge */}
                  <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
                    {project.category}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col gap-2.5 flex-grow">
                  <h3 className="font-headline-md text-sm font-bold text-on-surface group-hover:text-primary-container transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] text-on-surface-variant/60 self-center">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── Project Detail Modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={`Project details: ${activeProject.title}`}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/65 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="bg-surface-container border border-outline-variant/40 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl"
            >
              {/* Hero image */}
              <div className="h-56 relative">
                <img
                  src={activeProject.image}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-transparent" />

                {/* Close button — over image */}
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors cursor-pointer border border-white/10 focus-ring"
                  aria-label="Close project details"
                >
                  <span className="material-symbols-outlined text-[20px] block">close</span>
                </button>
              </div>

              {/* Modal body */}
              <div className="p-7 space-y-6">
                {/* Title block */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary-container">
                    {activeProject.category} Project
                  </span>
                  <h2 className="font-headline-xl text-2xl font-bold text-on-surface mt-1">
                    {activeProject.title}
                  </h2>
                  {activeProject.role && (
                    <p className="text-sm text-primary-container font-semibold mt-1.5">
                      {activeProject.role}
                    </p>
                  )}
                </div>

                {/* Project overview */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Overview
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {activeProject.longDescription ?? activeProject.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-surface-container-low border border-outline-variant/30 rounded text-xs font-mono text-on-surface"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action links */}
                <div className="pt-4 border-t border-outline-variant/20 flex flex-wrap gap-3">
                  {activeProject.githubUrl ? (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-surface-container-low border border-outline-variant/40 hover:border-primary-container text-on-surface-variant hover:text-on-surface px-5 py-2.5 rounded text-sm font-semibold transition-colors focus-ring"
                    >
                      <span className="material-symbols-outlined text-[16px]">code</span>
                      View Source
                    </a>
                  ) : (
                    /* Show "Private" only when there's no public URL — not as a fake default */
                    <span className="inline-flex items-center gap-2 text-on-surface-variant/50 border border-outline-variant/20 px-5 py-2.5 rounded text-sm font-semibold cursor-not-allowed">
                      <span className="material-symbols-outlined text-[16px]">lock</span>
                      Private Repository
                    </span>
                  )}
                  {activeProject.liveUrl ? (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary-container text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-primary transition-colors focus-ring"
                    >
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      Live Demo
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
