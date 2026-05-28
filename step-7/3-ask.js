// Step 7: RAG — RETRIEVE then GENERATE (the full loop).
// Retrieve the most relevant complaints, then ask the model to answer using ONLY those excerpts.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createEmbedding } from "../ai/6-embedding.js";
import { generateText } from "../ai/1-text-generation.js";
import { loadIndex, topK } from "./helper.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const indexPath = join(scriptDir, "vector-store.json");

const question = "What type of water issues are people facing?";

const records = loadIndex(indexPath);
if (records.length === 0) {
    console.error("Index is empty. Run `npm run step-7.1` first.");
    process.exit(1);
}

const queryEmbedding = await createEmbedding(question);
const hits = topK(queryEmbedding, records, 3);

// Build the grounding context: each excerpt labelled with its source file so the model can cite it.
const context = hits.map((hit) => `Source: ${hit.file}\n${hit.text}`).join("\n\n---\n\n");

const systemPrompt = `
  You answer questions about citizen complaints using ONLY the excerpts provided.
  If the answer is not in the excerpts, say you don't have that information.
  Cite the source filename(s) you used. Return plain text. No formatting.
`;

const userPrompt = `Question: ${question}\n\nComplaint excerpts:\n\n${context}`;

const answer = await generateText(systemPrompt, userPrompt);

console.log(`\n-----------------------\n\nQ: ${question}\n`);
console.log(answer);
console.log(`\nRetrieved from: ${hits.map((hit) => hit.file).join(", ")}\n\n--------------------\n`);
