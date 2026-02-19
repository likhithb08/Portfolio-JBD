
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, Type, LiveServerMessage, GenerateContentResponse } from '@google/genai';

// --- Utilities ---
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encodeBase64(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const AIHub: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'voice' | 'maps'>('chat');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; links?: any[] }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const liveSessionRef = useRef<any>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleChat = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash-001',
        contents: userMsg,
        config: {
          systemInstruction: `You are Likhith's Technical Portfolio Advocate. Your expertise is in Java Backend Development.

TECHNICAL DEEP-DIVE:
- Spring Boot: Explain Likhith's proficiency in Dependency Injection, REST Controller design, and Spring Security.
- Hibernate/JPA: Detail his usage of ORM for database abstraction, @Entity mapping, and @Repository interfaces in MySQL.
- JWT: Explain his implementation of stateless authentication using Bearer tokens for secure API access.
- Architecture: Focus on his clean separation of concerns (Controller-Service-Repository pattern).

RECRUITER TAILORING:
- If a recruiter asks about 'Scalability', mention his MySQL schema optimization.
- If they ask about 'Security', detail his JWT and RBAC implementation in Shadow AI.
- Keep responses concise, high-level but technically accurate. Use Markdown for clarity.`
        }
      });

      const text = response.text || "I'm ready to discuss Likhith's Java Backend expertise. What specific technology are you interested in?";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (err: any) {
      console.error("AI Chat Error:", err);
      const errorMessage = err.message || "Unknown error";
      setMessages(prev => [...prev, { role: 'model', text: `Connection error: ${errorMessage}. (Check console for details)` }]);
    } finally {
      setIsTyping(false);
    }
  };



  const playTTS = async (text: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } }
        }
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const ctx = audioContextRef.current;
        const buffer = await decodeAudioData(decodeBase64(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start();
      }
    } catch (err) {}
  };

  const toggleVoiceMode = async () => {
    if (isVoiceActive) {
      if (liveSessionRef.current) liveSessionRef.current.close?.();
      setIsVoiceActive(false);
      return;
    }

    setIsVoiceActive(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    const sources = new Set<AudioBufferSourceNode>();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const pcmBlob = { data: encodeBase64(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const buffer = await decodeAudioData(decodeBase64(audioData), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sources.add(source);
              source.onended = () => sources.delete(source);
            }
            if (msg.serverContent?.interrupted) {
              sources.forEach(s => s.stop());
              sources.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => setIsVoiceActive(false),
          onerror: () => setIsVoiceActive(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: 'Voice Assistant for Likhith. Speak about Java, Spring Boot, and REST API development fundamentals.'
        }
      });
      liveSessionRef.current = await sessionPromise;
    } catch (err) {
      setIsVoiceActive(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-sky-600 hover:bg-sky-500 text-white rounded-full shadow-2xl z-[200] flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[600px] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl z-[200] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path></svg>
              </div>
              <h3 className="text-slate-100 font-bold text-sm">Portfolio Hub</h3>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setMode('chat')} className={`p-2 rounded-md ${mode === 'chat' ? 'text-sky-400' : 'text-slate-500'}`}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button>
              {/* Maps removed */}
              <button onClick={toggleVoiceMode} className={`p-2 rounded-md ${isVoiceActive ? 'text-red-400 animate-pulse' : 'text-slate-500'}`}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path></svg></button>
            </div>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && <p className="text-slate-500 text-center text-sm py-10 italic">Inquire about Likhith's Spring Boot & MySQL architecture.</p>}
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-200 border border-slate-800'}`}>{m.text}</div>
                {m.role === 'model' && <button onClick={() => playTTS(m.text)} className="mt-1 text-[10px] text-slate-500 uppercase">Listen</button>}
              </div>
            ))}
            {isTyping && <div className="text-slate-500 text-xs px-2 animate-pulse">Analyzing codebase...</div>}
          </div>

          <div className="p-4 border-t border-slate-800">
            {isVoiceActive ? <div className="text-center text-sky-400 text-xs py-2 font-mono">Real-time interaction active...</div> : (
              <form onSubmit={(e) => { e.preventDefault(); handleChat(); }} className="flex gap-2">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Query backend tech..." className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500" />
                <button type="submit" disabled={!input.trim()} className="p-2 bg-sky-600 text-white rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AIHub;
