
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Cpu, Zap, Database, ArrowRight, Play, Terminal, CheckCircle } from 'lucide-react';
import SectionHeading from './SectionHeading';
import ThreeBackground from './ThreeBackground';

import LiveN8nDemo from './LiveN8nDemo';

const TechItem = ({ name, description }: { name: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 bg-[#0d0d0d] border border-slate-800 hover:border-sky-500/50 rounded-xl transition-all group"
  >
    <h3 className="text-lg font-bold text-slate-200 mb-2 group-hover:text-sky-400">{name}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
  </motion.div>
);

const AIAgentsPage: React.FC = () => {
  // ... (keep hero section)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 pt-20">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col justify-center items-center px-6 overflow-hidden border-b border-slate-800/50">
        <div className="absolute inset-0 opacity-20"><ThreeBackground /></div>
        
        <div className="z-10 text-center max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-sky-900/20 border border-sky-800/50 text-sky-400 text-xs font-mono mb-6 tracking-widest uppercase">
              Automation Architect
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-500 mb-8 leading-tight tracking-tighter">
              I Build AI Systems That <br className="hidden md:block"/> Work While You Sleep.
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Specializing in <span className="text-slate-100">n8n</span>, <span className="text-slate-100">AI Agents</span>, and <span className="text-slate-100">Business Process Automation</span>. 
              Turning manual chaos into autonomous efficiency.
            </p>
            
            <button 
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded hover:bg-white transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
            >
              <Play size={20} fill="currentColor" />
              Watch It In Action
            </button>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        
        {/* Interactive Workflow Demo */}
        <section id="demo" className="scroll-mt-24">
          <SectionHeading title="Live Agent Demo" subtitle="01 / Autonomy" />
          <p className="text-slate-400 mb-8 max-w-2xl">
            This chat interface connects directly to the <strong>Banking Dashboard Assistant</strong>. 
            It is a live n8n workflow designed to assist users with transaction queries and banking support in real-time.
          </p>
          
          <LiveN8nDemo />
        </section>

        {/* Tech Stack */}
        <section>
          <SectionHeading title="Automation Arsenal" subtitle="02 / Stack" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TechItem name="n8n" description="Complex workflow orchestration and API integrations." />
            <TechItem name="OpenAI / Gemini" description="LLM integration for intelligent decision making and content generation." />
            
            <TechItem name="Supabase / SQL" description="Persistent memory and structured data storage for agents." />
            
            
          </div>
        </section>

        {/* Case Studies */}
        <section>
          <SectionHeading title="Deployed Systems" subtitle="03 / Case Studies" />
          <div className="space-y-8">
            {[
              {
                title: "Automated Lead Qualification Agent",
                problem: "Client was spending 20 hours/week manually filtering email leads.",
                solution: "Built an n8n workflow that parses emails, uses GPT-4 to score leads based on criteria, enriches data via LinkedIn API, and syncs high-priority leads to CRM.",
                impact: "90% reduction in manual qualification time. 2x increase in conversion rate."
              },
              {
                title: "Content Repurposing Engine",
                problem: "Marketing team needed to turn webinars into blog posts, tweets, and LinkedIn articles.",
                solution: "Developed a pipeline where video upload triggers transcription (Whisper), followed by multi-format content generation (Claude 3), and draft creation in CMS.",
                impact: "Content output increased by 400% with zero extra headcount."
              }
            ].map((study, idx) => (
              <div key={idx} className="bg-[#0f0f0f] border border-slate-800 rounded-xl p-8 hover:border-slate-600 transition-colors">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-100 mb-4">{study.title}</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">The Problem</h4>
                        <p className="text-slate-400 leading-relaxed">{study.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-sky-500 uppercase tracking-wider mb-1">The Solution</h4>
                        <p className="text-slate-300 leading-relaxed">{study.solution}</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/3 bg-slate-900/50 rounded-lg p-6 flex flex-col justify-center border border-slate-800">
                    <h4 className="text-xs font-bold text-green-500 uppercase tracking-wider mb-4">Impact</h4>
                    <p className="text-3xl font-bold text-white tracking-tight">{study.impact.split('.')[0]}</p>
                    <p className="text-sm text-slate-400 mt-2">{study.impact.split('.')[1]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-20 border-t border-slate-900">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to automate the boring stuff?</h2>
          <p className="text-slate-400 mb-8">Stop trading time for money. Let's build a system that scales.</p>
          <a href="mailto:likhithb285@gmail.com" className="inline-flex items-center gap-2 px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg transition-all">
            <Terminal size={20} />
            Book a Strategy Call
          </a>
        </section>

      </main>
    </div>
  );
};

export default AIAgentsPage;
