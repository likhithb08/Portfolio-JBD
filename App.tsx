
import React from 'react';
import ThreeBackground from './components/ThreeBackground';
import SectionHeading from './components/SectionHeading';
import { Project, SkillGroup, ExperienceItem } from './types';

const SKILLS: SkillGroup[] = [
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
    items: ["MySQL", "MongoDB", "Node.js", "Express.js", "React"]
  }
];

const PROJECTS: Project[] = [
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
  const handleDownload = () => {
    // Since we don't have an external PDF file in the environment, 
    // we generate a text-based resume summary from the existing data to ensure functionality.
    const resumeContent = `
LIKHITH B - Java Backend Developer
Contact: likhithb285@gmail.com | +91 7676909364
Location: Bengaluru, Karnataka

SUMMARY:
Java-focused developer with hands-on experience in Core Java, OOP, and backend fundamentals. 
Built applications using Spring Boot and SQL, including REST APIs and database-driven systems.

EXPERIENCE:
Web Development Intern | Zidio Development (Jan 2025 - Apr 2025)
- Developed RESTful APIs using Node.js/Express.
- Managed MongoDB collections.
- Collaborated on MERN stack task management app.

PROJECTS:
1. Shadow AI (Spring Boot, MySQL, Hibernate, JWT)
2. Banking Dashboard (Spring Boot, MySQL, n8n, JS)

EDUCATION:
Bachelor of Computer Application (BCA) | Nrupathunga University (2025)
Aggregate: 8.13/10

TECHNICAL SKILLS:
Java, SQL, Spring Boot, Hibernate, REST APIs, JWT, Git, MongoDB, Node.js, React.
    `.trim();

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Likhith_B_Resume_Summary.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen selection:bg-sky-500/30 selection:text-sky-400">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex flex-col justify-center items-center px-6 overflow-hidden">
        <ThreeBackground />
        
        <div className="z-10 text-center max-w-4xl">
          <p className="font-mono text-sky-400 text-sm md:text-base mb-4 tracking-widest uppercase">
            Actively seeking entry-level Java Backend roles
          </p>
          <h1 className="text-5xl md:text-8xl font-extrabold text-slate-100 mb-6 leading-tight">
            Likhith <span className="text-sky-500">B</span>
          </h1>
          <h2 className="text-xl md:text-3xl font-semibold text-slate-300 mb-8 max-w-2xl mx-auto">
            Java Backend Developer
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Building database-driven systems and RESTful APIs with <span className="text-slate-200">Spring Boot</span>, <span className="text-slate-200">SQL</span>, and <span className="text-slate-200">Hibernate</span>.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#projects" className="px-8 py-3 bg-slate-100 text-slate-900 font-bold rounded hover:bg-white transition-colors">
              View Projects
            </a>
            <a href="https://github.com/likhithb08" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-slate-700 text-slate-100 font-bold rounded hover:bg-slate-800 transition-colors">
              GitHub
            </a>
            <button 
              onClick={handleDownload}
              className="px-8 py-3 bg-sky-600 text-white font-bold rounded hover:bg-sky-500 transition-colors flex items-center gap-2 group cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-24 space-y-32">
        
        {/* About Section */}
        <section id="about" className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading title="Summary" subtitle="01 / Introduction" />
            <div className="space-y-4 text-slate-400 leading-relaxed text-lg">
              <p>
                Java-focused developer with hands-on experience in <span className="text-slate-200">Core Java</span>, 
                object-oriented programming, and backend development fundamentals. 
              </p>
              <p>
                Built Java applications using <span className="text-slate-200">Spring Boot</span> and <span className="text-slate-200">SQL</span>, 
                including REST APIs and database-driven systems. Familiar with authentication concepts, file handling, 
                and problem-solving using data structures.
              </p>
              <p>
                Actively strengthening backend skills and seeking entry-level <span className="text-slate-200">Java Backend Developer</span> opportunities.
              </p>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl">
             <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-sky-400 font-mono text-2xl mb-1">8.13</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">BCA GPA</div>
                </div>
                <div>
                  <div className="text-sky-400 font-mono text-2xl mb-1">Spring</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">Core Strength</div>
                </div>
                <div>
                  <div className="text-sky-400 font-mono text-2xl mb-1">SQL</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">Database Dev</div>
                </div>
                <div>
                  <div className="text-sky-400 font-mono text-2xl mb-1">JWT</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">Auth Logic</div>
                </div>
             </div>
          </div>
        </section>

        {/* Skills Section */}
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

        {/* Projects Section */}
        <section id="projects">
          <SectionHeading title="Core Projects" subtitle="03 / Work" />
          <div className="grid gap-12">
            {PROJECTS.map((project, idx) => (
              <div key={idx} className="group grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-5">
                  <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-sky-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(t => (
                      <span key={t} className="px-2 py-1 bg-slate-900 border border-slate-800 text-slate-500 text-[10px] uppercase font-mono tracking-tighter">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-400 mb-6 italic leading-relaxed">
                    "{project.problem}"
                  </p>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-slate-300 hover:text-sky-400 text-sm font-mono">
                    VIEW SOURCE CODE <span className="ml-2">→</span>
                  </a>
                </div>
                <div className="md:col-span-7 bg-slate-900/30 border border-slate-800 p-8 rounded-lg group-hover:border-slate-700 transition-all">
                  <ul className="space-y-4">
                    {project.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex text-slate-400 leading-relaxed">
                        <span className="text-sky-600 mr-4 font-mono">0{pIdx + 1}.</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Education */}
        <section className="grid md:grid-cols-2 gap-16">
          <div>
            <SectionHeading title="Experience" subtitle="04 / Career" />
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                  <p className="text-sky-400 font-mono text-sm">{exp.company} — {exp.period}</p>
                  <p className="text-slate-500 text-xs font-mono">Bengaluru, Karnataka</p>
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
            <SectionHeading title="Education" subtitle="05 / Academic" />
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-100">Bachelor of Computer Application</h3>
                <p className="text-sky-400 font-mono text-sm">Nrupathunga University, Bengaluru — 2025</p>
                <p className="text-slate-500 mt-2 text-sm">Aggregate: 8.13 / 10</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-sky-500">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M12 15c-3.31 0-6-2.69-6-6V3h12v6c0 3.31-2.69 6-6 6Z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">Technovation Winner</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Won the Technovation competition organized by Maharani Cluster University for building 
                  a restaurant menu application using React.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="border-t border-slate-900 pt-24 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-100 mb-6">Let's Connect</h2>
            <p className="text-slate-400 text-lg mb-10">
              Open to entry-level <span className="text-slate-200 underline decoration-sky-500 underline-offset-4">Java Backend roles</span> and exciting collaborations.
            </p>
            <div className="flex flex-wrap justify-center gap-10">
              <a href="mailto:likhithb285@gmail.com" className="text-slate-300 hover:text-sky-400 transition-colors font-mono tracking-tight">
                likhithb285@gmail.com
              </a>
              <a href="tel:+917676909364" className="text-slate-300 hover:text-sky-400 transition-colors font-mono tracking-tight">
                +91 7676909364
              </a>
              <a href="https://linkedin.com/in/likhith-b-1a7364242" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-sky-400 transition-colors font-mono tracking-tight">
                LinkedIn
              </a>
              <a href="https://github.com/likhithb08" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-sky-400 transition-colors font-mono tracking-tight">
                GitHub
              </a>
            </div>
            <div className="mt-24 text-slate-600 font-mono text-xs uppercase tracking-widest">
              Developed by Likhith B • Bengaluru, Karnataka
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default App;
