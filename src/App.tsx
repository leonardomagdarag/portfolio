import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Home from './components/Home';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  // Initialize theme on mount from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Handle theme toggling
  const toggleTheme = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  };

  // Quick navigation helper
  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans transition-colors duration-500">
      
      {/* Fixed Header / TopNavBar */}
      <header className="bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 fixed top-0 w-full z-40 transition-colors">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto px-6 lg:px-10 h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavigate('home')}
            className="font-headline font-bold text-xl md:text-2xl text-primary cursor-pointer hover:opacity-80 transition-opacity select-none"
          >
            IT Portfolio
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-8 items-center font-label-md text-sm font-medium">
            <button 
              onClick={() => handleNavigate('home')}
              className={`pb-1 border-b-2 transition-all duration-300 cursor-pointer ${
                activeTab === 'home' 
                  ? 'text-primary border-primary' 
                  : 'text-on-surface-variant border-transparent hover:text-primary'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigate('projects')}
              className={`pb-1 border-b-2 transition-all duration-300 cursor-pointer ${
                activeTab === 'projects' 
                  ? 'text-primary border-primary' 
                  : 'text-on-surface-variant border-transparent hover:text-primary'
              }`}
            >
              Projects
            </button>
            <button 
              onClick={() => handleNavigate('about')}
              className={`pb-1 border-b-2 transition-all duration-300 cursor-pointer ${
                activeTab === 'about' 
                  ? 'text-primary border-primary' 
                  : 'text-on-surface-variant border-transparent hover:text-primary'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavigate('contact')}
              className={`pb-1 border-b-2 transition-all duration-300 cursor-pointer ${
                activeTab === 'contact' 
                  ? 'text-primary border-primary' 
                  : 'text-on-surface-variant border-transparent hover:text-primary'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action cluster: Theme switch + Resume */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Theme switcher toggle button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="p-2.5 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-primary cursor-pointer"
            >
              <span className="material-symbols-outlined block text-xl">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Resume trigger button */}
            <button 
              onClick={() => setIsResumeModalOpen(true)}
              className="font-label-md text-sm font-semibold bg-primary-container text-white px-5 py-2.5 rounded hover:bg-primary-container/80 transition-all duration-300 active:scale-95 shadow-sm cursor-pointer"
            >
              Resume
            </button>
          </div>

          {/* Mobile navigation triggers */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="p-2.5 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-primary cursor-pointer"
            >
              <span className="material-symbols-outlined block text-xl">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-on-surface-variant hover:text-primary p-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-2xl block">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark sheet background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Slide-out drawer menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-64 bg-surface-container z-30 border-l border-outline-variant/30 flex flex-col p-6 pt-24 space-y-6 md:hidden"
            >
              <button 
                onClick={() => { handleNavigate('home'); setIsMobileMenuOpen(false); }}
                className={`text-left font-label-md text-base py-2 border-b border-outline-variant/10 ${
                  activeTab === 'home' ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => { handleNavigate('projects'); setIsMobileMenuOpen(false); }}
                className={`text-left font-label-md text-base py-2 border-b border-outline-variant/10 ${
                  activeTab === 'projects' ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                Projects
              </button>
              <button 
                onClick={() => { handleNavigate('about'); setIsMobileMenuOpen(false); }}
                className={`text-left font-label-md text-base py-2 border-b border-outline-variant/10 ${
                  activeTab === 'about' ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => { handleNavigate('contact'); setIsMobileMenuOpen(false); }}
                className={`text-left font-label-md text-base py-2 border-b border-outline-variant/10 ${
                  activeTab === 'contact' ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                Contact
              </button>
              <button 
                onClick={() => { setIsResumeModalOpen(true); setIsMobileMenuOpen(false); }}
                className="font-label-md text-base font-semibold bg-primary-container text-white px-4 py-3 rounded text-center hover:bg-primary-container/85 transition-colors cursor-pointer"
              >
                View Resume
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Stage */}
      <main className="flex-grow pt-32 pb-20 px-6 md:px-10 max-w-[1200px] mx-auto w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Home onNavigate={handleNavigate} />
            </motion.div>
          )}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Projects />
            </motion.div>
          )}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <About />
            </motion.div>
          )}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Portfolio Footer */}
      <footer className="bg-surface border-t border-outline-variant/20 w-full py-8 mt-auto transition-colors">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-[1200px] mx-auto px-6 lg:px-10 gap-6">
          <div className="font-label-md text-xs md:text-sm text-on-surface-variant font-medium">
            © 2024 BSIT Student Portfolio. Designed by Stitch by Google. Built with precision.
          </div>
          
          <nav className="flex gap-8 font-body-md text-xs md:text-sm text-on-surface-variant font-semibold">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors cursor-pointer"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors cursor-pointer"
            >
              LinkedIn
            </a>
            <button 
              onClick={() => alert('Vite + React development preview environment source verified.')}
              className="hover:text-primary transition-colors cursor-pointer bg-transparent border-none"
            >
              Source Code
            </button>
          </nav>
        </div>
      </footer>

      {/* Resume Modal Overlay */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Modal background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResumeModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Resume Paper Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-surface-container border border-outline-variant/40 rounded-xl max-w-3xl w-full relative z-10 shadow-2xl p-6 md:p-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsResumeModalOpen(false)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-primary p-2 cursor-pointer rounded-full hover:bg-surface-container-high transition-colors"
                aria-label="Close resume modal"
              >
                <span className="material-symbols-outlined text-2xl block">close</span>
              </button>

              {/* Printable sheet area */}
              <div className="space-y-8">
                
                {/* Header Profile section */}
                <div className="border-b border-outline-variant/30 pb-6 text-center md:text-left space-y-2">
                  <h2 className="font-headline text-3xl font-bold text-on-surface">Leo B. Magdarag</h2>
                  <p className="font-body-md text-sm text-primary-container font-semibold uppercase tracking-wider">
                    Bachelor of Science in Information Technology Student
                  </p>
                  <p className="font-body-md text-xs text-on-surface-variant">
                    Manila, Philippines | leo.baluyot.magdarag039@gmail.com
                  </p>
                </div>

                {/* Grid sections */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* Left Column (Education / Experience) */}
                  <div className="md:col-span-8 space-y-6">
                    
                    {/* Academic Profile */}
                    <div className="space-y-4">
                      <h3 className="font-headline text-sm font-bold uppercase tracking-wider text-primary border-b border-outline-variant/20 pb-2">
                        Education
                      </h3>
                      <div className="space-y-1">
                        <div className="flex justify-between items-start font-body-md text-sm font-semibold text-on-surface">
                          <span>Tech University Institute</span>
                          <span className="text-xs text-on-surface-variant font-normal">2021 - Present</span>
                        </div>
                        <p className="font-body-md text-xs text-on-surface-variant">
                          Bachelor of Science in Information Technology
                        </p>
                        <p className="font-body-md text-xs text-on-surface-variant italic mt-1">
                          Focus in Software Engineering, Database Systems, &amp; Routing/Switching protocols.
                        </p>
                      </div>
                    </div>

                    {/* Academic Accomplishments & Projects */}
                    <div className="space-y-4">
                      <h3 className="font-headline text-sm font-bold uppercase tracking-wider text-primary border-b border-outline-variant/20 pb-2">
                        Academic Projects
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h4 className="font-body-md text-sm font-semibold text-on-surface">
                            Enterprise Inventory System (Full-Stack)
                          </h4>
                          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                            Developed a multi-warehouse stock tracker with secure express authorization, transaction audits, and automated stock deficit thresholds.
                          </p>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-body-md text-sm font-semibold text-on-surface">
                            Network Security Posture Audit
                          </h4>
                          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                            Analyzed live subnet telemetry logs with Wireshark, isolated vulnerable IP ports, and generated highly-hardened firewall rulesets.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Right Column (Competency Matrix / Certifications) */}
                  <div className="md:col-span-4 space-y-6">
                    
                    {/* Competencies */}
                    <div className="space-y-3">
                      <h3 className="font-headline text-sm font-bold uppercase tracking-wider text-primary border-b border-outline-variant/20 pb-2">
                        Technical Skillset
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-1 bg-surface-container-low border border-outline-variant/20 rounded text-xs font-code-sm text-on-surface">JavaScript</span>
                        <span className="px-2 py-1 bg-surface-container-low border border-outline-variant/20 rounded text-xs font-code-sm text-on-surface">TypeScript</span>
                        <span className="px-2 py-1 bg-surface-container-low border border-outline-variant/20 rounded text-xs font-code-sm text-on-surface">Python</span>
                        <span className="px-2 py-1 bg-surface-container-low border border-outline-variant/20 rounded text-xs font-code-sm text-on-surface">PostgreSQL</span>
                        <span className="px-2 py-1 bg-surface-container-low border border-outline-variant/20 rounded text-xs font-code-sm text-on-surface">MySQL</span>
                        <span className="px-2 py-1 bg-surface-container-low border border-outline-variant/20 rounded text-xs font-code-sm text-on-surface">MongoDB</span>
                        <span className="px-2 py-1 bg-surface-container-low border border-outline-variant/20 rounded text-xs font-code-sm text-on-surface">Cisco Networks</span>
                        <span className="px-2 py-1 bg-surface-container-low border border-outline-variant/20 rounded text-xs font-code-sm text-on-surface">Docker</span>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="space-y-3">
                      <h3 className="font-headline text-sm font-bold uppercase tracking-wider text-primary border-b border-outline-variant/20 pb-2">
                        Credentials
                      </h3>
                      <ul className="space-y-3 font-body-md text-xs text-on-surface-variant">
                        <li>
                          <span className="font-semibold text-on-surface block">AWS Cloud Practitioner</span>
                          Amazon Web Services · 2023
                        </li>
                        <li>
                          <span className="font-semibold text-on-surface block">JS Algorithms &amp; Data Structures</span>
                          freeCodeCamp · 2022
                        </li>
                      </ul>
                    </div>

                  </div>

                </div>

                {/* Print and Save Actions */}
                <div className="pt-6 border-t border-outline-variant/20 flex gap-4">
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="flex-grow md:flex-grow-0 inline-flex items-center justify-center gap-2 bg-primary-container text-white px-6 py-2.5 rounded font-label-md text-sm font-semibold hover:bg-primary-container/85 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">print</span>
                    Print/Save PDF
                  </button>
                  <button
                    onClick={() => setIsResumeModalOpen(false)}
                    className="flex-grow md:flex-grow-0 inline-flex items-center justify-center gap-2 border border-outline-variant/40 hover:border-red-500 hover:text-red-500 text-on-surface-variant px-6 py-2.5 rounded font-label-md text-sm font-semibold transition-colors cursor-pointer bg-transparent"
                  >
                    Close Sheet
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
