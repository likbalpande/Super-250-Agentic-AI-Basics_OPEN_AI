// Step 3: image-to-text — describe a local image using the vision utility.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeImage } from "../ai/3-vision.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const imagePath = join(scriptDir, "2-sample.png");

const userPrompt = `Read the image and extract the text. Return the extracted text.`;

const description = await analyzeImage(imagePath, userPrompt);
console.log(description);
