// Step 4: chat completion — hold a multi-turn conversation via the Chat Completions API.
import { chatCompletion } from "../ai/5-chat-completion.js";

const messages = [
    {
        role: "system",
        content: `
            You are a helpful assistant that answers concisely. 
            Answer in shortest response. Act like a friend.
            Don't add any formatting.
            If required, ask a question.
        `,
    },
    { role: "user", content: "I want to learn web application development" },
    // { role: "assistant", content: "..." },
    // { role: "user", content: "..." },
];

const reply = await chatCompletion(messages);
console.log(reply);
