// Step 2: text-to-image — generate an image from a prompt and save it to output-images/.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { generateImage } from "../ai/2-image-generation.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputDir = join(scriptDir, "output-images");

const prompt = "Create a map of UP with locations of major police headquarters.";

const image = await generateImage(prompt);

await mkdir(outputDir, { recursive: true });
const outputPath = join(outputDir, `image-${Date.now()}.png`);
await writeFile(outputPath, image);

console.log(`Saved image to ${outputPath}`);
