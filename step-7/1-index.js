// Step 7: RAG — INDEXING phase (the offline half of RAG).
// For each handwritten complaint image: OCR it to text, embed that text, and store the record.
// Embeddings are text-only, so we must turn the image into text first (reusing the vision util).
import { readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeImage } from "../ai/3-vision.js";
import { createEmbedding } from "../ai/6-embedding.js";
import { loadIndex, saveIndex } from "./helper.js";
import { generateText } from "../ai/1-text-generation.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(scriptDir, "images");
const indexPath = join(scriptDir, "vector-store.json");

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

const OCR_PROMPT = `
    Extract all readable text from the image. 
    Preserve the original wording and structure as closely as possible. 
    Return plain text only with no explanations, formatting notes, or commentary.
`;

const TEXT_ANALYSER_PROMPT = `
    You are an expert in understanding and correcting text. 
    Read the input carefully and infer the intended meaning, 
    even if it contains spelling mistakes, grammar issues, incomplete words, or typos. 
    Return a clean, natural, and grammatically correct *English version* of the text. 
    Preserve the original intent but return English Text. 
    You may add a few minor contextual words only if necessary for clarity. 
    Return only the corrected text.
`;

const files = (await readdir(imagesDir)).filter((file) =>
    IMAGE_EXTENSIONS.includes(file.slice(file.lastIndexOf(".")).toLowerCase())
);

const records = loadIndex(indexPath);
const alreadyIndexed = new Set(records.map((record) => record.file));

let indexed = 0;
let skipped = 0;

for (const file of files) {
    // Idempotent: don't re-OCR/re-embed files we already have (saves API calls on re-runs).
    if (alreadyIndexed.has(file)) {
        skipped++;
        continue;
    }

    console.log(`Indexing ${file}...`);

    // IMAGE TO TEXT
    const rawText = await analyzeImage(join(imagesDir, file), OCR_PROMPT);

    // TEXT TO TEXT
    const englishText = await generateText(TEXT_ANALYSER_PROMPT, rawText);

    // TEXT TO Embedding
    const embedding = await createEmbedding(englishText);

    records.push({ id: records.length + 1, file, text: englishText, embedding });
    indexed++;
}

saveIndex(indexPath, records);
console.log(`Done. Indexed ${indexed}, skipped ${skipped}. Total records: ${records.length}.`);
