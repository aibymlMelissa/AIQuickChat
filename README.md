# AIQuickChat - AI Video Generator

Transform static images into dynamic animated videos using Google's Gemini Veo AI model.

![AI Video Generator](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## Overview

AIQuickChat is a React-based web application that brings static images to life using Google's advanced Gemini Veo AI model. Upload an image, describe your desired animation, and generate professional-quality videos in seconds.

## Features

- **AI-Powered Video Generation**: Utilizes Google Gemini's Veo 3.1 Fast model for high-quality video creation
- **Smart Prompt Suggestions**: AI-powered prompt recommendations based on uploaded images
- **Image Upload**: Drag-and-drop support with real-time preview (up to 10MB)
- **Multiple Aspect Ratios**: 16:9 (landscape) and 9:16 (portrait) support
- **720p Output**: High-quality video generation at 720p resolution
- **Google Drive Integration**: OAuth 2.0 authentication for seamless Drive uploads with shareable links
- **Download Videos**: Save generated videos locally
- **Real-time Progress**: Dynamic loading messages during video generation
- **Modern UI**: Responsive design with Tailwind CSS and video backgrounds
- **AI Studio Integration**: Seamless API key management via Google AI Studio

## Tech Stack

### Core Technologies
- **React** 19.2.0 - Modern UI framework
- **TypeScript** 5.8.2 - Type-safe development
- **Vite** 6.2.0 - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling (via CDN)

### AI & APIs
- **@google/genai** 1.29.1 - Google Generative AI SDK
- **Gemini Veo 3.1** - Video generation model
- **Gemini 2.5 Flash** - Prompt suggestion model
- **Google Drive API** - File storage and sharing
- **Google Identity Services** - OAuth 2.0 authentication

### Build & Development
- **Node.js** v16+ recommended
- **ES2022** target compilation
- **Vercel** deployment ready

## Project Structure

```
AIQuickChat/
├── components/                  # React UI Components
│   ├── ApiKeySelector.tsx       # Google AI API key selection interface
│   ├── LoadingIndicator.tsx     # Animated loading states with dynamic messages
│   └── VideoGeneratorForm.tsx   # Main form: upload, prompt, aspect ratio
│
├── services/                    # Business Logic & API Integration
│   ├── geminiService.ts         # Gemini Veo video generation & prompt suggestions
│   └── googleDriveService.ts    # OAuth 2.0 and Drive file upload
│
├── utils/                       # Helper Utilities
│   └── fileUtils.ts             # File conversion and base64 encoding
│
├── Public/                      # Static Assets
│   ├── Image/                   # Sample screenshots and promotional images
│   └── Video/                   # Sample generated video examples
│
├── App.tsx                      # Main application component (root)
├── index.tsx                    # React DOM entry point
├── index.html                   # HTML template with CDN scripts
├── types.ts                     # Global TypeScript type definitions
├── vite.config.ts              # Vite build configuration
├── tsconfig.json               # TypeScript compiler configuration
├── package.json                # Dependencies and scripts
└── metadata.json               # App metadata for Google AI Studio
```

## Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **Google Gemini API Key** - [Get one here](https://aistudio.google.com/apikey)
- **Modern browser** with ES2020+ support

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
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   ```
   http://localhost:3000
   ```

## Usage Guide

### Basic Workflow

1. **API Key Selection**
   - On first launch, the app checks for API key availability
   - Use AI Studio's key selector or environment variable
   - API key is validated before proceeding

2. **Upload Image**
   - Click "Choose Image" or drag and drop
   - Supported formats: PNG, JPG, WEBP
   - Maximum file size: 10MB
   - Preview appears immediately after selection

3. **Get AI Prompt Suggestions** (Optional)
   - Click "Suggest Prompts" for AI-generated animation ideas
   - Powered by Gemini 2.5 Flash model
   - Context-aware suggestions based on image content

4. **Choose Aspect Ratio**
   - **16:9** - Landscape/widescreen format
   - **9:16** - Portrait/mobile format

5. **Write Animation Prompt**
   - Describe desired motion and effects
   - Example: "gentle camera pan from left to right with subtle parallax effect"
   - Example: "slow zoom in with soft bokeh and dreamy atmosphere"

6. **Generate Video**
   - Click "Generate Video"
   - Processing time: typically 30-120 seconds
   - Real-time loading messages show progress
   - Polling occurs every 5 seconds for completion

7. **Download or Share**
   - **Download**: Save video to local device
   - **Share to Drive**: Upload with OAuth 2.0, get shareable link

## Component Architecture

### App.tsx
**Main application component** that orchestrates the entire user experience.

**Key Responsibilities:**
- API key status management
- Video generation state handling
- Component rendering logic
- Video blob URL lifecycle management

**State Management:**
- `apiKeySelected`: Boolean for API key availability
- `isGenerating`: Video generation status
- `videoUrl`: Blob URL for generated video
- `loadingMessage`: Dynamic progress messages
- `error`: Error state handling
- `isSharing`: Google Drive upload status

### ApiKeySelector.tsx
**API key selection interface** for Google AI Studio integration.

**Features:**
- Checks `window.aistudio.hasSelectedApiKey()`
- Opens AI Studio key selector dialog
- Displays billing information
- Environment variable fallback support

**Props:**
- `onApiKeySelected`: Callback when key is selected
- `error`: Optional error message display

### VideoGeneratorForm.tsx
**Main form component** for image upload and video generation.

**Features:**
- Image upload with validation
- Real-time image preview
- Aspect ratio selection (16:9, 9:16)
- Prompt textarea with suggestions
- AI-powered prompt generation
- Form validation and error handling

**State:**
- `file`: Uploaded image file
- `preview`: Base64 preview URL
- `prompt`: User-provided animation description
- `aspectRatio`: Selected video format
- `suggestions`: AI-generated prompt ideas
- `isLoadingSuggestions`: Suggestion loading state

### LoadingIndicator.tsx
**Progress display component** during video generation.

**Features:**
- Animated spinner
- Dynamic loading messages
- User-friendly waiting state
- Smooth transitions

**Props:**
- `message`: Current loading message text

## Service Layer

### geminiService.ts
**Core AI integration service** for video generation.

#### `generateVideo()`
Generates video from image and prompt using Gemini Veo model.

**Parameters:**
- `apiKey`: Google Gemini API key
- `imageData`: Base64-encoded image with MIME type
- `prompt`: Animation description
- `aspectRatio`: Video format (16:9 or 9:16)
- `setLoadingMessage`: Callback for progress updates

**Process:**
1. Initialize Gemini client with API key
2. Upload image and prompt to Veo 3.1 Fast model
3. Poll every 5 seconds for completion
4. Update loading messages dynamically
5. Return blob URL for video playback

**Model Configuration:**
- Model: `veo-3.1-fast-generate-preview`
- Resolution: 720p
- Polling interval: 5 seconds

#### `suggestPrompts()`
Generates AI-powered prompt suggestions based on uploaded image.

**Parameters:**
- `apiKey`: Google Gemini API key
- `imageData`: Base64-encoded image with MIME type

**Process:**
1. Analyzes image content with Gemini 2.5 Flash
2. Generates contextually relevant animation ideas
3. Returns structured JSON with prompt suggestions

**Model Configuration:**
- Model: `gemini-2.5-flash`
- Output: Structured JSON format
- Context: Image analysis for relevant suggestions

### googleDriveService.ts
**Google Drive integration service** for OAuth and file uploads.

#### `uploadToDrive()`
Uploads video blob to Google Drive with OAuth 2.0.

**Process:**
1. Requests OAuth token via Google Identity Services
2. Fetches blob data from URL
3. Creates multipart form data
4. Uploads to Drive API v3
5. Sets file permissions (anyone with link)
6. Returns shareable webViewLink

**Configuration:**
- Client ID: Configured in app
- Scope: `https://www.googleapis.com/auth/drive.file`
- Permissions: Editable by anyone with link

### fileUtils.ts
**File handling utilities** for image processing.

#### `fileToGenerativePart()`
Converts File object to base64 format for Gemini API.

**Process:**
1. Reads file as ArrayBuffer
2. Converts to base64 encoding
3. Extracts MIME type
4. Returns structured object

**Return Format:**
```typescript
{
  data: string;      // base64-encoded file
  mimeType: string;  // e.g., "image/jpeg"
}
```

## Configuration Files

### vite.config.ts
**Vite build tool configuration**

```typescript
{
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  define: {
    'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY)
  }
}
```

### tsconfig.json
**TypeScript compiler configuration**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "jsx": "react-jsx",
    "paths": { "@/*": ["./*"] }
  }
}
```

### metadata.json
**Google AI Studio app metadata**

```json
{
  "name": "AI Video Generator",
  "description": "Uses Gemini's Veo model for video generation"
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
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Can be set via AI Studio interface instead
```

## Deployment

### Google AI Studio
This app is optimized for [Google AI Studio](https://ai.studio/). The metadata.json and window.aistudio integration provide seamless deployment.

### Vercel
Already configured with `.vercel/project.json`:
```bash
vercel --prod
```

### Other Platforms
Compatible with any static hosting service:
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

**Build command:** `npm run build`
**Output directory:** `dist/`

## Browser Compatibility

### Required Features
- ES2022+ JavaScript
- File API
- Blob API
- URL.createObjectURL()
- Video playback (H.264/VP9)
- OAuth 2.0 popup flow
- Async/Await
- Fetch API

### Recommended Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## API Limits & Considerations

### Gemini API Quotas
- Video generation may have rate limits
- Check your [API quota](https://aistudio.google.com/apikey) regularly
- Free tier has usage restrictions

### File Size Limits
- Image upload: 10MB maximum
- Supported formats: PNG, JPG, WEBP
- Generated video size varies by length and quality

### Video Generation Time
- Typical processing: 30-120 seconds
- Depends on prompt complexity and server load
- Polling interval: 5 seconds

## Troubleshooting

### API Key Issues
```
Error: API key not found
```
**Solution:** Ensure `.env` file exists with valid `GEMINI_API_KEY` or use AI Studio key selector.

### Image Upload Fails
```
Error: File too large
```
**Solution:** Compress image to under 10MB or use a different image.

### Video Generation Timeout
```
Error: Generation timed out
```
**Solution:** Try a simpler prompt or retry. Check API quota status.

### Google Drive Upload Fails
```
Error: OAuth failed
```
**Solution:** Enable popups for the site and ensure you're signed into Google account.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- **Google Gemini Veo** - Advanced video generation AI model
- **Google AI Studio** - Development and deployment platform
- **React** - UI framework by Meta
- **Vite** - Next-generation build tool
- **Tailwind CSS** - Utility-first CSS framework

## Support

- **Issues**: [GitHub Issues](https://github.com/aibymlMelissa/AIQuickChat/issues)
- **Email**: aibyml.com@gmail.com
- **Documentation**: [Google Gemini API Docs](https://ai.google.dev/)

---

Built with ❤️ using Google Gemini AI
