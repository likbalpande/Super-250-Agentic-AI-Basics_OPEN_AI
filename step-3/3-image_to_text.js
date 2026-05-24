// Step 3: image-to-text — describe a local image using the vision utility.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeImage } from "../ai/3-vision.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const imagePath = join(scriptDir, "sample.png");

const userPrompt = `
    Describe this image in short. 
    It is an item to be listed on my e-commerce platform. 
    Tell me its title, very short description, price in INR, age (0+, 1+, ...)
    Give the output in json format. 
`;

const description = await analyzeImage(imagePath, userPrompt);
console.log(description);
