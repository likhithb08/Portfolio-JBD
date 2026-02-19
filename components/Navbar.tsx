
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, Cpu, Home, FolderKanban } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Projects', path: '/projects', icon: <FolderKanban size={18} /> },
    { name: 'AI Systems', path: '/ai-agents', icon: <Cpu size={18} /> },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-300 ${
          isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
              LB
            </div>
            <span className="text-slate-100 font-bold font-mono tracking-tighter text-lg hidden sm:block">
              Likhith<span className="text-sky-500">.dev</span>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
                  ${isActive 
                    ? 'bg-sky-900/20 text-sky-400' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'}
                `}
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}
            <a 
              href="#contact" 
              className="ml-4 px-5 py-2 bg-slate-100 text-slate-900 font-bold rounded hover:bg-white transition-all transform hover:scale-105"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[140] bg-[#0a0a0a] transition-transform duration-300 md:hidden pt-24 px-6 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => `
                p-4 rounded-xl text-lg font-medium border border-slate-800 flex items-center gap-4
                ${isActive 
                  ? 'bg-sky-900/20 text-sky-400 border-sky-900/50' 
                  : 'text-slate-400'}
              `}
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
          <a 
            href="#contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-4 rounded-xl text-lg font-bold bg-slate-100 text-slate-900 text-center mt-4"
          >
            Contact
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
