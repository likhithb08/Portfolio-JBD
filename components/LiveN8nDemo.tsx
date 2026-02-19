
import React, { useState, useEffect, useRef } from 'react';
import { Send, Cpu, Bot, User, Loader2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WEBHOOK_URL = "https://ectogenetic-cruelly-crystle.ngrok-free.dev/webhook/bankeasy-ai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const LiveN8nDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    
    // Add user message
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage, 
      timestamp: new Date() 
    }]);
    
    setIsLoading(true);

    try {
      // Send both common keys to be safe
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          chatInput: userMessage,
          message: userMessage
        })
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      
      // Determine output text from common n8n response patterns
      let botResponse = "Workflow Executed Successfully.";
      if (typeof data === 'string') botResponse = data;
      else if (data.output) botResponse = data.output;
      else if (data.text) botResponse = data.text;
      else if (data.message) botResponse = data.message;
      else if (Array.isArray(data) && data.length > 0 && data[0].output) botResponse = data[0].output;
      else botResponse = JSON.stringify(data, null, 2);

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: botResponse, 
        timestamp: new Date() 
      }]);

    } catch (err) {
      console.error("Webhook Error:", err);
      setError("Failed to connect to the agent. Ensure the n8n tunnel is active.");
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "⚠️ Connection Failed. The AI Agent might be offline or the ngrok tunnel expired.", 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[360px] mx-auto bg-[#050505] border-[6px] border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col h-[700px] relative">
      
      {/* Mobile Notch/Status Bar */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-slate-900 z-20 flex justify-center">
        <div className="w-32 h-5 bg-black rounded-b-xl"></div>
      </div>
      
      {/* Header */}
      <div className="bg-slate-900/50 pt-10 pb-4 px-4 border-b border-slate-800 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-slate-200 font-mono text-xs uppercase tracking-wider">BankEasY AI</span>
        </div>
        <div className="flex gap-1 text-[10px] text-slate-500 font-mono">
          <span>5G</span>
          <span className="text-green-500">IIII</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#050505] to-[#0a0a0a] relative z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4 opacity-50">
            <Bot size={48} />
            <p className="font-mono text-sm">Start the conversation to trigger the workflow...</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={idx} 
            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-800 text-slate-300' : 'bg-sky-900/20 text-sky-400 border border-sky-800/30'}`}>
              {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            
            <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-slate-800 text-slate-200 rounded-tr-sm' 
                : 'bg-[#0f0f0f] border border-slate-800 text-slate-300 rounded-tl-sm shadow-lg'
            }`}>
              {msg.content.split('\n').map((line, i) => (
                <p key={i} className="mb-1 last:mb-0">{line}</p>
              ))}
              <div className="mt-2 text-[10px] opacity-40 uppercase font-mono tracking-widest text-right">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-sky-900/20 text-sky-400 border border-sky-800/30 flex items-center justify-center shrink-0">
              <Bot size={20} />
            </div>
            <div className="bg-[#0f0f0f] border border-slate-800 rounded-2xl rounded-tl-sm p-4 flex items-center gap-3">
              <Loader2 size={16} className="animate-spin text-sky-500" />
              <span className="text-slate-500 text-xs font-mono animate-pulse">Processing via n8n webhook...</span>
            </div>
          </motion.div>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-[#0a0a0a] border-t border-slate-800 mb-2">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI..."
            className="flex-1 bg-[#111] border border-slate-700 rounded-full px-4 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-white w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </form>
        <div className="text-center mt-2">
           <span className="text-[9px] text-slate-600 font-mono">
             Powered by n8n
           </span>
        </div>
      </div>

    </div>
  );
};

export default LiveN8nDemo;
