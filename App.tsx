import React from 'react';
import { Bot, Terminal, ShieldCheck, Zap } from 'lucide-react';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import DeviceSimulator from './components/DeviceSimulator';
import SystemFlowDiagram from './components/SystemFlowDiagram';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-brand-500 p-1.5 rounded-lg text-white">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">AI QuickSpeak</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#vision" className="hover:text-brand-600 transition-colors">Vision</a>
            <a href="#architecture" className="hover:text-brand-600 transition-colors">Architecture</a>
            <a href="#demo" className="hover:text-brand-600 transition-colors">Demo</a>
            <a href="#specs" className="hover:text-brand-600 transition-colors">Specs</a>
          </div>
          <a href="#flow" className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-brand-500/20">
            System Flow Diagram
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="vision" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-sm font-medium border border-brand-100 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            MVP Timeline: 3 Months
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            The Voice for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-indigo-600">Everyone</span>.
            <br/>Offline First. AI Powered.
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            A hybrid edge-cloud AAC device designed for reliability and intelligence. Instant local speech generation meets cloud-based predictive AI.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { 
              icon: <Terminal className="w-6 h-6 text-indigo-500" />, 
              title: "Open Source Core", 
              desc: "Built on Raspberry Pi Zero 2 W & Python for rapid iteration and low cost." 
            },
            { 
              icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />, 
              title: "Offline Reliability", 
              desc: "Zero-latency local neural TTS ensures communication never fails." 
            },
            { 
              icon: <Bot className="w-6 h-6 text-brand-500" />, 
              title: "Context Aware", 
              desc: "AI suggests relevant phrases based on location, time, and usage history." 
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Interactive Diagram */}
      <section id="architecture" className="py-20 bg-slate-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ArchitectureDiagram />
        </div>
      </section>

      {/* System Flow Diagram (New Section) */}
      <section id="flow" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <SystemFlowDiagram />
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Experience the Prototype</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Interact with the virtual QuickSpeak device. Test the cloud-to-device synchronization by pushing new context packs using the AI dashboard.
            </p>
          </div>
          <DeviceSimulator />
        </div>
      </section>

      {/* Technical Specs Table */}
      <section id="specs" className="py-20 bg-slate-900 text-slate-300">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-yellow-400 mb-10 text-center">Technical Specifications</h2>
          <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800 text-yellow-500">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Component</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider">Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ["SBC", "Raspberry Pi Zero 2 W (Quad-core 1GHz, 512MB RAM)"],
                  ["Display", "3.5\" DPI IPS Touchscreen (640x480)"],
                  ["Audio", "I2S Mono Amp HAT + 3W High-Fidelity Speaker"],
                  ["OS", "DietPi Linux (Minimal footprint)"],
                  ["App Runtime", "Python (Kivy/PyQt) with GPU Acceleration"],
                  ["TTS Engine", "Piper (On-device Neural Text-to-Speech)"],
                  ["Connectivity", "Wi-Fi 2.4GHz (Sync Only), BLE"],
                  ["Backend", "FastAPI + Supabase (PostgreSQL)"],
                  ["AI Model", "Fine-tuned Llama 3 (Cloud) / N-gram (Local)"],
                ].map(([comp, spec], i) => (
                  <tr key={i} className="hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-yellow-400">{comp}</td>
                    <td className="px-6 py-4 text-yellow-200">{spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-500 py-12 text-center text-sm">
        <p>&copy; 2024 AI QuickSpeak Project. Confidential Proposal.</p>
      </footer>
    </div>
  );
};

export default App;