// Reusable text generation utility (local): runs a system + user prompt through a
// locally hosted Gemma model via Ollama's OpenAI-compatible Chat Completions endpoint.
import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  baseURL: process.env.OLLAMA_BASE_URL ?? "http://localhost:11434/v1",
  apiKey: "ollama", // required by the SDK, ignored by Ollama
});

export async function generateText(systemPrompt, userPrompt) {
  const response = await client.chat.completions.create({
    model: "gemma4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return response.choices[0].message.content;
}
