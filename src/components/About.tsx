import { useState } from 'react';
import { motion } from 'motion/react';

export default function About() {
  const [imgSrc, setImgSrc] = useState('./profile_picture.png');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const languages = [
    { name: 'PHP', level: '95%' },
    { name: 'JavaScript', level: '90%' },
    { name: 'Java', level: '85%' },
    { name: 'C / C++', level: '80%' },
    { name: 'Python', level: '75%' },
    { name: 'C#', level: '70%' },
    { name: 'Visual Basic', level: '60%' },
    { name: 'COBOL', level: '45%' },
  ];

  const dataSystems = ['MySQL', 'SQLite', 'MongoDB', 'PostgreSQL'];
  const devTools = ['Laravel', 'Node.js', 'React', 'Express', 'Livewire', 'Spring Boot'];

  const courseWorks = [
    'Data Structures & Algorithms',
    'Object-Oriented Programming',
    'Advanced Database Systems',
    'Web App Development',
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-24"
    >
      {/* Intro Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 text-primary font-label-md text-sm font-semibold uppercase tracking-widest">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
            <span>System Initialization</span>
          </div>
          
          <h1 className="font-headline-xl text-3xl md:text-4xl lg:text-5xl font-bold text-on-background leading-tight">
            Engineering solutions through <span className="text-primary-container">code</span> &amp; logic.
          </h1>
          
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            I am a Bachelor of Science in Information Technology student with an unrelenting passion for problem-solving. My focus lies in bridging the gap between complex technical requirements and elegant, scalable software solutions. I thrive in environments that challenge my analytical thinking and I continue learning to stay aligned with modern tech trends.
          </p>
          
          <div className="mt-4">
            <a 
              href="#arsenal" 
              className="font-label-md text-sm text-primary-container border border-primary-container hover:border-primary-container/80 px-6 py-3 rounded hover:bg-primary-container/10 transition-all duration-300 active:scale-95 inline-flex items-center gap-2 font-semibold"
            >
              View Arsenal 
              <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
            </a>
          </div>
        </div>
        
        {/* Profile Image with decorative ambient glow */}
        <div className="lg:col-span-5 relative group">
          <div className="absolute inset-0 bg-primary-container/15 blur-3xl rounded-full -z-10 group-hover:bg-primary-container/30 transition-all duration-700"></div>
          <div className="overflow-hidden rounded-xl border border-outline-variant/30 shadow-xl aspect-[3/4] bg-surface-container">
            <img 
              className="w-full h-full object-cover object-[55%_35%] transition-all duration-700 scale-102 group-hover:scale-105" 
              alt="Leo Magdarag - Professional Profile Portrait" 
              referrerPolicy="no-referrer"
              src={imgSrc}
              onError={() => {
                // High-quality professional fallback portrait
                setImgSrc("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800&q=80");
              }}
            />
          </div>
        </div>
      </section>

      {/* Technical Arsenal Section (Bento Grid) */}
      <section id="arsenal" className="space-y-8 scroll-mt-24">
        <motion.h2 
          variants={itemVariants}
          className="font-headline-lg text-2xl md:text-3xl font-bold text-on-background flex items-center gap-3"
        >
          <span className="w-8 h-[2px] bg-primary-container inline-block"></span> 
          Technical Arsenal
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Languages proficiency meters — tall left column */}
          <motion.div 
            variants={itemVariants}
            className="bg-surface-container border border-outline-variant/30 rounded-xl p-8 hover:border-primary-container/50 transition-colors duration-300 group relative overflow-hidden md:row-span-2"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 blur-3xl -z-10"></div>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary-container text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>code</span>
              <h3 className="font-headline-md text-xl font-bold text-on-background">Languages</h3>
            </div>
            <div className="flex flex-col gap-5">
              {languages.map((lang, index) => (
                <div key={lang.name} className="space-y-1">
                  <div className="flex justify-between font-label-md text-xs font-semibold text-on-surface-variant">
                    <span>{lang.name}</span>
                    <span>{lang.level}</span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: lang.level }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 1, ease: 'easeOut' }}
                      className="bg-primary-container h-1.5 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Databases systems container */}
          <motion.div 
            variants={itemVariants}
            className="bg-surface-container border border-outline-variant/30 rounded-xl p-8 hover:border-primary-container/50 transition-colors duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary-container text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>database</span>
                <h3 className="font-headline-md text-xl font-bold text-on-background">Data Systems</h3>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
                Experience in designing and managing both relational and NoSQL database architectures.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {dataSystems.map((db) => (
                <span 
                  key={db} 
                  className="px-3 py-1.5 bg-surface-container-low border border-outline-variant/40 rounded text-xs font-label-md text-on-background font-semibold"
                >
                  {db}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Tools and architecture */}
          <motion.div 
            variants={itemVariants}
            className="bg-surface-container border border-outline-variant/30 rounded-xl p-8 hover:border-primary-container/50 transition-colors duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary-container text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
                <h3 className="font-headline-md text-xl font-bold text-on-background">Frameworks &amp; Tools</h3>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
                Building with modern backend and frontend frameworks while keeping up with current development practices.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="px-3 py-1.5 bg-surface border border-outline-variant/30 rounded text-xs font-label-md text-on-background flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-xs">commit</span> Git
              </span>
              {devTools.map((tool) => (
                <span 
                  key={tool} 
                  className="px-3 py-1.5 bg-surface border border-outline-variant/30 rounded text-xs font-label-md text-on-background font-semibold"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Academic Foundation & Credentials */}
      <section className="space-y-8">
        <motion.h2 
          variants={itemVariants}
          className="font-headline-lg text-2xl md:text-3xl font-bold text-on-background flex items-center gap-3"
        >
          <span className="w-8 h-[2px] bg-primary-container inline-block"></span> 
          Academic Foundation
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Degree and GPA */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-8 flex flex-col gap-6"
          >
            <div className="bg-surface-container border border-outline-variant/30 rounded-xl p-8 relative overflow-hidden group h-full">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container/20 group-hover:bg-primary-container transition-colors duration-300"></div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h3 className="font-headline-md text-xl md:text-2xl font-bold text-on-background">
                    Bachelor of Science in Information Technology
                  </h3>
                  <p className="font-body-md text-sm text-primary-container font-semibold mt-1">
                    Polytechnic University of the Philippines - Calauan Campus
                  </p>
                </div>
                <span className="font-label-md text-xs text-on-surface-variant bg-surface-container-high border border-outline-variant/20 px-3 py-1 rounded font-semibold whitespace-nowrap">
                  2021 - Present
                </span>
              </div>
              
              <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
                Focusing on software engineering, database architecture, and continuous growth with modern development tools. Consistently maintaining a high GPA while participating in algorithmic coding competitions and leading academic group projects.
              </p>
              
              <div>
                <h4 className="font-label-md text-xs text-on-background mb-3 uppercase tracking-wider font-bold">
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-2">
                  {courseWorks.map((course) => (
                    <span 
                      key={course} 
                      className="font-code-sm text-xs text-tertiary bg-surface-container-low border border-outline-variant/20 px-3 py-1.5 rounded inline-block"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certifications and credentials list */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-4"
          >
            <div className="bg-surface-container border border-outline-variant/30 rounded-xl p-8 h-full">
              <h3 className="font-headline-md text-xl font-bold text-on-background mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container text-2xl">workspace_premium</span> 
                Certifications
              </h3>
              
              <ul className="flex flex-col gap-6">
                <li className="flex items-start gap-3 group cursor-default">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-container transition-colors mt-0.5">verified</span>
                  <div>
                    <h4 className="font-body-md text-sm font-semibold text-on-background group-hover:text-primary transition-colors">
                      MERN Stack Certification
                    </h4>
                    <p className="font-label-md text-xs text-on-surface-variant mt-1">
                      Skill Wallet · In progress
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group cursor-default">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-container transition-colors mt-0.5">verified</span>
                  <div>
                    <h4 className="font-body-md text-sm font-semibold text-on-background group-hover:text-primary transition-colors">
                      MongoDB Certification
                    </h4>
                    <p className="font-label-md text-xs text-on-surface-variant mt-1">
                      MongoDB · In progress
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
