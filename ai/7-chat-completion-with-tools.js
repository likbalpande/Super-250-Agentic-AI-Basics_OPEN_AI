// Reusable chat completion utility WITH tool support.
// Unlike 5-chat-completion.js (which returns only text), this returns the FULL
// assistant message so callers can read both .content and .tool_calls.
import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Way 1 — OpenAI (gpt-5.4-mini). Reliable native tool calls + parallel calls.
export async function chatCompletionWithTools(messages, tools) {
    const response = await client.chat.completions.create({
        model: "gpt-5.4-mini",
        messages,
        tools, // undefined when no tools are passed — the API just ignores it
    });

    return response.choices[0].message;
}

// Way 2 — Hugging Face router (Llama-3.1-8B-Instruct). Same OpenAI-compatible
// export async function chatCompletionWithTools2(messages, tools) {
//     const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
//         headers: {
//             Authorization: `Bearer ${process.env.HF_TOKEN}`,
//             "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify({
//             messages,
//             tools,
//             model: "meta-llama/Llama-3.1-8B-Instruct",
//         }),
//     });

//     const result = await response.json();
//     console.log("----->", result.choices[0].message);
//     return result.choices[0].message;
// }
