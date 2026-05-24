// Reusable text generation utility: turns a system + user prompt into an AI text response.
import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateText(systemPrompt, userPrompt) {
  const response = await client.responses.create({
    model: "gpt-5.4-mini",
    instructions: systemPrompt,
    input: userPrompt,
  });

  return response.output_text;
}
