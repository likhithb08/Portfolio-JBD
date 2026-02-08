
import React, { useState, useEffect } from 'react';
import ThreeBackground from './components/ThreeBackground';
import SectionHeading from './components/SectionHeading';
import AIHub from './components/AIHub';
import ProjectsPanel from './components/ProjectsPanel';
import { Project, SkillGroup, ExperienceItem } from './types';

export const SKILLS: SkillGroup[] = [
  {
    category: "Technical Skills",
    items: ["Java", "SQL", "JavaScript", "Core Java", "OOPs"]
  },
  {
    category: "Frameworks & Security",
    items: ["Spring Boot", "Hibernate (ORM Basics)", "REST APIs", "JWT (Authentication Basics)"]
  },
  {
    category: "Tools & Platforms",
    items: ["Git & GitHub", "Postman", "Eclipse", "VS Code", "n8n Workflows"]
  },
  {
    category: "Web & Database",
    items: ["MySQL", "MongoDB"]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Shadow AI",
    problem: "A Java-based backend application designed for task and user management (In Progress).",
    points: [
      "Designing and developing a Java-based backend application using Spring Boot for task and user management.",
      "Implementing multiple RESTful APIs with CRUD operations and core business logic.",
      "Integrating MySQL with Hibernate ORM for data persistence and data modeling.",
      "Building user authentication and authorization using JWT and role-based access control."
    ],
    tech: ["Java", "Spring Boot", "MySQL", "Hibernate", "JWT"],
    githubUrl: "https://github.com/likhithb08/shadow-companion"
  },
  {
    title: "Banking Dashboard",
    problem: "A full-stack banking dashboard with a Java Spring Boot backend and MySQL database.",
    points: [
      "Developed a full-stack banking dashboard with a Java Spring Boot backend and MySQL database.",
      "Implemented multiple RESTful APIs using Spring Boot and Hibernate for transaction and user data management.",
      "Built frontend functionality using JavaScript to interact with backend services.",
      "Integrated n8n workflows using JavaScript to automate processes and external service interactions."
    ],
    tech: ["Java", "Spring Boot", "MySQL", "JavaScript", "n8n"],
    githubUrl: "https://github.com/likhithb08/BankEasY"
  }
];

const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Web Development Intern",
    company: "Zidio Development",
    period: "January 2025 - April 2025",
    description: [
      "Contributed to the development of a task management web application using the MERN stack.",
      "Developed multiple RESTful APIs using Node.js and Express.js to handle user and task data.",
      "Designed and managed MongoDB collections to ensure efficient data storage and retrieval.",
      "Collaborated with the frontend team to integrate APIs and improve application functionality."
    ]
  }
];

const App: React.FC = () => {
  const [viewState, setViewState] = useState<'home' | 'project_list'>('home');

  const handleDownload = () => {
    const resumeText = `
LIKHITH B
Java Backend Developer | likhithb285@gmail.com | +91 7676909364
    `.trim();

    try {
      const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Likhith_B_Resume.txt');
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Main Content Layer */}
      <div className={`transition-all duration-700 ease-out ${viewState !== 'home' ? 'blur-xl scale-95 opacity-30 grayscale pointer-events-none' : 'blur-0 scale-100 opacity-100'}`}>
        <section className="relative h-[90vh] flex flex-col justify-center items-center px-6 overflow-hidden">
          <ThreeBackground />
          <div className="z-10 text-center max-w-4xl">
            <p className="font-mono text-sky-400 text-sm mb-4 tracking-widest uppercase">
              Actively seeking entry-level Java Backend roles
            </p>
            <h1 className="text-5xl md:text-8xl font-extrabold text-slate-100 mb-6 leading-tight tracking-tighter">
              Likhith <span className="text-sky-500">B</span>
            </h1>
            <h2 className="text-xl md:text-3xl font-semibold text-slate-300 mb-8 max-w-2xl mx-auto">
              Java Backend Developer
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setViewState('project_list')}
                className="px-8 py-3 bg-slate-100 text-slate-900 font-bold rounded hover:bg-white transition-all transform active:scale-95"
              >
                View Projects
              </button>
              <a href="https://github.com/likhithb08" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-slate-700 text-slate-100 font-bold rounded hover:bg-slate-800 transition-all">
                GitHub
              </a>
              <a href="https://linkedin.com/in/likhith-b-1a7364242" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-sky-900/50 bg-sky-900/10 text-sky-400 font-bold rounded hover:bg-sky-900/20 transition-all flex items-center gap-2">
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-6 py-24 space-y-32">
          <section id="about" className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading title="Summary" subtitle="01 / Introduction" />
              <div className="space-y-4 text-slate-400 leading-relaxed text-lg">
                <p>Java-focused developer with hands-on experience in <span className="text-slate-200">Core Java</span>, object-oriented programming, and backend development fundamentals.</p>
                <p>Built applications using <span className="text-slate-200">Spring Boot</span> and <span className="text-slate-200">SQL</span>, including REST APIs and database-driven systems.</p>
              </div>
            </div>
          </section>

          <section id="skills">
            <SectionHeading title="Technical Arsenal" subtitle="02 / Skills" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SKILLS.map((group) => (
                <div key={group.category} className="space-y-4">
                  <h3 className="text-slate-100 font-bold tracking-wide uppercase text-xs">{group.category}</h3>
                  <ul className="space-y-2">
                    {group.items.map(skill => (
                      <li key={skill} className="flex items-center text-slate-400 group">
                        <span className="w-1.5 h-1.5 bg-sky-900 group-hover:bg-sky-500 transition-colors mr-3"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-16">
            <div>
              <SectionHeading title="Experience" subtitle="03 / Career" />
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                    <p className="text-sky-400 font-mono text-sm">{exp.company} — {exp.period}</p>
                  </div>
                  <ul className="space-y-3">
                    {exp.description.map((line, j) => (
                      <li key={j} className="text-slate-400 text-sm leading-relaxed flex items-start">
                        <span className="text-slate-600 mr-2">•</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div>
              <SectionHeading title="Education" subtitle="04 / Academic" />
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-100">Bachelor of Computer Application</h3>
                  <p className="text-sky-400 font-mono text-sm">Nrupathunga University, Bengaluru — 2025</p>
                  <p className="text-slate-500 mt-2 text-sm">Aggregate: 8.13 / 10</p>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="border-t border-slate-900 pt-24 pb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-100 mb-6">Let's Connect</h2>
            <div className="flex flex-wrap justify-center gap-10">
              <a href="mailto:likhithb285@gmail.com" className="text-slate-300 hover:text-sky-400 transition-colors font-mono tracking-tight">likhithb285@gmail.com</a>
              <a href="tel:+917676909364" className="text-slate-300 hover:text-sky-400 transition-colors font-mono tracking-tight">+91 7676909364</a>
            </div>
            <div className="mt-24 text-slate-600 font-mono text-xs uppercase tracking-widest">
              Developed by Likhith B • Bengaluru, Karnataka
            </div>
          </section>
        </main>
      </div>

      {/* Projects Layer */}
      <ProjectsPanel 
        isOpen={viewState === 'project_list'} 
        onClose={() => setViewState('home')} 
      />

      {/* AI Hub Layer */}
      <AIHub />
    </div>
  );
};

export default App;
