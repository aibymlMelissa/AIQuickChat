import React, { useState, useEffect } from 'react';
import { Volume2, Battery, Wifi, Settings, Mic, Loader2, Keyboard, X, Sparkles } from 'lucide-react';
import { playTTS, generateContextPack } from '../services/geminiService';
import { TTSStatus } from '../types';

const DeviceSimulator: React.FC = () => {
  const [phrases, setPhrases] = useState<string[]>(["I need water", "Yes", "No", "Thank you", "Bathroom", "Pain level 5"]);
  const [ttsStatus, setTtsStatus] = useState<TTSStatus>(TTSStatus.IDLE);
  const [scenarioInput, setScenarioInput] = useState("");
  const [isGeneratingPack, setIsGeneratingPack] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [customText, setCustomText] = useState("");
  const [suggestedChoices, setSuggestedChoices] = useState<string[]>([]);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [useCloudAI, setUseCloudAI] = useState(false);

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

  const handleSpeakCustomText = async () => {
    if (!customText.trim()) return;

    // Speak the custom text
    await handleSpeak(customText);

    // Generate new context pack based on what was just said
    setIsGeneratingPack(true);
    const contextPrompt = `User just said: "${customText}". Generate 6-8 relevant follow-up dialogue choices for continuing this conversation.`;
    const newPhrases = await generateContextPack(contextPrompt);
    setPhrases(newPhrases.slice(0, 8)); // Update main grid with 6-8 cards
    setIsGeneratingPack(false);

    // Clear and close keyboard
    setCustomText("");
    setSuggestedChoices([]);
    setShowKeyboard(false);
  };

  // Detect if query needs Cloud AI (complex, medical, or conversational)
  const needsCloudAI = (text: string): boolean => {
    const complexPatterns = [
      /side effect/i,
      /what (?:is|are)/i,
      /how (?:do|does|can|should)/i,
      /why/i,
      /explain/i,
      /tell me about/i,
      /drug/i,
      /medication/i,
      /privately/i,
      /talk about/i,
      /discuss/i,
      /advice/i,
      /recommend/i,
    ];
    return complexPatterns.some(pattern => pattern.test(text));
  };

  // Generate dialogue suggestions based on input
  useEffect(() => {
    const generateSuggestions = async () => {
      if (!customText.trim() || customText.length < 3) {
        setSuggestedChoices([]);
        setUseCloudAI(false);
        return;
      }

      const isComplex = needsCloudAI(customText);
      setUseCloudAI(isComplex);

      if (isComplex) {
        // For complex queries, suggest Cloud AI routing
        setIsGeneratingSuggestions(true);
        try {
          const aiSuggestions = await generateContextPack(`Patient query: "${customText}". Generate 4 relevant follow-up questions or clarifications.`);
          setSuggestedChoices(aiSuggestions.slice(0, 4));
        } catch (error) {
          setSuggestedChoices([
            "Can you tell me more?",
            "I need help with this",
            "Let me speak to someone",
            "I have a question"
          ]);
        }
        setIsGeneratingSuggestions(false);
      } else {
        // For simple queries, show local quick responses
        const localSuggestions: { [key: string]: string[] } = {
          "water": ["I need water", "Can I have water?", "I'm thirsty", "Water please"],
          "pain": ["I have pain", "It hurts", "Pain level 5", "I need pain relief"],
          "bathroom": ["I need bathroom", "Help me to bathroom", "Bathroom please", "I need to use toilet"],
          "help": ["I need help", "Can you help me?", "Help please", "I need assistance"],
          "nurse": ["Call the nurse", "I need the nurse", "Where is the nurse?", "Nurse please"],
          "tired": ["I'm tired", "I need rest", "I want to sleep", "Feeling sleepy"],
          "thank": ["Thank you", "Thanks", "I appreciate it", "Thank you very much"],
        };

        const matchedSuggestions: string[] = [];
        const lowerText = customText.toLowerCase();

        Object.keys(localSuggestions).forEach(keyword => {
          if (lowerText.includes(keyword)) {
            matchedSuggestions.push(...localSuggestions[keyword]);
          }
        });

        setSuggestedChoices(matchedSuggestions.slice(0, 4));
      }
    };

    const debounceTimer = setTimeout(generateSuggestions, 500);
    return () => clearTimeout(debounceTimer);
  }, [customText]);

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
            Simulate the "AI Suggestion Engine". Type a complicated context (e.g., "What are the side-effect of this drug", "Can I talk with you privately about the nurse taking care of me") to push a new Context Pack to the device, through Cloud AI. The simulation takes a bit longer to respond because of network latency.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={scenarioInput}
              onChange={(e) => setScenarioInput(e.target.value)}
              placeholder="e.g. What are the side effects of aspirin..."
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
                <h2 className="text-lg font-bold text-slate-800">QuickChat</h2>
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
                <button
                  onClick={() => setShowKeyboard(!showKeyboard)}
                  className="flex flex-col items-center gap-1 cursor-pointer hover:text-brand-600 transition-colors"
                  title="Open keyboard for custom text"
                >
                  <Keyboard className={`w-5 h-5 ${showKeyboard ? 'text-brand-600' : ''}`} />
                  <span className="text-xs">Type</span>
                </button>
              </div>
            </div>

            {/* Pop-out Keyboard Overlay */}
            {showKeyboard && (
              <div className="absolute inset-0 bg-slate-900/95 flex flex-col justify-end">
                <div className="bg-slate-50 p-4 rounded-t-3xl max-h-full overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-800">Type Your Message</h3>
                      {useCloudAI && (
                        <span className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          <Sparkles className="w-3 h-3" />
                          Cloud AI
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setShowKeyboard(false);
                        setSuggestedChoices([]);
                        setCustomText("");
                      }}
                      className="p-1 hover:bg-slate-200 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <textarea
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Type what you want to say..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-400 focus:outline-none resize-none text-slate-800"
                      rows={3}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSpeakCustomText();
                        }
                      }}
                    />

                    {/* Suggested Dialogue Choices */}
                    {suggestedChoices.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <span className="font-semibold">Suggested responses:</span>
                          {isGeneratingSuggestions && <Loader2 className="w-3 h-3 animate-spin" />}
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {suggestedChoices.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setCustomText(suggestion);
                              }}
                              className="text-left px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-brand-400 hover:bg-brand-50 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleSpeakCustomText}
                      disabled={!customText.trim() || ttsStatus === TTSStatus.LOADING || ttsStatus === TTSStatus.PLAYING}
                      className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Volume2 className="w-5 h-5" />
                      Speak
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 mt-3 text-center">
                    {useCloudAI ? (
                      <span className="text-purple-600 font-medium">Complex query detected - Using Cloud AI for intelligent suggestions</span>
                    ) : (
                      "For patients who cannot use voice input"
                    )}
                  </p>
                </div>
              </div>
            )}

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