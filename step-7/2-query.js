// Step 7: RAG — RETRIEVAL phase, shown on its own (no generation yet).
// Embed the question the same way we embedded the documents, then find the nearest records.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createEmbedding } from "../ai/6-embedding.js";
import { loadIndex, topK } from "./helper.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const indexPath = join(scriptDir, "vector-store.json");

const query = "Complaints about a water issue";

const records = loadIndex(indexPath);
if (records.length === 0) {
    console.error("Index is empty. Run `npm run step-7.1` first.");
    process.exit(1);
}

const queryEmbedding = await createEmbedding(query);
const hits = topK(queryEmbedding, records, 3);

console.log("-----------------------\n");

console.log(`Query: "${query}"`);

console.log("\n-----------------------\n");

for (const hit of hits) {
    console.log(`--> ${hit.text.replace(/\s+/g, " ").slice(0, 200)}...`);
    console.log(`   (${hit.score.toFixed(3)}  ${hit.file})`);
}

console.log("\n-----------------------");
