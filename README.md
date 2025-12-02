# AI QuickSpeak

An interactive pitch deck for a hybrid edge-cloud AAC (Augmentative and Alternative Communication) device. Experience the vision through a fully functional web prototype powered by Google Gemini AI.

## Overview

AI QuickSpeak is a next-generation assistive communication device designed for individuals with speech difficulties. The system combines **offline-first reliability** with **cloud-powered intelligence** to provide instant, context-aware communication support.

This repository contains a web-based interactive pitch deck that demonstrates:
- Real-time device simulation with functional TTS
- Interactive architecture diagrams
- System flow visualization with data tracing
- AI-powered context pack generation

## Key Features

### 🎯 Core Concept
- **Hybrid Edge-Cloud Architecture**: Critical functions run offline; intelligence syncs in background
- **Zero-Latency Speech**: Local neural TTS ensures communication never fails
- **Context-Aware AI**: Predictive phrase suggestions based on time, location, and usage patterns
- **Offline First**: Full functionality without internet connectivity

### 💻 Interactive Pitch Deck
- **Live Device Simulator**: Virtual QuickSpeak device with functional TTS
- **Cloud AI Dashboard**: Generate custom context packs using Gemini AI
- **Architecture Diagram**: Interactive visualization of edge-cloud split
- **System Flow Diagram**: Click-to-trace data flow from user input to audio output
- **Technical Specifications**: Detailed component breakdown

## Tech Stack

### Frontend
- **React** 19.2.0 - Modern UI framework
- **TypeScript** 5.8.2 - Type-safe development
- **Vite** 6.2.0 - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling (via CDN)
- **Lucide React** 0.555.0 - Icon components

### AI & APIs
- **@google/genai** 1.30.0 - Google Generative AI SDK
- **Gemini 2.5 Flash** - Context pack generation (LLM)
- **Gemini 2.5 Flash TTS** - Neural text-to-speech synthesis
- **Web Audio API** - PCM audio decoding and playback

### Build & Development
- **Node.js** v16+ recommended
- **ES2022** target compilation

## Project Structure

```
AIQuickChat/
├── components/                     # React UI Components
│   ├── ArchitectureDiagram.tsx     # Interactive edge-cloud architecture visualization
│   ├── DeviceSimulator.tsx         # Virtual QuickSpeak device with TTS
│   └── SystemFlowDiagram.tsx       # Interactive system flow with node tracing
│
├── services/                       # Business Logic & API Integration
│   └── geminiService.ts            # Gemini AI integration (TTS + context generation)
│
├── App.tsx                         # Main application component
├── index.tsx                       # React DOM entry point
├── index.html                      # HTML template
├── types.ts                        # TypeScript type definitions
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript compiler settings
├── package.json                    # Dependencies and scripts
└── metadata.json                   # App metadata

Public/
├── Image/                          # Screenshots and promotional images
└── Video/                          # Demo videos
```

## Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **Google Gemini API Key** - [Get one here](https://aistudio.google.com/apikey)
- **Modern browser** with Web Audio API support

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aibymlMelissa/AIQuickChat.git
   cd AIQuickChat
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the project root:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   ```
   http://localhost:3000
   ```

## Interactive Pitch Deck Guide

### 1. Hero Section
**"The Voice for Everyone. Offline First. AI Powered."**

Introduces the vision and three core pillars:
- **Open Source Core**: Built on Raspberry Pi Zero 2 W
- **Offline Reliability**: Local neural TTS for zero-latency speech
- **Context Aware**: AI-powered predictive phrase suggestions

### 2. Architecture Diagram
Interactive visualization of the hybrid edge-cloud system:

- **Click "Device (Edge)"** to see offline components:
  - UI Application (Python/Kivy)
  - Local SQLite database
  - Piper neural TTS engine
  - I2S audio hardware

- **Click "Cloud (Background)"** to see cloud services:
  - Supabase/FastAPI backend
  - AI suggestion engine
  - Caregiver dashboard
  - Usage analytics

### 3. System Flow Diagram
**Click any node to trace the complete data flow:**

**Device (Edge) Flow:**
1. **User** → Taps phrase button on touchscreen
2. **UI Application** → Queries local database for phrase text
3. **Predictive Logic** → N-gram model adjusts button order
4. **Local TTS Engine** → Piper converts text to PCM audio
5. **Hardware Output** → I2S DAC drives speaker

