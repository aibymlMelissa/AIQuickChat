import { GoogleGenAI, Modality, Type } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Text Generation (Context Packs) ---

export const generateContextPack = async (scenario: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 6 short, useful, spoken phrases (max 5 words each) for a person with speech difficulties in this specific scenario: "${scenario}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) return ["Hello", "Yes", "No", "Help", "Thanks", "Goodbye"];
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error generating context pack:", error);
    return ["Hello", "Yes", "No", "Help", "Thanks", "Goodbye"];
  }
};

// --- TTS Generation ---

// Helper to decode base64
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper to decode audio data for Web Audio API
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1
): Promise<AudioBuffer> {
  // Create an empty buffer if decoding fails or use native decodeAudioData if format supports it.
  // Since Gemini sends raw PCM (no header), we MUST manually put it into a buffer.
  // The model output is raw PCM 16-bit signed integer, typically 24kHz.
  
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      // Normalize Int16 to Float32 [-1.0, 1.0]
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const playTTS = async (text: string): Promise<void> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Fenrir' }, // Deep, calm voice suitable for assistive device
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      throw new Error("No audio data received");
    }

    const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const outputNode = outputAudioContext.createGain();
    outputNode.connect(outputAudioContext.destination);

    const audioBytes = decode(base64Audio);
    const audioBuffer = await decodeAudioData(audioBytes, outputAudioContext, 24000, 1);

    const source = outputAudioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(outputNode);
    source.start();

  } catch (error) {
    console.error("TTS Error:", error);
    // Fallback to browser TTS if API fails/unavailable
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
};