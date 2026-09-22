import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, ProjectCategory } from '../types';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeDetailProject, setActiveDetailProject] = useState<Project | null>(null);

  // Featured projects — displayed without filter
  const featuredProjects: Project[] = [
    {
      id: 'portfolio',
      title: 'Personal Portfolio',
      description: 'A responsive, theme-aware portfolio site built with React and Tailwind, featuring smooth animations, a contact form, and a dark-mode-first Material Design system.',
      longDescription: 'A custom-built portfolio website designed to showcase my work and technical skills. Built with React, TypeScript, and Tailwind CSS using Vite as the build tool. Features a Material Design 3-inspired token system, motion-driven page transitions, and a fully functional contact form powered by EmailJS. The site is deployed via GitHub Pages with an automated CI/CD pipeline.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'EmailJS'],
      category: 'web',
      role: 'Full-stack Developer',
    },
    {
      id: 'cooperative-system',
      title: 'Cooperative Management System',
      description: 'A comprehensive web system for managing cooperative operations, enabling officers to handle administration while giving members a portal to view information and manage financials.',
      longDescription: 'Built for Settlers Credit Cooperative as my capstone project, this system streamlines day-to-day cooperative management. Officers can manage member records, process deposits and withdrawals, handle loan applications, and generate financial reports. Members get a dedicated portal to view their account status, track transactions, and submit requests. Developed using the TALL stack (Laravel, Livewire, Alpine.js, Tailwind CSS) without Filament, keeping the UI fully custom.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
      tags: ['Laravel', 'Livewire', 'Alpine.js', 'Tailwind CSS', 'MySQL'],
      category: 'web',
      role: 'Full-stack Developer',
    },
    {
      id: 'pokenexus',
      title: 'PokeNexus',
      description: 'A feature-rich Pokédex web application with creature collection, real-time trading, messaging, and a gacha system for discovering new Pokémon.',
      longDescription: 'A Pokédex-inspired web application developed for a web development course. Players can browse and collect Pokémon, trade with other users through a real-time exchange system, communicate via built-in messaging, manage their trainer profile, and earn new creatures through a gacha-style summoning mechanic. Built with Laravel Blade, vanilla JavaScript with AJAX for seamless interactions, and styled with Tailwind CSS.',
      image: 'https://images.unsplash.com/photo-1589241064278-1404bbc84f91?auto=format&fit=crop&w=800&q=80',
      tags: ['Laravel', 'Blade', 'JavaScript', 'AJAX', 'Tailwind CSS'],
      category: 'web',
      role: 'Full-stack Developer',
    },
    {
      id: 'onefrend',
      title: 'OneFrend IMS',
      description: 'An integrated management system for OneFrend covering HR, administration, marketing, and order operations, with a Laravel web admin and a Flutter customer mobile app.',
      longDescription: 'A full-scale integrated management system built for OneFrend. The Laravel web backend handles HR management (employee records, payroll, and request workflows), administrator controls, and marketing operations (expenses, products, orders, and deliveries). Custom REST API endpoints were developed to connect the web admin with the customer-facing Flutter mobile app, which enables ordering, real-time delivery tracking, and payment processing. Git was used throughout for version control and collaborative development. I developed the HR, Administrator, and Marketing web modules, the API layer, as well as the Flutter mobile app for both customers and the admin panel.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      tags: ['Laravel', 'AJAX', 'Tailwind CSS', 'Flutter', 'Dart'],
      category: 'web',
      role: 'Backend & Mobile Developer',
    },
  ];

  // All projects — displayed with category filter
  const allProjects: Project[] = [
    ...featuredProjects,
    {
      id: 'scpa-inventory',
      title: 'SCPA Inventory',
      description: 'A Flutter mobile app for inventory management that uses Google Sheets as a backend via Apps Script, with Firebase handling authentication.',
      longDescription: 'A lightweight inventory management mobile application built as a personal side project. Instead of relying on traditional hosting or a dedicated server, it leverages Google Sheets as a data store through Apps Script, keeping infrastructure costs at zero. Firebase handles user authentication and login, while the Flutter frontend provides a clean, cross-platform interface for tracking and managing inventory items.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
      tags: ['Flutter', 'Dart', 'Firebase', 'Google Sheets', 'Apps Script'],
      category: 'mobile',
      role: 'Full-stack Developer',
    },
    {
      id: 'maze-game',
      title: 'Maze Game',
      description: 'An ASCII-based maze game built in Turbo C featuring animations, customizable settings, save files, and highscore tracking.',
      longDescription: 'A terminal-based maze game developed in pure C using Turbo C as our programming course final project. Features smooth ASCII animations, in-game settings for customization, save file support for resuming progress, and a highscore system to track the best completion times.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      tags: ['C', 'Turbo C'],
      category: 'other',
      role: 'Developer',
    },
    {
      id: 'smarts-traffic',
      title: 'SMARTS Traffic System',
      description: 'An Arduino R3 project using hall effect sensors on a diorama to automatically adapt traffic signal timing based on real-time vehicle detection.',
      longDescription: 'An Arduino-based smart traffic management system built on an Arduino R3 with a physical diorama. Hall effect sensors embedded underneath the road detect passing vehicles, and the system dynamically adjusts traffic signal timing to optimize flow based on real-time traffic density.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
      tags: ['Arduino', 'C++', 'Hall Effect Sensors'],
      category: 'other',
      role: 'Developer',
    },
    {
      id: 'screenshot-tool',
      title: 'Screenshot Tool',
      description: 'A Windows screenshot utility with configurable capture counts, screen region selection, key-press triggers, and a live preview panel.',
      longDescription: 'A Python-based screenshot utility for Windows designed for ethically capturing online library content for offline browsing. Supports configurable capture counts, post-capture key-press actions, screen region selection, and a live preview panel for reviewing captures before saving.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      tags: ['Python'],
      category: 'other',
      role: 'Developer',
    },
    {
      id: 'pokedex-java',
      title: 'Pokédex',
      description: 'A dual-platform Pokédex combining a Spring Boot backend in IntelliJ with a Windows Forms frontend in Visual Studio.',
      longDescription: 'A crude but educational Pokédex application that bridges two distinct technology stacks. The backend is built with Java and Spring Boot in IntelliJ IDEA, while the frontend uses C# and Windows Forms in Visual Studio, demonstrating cross-language and cross-platform integration.',
      image: 'https://images.unsplash.com/photo-1589241064278-1404bbc84f91?auto=format&fit=crop&w=800&q=80',
      tags: ['Java', 'Spring Boot', 'C#', 'Windows Forms'],
      category: 'other',
      role: 'Developer',
    },
  ];

  // Filtering Logic (only for the "All Projects" section)
  const filteredProjects = selectedCategory === 'all'
    ? allProjects
    : allProjects.filter(p => p.category === selectedCategory);

  const categories: { label: string; id: ProjectCategory }[] = [
    { label: 'All', id: 'all' },
    { label: 'Web', id: 'web' },
    { label: 'Mobile', id: 'mobile' },
    { label: 'Other', id: 'other' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-20"
    >
      {/* Header Section */}
      <header className="text-center md:text-left space-y-4">
        <h1 className="font-headline-xl text-4xl md:text-5xl font-bold text-on-surface">
          Projects
        </h1>
        <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          A collection of technical work spanning web development, mobile applications, and experimental projects.
        </p>
      </header>

      {/* ─── Featured Projects Section ─── */}
      <section className="space-y-8">
        <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-background flex items-center gap-3">
          <span className="w-8 h-[2px] bg-primary-container inline-block"></span>
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              key={project.id}
              onClick={() => setActiveDetailProject(project)}
              className="glass-card rounded-xl overflow-hidden flex flex-col group card-surface cursor-pointer bg-surface-container"
            >
              <div className="h-56 relative overflow-hidden bg-surface-container-high border-b border-outline-variant/10">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 scale-101"
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  src={project.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-headline-md text-xl font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-surface-container-low border border-outline-variant/20 rounded text-xs font-code-sm text-tertiary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 font-label-md text-sm text-primary group-hover:text-primary-container transition-colors font-semibold">
                    View Project
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── All Projects Section ─── */}
      <section className="space-y-8">
        <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-background flex items-center gap-3">
          <span className="w-8 h-[2px] bg-primary-container inline-block"></span>
          All Projects
        </h2>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`font-label-md text-sm px-5 py-2.5 rounded border transition-all duration-300 active:scale-95 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-primary-container/10 text-primary border-primary-container shadow-sm shadow-primary-container/10'
                  : 'border-outline-variant/40 text-on-surface-variant hover:text-primary hover:border-primary-container/50 bg-transparent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filtered Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                onClick={() => setActiveDetailProject(project)}
                className="glass-card rounded-xl overflow-hidden flex flex-col h-full group card-surface cursor-pointer bg-surface-container"
              >
                <div className="h-48 relative overflow-hidden bg-surface-container-high border-b border-outline-variant/10">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 scale-101"
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    src={project.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-headline-md text-xl font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-body-md text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-surface-container-low border border-outline-variant/20 rounded text-xs font-code-sm text-tertiary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-2 font-label-md text-sm text-primary group-hover:text-primary-container transition-colors font-semibold">
                      View Project
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeDetailProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetailProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal content frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-surface-container border border-outline-variant/40 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl"
            >
              <div className="h-64 relative">
                <img
                  className="w-full h-full object-cover"
                  src={activeDetailProject.image}
                  alt={activeDetailProject.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
                <button
                  onClick={() => setActiveDetailProject(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 hover:scale-105 transition-all cursor-pointer border border-white/10"
                >
                  <span className="material-symbols-outlined text-xl block">close</span>
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <span className="text-xs font-label-md uppercase tracking-widest text-primary font-bold">
                    {activeDetailProject.category.toUpperCase().replace('-', ' & ')} Project
                  </span>
                  <h2 className="font-headline-xl text-2xl md:text-3xl font-bold text-on-surface mt-1">
                    {activeDetailProject.title}
                  </h2>
                  {activeDetailProject.role && (
                    <p className="font-body-md text-sm text-primary-container font-semibold mt-2">
                      {activeDetailProject.role}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="font-headline-md text-sm font-semibold text-on-surface uppercase tracking-wider">
                    Overview
                  </h4>
                  <p className="font-body-md text-on-surface-variant leading-relaxed text-sm">
                    {activeDetailProject.longDescription || activeDetailProject.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-headline-md text-sm font-semibold text-on-surface uppercase tracking-wider">
                    Technologies Implemented
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeDetailProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded text-xs font-code-sm text-on-surface-variant"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/20 flex gap-4">
                  <div className="flex-grow md:flex-grow-0 inline-flex items-center justify-center gap-2 text-on-surface-variant/50 px-6 py-2.5 rounded font-label-md text-sm font-semibold border border-outline-variant/20 cursor-not-allowed">
                    <span className="material-symbols-outlined text-sm">lock</span>
                    Private Repository
                  </div>
                  {activeDetailProject.liveUrl ? (
                    <a
                      href={activeDetailProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow md:flex-grow-0 inline-flex items-center justify-center gap-2 border border-outline-variant/40 hover:border-primary-container text-on-surface-variant hover:text-primary px-6 py-2.5 rounded font-label-md text-sm font-semibold transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                      Live Demo
                    </a>
                  ) : (
                    <div className="flex-grow md:flex-grow-0 inline-flex items-center justify-center gap-2 text-on-surface-variant/50 px-6 py-2.5 rounded font-label-md text-sm font-semibold border border-outline-variant/20 cursor-not-allowed">
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                      Not Deployed
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
