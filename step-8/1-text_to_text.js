// Step 8: text-to-text via local Gemma (Ollama) — generate an AI text response from a system + user prompt.
import { generateText } from "../ai/8-ollama.js";

const systemPrompt = `
    You are a concise assistant that explains technical topics simply. 
    While answering, don't add any formatting.
`;
const userPrompt = "Explain what ai use in web app development is.";

const result = await generateText(systemPrompt, userPrompt);
console.log(result);
