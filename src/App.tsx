import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Home from './components/Home';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

// ─── Social / Contact Constants ──────────────────────────────────────────────
// Centralised so they are easy to update and referenced consistently across
// both the navigation header, footer, and contact section.
const SOCIAL_LINKS = {
  github: 'https://github.com/leonardomagdarag',
  linkedin: 'https://www.linkedin.com/in/leonardo-magdarag',
  email: 'leonardomagdarag@gmail.com',
};

// ─── Nav Items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const;

type TabId = typeof NAV_ITEMS[number]['id'];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  // Apply saved theme preference on mount. Defaults to dark.
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  // Close mobile menu when viewport grows past the mobile breakpoint (768 px).
  // Without this, the invisible overlay would persist after resizing to desktop.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const close = () => { if (mq.matches) setIsMobileMenuOpen(false); };
    mq.addEventListener('change', close);
    return () => mq.removeEventListener('change', close);
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
  };

  const handleNavigate = (tab: TabId) => {
    setActiveTab(tab);
    // Scroll to top so each "page" starts from the beginning
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans">

      {/* ─── Fixed Header ───────────────────────────────────────────────────── */}
      <header className="bg-surface/85 backdrop-blur-xl border-b border-outline-variant/20 fixed top-0 w-full z-40 transition-colors duration-300">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto px-5 lg:px-10 h-[68px]">

          {/* Logo / name — acts as a home link */}
          <button
            onClick={() => handleNavigate('home')}
            className="font-headline-lg font-bold text-lg text-on-surface hover:text-primary transition-colors duration-200 select-none focus-ring rounded"
            aria-label="Go to home"
          >
            Leo<span className="text-primary-container">.</span>
          </button>

          {/* Desktop navigation links */}
          <nav aria-label="Primary navigation" className="hidden md:flex gap-1 items-center">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`px-4 py-2 rounded text-sm font-medium transition-all duration-200 focus-ring cursor-pointer ${
                  activeTab === item.id
                    ? 'text-primary-container bg-primary-container/10'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
                aria-current={activeTab === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop action cluster */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-on-surface cursor-pointer focus-ring"
            >
              <span className="material-symbols-outlined block text-[20px]">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Resume trigger */}
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="text-sm font-semibold bg-primary-container text-white px-4 py-2 rounded hover:bg-primary transition-colors duration-200 active:scale-95 cursor-pointer focus-ring"
            >
              Resume
            </button>
          </div>

          {/* Mobile controls — theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-on-surface cursor-pointer focus-ring"
            >
              <span className="material-symbols-outlined block text-[20px]">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="text-on-surface-variant hover:text-on-surface p-2 rounded cursor-pointer focus-ring"
            >
              <span className="material-symbols-outlined text-[24px] block">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* ─── Mobile Slide-out Drawer ─────────────────────────────────────────── */}
      {/*
        The drawer slides in from the right. A full-screen backdrop sits behind
        it — clicking the backdrop closes the menu, which is a common mobile UX
        pattern. The drawer itself is z-30 (below z-40 header), so the header
        always stays on top.
      */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop — closes menu on tap */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-label="Navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed right-0 top-0 bottom-0 w-64 bg-surface-container z-30 border-l border-outline-variant/30 flex flex-col p-6 pt-20 md:hidden"
            >
              {/* Nav links — large touch targets for mobile */}
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { handleNavigate(item.id); setIsMobileMenuOpen(false); }}
                    className={`text-left text-base font-medium px-4 py-3 rounded transition-colors duration-200 cursor-pointer focus-ring ${
                      activeTab === item.id
                        ? 'text-primary-container bg-primary-container/10 font-semibold'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                    }`}
                    aria-current={activeTab === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Resume button in mobile menu */}
              <button
                onClick={() => { setIsResumeModalOpen(true); setIsMobileMenuOpen(false); }}
                className="mt-6 text-sm font-semibold bg-primary-container text-white px-4 py-3 rounded text-center hover:bg-primary transition-colors cursor-pointer focus-ring"
              >
                View Resume
              </button>

              {/* Social links at bottom of mobile drawer */}
              <div className="mt-auto pt-6 border-t border-outline-variant/20 flex gap-4">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-on-surface transition-colors focus-ring rounded"
                  aria-label="GitHub profile"
                >
                  <span className="material-symbols-outlined text-[22px]">code</span>
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-on-surface transition-colors focus-ring rounded"
                  aria-label="LinkedIn profile"
                >
                  <span className="material-symbols-outlined text-[22px]">work</span>
                </a>
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="text-on-surface-variant hover:text-on-surface transition-colors focus-ring rounded"
                  aria-label="Send email"
                >
                  <span className="material-symbols-outlined text-[22px]">mail</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Main Content ─────────────────────────────────────────────────────── */}
      {/*
        pt-[68px] matches the header height. Each "page" gets its own padding
        so sections can control their own vertical rhythm. max-w-[1200px]
        keeps content readable at wide viewports.
      */}
      <main className="flex-grow pt-[68px]">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <Home onNavigate={handleNavigate} />
            </motion.div>
          )}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <Projects />
            </motion.div>
          )}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <About />
            </motion.div>
          )}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ─── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="bg-surface border-t border-outline-variant/20 w-full py-8 mt-auto transition-colors duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-[1200px] mx-auto px-5 lg:px-10 gap-4">
          <p className="text-xs text-on-surface-variant">
            © {new Date().getFullYear()} Leo Magdarag — Built with React & Tailwind
          </p>

          <nav aria-label="Social links" className="flex gap-6 text-sm text-on-surface-variant font-medium">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-container transition-colors focus-ring rounded"
            >
              GitHub
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-container transition-colors focus-ring rounded"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="hover:text-primary-container transition-colors focus-ring rounded"
            >
              Email
            </a>
          </nav>
        </div>
      </footer>

      {/* ─── Resume Modal ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Resume"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsResumeModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="bg-surface-container border border-outline-variant/40 rounded-xl max-w-3xl w-full relative z-10 shadow-2xl p-6 md:p-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setIsResumeModalOpen(false)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-2 cursor-pointer rounded-full hover:bg-surface-container-high transition-colors focus-ring"
                aria-label="Close resume"
              >
                <span className="material-symbols-outlined text-[22px] block">close</span>
              </button>

              {/* ── Resume Content ── */}
              <div className="space-y-8">

                {/* Header */}
                <div className="border-b border-outline-variant/30 pb-6">
                  <h2 className="font-headline-xl text-2xl md:text-3xl font-bold text-on-surface">
                    Leo B. Magdarag
                  </h2>
                  <p className="text-sm text-primary-container font-semibold mt-1">
                    Bachelor of Science in Information Technology
                  </p>
                  <p className="text-xs text-on-surface-variant mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Laguna, Philippines</span>
                    <span>leonardomagdarag@gmail.com</span>
                    <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      github.com/leonardomagdarag
                    </a>
                  </p>
                </div>

                {/* Body grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                  {/* Left column */}
                  <div className="md:col-span-8 space-y-6">

                    {/* Education */}
                    <div className="space-y-3">
                      <h3 className="font-headline-md text-xs font-bold uppercase tracking-widest text-primary border-b border-outline-variant/20 pb-2">
                        Education
                      </h3>
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-sm font-semibold text-on-surface leading-snug">
                            Polytechnic University of the Philippines — Calauan Campus
                          </span>
                          <span className="text-xs text-on-surface-variant whitespace-nowrap">2021 – Present</span>
                        </div>
                        <p className="text-xs text-on-surface-variant">Bachelor of Science in Information Technology</p>
                        <p className="text-xs text-on-surface-variant italic mt-1">
                          Focus: Software Engineering, Database Systems, Web & Mobile Development
                        </p>
                      </div>
                      <div className="pt-4 space-y-1">
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-sm font-semibold text-on-surface leading-snug">
                            AMA Computer College Calamba
                          </span>
                          <span className="text-xs text-on-surface-variant whitespace-nowrap">2020 – 2021</span>
                        </div>
                        <p className="text-xs text-on-surface-variant">Senior High School — ICT Strand</p>
                      </div>
                    </div>

                    {/* Academic Projects */}
                    <div className="space-y-3">
                      <h3 className="font-headline-md text-xs font-bold uppercase tracking-widest text-primary border-b border-outline-variant/20 pb-2">
                        Key Projects
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-on-surface">
                            Cooperative Management System <span className="font-normal text-on-surface-variant">(Capstone)</span>
                          </h4>
                          <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                            Full-stack TALL stack web system for Settlers Credit Cooperative — officer administration, member financials, loan processing, and financial reporting.
                          </p>
                          <p className="text-xs text-tertiary font-mono mt-1">Laravel · Livewire · Alpine.js · Tailwind CSS · MySQL</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-on-surface">
                            OneFrend Integrated Management System
                          </h4>
                          <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                            HR, marketing, and operations web admin (Laravel) connected via REST API to a customer Flutter mobile app with ordering, delivery tracking, and payments.
                          </p>
                          <p className="text-xs text-tertiary font-mono mt-1">Laravel · Flutter · Dart · Tailwind CSS · MySQL</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-on-surface">
                            Enterprise Inventory System
                          </h4>
                          <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                            Multi-warehouse stock tracker with secure authorisation, transaction audits, and automated stock deficit thresholds.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Right column */}
                  <div className="md:col-span-4 space-y-6">

                    {/* Technical Skills */}
                    <div className="space-y-3">
                      <h3 className="font-headline-md text-xs font-bold uppercase tracking-widest text-primary border-b border-outline-variant/20 pb-2">
                        Technical Skills
                      </h3>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold mb-1">Languages</p>
                        <p className="text-xs text-on-surface font-mono">PHP, JavaScript, Java, Python, C/C++, C#</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold mb-1">Frameworks</p>
                        <p className="text-xs text-on-surface font-mono">Laravel, React, Node.js, Express, Livewire, Spring Boot</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold mb-1">Databases</p>
                        <p className="text-xs text-on-surface font-mono">MySQL, PostgreSQL, MongoDB, SQLite</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold mb-1">Mobile / Other</p>
                        <p className="text-xs text-on-surface font-mono">Flutter, Git, Arduino</p>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="space-y-3">
                      <h3 className="font-headline-md text-xs font-bold uppercase tracking-widest text-primary border-b border-outline-variant/20 pb-2">
                        Credentials
                      </h3>
                      <ul className="space-y-3 text-xs text-on-surface-variant">
                        <li>
                          <span className="font-semibold text-on-surface block">AWS Cloud Practitioner</span>
                          Amazon Web Services · 2023
                        </li>
                        <li>
                          <span className="font-semibold text-on-surface block">JS Algorithms & Data Structures</span>
                          freeCodeCamp · 2022
                        </li>
                        <li>
                          <span className="font-semibold text-on-surface block">MERN Stack Certification</span>
                          Skill Wallet · In progress
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-outline-variant/20 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center justify-center gap-2 bg-primary-container text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-primary transition-colors cursor-pointer focus-ring"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    Print / Save PDF
                  </button>
                  <button
                    onClick={() => setIsResumeModalOpen(false)}
                    className="inline-flex items-center justify-center gap-2 border border-outline-variant/40 hover:border-outline-variant text-on-surface-variant hover:text-on-surface px-6 py-2.5 rounded text-sm font-semibold transition-colors cursor-pointer bg-transparent focus-ring"
                  >
                    Close
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
