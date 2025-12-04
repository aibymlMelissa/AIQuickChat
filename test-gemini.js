// Test Gemini API directly
import { GoogleGenAI, Type } from "@google/genai";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

console.log('Testing Gemini API...');
console.log('API Key present:', apiKey ? 'Yes (first 10 chars: ' + apiKey.substring(0, 10) + '...)' : 'No');

if (!apiKey) {
  console.error('ERROR: No API key found in environment variables!');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function testContextPack() {
  try {
    console.log('\nTesting Context Pack Generation for: "Ordering Pizza"');

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 6 short, useful, spoken phrases (max 5 words each) for a person with speech difficulties in this specific scenario: "Ordering Pizza".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    });

    const jsonText = response.text;
    console.log('\nRaw response:', jsonText);

    const phrases = JSON.parse(jsonText);
    console.log('\nGenerated phrases:');
    phrases.forEach((phrase, i) => console.log(`  ${i + 1}. "${phrase}"`));

    console.log('\n✅ Success! API is working correctly.');
    return phrases;
  } catch (error) {
    console.error('\n❌ Error generating context pack:', error.message);
    if (error.response) {
      console.error('Response error:', error.response);
    }
    throw error;
  }
}

testContextPack()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