**Cloud (Background) Flow:**
6. **Caregiver Dashboard** → Family/doctors update phrases remotely
7. **Cloud Backend** → Syncs config and voice packs (when online)
8. **AI Model** → LLM analyzes usage logs to generate context packs

### 4. Live Device Simulator

**Try the functional prototype:**

**Virtual Device Features:**
- 3.5" touchscreen interface simulation
- Grid of 8 phrase buttons
- Status bar with WiFi and battery indicators
- Real-time TTS playback

**Cloud AI Dashboard:**
1. Enter a scenario (e.g., "At the dentist", "Ordering pizza")
2. Click "Push" to generate context-aware phrases
3. Watch as the device updates with new suggestions
4. Click any phrase button to hear it spoken aloud

**Technical Implementation:**
- Uses **Gemini 2.5 Flash** for context pack generation
- Uses **Gemini 2.5 Flash TTS** with "Fenrir" voice (deep, calm tone)
- Raw PCM audio decoded via Web Audio API
- Fallback to browser TTS if API fails

### 5. Technical Specifications

Detailed hardware and software specs:

| Component | Specification |
|-----------|--------------|
| **SBC** | Raspberry Pi Zero 2 W (Quad-core 1GHz, 512MB RAM) |
| **Display** | 3.5" DPI IPS Touchscreen (640x480) |
| **Audio** | I2S Mono Amp HAT + 3W High-Fidelity Speaker |
| **OS** | DietPi Linux (Minimal footprint) |
| **App Runtime** | Python (Kivy/PyQt) with GPU Acceleration |
| **TTS Engine** | Piper (On-device Neural Text-to-Speech) |
| **Connectivity** | Wi-Fi 2.4GHz (Sync Only), BLE |
| **Backend** | FastAPI + Supabase (PostgreSQL) |
| **AI Model** | Fine-tuned Llama 3 (Cloud) / N-gram (Local) |

## Component Architecture

### App.tsx
**Main application component** - orchestrates the entire pitch deck.

**Structure:**
- Navigation bar with section links
- Hero section with feature highlights
- Architecture diagram section
- System flow diagram section
- Live device simulator section
- Technical specifications table
- Footer

**Styling:**
- Tailwind CSS utility classes
- Custom brand colors (purple/indigo gradient)
- Responsive design with mobile support
- Smooth scroll behavior

### ArchitectureDiagram.tsx
**Interactive architecture visualization component.**

**Features:**
- Click to switch between "Device" and "Cloud" layers
- Animated connection line with WiFi icon
- Visual highlighting of active layer
- Detailed component breakdowns

**Device (Edge) Components:**
- UI Application (Python/Kivy)
- Local SQLite Database
- Piper TTS Engine
- Hardware (Speaker/Display)
- Battery & Sensors

**Cloud (Background) Components:**
- Supabase/FastAPI Backend
- Caregiver Web Dashboard
- AI Suggestion Engine
- Usage Analytics

**State Management:**
```typescript
const [activeLayer, setActiveLayer] = useState<'device' | 'cloud'>('device');
```

### DeviceSimulator.tsx
**Interactive device prototype with functional TTS.**

**State Management:**
```typescript
const [phrases, setPhrases] = useState<string[]>([...]);       // Current phrase pack
const [ttsStatus, setTtsStatus] = useState<TTSStatus>(IDLE);   // TTS playback state
const [scenarioInput, setScenarioInput] = useState("");        // User scenario input
const [isGeneratingPack, setIsGeneratingPack] = useState(false); // Loading state
```

**Key Functions:**
- `handleSpeak(text)`: Plays TTS for selected phrase
  - Calls `geminiService.playTTS()`
  - Updates TTS status indicators
  - Handles loading/playing/error states

- `handleGeneratePack()`: Generates AI context pack
  - Calls `geminiService.generateContextPack()`
  - Updates phrase grid with new suggestions
  - Shows loading spinner during generation

**UI Components:**
- **Cloud AI Dashboard**: Scenario input + "Push" button
- **Virtual Device**:
  - Status bar (time, WiFi, battery)
  - 8-button phrase grid
  - Visual feedback on TTS playback
  - Physical button details (power, volume)

