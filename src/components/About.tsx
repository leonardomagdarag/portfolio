import { motion } from 'motion/react';

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ─── Technology Stack Data ────────────────────────────────────────────────────
// Grouped by domain so visitors can quickly scan Leo's stack at a glance.
// Proficiency labels replace misleading numeric percentages.
const techStack = [
  {
    category: 'Languages',
    icon: 'code',
    items: [
      { name: 'PHP', note: 'Primary' },
      { name: 'JavaScript', note: 'Primary' },
      { name: 'Java', note: 'Proficient' },
      { name: 'Python', note: 'Proficient' },
      { name: 'C / C++', note: 'Proficient' },
      { name: 'C#', note: 'Familiar' },
      { name: 'Dart', note: 'Proficient' },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    icon: 'architecture',
    items: [
      { name: 'Laravel', note: 'Primary' },
      { name: 'Livewire', note: 'Primary' },
      { name: 'React', note: 'Proficient' },
      { name: 'Node.js', note: 'Proficient' },
      { name: 'Express', note: 'Proficient' },
      { name: 'Flutter', note: 'Proficient' },
      { name: 'Spring Boot', note: 'Familiar' },
    ],
  },
  {
    category: 'Databases',
    icon: 'storage',
    items: [
      { name: 'MySQL', note: 'Primary' },
      { name: 'PostgreSQL', note: 'Proficient' },
      { name: 'MongoDB', note: 'Proficient' },
      { name: 'SQLite', note: 'Familiar' },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: 'build',
    items: [
      { name: 'Git', note: 'Primary' },
      { name: 'Tailwind CSS', note: 'Primary' },
      { name: 'Vite', note: 'Proficient' },
      { name: 'Firebase', note: 'Familiar' },
      { name: 'Google Apps Script', note: 'Familiar' },
      { name: 'Arduino', note: 'Familiar' },
    ],
  },
] as const;

// Colour coding for proficiency notes — keeps the grid informative without
// cluttering it with progress bars whose exact numbers would be arbitrary.
const noteColour: Record<string, string> = {
  Primary: 'text-primary-container font-semibold',
  Proficient: 'text-on-surface-variant',
  Familiar: 'text-on-surface-variant/60',
};

// ─── Certifications ───────────────────────────────────────────────────────────
const certifications = [
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2023',
    icon: 'cloud',
  },
  {
    title: 'JS Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    year: '2022',
    icon: 'psychology',
  },
  {
    title: 'MERN Stack Certification',
    issuer: 'Skill Wallet',
    year: 'In progress',
    icon: 'hub',
  },
  {
    title: 'MongoDB Developer',
    issuer: 'MongoDB University',
    year: 'In progress',
    icon: 'storage',
  },
] as const;

// ─── Relevant Coursework ──────────────────────────────────────────────────────
const coursework = [
  'Data Structures & Algorithms',
  'Object-Oriented Programming',
  'Advanced Database Systems',
  'Web Application Development',
  'Mobile Application Development',
  'Software Engineering',
  'Computer Networks',
  'Information Security',
];

export default function About() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-24 px-5 lg:px-10 max-w-[1200px] mx-auto py-16 md:py-24"
    >

      {/* ── Identity Section ─────────────────────────────────────────────────── */}
      {/*
        Two-column layout on large screens: text left, portrait right.
        On mobile/tablet, portrait moves below text to keep the most important
        content (name, bio) immediately visible above the fold.
      */}
      <section
        aria-labelledby="about-heading"
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        {/* Bio text column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <span className="w-8 h-px bg-primary-container" aria-hidden="true" />
            <span className="text-xs font-semibold text-primary-container uppercase tracking-widest">
              About Me
            </span>
          </motion.div>

          <motion.h1
            id="about-heading"
            variants={itemVariants}
            className="font-headline-xl text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface leading-tight"
          >
            Engineering solutions through{' '}
            <span className="text-primary-container">code</span> &amp; curiosity.
          </motion.h1>

          <motion.div variants={itemVariants} className="space-y-4 text-on-surface-variant leading-relaxed">
            <p>
              I'm a <strong className="text-on-surface font-semibold">Bachelor of Science in Information Technology</strong> student
              at the Polytechnic University of the Philippines — Calauan Campus. My
              focus is building practical, working software: web systems with real
              business logic, mobile apps users actually want to use, and database
              designs that scale cleanly.
            </p>
            <p>
              I gravitate toward backend work — designing APIs, modelling data, and
              connecting systems — while being comfortable enough on the frontend to
              ship complete products on my own. I keep learning deliberately, not just
              to add frameworks to a list, but to understand the tradeoffs behind
              them.
            </p>
          </motion.div>

          {/* Quick-glance facts */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2"
          >
            {[
              { label: 'University', value: 'PUP Calauan' },
              { label: 'Degree', value: 'BSIT' },
              { label: 'Location', value: 'Laguna, Philippines' },
            ].map((fact) => (
              <div key={fact.label} className="bg-surface-container-low border border-outline-variant/20 rounded-lg p-4">
                <dt className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant mb-1">
                  {fact.label}
                </dt>
                <dd className="text-sm font-semibold text-on-surface">{fact.value}</dd>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Portrait column — hidden on mobile to avoid visual clutter */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 hidden lg:block relative"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-primary-container/10 blur-3xl rounded-full -z-10" />
          <div className="overflow-hidden rounded-2xl border border-outline-variant/30 aspect-[3/4] bg-surface-container">
            <img
              src="./profile_picture.png"
              alt="Leo Magdarag"
              className="w-full h-full object-cover object-[55%_30%] hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>
      </section>

      {/* ── Technical Stack ───────────────────────────────────────────────────── */}
      {/*
        Grouped grid instead of progress bars — percentages like "PHP: 95%" are
        subjective and unhelpful to a recruiter. Category grouping communicates
        breadth, while the note (Primary / Proficient / Familiar) communicates
        depth honestly.
      */}
      <section aria-labelledby="stack-heading" className="space-y-8">
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <span className="w-8 h-px bg-primary-container" aria-hidden="true" />
          <h2 id="stack-heading" className="font-headline-md text-xl font-bold text-on-surface">
            Technical Stack
          </h2>
        </motion.div>

        {/* Legend for note labels */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 text-xs text-on-surface-variant"
          role="note"
          aria-label="Proficiency legend"
        >
          <span>
            <span className="text-primary-container font-semibold">Primary</span>
            {' '}— daily-driver fluency
          </span>
          <span>
            <span>Proficient</span>
            {' '}— used across multiple real projects
          </span>
          <span>
            <span className="opacity-60">Familiar</span>
            {' '}— used in academic / side projects
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {techStack.map((group) => (
            <motion.div
              key={group.category}
              variants={itemVariants}
              className="bg-surface-container border border-outline-variant/30 rounded-xl p-6 hover:border-primary-container/40 transition-[border-color] duration-250"
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-5">
                <span
                  className="material-symbols-outlined text-primary-container text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  {group.icon}
                </span>
                <h3 className="font-headline-md text-sm font-bold text-on-surface uppercase tracking-wider">
                  {group.category}
                </h3>
              </div>

              {/* Technology items — name + proficiency note */}
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-mono text-on-surface">{item.name}</span>
                    <span className={`text-xs ${noteColour[item.note]}`}>
                      {item.note}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Education ────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="education-heading"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* Degree block */}
        <div className="lg:col-span-8 space-y-6">
        <motion.div variants={itemVariants}>
          <div className="h-full bg-surface-container border border-outline-variant/30 rounded-xl p-7 relative overflow-hidden group">
            {/* Accent left bar — changes colour on hover as a subtle interactive cue */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container/25 group-hover:bg-primary-container transition-colors duration-300" aria-hidden="true" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
              <div>
                <h2 id="education-heading" className="font-headline-md text-xl font-bold text-on-surface">
                  Bachelor of Science in Information Technology
                </h2>
                <p className="text-sm text-primary-container font-semibold mt-1">
                  Polytechnic University of the Philippines — Calauan Campus
                </p>
              </div>
              <span className="text-xs text-on-surface-variant bg-surface-container-high border border-outline-variant/20 px-3 py-1 rounded-full whitespace-nowrap">
                2021 – Present
              </span>
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
              Focusing on software engineering, database architecture, and web & mobile development.
              Consistently maintaining a high academic standing while participating in group
              software projects and exploring modern development practices outside the curriculum.
            </p>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                Relevant Coursework
              </h4>
              <div className="flex flex-wrap gap-2">
                {coursework.map((course) => (
                  <span
                    key={course}
                    className="font-mono text-xs text-tertiary bg-surface-container-low border border-outline-variant/20 px-3 py-1.5 rounded"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Senior High School block */}
        <motion.div variants={itemVariants}>
          <div className="h-full bg-surface-container border border-outline-variant/30 rounded-xl p-7 relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container/25 group-hover:bg-primary-container transition-colors duration-300" aria-hidden="true" />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h2 className="font-headline-md text-lg font-bold text-on-surface">
                  Senior High School — ICT Strand
                </h2>
                <p className="text-sm text-primary-container font-semibold mt-1">
                  AMA Computer College Calamba
                </p>
              </div>
              <span className="text-xs text-on-surface-variant bg-surface-container-high border border-outline-variant/20 px-3 py-1 rounded-full whitespace-nowrap">
                2020 – 2021
              </span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mt-4">
              Completed Senior High School under the Information and Communications Technology (ICT) strand.
            </p>
          </div>
        </motion.div>
        </div>

        {/* Certifications block */}
        <motion.div variants={itemVariants} className="lg:col-span-4 h-full">
          <div className="h-full bg-surface-container border border-outline-variant/30 rounded-xl p-7">
            <h3 className="font-headline-md text-base font-bold text-on-surface mb-5 flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary-container text-[20px]"
                aria-hidden="true"
              >
                workspace_premium
              </span>
              Certifications
            </h3>

            <ul className="flex flex-col gap-5">
              {certifications.map((cert) => (
                <li key={cert.title} className="flex items-start gap-3">
                  <span
                    className="material-symbols-outlined text-on-surface-variant text-[18px] mt-0.5 shrink-0"
                    aria-hidden="true"
                  >
                    {cert.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-on-surface leading-snug">
                      {cert.title}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {cert.issuer} · {cert.year}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

    </motion.div>
  );
}
