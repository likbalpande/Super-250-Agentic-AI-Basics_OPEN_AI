// Step 1: text-to-text — generate an AI text response from a system + user prompt.
import { generateText } from "../ai/1-text-generation.js";

const systemPrompt = "You are a concise assistant that explains technical topics simply. Give short HTML output.";
const userPrompt = "Explain what ai use in web app development is.";

const result = await generateText(systemPrompt, userPrompt);
console.log(result);