### SystemFlowDiagram.tsx
**Interactive system flow visualization with click-to-trace.**

**Node Configuration:**
```typescript
type NodeId = 'user' | 'ui' | 'db' | 'logic' | 'tts' | 'hw' | 'cloud' | 'caregiver' | 'ai';

const nodeConfig: Record<NodeId, NodeData> = {
  user: { label: 'User', connections: ['ui'], ... },
  ui: { label: 'UI Application', connections: ['user', 'db', 'logic', 'tts', 'cloud'], ... },
  // ... 9 nodes total
};
```

**Interactive Features:**
- Click any node to highlight it
- Connected nodes light up automatically
- Disconnected nodes fade to gray
- Animated connection lines pulse when active
- Tooltips display detailed descriptions
- "Reset View" button to clear selection

**Visual Effects:**
- Ring highlights on selected nodes
- Scale transformations on hover/select
- Color transitions for connection states
- Animated arrows for data flow
- Blur/grayscale for inactive nodes

**Layout:**
- **Column 1**: User input layer
- **Column 2**: Device (Edge) - 6 nodes in vertical flow
- **Column 3**: Cloud (Background) - 3 nodes in vertical stack

## Service Layer

### geminiService.ts
**Core AI integration service for TTS and context generation.**

#### `generateContextPack(scenario: string): Promise<string[]>`
Generates AI-powered phrase suggestions for specific scenarios.

**Parameters:**
- `scenario`: Context description (e.g., "At the hospital", "Grocery shopping")

**Process:**
1. Calls Gemini 2.5 Flash model
2. Generates 6 short phrases (max 5 words each)
3. Returns structured JSON array
4. Falls back to default phrases on error

**Model Configuration:**
```typescript
model: "gemini-2.5-flash"
responseMimeType: "application/json"
responseSchema: Type.ARRAY of Type.STRING
```

**Example Output:**
```json
[
  "I need water",
  "Yes please",
  "No thank you",
  "Call nurse",
  "Pain level 5",
  "Bathroom please"
]
```

#### `playTTS(text: string): Promise<void>`
Converts text to speech using Gemini TTS API.

**Process:**
1. Calls Gemini 2.5 Flash TTS model
2. Receives base64-encoded PCM audio data
3. Decodes audio bytes from base64
4. Creates AudioBuffer from raw PCM (24kHz, mono, 16-bit)
5. Plays through Web Audio API
6. Falls back to browser TTS on error

**Model Configuration:**
```typescript
model: "gemini-2.5-flash-preview-tts"
responseModalities: [Modality.AUDIO]
speechConfig: {
  voiceConfig: {
    prebuiltVoiceConfig: { voiceName: 'Fenrir' }
  }
}
```

**Audio Specifications:**
- Sample Rate: 24kHz
- Channels: 1 (mono)
- Format: Raw PCM 16-bit signed integer
- Encoding: Base64 in API response

**Helper Functions:**
- `decode(base64)`: Converts base64 string to Uint8Array
- `decodeAudioData()`: Converts raw PCM to AudioBuffer
  - Normalizes Int16 to Float32 [-1.0, 1.0]
  - Creates Web Audio API compatible buffer

## Types & Interfaces

### types.ts
**TypeScript type definitions for the application.**

```typescript
// Context pack structure
export interface ContextPack {
  name: string;
  phrases: string[];
}

// Device state (unused in pitch deck, but prepared for full app)
export interface DeviceState {
  batteryLevel: number;
  isOnline: boolean;
  currentPack: ContextPack;
}

// TTS playback status enum
export enum TTSStatus {
  IDLE = 'IDLE',         // Not playing
  LOADING = 'LOADING',   // Fetching audio
  PLAYING = 'PLAYING',   // Audio playback active
  ERROR = 'ERROR'        // TTS failed
}
```

## Configuration Files

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "skipLibCheck": true
  }
}
```

## Available Scripts

```bash
# Start development server on port 3000
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

## Environment Variables

Create a `.env` file in the project root:

```env
# Required: Google Gemini API Key
API_KEY=your_gemini_api_key_here
```

**Note:** The variable is called `API_KEY` (not `GEMINI_API_KEY`) as referenced in geminiService.ts:4

