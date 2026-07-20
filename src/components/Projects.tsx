import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, ProjectCategory } from '../types';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeDetailProject, setActiveDetailProject] = useState<Project | null>(null);

  // High-fidelity portfolio projects data
  const projectsData: Project[] = [
    {
      id: 'ecommerce',
      title: 'Full-stack E-commerce Site',
      description: 'A scalable online retail platform featuring secure authentication, payment gateway integration, and a responsive admin dashboard for inventory management.',
      longDescription: 'This comprehensive full-stack e-commerce solution is built to address modern retail standards. It includes session-based secure authentication, a custom visual payment gateway, order fulfillment pipelines, and a detailed supervisor dashboard for analytical reporting on item stock levels and daily gross revenue metrics.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD1WHD8DEdyccfy7OoKZOrYJZhTvl90JdDzdUTKgsKCZmgaCHD0jNX68LFS3mqKDgRI_ZMNBy5FQoh72m9YObqYnb3I2KQhe8nexLEqynHYVdjP8JhxWlGFoPPvMJafPo9xSXc-1H7_Fb7ZGwuXJLATO2DiZYke_-SGKyVRiEy2iLRNgntgC2sd-FXdTEd5BTaMoOn_gaeYt9N_LNmBLy18teC0AZraVd8zqUNyPAHAcPpO53ukhWnvw',
      tags: ['React', 'Node.js', 'PostgreSQL'],
      category: 'web',
    },
    {
      id: 'inventory',
      title: 'Enterprise Inventory System',
      description: 'A full-stack solution for managing stock levels, predicting order times, and generating analytical reports for warehouse management.',
      longDescription: 'An enterprise-grade system designed for logistics managers to track physical goods in real-time. Features automated reorder point alerts powered by simple regression models, detailed CSV and JSON report exports, and complex search configurations to find items across multiple storage warehouses instantly.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxe6gZ6mdZ3B1XqPIU-IUhL6baM4S9zSAIdzf9qmXeTqU4oAqHA1GJTB7RgH8y1PSnQAl5hcMcrKsejOOkMMUzpN5HMcbm1KwGVRYXeEfFI1GbzWLcWhOf4UURnOX910CgCD6o2LzbSAGRxSGbcXULM9X37ou9GvqS0D8XRRbSWE0WBSjlp909pap1USf6UbtTkbLJaBtG6JNvsk85zeurDRYqvT22lG3jnNvc40a614p2DsuTZcMRVQ',
      tags: ['React', 'Node.js', 'Express', 'Tailwind'],
      category: 'web',
    },
    {
      id: 'security-audit',
      title: 'Network Security Audit',
      description: 'Comprehensive vulnerability assessment and penetration testing for a medium-sized enterprise network, including implementation of hardened firewall rules.',
      longDescription: 'A deep security posture analysis on an active enterprise subnet. Evaluated routing vulnerabilities, identified potential man-in-the-middle vector risks, and engineered custom iptables and Cisco routing rulesets to shield internal database systems from unauthorized exterior packets.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa_sBCwfVUuA_H2gwq3_FC8jJIG3SdiPcxEg5NFjnllgiVB_VNwm0U4wWwOAZZXNdHC4smxmmXhA7K7CKkGcRY-o9U7onXx8Rg4bhYUV1VZFKnY5NEzwXS17iu-Nirjg8deLO7pG8r-oh8D6KlEcthQcQN0v6reyxU2PIt4p1ZjDzQsGNB3JykVQamV6q35jJkXQWXOVtGP2EosmV_-D8Xmf_qlbOAPaUZ1SRLtZwYb0cqX2dUtCDvsg',
      tags: ['Cisco', 'Wireshark', 'Kali Linux'],
      category: 'data-security',
    },
    {
      id: 'net-monitor',
      title: 'Network Monitor script',
      description: 'Automated latency testing and alert generation tool for small office networks.',
      longDescription: 'A high-frequency network monitoring utility that pings local nodes, records packet loss statistics, and publishes detailed HTML performance graphs. Sends direct webhook alerts to system administrators if any hardware router crosses unacceptable response latency thresholds.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXnelFFZ7_dEkM_dsZpxATvKH4CS2covu_AJeF6YNkzgwmk-1KXscW_4t158mfG5BhyOwjs4prWGjs-YpzayBWs85pLs_QIqhWQc-REzuARYslASZTwViIGuK45WgKtWYjaCubieADgGiwm8busRd10QGmUtrREjOdmuMtWlM9MZzZ9U2OalrxOTM4TpYLqXEdFJpvUNWl5ZWuaLGZh42x8ygCeKuMIZ16e1CpIg6Ff3dlgWGR9o1yAQ',
      tags: ['Python', 'Bash', 'SMTP', 'HTML5'],
      category: 'data-security',
    },
    {
      id: 'event-tracker',
      title: 'Campus Event Tracker App',
      description: 'A cross-platform mobile application for students to discover, RSVP, and manage university events with real-time push notifications.',
      longDescription: 'An interactive mobile organizer connecting university clubs to students. Integrates real-time map venues, synchronous push alerts for calendar changes, and dynamic QR-code entry tickets for smooth campus event verification and check-ins.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm8pMxlc7SMzv9unT8_kIzO29CVhAXRGQUa3TER_oclmKxSyfKvPdJcXcIjdY4W6EoJvhZOGUonnQ-K8vwZOKPr-iZzptAozpUdvdtzFFsll_ULmsapiGcti1_GqjthNSng5JnM_ouDj99mgEifiOMDgbvj6nXru2xt64rvyCXfEXKuMbt1DTtH4L2PNC2A39aKslNdQMxRG509Sju4wUBZVbNxXQM_FYV32iun-_Kl5G68M4e-YmGVw',
      tags: ['Flutter', 'Firebase', 'Dart'],
      category: 'mobile',
    },
    {
      id: 'task-app',
      title: 'Campus Task App',
      description: 'High-fidelity prototype for a student productivity application integrating academic calendars.',
      longDescription: 'A beautifully structured mobile task assistant featuring custom UI widgets to organize academic classes, exam tasks, and project study rooms. Includes offline local syncing, personalized goal pacing indices, and light/dark theme profiles.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ10a1Xshs5czGvHEGE9fbieb7rhHv2KrWd1F-5mGOZqAqDx4wmAAkLWLRkSgiFCi8n1SX2UmAjFRdBnPfVEG6AiseCsvpjKd8oE5xjiDMnqd1jU3KE1APfoHkisw0CMhsviqGCLIceluloPWUKCLjt27VIE0_0AKfmXSPR9XlW_5xaL4ioa7RAaBydq75duzXQJ-Rn63tsXezVV8WO_xJzeIZzl43VYFJLS6vVHg7rnjIlzVhdH8yMA',
      tags: ['UI/UX', 'Figma', 'Prototyping'],
      category: 'mobile',
    },
  ];

  // Filtering Logic
  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  const categories: { label: string; id: ProjectCategory }[] = [
    { label: 'All', id: 'all' },
    { label: 'Web', id: 'web' },
    { label: 'Mobile', id: 'mobile' },
    { label: 'Data & Security', id: 'data-security' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      {/* Header Section */}
      <header className="text-center md:text-left space-y-4">
        <h1 className="font-headline-xl text-4xl md:text-5xl font-bold text-on-surface">
          Featured Projects
        </h1>
        <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          A collection of technical work spanning web development, mobile applications, and network infrastructure.
        </p>
      </header>

      {/* Categories Filter list */}
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

      {/* Grid Layout */}
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
                  {/* Technology Chips */}
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

                  {/* View Details CTA */}
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
                  <button
                    onClick={() => {
                      alert('Redirecting to simulated GitHub Repository for project code verification...');
                    }}
                    className="flex-grow md:flex-grow-0 inline-flex items-center justify-center gap-2 bg-primary-container text-white px-6 py-2.5 rounded font-label-md text-sm font-semibold hover:bg-primary-container/80 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">commit</span>
                    Repository
                  </button>
                  <button
                    onClick={() => {
                      alert('Initializing Sandbox Sandbox Demo simulation environment...');
                    }}
                    className="flex-grow md:flex-grow-0 inline-flex items-center justify-center gap-2 border border-outline-variant/40 hover:border-primary-container text-on-surface-variant hover:text-primary px-6 py-2.5 rounded font-label-md text-sm font-semibold transition-colors cursor-pointer bg-transparent"
                  >
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    Live Demo
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
