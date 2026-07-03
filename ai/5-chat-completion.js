// // Reusable chat completion utility: runs a multi-turn message list through the Chat Completions API.
// import OpenAI from "openai";
// import "dotenv/config";

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function chatCompletion(messages) {
//     const response = await client.chat.completions.create({
//         model: "gpt-5.4-mini",
//         messages,
//     });

//     return response.choices[0].message.content;
// }

export async function chatCompletion(messages) {
    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
        headers: {
            Authorization: `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            messages: messages,
            model: "meta-llama/Llama-3.1-8B-Instruct:nscale",
        }),
    });
    const result = await response.json();
    return result;
}
