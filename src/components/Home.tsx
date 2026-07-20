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
          I engineer robust backends, design intuitive frontends, and configure reliable networks. Translating complex technical requirements into elegant, functional systems.
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
              <span className="bg-surface-container-high px-3 py-1 rounded font-code-sm text-xs text-tertiary">TypeScript</span>
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
              <span className="bg-surface-container-high px-3 py-1 rounded font-code-sm text-xs text-tertiary">PostgreSQL</span>
              <span className="bg-surface-container-high px-3 py-1 rounded font-code-sm text-xs text-tertiary">MongoDB</span>
            </div>
          </motion.div>

          {/* Networking & Systems */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="card-surface p-8 rounded-xl flex flex-col items-start hover:border-primary transition-all duration-300 bg-surface-container"
          >
            <div className="w-12 h-12 rounded bg-surface-container-low flex items-center justify-center mb-6 text-primary border border-outline-variant/20">
              <span className="material-symbols-outlined font-semibold" style={{ fontVariationSettings: "'FILL' 1" }}>router</span>
            </div>
            <h3 className="font-headline-lg text-xl font-bold text-on-surface mb-4">Networking &amp; Systems</h3>
            <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
              Configuring local area networks, understanding TCP/IP protocols, and basic Linux server administration.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="bg-surface-container-high px-3 py-1 rounded font-code-sm text-xs text-tertiary">Linux</span>
              <span className="bg-surface-container-high px-3 py-1 rounded font-code-sm text-xs text-tertiary">Cisco</span>
              <span className="bg-surface-container-high px-3 py-1 rounded font-code-sm text-xs text-tertiary">AWS (Basic)</span>
            </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project 1 (Large Card - spans 2 columns on md/lg) */}
          <motion.div 
            variants={itemVariants}
            className="card-surface rounded-xl overflow-hidden md:col-span-2 group relative min-h-[400px] flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-surface-container-high -z-10 overflow-hidden">
              <img 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-102 group-hover:scale-105" 
                alt="Enterprise Inventory System Dashboard" 
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxe6gZ6mdZ3B1XqPIU-IUhL6baM4S9zSAIdzf9qmXeTqU4oAqHA1GJTB7RgH8y1PSnQAl5hcMcrKsejOOkMMUzpN5HMcbm1KwGVRYXeEfFI1GbzWLcWhOf4UURnOX910CgCD6o2LzbSAGRxSGbcXULM9X37ou9GvqS0D8XRRbSWE0WBSjlp909pap1USf6UbtTkbLJaBtG6JNvsk85zeurDRYqvT22lG3jnNvc40a614p2DsuTZcMRVQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
            </div>
            
            <div className="p-8">
              <div className="flex gap-2 mb-4">
                <span className="bg-primary-container/20 text-primary border border-primary-container/30 px-3 py-1 rounded font-code-sm text-xs backdrop-blur-sm">React</span>
                <span className="bg-primary-container/20 text-primary border border-primary-container/30 px-3 py-1 rounded font-code-sm text-xs backdrop-blur-sm">Node.js</span>
              </div>
              <h3 className="font-headline-lg text-2xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                Enterprise Inventory System
              </h3>
              <p className="font-body-md text-on-surface-variant max-w-xl leading-relaxed">
                A full-stack solution for managing stock levels, predicting order times, and generating analytical reports for warehouse management.
              </p>
            </div>
          </motion.div>

          {/* Project 2 */}
          <motion.div 
            variants={itemVariants}
            className="card-surface rounded-xl overflow-hidden relative group min-h-[400px] flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-surface-container-high -z-10 overflow-hidden">
              <img 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-102 group-hover:scale-105" 
                alt="Network Monitor Script topology illustration" 
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXnelFFZ7_dEkM_dsZpxATvKH4CS2covu_AJeF6YNkzgwmk-1KXscW_4t158mfG5BhyOwjs4prWGjs-YpzayBWs85pLs_QIqhWQc-REzuARYslASZTwViIGuK45WgKtWYjaCubieADgGiwm8busRd10QGmUtrREjOdmuMtWlM9MZzZ9U2OalrxOTM4TpYLqXEdFJpvUNWl5ZWuaLGZh42x8ygCeKuMIZ16e1CpIg6Ff3dlgWGR9o1yAQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
            </div>

            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <span className="bg-primary-container/20 text-primary border border-primary-container/30 px-2 py-0.5 rounded font-code-sm text-xs backdrop-blur-sm">Python</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                Network Monitor script
              </h3>
              <p className="font-body-md text-on-surface-variant text-sm leading-relaxed line-clamp-3">
                Automated latency testing and alert generation tool for small office networks.
              </p>
            </div>
          </motion.div>

          {/* Project 3 */}
          <motion.div 
            variants={itemVariants}
            className="card-surface rounded-xl overflow-hidden relative group min-h-[400px] flex flex-col justify-end md:col-span-2 lg:col-span-1"
          >
            <div className="absolute inset-0 bg-surface-container-high -z-10 overflow-hidden">
              <img 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-102 group-hover:scale-105" 
                alt="Campus Task App UI design" 
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ10a1Xshs5czGvHEGE9fbieb7rhHv2KrWd1F-5mGOZqAqDx4wmAAkLWLRkSgiFCi8n1SX2UmAjFRdBnPfVEG6AiseCsvpjKd8oE5xjiDMnqd1jU3KE1APfoHkisw0CMhsviqGCLIceluloPWUKCLjt27VIE0_0AKfmXSPR9XlW_5xaL4ioa7RAaBydq75duzXQJ-Rn63tsXezVV8WO_xJzeIZzl43VYFJLS6vVHg7rnjIlzVhdH8yMA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
            </div>

            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <span className="bg-primary-container/20 text-primary border border-primary-container/30 px-2 py-0.5 rounded font-code-sm text-xs backdrop-blur-sm">UI/UX</span>
                <span className="bg-primary-container/20 text-primary border border-primary-container/30 px-2 py-0.5 rounded font-code-sm text-xs backdrop-blur-sm">Figma</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                Campus Task App
              </h3>
              <p className="font-body-md text-on-surface-variant text-sm leading-relaxed line-clamp-3">
                High-fidelity prototype for a student productivity application integrating academic calendars.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