## Browser Compatibility

### Required Features
- ES2022+ JavaScript
- Web Audio API
- AudioContext.createBuffer()
- Base64 decoding (atob)
- Fetch API
- CSS Grid & Flexbox
- CSS Transitions & Animations

### Recommended Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## API Limits & Considerations

### Gemini API Quotas
- TTS generation may have rate limits
- Context pack generation uses text model (cheaper)
- Check your [API quota](https://aistudio.google.com/apikey) regularly
- Free tier has daily request limits

### Audio Processing
- TTS sample rate: 24kHz
- Audio format: Raw PCM 16-bit
- No MP3/WAV encoding (reduces latency)
- Fallback to browser TTS if quota exceeded

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Static Hosting
Compatible with:
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

**Build command:** `npm run build`
**Output directory:** `dist/`

**Important:** Set `API_KEY` environment variable in your hosting platform.

## Troubleshooting

### API Key Issues
```
Error: API key not found
```
**Solution:** Ensure `.env` file exists with valid `API_KEY` (not `GEMINI_API_KEY`).

### TTS Playback Fails
```
TTS Error: No audio data received
```
**Solution:**
- Check API quota at aistudio.google.com
- Browser automatically falls back to Web Speech API
- Verify browser supports Web Audio API

### Context Pack Generation Timeout
```
Error generating context pack
```
**Solution:**
- Check internet connectivity
- Verify API key is valid
- Falls back to default phrases automatically

## Project Vision

### The Problem
Existing AAC devices are:
- Expensive ($3000-8000)
- Cloud-dependent (fail without internet)
- Slow to respond (network latency)
- Not context-aware (static phrase lists)

### The Solution: AI QuickSpeak
- **Affordable**: $200-300 target cost (Raspberry Pi)
- **Offline First**: Local TTS and database
- **Instant**: Zero-latency speech generation
- **Intelligent**: AI learns from usage patterns
- **Open Source**: Hackable and customizable

### Target Users
- Individuals with ALS, cerebral palsy, stroke recovery
- Non-verbal children with autism
- Post-surgery patients (temporary speech loss)
- Elderly with speech difficulties

### Development Timeline
- **MVP**: 3 months
  - Core offline functionality
  - Basic local TTS (Piper)
  - SQLite database
  - Simple grid UI

- **Phase 2**: +3 months
  - Cloud sync backend (Supabase)
  - Caregiver dashboard
  - Basic prediction (N-gram)

- **Phase 3**: +6 months
  - AI-powered context packs (LLM)
  - Advanced predictive UI
  - Voice customization
  - BLE accessories

## Technical Highlights

### Why Raspberry Pi Zero 2 W?
- Quad-core 1GHz CPU (sufficient for Piper TTS)
- 512MB RAM (tight but manageable with DietPi)
- Built-in Wi-Fi for background sync
- Low power consumption (~500mA)
- **Cost: $15** (vs $200+ for alternatives)

### Why Piper TTS?
- Open-source neural TTS
- Runs on CPU (no GPU needed)
- 150-300ms latency (acceptable)
- 22kHz quality output
- Customizable voices
- **Offline capable**

### Why Hybrid Architecture?
- **Critical Path**: User tap → Speech (100% offline, <500ms)
- **Background Path**: AI suggestions sync when available
- Best of both worlds: reliability + intelligence

## Contributing

This is a pitch deck project, but contributions are welcome for:
- UI/UX improvements
- Additional interactive visualizations
- Performance optimizations
- Documentation enhancements

## License

This project is open source and available under the MIT License.

## Acknowledgments

- **Google Gemini** - AI-powered TTS and context generation
- **Piper TTS** - Open-source neural text-to-speech engine
- **React** - UI framework
- **Vite** - Build tool
- **Lucide** - Icon library
- **Tailwind CSS** - Styling framework

## Contact

- **GitHub Issues**: [Report bugs or suggest features](https://github.com/aibymlMelissa/AIQuickChat/issues)
- **Email**: aibyml.com@gmail.com

---

**This is an interactive pitch deck.** The actual hardware device is under development. This web prototype demonstrates the vision, architecture, and AI capabilities of the planned system.

Built with ❤️ for the AAC community.
