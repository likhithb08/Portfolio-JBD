
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AIAgentsPage from './components/AIAgentsPage';
import ProjectsPanel from './components/ProjectsPanel';
import AIHub from './components/AIHub';

// Wrapper for ProjectsPanel to use with Routing
const ProjectsRouteWrapper = () => {
  const navigate = useNavigate();
  return (
    <ProjectsPanel 
      isOpen={true} 
      onClose={() => navigate('/')} 
    />
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="bg-[#0a0a0a] min-h-screen text-slate-200 font-sans selection:bg-sky-500/30 selection:text-sky-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsRouteWrapper />} />
          <Route path="/ai-agents" element={<AIAgentsPage />} />
        </Routes>
        <AIHub />
      </div>
    </BrowserRouter>
  );
};

export default App;
