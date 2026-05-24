// Reusable embedding utility: turns a piece of text into an embedding vector (array of numbers).
import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function createEmbedding(text) {
  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  // text-embedding-3-small returns a 1536-dimensional vector.
  return response.data[0].embedding;
}
