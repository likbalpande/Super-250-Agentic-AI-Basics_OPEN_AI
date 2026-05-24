// Reusable vision utility: reads an image from disk and returns an AI text description of it.
import { readFile } from "node:fs/promises";
import { extname } from "node:path";
import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MIME_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function analyzeImage(imagePath, userPrompt) {
  const bytes = await readFile(imagePath);
  const base64 = bytes.toString("base64");
  const mime = MIME_TYPES[extname(imagePath).toLowerCase()] ?? "image/png";

  const response = await client.responses.create({
    model: "gpt-5.4-mini",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: userPrompt },
          { type: "input_image", image_url: `data:${mime};base64,${base64}` },
        ],
      },
    ],
  });

  return response.output_text;
}
