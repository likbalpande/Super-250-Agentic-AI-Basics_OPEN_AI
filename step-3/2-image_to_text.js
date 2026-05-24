// Step 3: image-to-text — describe a local image using the vision utility.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeImage } from "../ai/3-vision.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const imagePath = join(scriptDir, "sample.png");

const userPrompt = "Describe this image in short. Tell me about what major components do you identify?";

const description = await analyzeImage(imagePath, userPrompt);
console.log(description);
