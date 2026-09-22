import { motion } from 'motion/react';

interface HomeProps {
  onNavigate: (tab: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  // Animation container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-24"
    >
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-12 md:py-20 min-h-[600px] justify-center relative overflow-hidden">
        {/* Ambient radial gradient background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--color-surface-container-high)_0%,_var(--color-background)_70%)] opacity-70"></div>

        <motion.h1
          variants={itemVariants}
          className="font-headline-xl text-4xl md:text-5xl lg:text-6xl text-on-surface max-w-4xl mb-6 font-bold leading-tight tracking-tight"
        >
          Building Digital Solutions through <span className="text-primary">Code</span> and <span className="text-primary-container">Logic</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-body-lg text-lg text-on-surface-variant max-w-2xl mb-10 leading-relaxed"
        >
          I engineer robust backends, design intuitive frontends, and keep learning the latest tools and trends. Translating complex technical requirements into elegant, functional systems.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4"
        >
          <button
            onClick={() => onNavigate('projects')}
            className="bg-primary-container text-white px-8 py-3 rounded font-label-md text-label-md hover:bg-primary-container/80 transition-all duration-300 active:scale-95 shadow-md shadow-primary-container/20 cursor-pointer text-center"
          >
            View My Work
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="border border-primary-container text-primary-container px-8 py-3 rounded font-label-md text-label-md hover:bg-primary-container/10 transition-all duration-300 active:scale-95 cursor-pointer text-center"
          >
            Contact Me
          </button>
        </motion.div>
      </section>

      {/* Core Competencies */}
      <section className="space-y-8">
        <motion.h2
          variants={itemVariants}
          className="font-headline-md text-2xl text-on-surface flex items-center gap-4"
        >
          <span className="w-8 h-px bg-primary-container inline-block"></span>
          Core Competencies
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Web Development */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="card-surface p-8 rounded-xl flex flex-col items-start hover:border-primary transition-all duration-300 bg-surface-container"
          >
            <div className="w-12 h-12 rounded bg-surface-container-low flex items-center justify-center mb-6 text-primary border border-outline-variant/20">
              <span className="material-symbols-outlined font-semibold" style={{ fontVariationSettings: "'FILL' 1" }}>code</span>
            </div>
            <h3 className="font-headline-lg text-xl font-bold text-on-surface mb-4">Web Development</h3>
            <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
              Building responsive, accessible, and performant web applications using modern frameworks and standard web technologies.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="bg-surface-container-high px-3 py-1 rounded font-code-sm text-xs text-tertiary">React</span>
              <span className="bg-surface-container-high px-3 py-1 rounded font-code-sm text-xs text-tertiary">Node.js</span>
              <span className="bg-surface-container-high px-3 py-1 rounded font-code-sm text-xs text-tertiary">Laravel</span>
              
              <span className="bg-surface-container-high px-3 py-1 rounded font-code-sm text-xs text-tertiary">Spring Boot</span>
              <span className="bg-surface-container-high px-3 py-1 rounded font-code-sm text-xs text-tertiary">Express</span>
              <span className="bg-surface-container-high px-3 py-1 rounded font-code-sm text-xs text-tertiary">Livewire</span>
            </div>
          </motion.div>

          {/* Database Management */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="card-surface p-8 rounded-xl flex flex-col items-start hover:border-primary transition-all duration-300 bg-surface-container"
          >
            <div className="w-12 h-12 rounded bg-surface-container-low flex items-center justify-center mb-6 text-primary border border-outline-variant/20">
              <span className="material-symbols-outlined font-semibold" style={{ fontVariationSettings: "'FILL' 1" }}>database</span>
            </div>
            <h3 className="font-headline-lg text-xl font-bold text-on-surface mb-4">Database Management</h3>
            <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
              Designing normalized schemas, writing complex queries, and ensuring data integrity across relational and NoSQL environments.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="bg-surface-container-high px-3 py-1 rounded font-code-sm text-xs text-tertiary">MySQL</span>
              <span className="bg-surface-container-high px-3 py-1 rounded font-code-sm text-xs text-tertiary">SQLite</span>
              <span className="bg-surface-container-high px-3 py-1 rounded font-code-sm text-xs text-tertiary">MongoDB</span>
            </div>
          </motion.div>

          {/* Learning & Growth */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="card-surface p-8 rounded-xl flex flex-col items-start hover:border-primary transition-all duration-300 bg-surface-container"
          >
            <div className="w-12 h-12 rounded bg-surface-container-low flex items-center justify-center mb-6 text-primary border border-outline-variant/20">
              <span className="material-symbols-outlined font-semibold" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            </div>
            <h3 className="font-headline-lg text-xl font-bold text-on-surface mb-4">Learning &amp; Growth</h3>
            <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
              Continuously learning new frameworks, keeping up with current development trends, and strengthening my practical software engineering skills.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="space-y-8">
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-end"
        >
          <h2 className="font-headline-md text-2xl text-on-surface flex items-center gap-4">
            <span className="w-8 h-px bg-primary-container inline-block"></span>
            Recent Projects
          </h2>
          <button
            onClick={() => onNavigate('projects')}
            className="font-label-md text-primary hover:text-primary-container transition-colors flex items-center gap-1 text-sm font-medium cursor-pointer"
          >
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cooperative Management System (Capstone) */}
          <motion.div
            variants={itemVariants}
            className="card-surface rounded-xl overflow-hidden group relative min-h-[380px] flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-surface-container-high -z-10 overflow-hidden">
              <img
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-102 group-hover:scale-105"
                alt="Cooperative Management System"
                referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
            </div>

            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <span className="bg-primary-container/20 text-primary border border-primary-container/30 px-2 py-0.5 rounded font-code-sm text-xs backdrop-blur-sm">Laravel</span>
                <span className="bg-primary-container/20 text-primary border border-primary-container/30 px-2 py-0.5 rounded font-code-sm text-xs backdrop-blur-sm">Livewire</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                Cooperative Management System
              </h3>
              <p className="font-body-md text-on-surface-variant text-sm leading-relaxed line-clamp-3">
                A comprehensive TALL stack web system for managing cooperative operations — officer administration, member financials, and loan processing. Built as my capstone project.
              </p>
            </div>
          </motion.div>

          {/* OneFrend IMS */}
          <motion.div
            variants={itemVariants}
            className="card-surface rounded-xl overflow-hidden relative group min-h-[380px] flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-surface-container-high -z-10 overflow-hidden">
              <img
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-102 group-hover:scale-105"
                alt="OneFrend Integrated Management System"
                referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
            </div>

            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <span className="bg-primary-container/20 text-primary border border-primary-container/30 px-2 py-0.5 rounded font-code-sm text-xs backdrop-blur-sm">Laravel</span>
                <span className="bg-primary-container/20 text-primary border border-primary-container/30 px-2 py-0.5 rounded font-code-sm text-xs backdrop-blur-sm">Flutter</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                OneFrend IMS
              </h3>
              <p className="font-body-md text-on-surface-variant text-sm leading-relaxed line-clamp-3">
                Integrated management system with a Laravel web admin for HR, marketing, and operations, plus a Flutter mobile app for customer ordering and delivery tracking.
              </p>
            </div>
          </motion.div>

          {/* PokeNexus */}
          <motion.div
            variants={itemVariants}
            className="card-surface rounded-xl overflow-hidden relative group min-h-[380px] flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-surface-container-high -z-10 overflow-hidden">
              <img
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-102 group-hover:scale-105"
                alt="PokeNexus Pokedex Web App"
                referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1589241064278-1404bbc84f91?auto=format&fit=crop&w=800&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
            </div>

            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <span className="bg-primary-container/20 text-primary border border-primary-container/30 px-2 py-0.5 rounded font-code-sm text-xs backdrop-blur-sm">Laravel</span>
                <span className="bg-primary-container/20 text-primary border border-primary-container/30 px-2 py-0.5 rounded font-code-sm text-xs backdrop-blur-sm">AJAX</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                PokeNexus
              </h3>
              <p className="font-body-md text-on-surface-variant text-sm leading-relaxed line-clamp-3">
                A Pokédex web app featuring creature collection, real-time trading, messaging, trainer profiles, and a gacha system.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
