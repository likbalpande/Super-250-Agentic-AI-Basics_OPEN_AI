// Reusable image generation utility: turns a text prompt into a PNG image Buffer.
import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateImage(prompt) {
    const response = await client.images.generate({
        model: "gpt-image-2",
        prompt,
        // size sets the output dimensions: square (e.g. 1024x1024), portrait (1024x1536), or landscape (1536x1024).
        // https://developers.openai.com/api/reference/python/resources/images/methods/generate?utm_source=chatgpt.com
        size: "1024x1024",
    });

    return Buffer.from(response.data[0].b64_json, "base64");
}
