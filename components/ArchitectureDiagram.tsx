import React, { useState } from 'react';
import { Cloud, Server, Wifi, Database, Cpu, Battery, Layers } from 'lucide-react';

const ArchitectureDiagram: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'device' | 'cloud'>('device');

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-slate-200">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Hybrid Edge-Cloud Architecture</h2>
        <p className="text-slate-600">Click sections to explore the data flow.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center relative">
        
        {/* Connection Line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-center z-0">
          <div className={`h-1 w-32 ${activeLayer ? 'bg-brand-500 animate-pulse' : 'bg-slate-300'}`}></div>
          <div className="bg-white p-2 rounded-full border border-brand-200 z-10 -mt-3">
             <Wifi className={`w-5 h-5 ${activeLayer ? 'text-brand-500' : 'text-slate-400'}`} />
          </div>
        </div>

        {/* Device (Edge) Section */}
        <div 
          onClick={() => setActiveLayer('device')}
          className={`flex-1 p-6 rounded-xl border-2 transition-all cursor-pointer relative z-10 ${
            activeLayer === 'device' 
              ? 'border-brand-500 bg-brand-50 shadow-lg scale-105' 
              : 'border-slate-200 hover:border-brand-300 bg-white opacity-80'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="w-8 h-8 text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-800">The Edge (Device)</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">Raspberry Pi Zero 2 W • Offline First</p>
          
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-slate-700 bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
               <Database className="w-4 h-4 mt-0.5 text-indigo-500" />
               <span><strong>Local SQLite:</strong> Stores user phrases & logs instantly.</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700 bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
               <Server className="w-4 h-4 mt-0.5 text-indigo-500" />
               <span><strong>Piper TTS:</strong> Neural speech generation on-device. Zero latency.</span>
            </li>
             <li className="flex items-start gap-2 text-sm text-slate-700 bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
               <Battery className="w-4 h-4 mt-0.5 text-green-500" />
               <span><strong>Power Optimized:</strong> Custom DietPi OS & LiPo management.</span>
            </li>
          </ul>
        </div>

        {/* Cloud Section */}
        <div 
          onClick={() => setActiveLayer('cloud')}
          className={`flex-1 p-6 rounded-xl border-2 transition-all cursor-pointer relative z-10 ${
            activeLayer === 'cloud' 
              ? 'border-brand-500 bg-brand-50 shadow-lg scale-105' 
              : 'border-slate-200 hover:border-brand-300 bg-white opacity-80'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <Cloud className="w-8 h-8 text-sky-500" />
            <h3 className="text-xl font-bold text-slate-800">The Cloud (Backend)</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">FastAPI / Supabase • AI Processing</p>

          <ul className="space-y-3">
             <li className="flex items-start gap-2 text-sm text-slate-700 bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
               <Layers className="w-4 h-4 mt-0.5 text-sky-500" />
               <span><strong>Sync Engine:</strong> Backs up logs when Wi-Fi is available.</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700 bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
               <Server className="w-4 h-4 mt-0.5 text-purple-500" />
               <span><strong>AI Suggestion Engine:</strong> Analyzes usage to generate Context Packs.</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700 bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
               <Database className="w-4 h-4 mt-0.5 text-sky-500" />
               <span><strong>Caregiver Portal:</strong> Remote configuration management.</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default ArchitectureDiagram;