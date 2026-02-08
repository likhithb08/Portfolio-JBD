
import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../App';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectsPanel: React.FC<Props> = ({ isOpen, onClose }) => {
  // Enforce explicit view states: LIST or DETAIL
  const [view, setView] = useState<'LIST' | 'DETAIL'>('LIST');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isOpeningDoors, setIsOpeningDoors] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Layered animation state management
  useEffect(() => {
    if (!isOpen) {
      // Reset state when overlay is hidden
      setTimeout(() => {
        setView('LIST');
        setSelectedProject(null);
        setIsOpeningDoors(false);
      }, 500);
    }
  }, [isOpen]);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setIsOpeningDoors(true);
    
    // Explicit sequence:
    // 1. Setup detail view behind "doors"
    // 2. Wait for door opening animation to complete
    setTimeout(() => {
      setView('DETAIL');
      setIsOpeningDoors(false);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }, 450); 
  };

  const handleBackToList = () => {
    setIsOpeningDoors(true);
    setTimeout(() => {
      setView('LIST');
      setSelectedProject(null);
      setIsOpeningDoors(false);
    }, 450);
  };

  // 1. Layer: Backdrop Overlay (Opacity/Blur only)
  const BackdropLayer = () => (
    <div 
      className={`fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl transition-opacity duration-500 ease-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    />
  );

  // 2. Layer: Content Panel (Transform only)
  return (
    <>
      <BackdropLayer />
      
      <div 
        className={`fixed inset-0 z-[110] flex items-end md:items-center justify-center pointer-events-none`}
      >
        <div 
          className={`relative w-full h-[95vh] md:h-[90vh] max-w-7xl mx-auto bg-[#0a0a0a] border-t md:border border-slate-800 shadow-2xl overflow-hidden transition-transform duration-500 ease-out pointer-events-auto ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        >
          {/* Internal Shutter Doors (GPU Optimized) */}
          <div className="absolute inset-0 z-[150] pointer-events-none flex overflow-hidden">
            <div 
              className={`w-1/2 h-full bg-[#0d0d0d] border-r border-slate-800 transition-transform duration-450 ease-out ${isOpeningDoors ? 'translate-x-0' : '-translate-x-full'}`}
              style={{ willChange: 'transform' }}
            />
            <div 
              className={`w-1/2 h-full bg-[#0d0d0d] border-l border-slate-800 transition-transform duration-450 ease-out ${isOpeningDoors ? 'translate-x-0' : 'translate-x-full'}`}
              style={{ willChange: 'transform' }}
            />
          </div>

          {/* Navigation Header */}
          <div className="absolute top-0 left-0 right-0 p-6 md:p-10 flex justify-between items-center z-[130] bg-[#0a0a0a]/50 backdrop-blur-sm border-b border-slate-800/50">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-100 font-mono tracking-tighter">
                {view === 'DETAIL' ? '02 / ARCHITECTURE' : '01 / PROJECTS OVERVIEW'}
              </h2>
            </div>
            <button 
              onClick={view === 'DETAIL' ? handleBackToList : onClose}
              className="group p-3 bg-slate-900 border border-slate-800 rounded-full hover:bg-slate-800 hover:border-sky-500/50 transition-all text-slate-400"
            >
              {view === 'DETAIL' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              )}
            </button>
          </div>

          {/* Content Scroller */}
          <div ref={scrollRef} className="h-full pt-28 pb-10 overflow-y-auto px-6 md:px-10 custom-scrollbar">
            
            {/* View State: PROJECT_LIST */}
            <div className={`transition-all duration-300 ${view === 'LIST' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none absolute'}`}>
              <div className="grid gap-6 md:grid-cols-2">
                {PROJECTS.map((project, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => handleSelectProject(project)}
                    className="group relative bg-[#0d0d0d] border border-slate-800 p-8 rounded-xl cursor-pointer hover:border-sky-500/40 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="absolute top-8 right-8 text-sky-600 font-mono text-sm opacity-50 group-hover:opacity-100 transition-opacity">0{idx + 1}.</div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-sky-400 transition-colors">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2 italic">"{project.problem}"</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map(t => (
                        <span key={t} className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-500 text-[10px] uppercase font-mono tracking-tighter">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* View State: PROJECT_DETAIL */}
            {selectedProject && (
              <div className={`transition-all duration-300 ${view === 'DETAIL' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none absolute'}`}>
                <div className="max-w-4xl mx-auto py-10">
                  <header className="mb-16">
                    <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter">{selectedProject.title}</h1>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tech.map(t => (
                        <span key={t} className="px-4 py-1 bg-sky-950/20 border border-sky-900/50 text-sky-400 text-xs font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </header>

                  <div className="grid md:grid-cols-3 gap-12 mb-20">
                    <div className="md:col-span-2">
                      <h4 className="text-sky-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-6">Execution Logic</h4>
                      <div className="space-y-8">
                        {selectedProject.points.map((p, idx) => (
                          <div key={idx} className="flex gap-6 group">
                            <span className="text-slate-600 font-mono text-xs pt-1">0{idx + 1}</span>
                            <p className="text-slate-300 text-lg leading-relaxed">{p}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <aside className="space-y-10">
                      <div>
                        <h4 className="text-sky-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-4">Challenge</h4>
                        <p className="text-slate-400 text-sm leading-relaxed italic border-l-2 border-slate-800 pl-4">{selectedProject.problem}</p>
                      </div>
                      <div className="p-6 bg-slate-900/30 border border-slate-800 rounded-lg">
                        <h4 className="text-white text-xs font-bold mb-4 font-mono">CODEBASE</h4>
                        <a 
                          href={selectedProject.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center justify-center w-full py-3 bg-white text-black text-sm font-bold rounded hover:bg-sky-400 transition-colors uppercase tracking-widest"
                        >
                          View Repository
                        </a>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPanel;
