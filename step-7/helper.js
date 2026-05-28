// Step 7: RAG plumbing — the pure-JS pieces that turn embeddings into retrieval.
// No external vector DB: the "index" is just a JSON file and we score it with cosine similarity.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

// Cosine similarity = how aligned two vectors are, ignoring their length.
// 1 = same direction (very similar), 0 = unrelated. This is the heart of retrieval.
export function cosineSimilarity(a, b) {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// The index is an array of records: { id, file, text, embedding }.
export function loadIndex(path) {
  if (!existsSync(path)) return [];
  return JSON.parse(readFileSync(path, "utf8"));
}

export function saveIndex(path, records) {
  writeFileSync(path, JSON.stringify(records, null, 2));
}

// Score every record against the query vector and return the k most similar.
export function topK(queryEmbedding, records, k = 3) {
  return records
    .map((record) => ({ ...record, score: cosineSimilarity(queryEmbedding, record.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
