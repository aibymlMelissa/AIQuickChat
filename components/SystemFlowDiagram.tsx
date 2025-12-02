import React, { useState } from 'react';
import { 
  Touchpad, 
  Smartphone, 
  Database, 
  Cpu, 
  Speaker, 
  Cloud, 
  Globe, 
  Brain, 
  ArrowRight, 
  ArrowDown, 
  RefreshCw,
  Zap,
  Info,
  X,
  Wifi
} from 'lucide-react';

type NodeId = 'user' | 'ui' | 'db' | 'logic' | 'tts' | 'hw' | 'cloud' | 'caregiver' | 'ai';

interface NodeData {
  id: NodeId;
  label: string;
  description: string;
  connections: NodeId[];
}

const nodeConfig: Record<NodeId, NodeData> = {
  user: { 
    id: 'user', 
    label: 'User', 
    description: 'Initiates interaction via touch. The starting point of the flow.', 
    connections: ['ui'] 
  },
  ui: { 
    id: 'ui', 
    label: 'UI Application', 
    description: 'Central controller (Python/Kivy). Handles input, queries data, and orchestrates TTS.', 
    connections: ['user', 'db', 'logic', 'tts', 'cloud'] 
  },
  db: { 
    id: 'db', 
    label: 'Local DB', 
    description: 'SQLite database storing phrases, user logs, and configuration offline.', 
    connections: ['ui'] 
  },
  logic: { 
    id: 'logic', 
    label: 'Predictive Logic', 
    description: 'N-gram model that reorders phrase buttons based on time/frequency.', 
    connections: ['ui'] 
  },
  tts: { 
    id: 'tts', 
    label: 'Local TTS Engine', 
    description: 'Piper Neural TTS running on-device. Converts text to PCM audio stream.', 
    connections: ['ui', 'hw'] 
  },
  hw: { 
    id: 'hw', 
    label: 'Hardware Output', 
    description: 'I2S DAC & Amplifier driving the loudspeaker for audio output.', 
    connections: ['tts'] 
  },
  cloud: { 
    id: 'cloud', 
    label: 'Cloud Backend', 
    description: 'Supabase/FastAPI. Syncs logs, manages auth, and distributes updates.', 
    connections: ['ui', 'caregiver', 'ai'] 
  },
  caregiver: { 
    id: 'caregiver', 
    label: 'Caregiver Dashboard', 
    description: 'Web interface for family/doctors to edit phrases remotely.', 
    connections: ['cloud'] 
  },
  ai: { 
    id: 'ai', 
    label: 'AI Model', 
    description: 'LLM (Llama 3) that analyzes usage logs to generate new Context Packs.', 
    connections: ['cloud'] 
  }
};

const SystemFlowDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<NodeId | null>(null);

  const handleNodeClick = (id: NodeId) => {
    if (activeNode === id) {
      setActiveNode(null);
    } else {
      setActiveNode(id);
    }
  };

  const getNodeState = (id: NodeId) => {
    if (!activeNode) return 'default';
    if (activeNode === id) return 'selected';
    if (nodeConfig[activeNode].connections.includes(id)) return 'connected';
    return 'dimmed';
  };

  const isFlowActive = (id1: NodeId, id2: NodeId) => {
    if (!activeNode) return false;
    return (activeNode === id1 && nodeConfig[id1].connections.includes(id2)) ||
           (activeNode === id2 && nodeConfig[id2].connections.includes(id1));
  };

  const getStyle = (id: NodeId, baseClasses: string) => {
    const state = getNodeState(id);
    let stateClasses = 'transition-all duration-300 cursor-pointer ';
    
    switch (state) {
      case 'selected':
        stateClasses += 'ring-4 ring-brand-500/30 scale-105 shadow-xl z-20 bg-brand-50 border-brand-500 opacity-100';
        break;
      case 'connected':
        stateClasses += 'ring-2 ring-indigo-500/20 shadow-md scale-100 opacity-100 border-indigo-300 bg-white';
        break;
      case 'dimmed':
        stateClasses += 'opacity-30 blur-[1px] grayscale scale-95 border-slate-200 bg-slate-50';
        break;
      default:
        stateClasses += 'hover:border-brand-300 hover:shadow-md opacity-100 bg-white';
    }
    return `${baseClasses} ${stateClasses}`;
  };

  const getConnectorStyle = (id1: NodeId, id2: NodeId, type: 'border' | 'text' = 'border') => {
    const active = isFlowActive(id1, id2);
    if (type === 'border') {
      return active 
        ? 'border-brand-500 border-solid animate-pulse opacity-100' 
        : 'border-slate-300 border-dashed opacity-50';
    }
    return active ? 'text-brand-500 animate-pulse scale-110' : 'text-slate-300';
  };

  const Tooltip = ({ id }: { id: NodeId }) => {
    if (activeNode !== id) return null;
    return (
      <div className="absolute left-1/2 -translate-x-1/2 -top-24 w-64 bg-slate-800 text-white text-xs p-3 rounded-lg shadow-xl z-50 pointer-events-none animate-float">
        <div className="font-bold text-brand-300 mb-1 flex items-center gap-2">
          <Info size={12} />
          {nodeConfig[id].label}
        </div>
        <p className="leading-relaxed">{nodeConfig[id].description}</p>
        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rotate-45"></div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-slate-200 select-none relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
      >
        <source src="/Public/Video/AQuickChat_2.mp4" type="video/mp4" />
      </video>

      {/* Content overlay */}
      <div className="relative z-10">
        <div className="text-center mb-10 min-h-[100px] flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">System Flow Diagram</h2>
          <p className="text-slate-600 mb-2">Click any node to trace the data flow.</p>
        
        {/* Reset View Button - Only visible when activeNode is set */}
        <div className={`transition-all duration-300 ease-out overflow-hidden ${activeNode ? 'max-h-16 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
          <button 
            onClick={() => setActiveNode(null)}
            className="px-6 py-2 bg-slate-900 hover:bg-slate-800 hover:scale-105 active:scale-95 text-white rounded-full text-sm font-semibold inline-flex items-center gap-2 transition-all shadow-lg ring-4 ring-slate-100"
          >
            <X size={16} /> Reset View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        
        {/* COLUMN 1: USER ACTION */}
        <div className="lg:col-span-2 flex flex-col items-center justify-start pt-14">
           <div 
             onClick={() => handleNodeClick('user')}
             className={getStyle('user', "border-2 p-4 rounded-xl text-center z-10 w-full relative group")}
           >
              <Tooltip id="user" />
              <div className="font-bold text-slate-700 mb-2">[ USER ]</div>
              <Touchpad className={`w-8 h-8 mx-auto mb-2 ${activeNode === 'user' ? 'text-brand-600' : 'text-brand-500'}`} />
              <div className="text-xs text-slate-500 font-mono font-bold">(1) Tap Button</div>
           </div>
           
           <div className={`hidden lg:block h-24 border-l-2 my-2 transition-all duration-500 ${getConnectorStyle('user', 'ui')}`}></div>
           <ArrowRight className={`lg:hidden w-6 h-6 my-2 rotate-90 transition-colors ${getConnectorStyle('user', 'ui', 'text')}`} />
        </div>

        {/* COLUMN 2: DEVICE (EDGE) - Spans wider */}
        <div className={`lg:col-span-6 bg-slate-50 rounded-3xl border-2 p-6 relative transition-colors duration-500 ${activeNode ? 'border-slate-100' : 'border-slate-200'}`}>
            <div className="absolute -top-3 left-6 bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
                Device (Edge / Offline)
            </div>

            {/* UI Application Node */}
            <div 
              onClick={() => handleNodeClick('ui')}
              className={getStyle('ui', "border-2 border-brand-200 p-4 rounded-xl mb-8 relative")}
            >
                <Tooltip id="ui" />
                <div className="flex items-center gap-3">
                    <Smartphone className="w-6 h-6 text-brand-600" />
                    <div>
                        <div className="font-bold text-slate-800">UI Application</div>
                        <div className="text-xs text-slate-500">Python / Kivy</div>
                    </div>
                </div>
                
                {/* Arrow from User */}
                <div className="hidden lg:flex absolute top-1/2 -left-10 w-10 items-center">
                    <div className={`h-0.5 w-full transition-all duration-500 ${isFlowActive('user', 'ui') ? 'bg-brand-500' : 'bg-slate-300'}`}></div>
                    <ArrowRight className={`w-4 h-4 -ml-2 transition-colors ${getConnectorStyle('user', 'ui', 'text')}`} />
                </div>

                {/* Arrow to Cloud (Right Side) */}
                <div className="hidden lg:flex absolute top-1/2 -right-8 w-8 items-center justify-end">
                    <div className={`h-0.5 w-full transition-all duration-500 ${isFlowActive('ui', 'cloud') ? 'bg-brand-500 animate-pulse' : 'bg-slate-300 opacity-50'}`}></div>
                    <Wifi className={`w-4 h-4 ml-1 ${isFlowActive('ui', 'cloud') ? 'text-brand-500 animate-pulse' : 'text-slate-300'}`} />
                </div>
            </div>

            {/* Connector UI -> DB/Logic */}
            <div className="flex justify-center -mt-8 mb-2 h-8 relative">
                <div className={`border-l-2 h-full transition-all duration-500 ${isFlowActive('ui', 'db') || isFlowActive('ui', 'logic') ? 'border-brand-500 border-solid animate-pulse' : 'border-slate-300 border-dashed'}`}></div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                {/* Local DB */}
                <div 
                  onClick={() => handleNodeClick('db')}
                  className={getStyle('db', "flex-1 border border-slate-200 p-3 rounded-xl flex items-center gap-3 relative")}
                >
                    <Tooltip id="db" />
                    <Database className="w-5 h-5 text-indigo-500" />
                    <div>
                        <div className="font-bold text-sm text-slate-700">Local DB</div>
                        <div className="text-[10px] text-slate-500">(2) Query Phrase</div>
                    </div>
                </div>
                 {/* Predictive Logic */}
                <div 
                  onClick={() => handleNodeClick('logic')}
                  className={getStyle('logic', "flex-1 border border-slate-200 p-3 rounded-xl flex items-center gap-3 relative")}
                >
                    <Tooltip id="logic" />
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <div>
                        <div className="font-bold text-sm text-slate-700">Predictive</div>
                        <div className="text-[10px] text-slate-500">Context Logic</div>
                    </div>
                </div>
            </div>
            
            {/* Arrows for logic -> TTS */}
            <div className="flex justify-center -mt-6 mb-6">
                <ArrowDown className={`w-5 h-5 transition-colors duration-500 ${getConnectorStyle('ui', 'tts', 'text')}`} />
            </div>

            {/* TTS Engine */}
            <div 
              onClick={() => handleNodeClick('tts')}
              className={getStyle('tts', "border-2 border-indigo-100 p-4 rounded-xl mb-6 flex items-center justify-between relative")}
            >
                <Tooltip id="tts" />
                 <div className="flex items-center gap-3">
                    <Cpu className="w-6 h-6 text-indigo-600" />
                    <div>
                        <div className="font-bold text-slate-800">Local TTS Engine</div>
                        <div className="text-xs text-slate-500">Piper Neural Model</div>
                    </div>
                </div>
                <div className="text-xs font-mono bg-indigo-50 text-indigo-600 px-2 py-1 rounded border border-indigo-100">(3) Text String</div>
            </div>

            {/* Arrow TTS -> HW */}
            <div className="flex justify-center -mt-4 mb-4">
                <ArrowDown className={`w-5 h-5 transition-colors duration-500 ${getConnectorStyle('tts', 'hw', 'text')}`} />
            </div>

            {/* Hardware Output */}
            <div 
              onClick={() => handleNodeClick('hw')}
              className={getStyle('hw', "bg-slate-800 text-white p-4 rounded-xl border border-slate-700 relative !bg-slate-800")}
            >
                {/* Override selected style for dark node */}
                {activeNode === 'hw' && (
                    <div className="absolute inset-0 ring-4 ring-brand-500/50 rounded-xl z-20 pointer-events-none"></div>
                )}
                <Tooltip id="hw" />
                <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-3">
                        <Speaker className="w-6 h-6 text-brand-400" />
                        <span className="font-bold text-white">Hardware Output</span>
                     </div>
                     <span className="text-xs text-slate-400">(4) I2S Stream</span>
                </div>
                <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden mb-1">
                    <div className={`h-full w-2/3 bg-brand-500 ${isFlowActive('tts', 'hw') ? 'animate-pulse' : ''}`}></div>
                </div>
                <div className="text-right text-[10px] text-brand-300 font-bold">(5) Sound Output</div>
            </div>
        </div>

        {/* COLUMN 3: CLOUD (ONLINE) */}
        <div className="lg:col-span-4 flex flex-col gap-6 pt-10 relative">
            
             <div className={`bg-sky-50 border-2 border-sky-100 p-6 rounded-3xl relative h-full transition-colors duration-500 ${activeNode ? 'border-slate-100' : 'border-sky-100'}`}>
                 <div className="absolute -top-3 right-6 bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
                    Cloud (Background Sync)
                </div>

                <div className="flex flex-col gap-6 h-full justify-center">
                    
                    {/* Cloud Backend */}
                    <div 
                      onClick={() => handleNodeClick('cloud')}
                      className={getStyle('cloud', "border-2 border-sky-200 p-4 rounded-xl relative")}
                    >
                        <Tooltip id="cloud" />
                        <div className="flex items-center gap-3 mb-2">
                            <Cloud className="w-6 h-6 text-sky-600" />
                            <div className="font-bold text-slate-800">Cloud Backend</div>
                        </div>
                        <div className="text-xs text-slate-500 mb-2">Supabase / FastAPI</div>
                        
                        <div className="flex items-center gap-2 text-xs text-sky-700 bg-sky-50 p-2 rounded border border-sky-100">
                            <RefreshCw className={`w-3 h-3 ${isFlowActive('ui', 'cloud') ? 'animate-spin' : ''}`} />
                            (7) Sync Config & Voices
                        </div>

                         {/* Connection to Device (Left Side) */}
                         <div className="hidden lg:flex absolute top-1/2 -left-8 w-8 items-center">
                            <div className={`h-0.5 w-full transition-all duration-500 ${isFlowActive('ui', 'cloud') ? 'bg-brand-500 animate-pulse' : 'bg-slate-300 opacity-50'}`}></div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className={`h-8 border-l-2 transition-all duration-500 ${getConnectorStyle('cloud', 'caregiver')}`}></div>
                    </div>

                    {/* Caregiver Portal */}
                    <div 
                      onClick={() => handleNodeClick('caregiver')}
                      className={getStyle('caregiver', "border border-slate-200 p-4 rounded-xl relative")}
                    >
                        <Tooltip id="caregiver" />
                        <div className="flex items-center gap-3 mb-2">
                            <Globe className="w-5 h-5 text-slate-500" />
                            <div className="font-bold text-sm text-slate-800">Caregiver Dashboard</div>
                        </div>
                        <div className="text-[10px] text-slate-500 pl-8">(6) Update Phrases</div>
                    </div>

                    <div className="flex justify-center">
                         <div className={`h-8 border-l-2 transition-all duration-500 ${getConnectorStyle('cloud', 'ai')}`}></div>
                    </div>

                    {/* AI Model */}
                    <div 
                      onClick={() => handleNodeClick('ai')}
                      className={getStyle('ai', "bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 p-4 rounded-xl relative")}
                    >
                        <Tooltip id="ai" />
                        <div className="flex items-center gap-3 mb-2">
                            <Brain className="w-6 h-6 text-purple-600" />
                            <div className="font-bold text-slate-800">AI Model (LLM)</div>
                        </div>
                        <div className="text-xs text-slate-600 leading-tight">
                            (8) AI Analysis: Generates Context Packs from usage logs.
                        </div>
                    </div>
                </div>
             </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SystemFlowDiagram;