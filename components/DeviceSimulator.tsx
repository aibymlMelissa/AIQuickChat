import React, { useState } from 'react';
import { Volume2, Battery, Wifi, Settings, Mic, Loader2 } from 'lucide-react';
import { playTTS, generateContextPack } from '../services/geminiService';
import { TTSStatus } from '../types';

const DeviceSimulator: React.FC = () => {
  const [phrases, setPhrases] = useState<string[]>(["I need water", "Yes", "No", "Thank you", "Bathroom", "Pain level 5"]);
  const [ttsStatus, setTtsStatus] = useState<TTSStatus>(TTSStatus.IDLE);
  const [scenarioInput, setScenarioInput] = useState("");
  const [isGeneratingPack, setIsGeneratingPack] = useState(false);

  const handleSpeak = async (text: string) => {
    if (ttsStatus === TTSStatus.LOADING || ttsStatus === TTSStatus.PLAYING) return;
    
    setTtsStatus(TTSStatus.LOADING);
    try {
      await playTTS(text);
      setTtsStatus(TTSStatus.PLAYING);
      // Reset status after a short delay to simulate "playing" state visually
      setTimeout(() => setTtsStatus(TTSStatus.IDLE), 2000);
    } catch (e) {
      setTtsStatus(TTSStatus.ERROR);
      setTimeout(() => setTtsStatus(TTSStatus.IDLE), 2000);
    }
  };

  const handleGeneratePack = async () => {
    if (!scenarioInput.trim()) return;
    setIsGeneratingPack(true);
    const newPhrases = await generateContextPack(scenarioInput);
    setPhrases(newPhrases.slice(0, 8)); // Limit to 8 for the grid
    setIsGeneratingPack(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center justify-center p-4">
      
      {/* Simulation Controls (Cloud Layer) */}
      <div className="w-full max-w-md space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Cloud AI Dashboard</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Simulate the "AI Suggestion Engine". Type a context (e.g., "At the dentist", "Ordering Pizza") to push a new Context Pack to the device.
          </p>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={scenarioInput}
              onChange={(e) => setScenarioInput(e.target.value)}
              placeholder="e.g. Post-surgery recovery..."
              className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleGeneratePack()}
            />
            <button 
              onClick={handleGeneratePack}
              disabled={isGeneratingPack}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isGeneratingPack ? <Loader2 className="w-4 h-4 animate-spin" /> : "Push"}
            </button>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
           <h4 className="font-semibold text-blue-900 mb-2">Technical Highlight</h4>
           <p className="text-sm text-blue-800">
             The device uses <strong>Piper TTS</strong> locally. In this demo, we use <strong>Gemini 2.5 Flash TTS</strong> to demonstrate the high-quality neural voice output targeted for the final build.
           </p>
        </div>
      </div>

      {/* The Physical Device Simulator */}
      <div className="relative">
        {/* Device Case */}
        <div className="w-[320px] h-[580px] bg-slate-800 rounded-[3rem] p-4 shadow-2xl ring-8 ring-slate-900/50 relative">
          
          {/* Screen */}
          <div className="w-full h-full bg-slate-900 rounded-[2.5rem] overflow-hidden flex flex-col relative border border-slate-700">
            
            {/* Status Bar */}
            <div className="h-8 bg-slate-900 flex items-center justify-between px-6 text-slate-400 text-xs font-mono border-b border-slate-800">
              <span>12:45 PM</span>
              <div className="flex gap-2">
                <Wifi className="w-3 h-3" />
                <Battery className="w-3 h-3" />
              </div>
            </div>

            {/* App UI */}
            <div className="flex-1 bg-slate-50 flex flex-col p-4">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-800">QuickSpeak</h2>
                <div className={`w-3 h-3 rounded-full ${ttsStatus === TTSStatus.PLAYING ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 gap-3 flex-1">
                {phrases.map((phrase, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSpeak(phrase)}
                    className="relative bg-white border-2 border-slate-200 rounded-xl p-4 flex items-center justify-center text-center shadow-sm active:scale-95 transition-all hover:border-brand-400 group"
                  >
                    <span className="font-semibold text-slate-700 text-lg leading-tight">{phrase}</span>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Volume2 className="w-4 h-4 text-brand-500" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Bottom Nav */}
              <div className="mt-4 pt-4 border-t border-slate-200 flex justify-around text-slate-400">
                <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-brand-600 transition-colors">
                  <div className="w-8 h-1 bg-slate-300 rounded-full mb-1"></div>
                </div>
              </div>
            </div>

            {/* Speaker Mesh Visual */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 opacity-20 pointer-events-none">
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
               ))}
            </div>
          </div>

          {/* Power Button */}
          <div className="absolute right-[-4px] top-24 w-1 h-12 bg-slate-700 rounded-r-md"></div>
          {/* Vol Buttons */}
          <div className="absolute left-[-4px] top-24 w-1 h-8 bg-slate-700 rounded-l-md"></div>
          <div className="absolute left-[-4px] top-36 w-1 h-8 bg-slate-700 rounded-l-md"></div>

        </div>
        
        {/* Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-[3rem] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default DeviceSimulator;