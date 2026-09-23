import { motion } from 'motion/react';

interface HomeProps {
  onNavigate: (tab: string) => void;
}

// ─── Animation Variants ───────────────────────────────────────────────────────
// Staggered container variant — children animate in sequence
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

// Each staggered child rises up from below
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
};

// Competency cards — slightly larger travel distance for emphasis
const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ─── Core Competency Data ─────────────────────────────────────────────────────
const competencies = [
  {
    icon: 'globe',
    title: 'Full-Stack Web',
    description:
      'Building robust, maintainable web apps from database schema to polished UI — with a focus on clean architecture and real-world usability.',
    tags: ['Laravel', 'React', 'Node.js', 'Livewire', 'Express'],
  },
  {
    icon: 'storage',
    title: 'Database Design',
    description:
      'Designing normalised schemas, writing complex queries, and ensuring data integrity across relational and document-based databases.',
    tags: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
  },
  {
    icon: 'phone_android',
    title: 'Mobile Development',
    description:
      'Building cross-platform mobile apps with Flutter, connected via custom REST APIs to web backends.',
    tags: ['Flutter', 'Dart', 'REST APIs', 'Firebase'],
  },
] as const;

// ─── Recent Projects Preview ──────────────────────────────────────────────────
// Three most important projects shown on the home page as preview cards.
const recentProjects = [
  {
    id: 'cooperative-system',
    title: 'Cooperative Management System',
    role: 'Full-stack Developer',
    summary: 'TALL stack capstone for Settlers Credit Cooperative — officer admin, member portal, loan processing, and financial reporting.',
    tags: ['Laravel', 'Livewire', 'MySQL'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'onefrend',
    title: 'OneFrend IMS',
    role: 'Backend & Mobile Developer',
    summary: 'Laravel web admin + Flutter mobile app for HR, marketing, ordering, and delivery tracking across an integrated management system.',
    tags: ['Laravel', 'Flutter', 'Dart'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pokenexus',
    title: 'PokeNexus',
    role: 'Full-stack Developer',
    summary: 'Pokédex web app with real-time trading, player messaging, trainer profiles, and a gacha summoning system.',
    tags: ['Laravel', 'AJAX', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1589241064278-1404bbc84f91?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Home({ onNavigate }: HomeProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-28 px-5 lg:px-10 max-w-[1200px] mx-auto pb-16 md:pb-24"
    >
      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[calc(100dvh-68px)]">

        {/* Left: Text content */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* Name + headline */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-sm font-semibold text-primary-container uppercase tracking-widest font-mono">
              Hello, I'm
            </p>
            <h1 className="font-headline-xl text-4xl sm:text-5xl lg:text-6xl font-bold text-on-surface leading-[1.1] tracking-tight">
              Leo Magdarag
            </h1>
            <p className="text-xl sm:text-2xl text-on-surface-variant font-medium leading-snug">
              Full-Stack Developer &{' '}
              <span className="text-primary-container">BSIT Student</span>
            </p>
          </motion.div>

          {/* Short intro */}
          <motion.p
            variants={itemVariants}
            className="text-base text-on-surface-variant leading-relaxed max-w-lg"
          >
            I build web applications, backends, and mobile apps — focusing on clear
            architecture, real functionality, and code that's meant to last. Based in
            the Philippines, studying at PUP Calauan.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('projects')}
              className="bg-primary-container text-white px-6 py-3 rounded text-sm font-semibold hover:bg-primary transition-colors duration-200 active:scale-95 shadow-sm cursor-pointer focus-ring"
            >
              View My Work
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="border border-outline-variant/60 text-on-surface-variant hover:text-on-surface hover:border-outline-variant px-6 py-3 rounded text-sm font-semibold transition-colors duration-200 active:scale-95 cursor-pointer focus-ring"
            >
              Get in Touch
            </button>
          </motion.div>

          {/* Social links row */}
          <motion.div variants={itemVariants} className="flex items-center gap-5 pt-2">
            <a
              href="https://github.com/leonardomagdarag"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary-container transition-colors text-sm font-medium flex items-center gap-1.5 focus-ring rounded"
              aria-label="GitHub profile"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">code</span>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/leonardo-magdarag"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary-container transition-colors text-sm font-medium flex items-center gap-1.5 focus-ring rounded"
              aria-label="LinkedIn profile"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">work</span>
              LinkedIn
            </a>
            <a
              href="mailto:leonardomagdarag@gmail.com"
              className="text-on-surface-variant hover:text-primary-container transition-colors text-sm font-medium flex items-center gap-1.5 focus-ring rounded"
              aria-label="Email me"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">mail</span>
              Email
            </a>
          </motion.div>
        </div>

        {/* Right: Profile image */}
        {/*
          The image uses aspect-ratio to maintain proportions across breakpoints.
          The glow div is purely decorative and hidden from screen readers.
          On small screens (<lg) the image is hidden to keep the hero clean
          and avoid forcing a cramped two-column layout at narrow widths.
        */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 hidden lg:block relative"
          aria-hidden="true"
        >
          {/* Decorative ambient glow behind image */}
          <div className="absolute inset-0 bg-primary-container/10 blur-3xl rounded-full -z-10" />
          <div className="overflow-hidden rounded-2xl border border-outline-variant/30 aspect-[3/4] bg-surface-container">
            <img
              src="./profile_picture.png"
              alt="Leo Magdarag"
              className="w-full h-full object-cover object-[55%_30%]"
            />
          </div>
        </motion.div>

      </section>

      {/* ── Core Competencies ────────────────────────────────────────────────── */}
      <section aria-labelledby="competencies-heading" className="space-y-8">
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <span className="w-8 h-px bg-primary-container" aria-hidden="true" />
          <h2 id="competencies-heading" className="font-headline-md text-xl font-bold text-on-surface">
            What I Build
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {competencies.map((comp) => (
            <motion.div
              key={comp.title}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              // Border/shadow transition only — not blanket transition to avoid jank
              className="card-surface p-7 rounded-xl flex flex-col gap-5 group transition-[border-color,box-shadow] duration-250"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary border border-outline-variant/20">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  {comp.icon}
                </span>
              </div>

              <div className="flex flex-col gap-2 flex-grow">
                <h3 className="font-headline-md text-base font-bold text-on-surface group-hover:text-primary transition-colors duration-200">
                  {comp.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {comp.description}
                </p>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {comp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-surface-container-high text-tertiary px-2.5 py-1 rounded text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Recent Projects Preview ───────────────────────────────────────────── */}
      <section aria-labelledby="projects-heading" className="space-y-8">
        <motion.div variants={itemVariants} className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="w-8 h-px bg-primary-container" aria-hidden="true" />
            <h2 id="projects-heading" className="font-headline-md text-xl font-bold text-on-surface">
              Recent Projects
            </h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-sm text-primary-container hover:text-primary transition-colors font-medium flex items-center gap-1 cursor-pointer focus-ring rounded"
          >
            All projects
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
          </button>
        </motion.div>

        {/* Three project preview cards in a responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentProjects.map((project) => (
            <motion.button
              key={project.id}
              variants={cardVariants}
              onClick={() => onNavigate('projects')}
              className="card-surface rounded-xl overflow-hidden group text-left w-full cursor-pointer transition-[border-color,box-shadow] duration-250 focus-ring"
              aria-label={`View ${project.title}`}
            >
              {/* Project image */}
              <div className="h-44 overflow-hidden relative">
                <img
                  src={project.image}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Role badge over image */}
                <span className="absolute bottom-3 left-3 text-[10px] font-semibold text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                  {project.role}
                </span>
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col gap-3">
                <h3 className="font-headline-md text-sm font-bold text-on-surface group-hover:text-primary-container transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface-container-low border border-outline-variant/20 text-tertiary px-2 py-0.5 rounded text-[10px] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

    </motion.div>
  );
}
