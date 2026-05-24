// Step 5: text-to-embedding — create an embedding for some text and print it as a JSON array.
import { createEmbedding } from "../ai/6-embedding.js";
import { writeFileSync } from "fs";

const text = "Sweet";

const embedding = await createEmbedding(text);
console.log(embedding);
writeFileSync(new URL("./4-output.json", import.meta.url), JSON.stringify(embedding, null, 2));
