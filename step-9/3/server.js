import express from "express";
import "dotenv/config";
import { chatCompletionWithTools } from "../../ai/7-chat-completion-with-tools.js";
import { productTools, productFns } from "./services/product-services/services.js";
import { recipeTools, recipeFns } from "./services/recipes-services/services.js";

const tools = [...productTools, ...recipeTools];
const fnMap = { ...productFns, ...recipeFns };

const MAX_STEPS = 5; // safety guard so the loop can never run forever.

const app = express();
app.use(express.json());

const messages = [
    {
        role: "system",
        content:
            "You are a helpful shopping and recipe assistant. Use the tools to fetch real data. The list tools only return basic fields, so call the single-item tool when the user wants details about a specific product.",
    },
];

app.get("/chats", (req, res) => {
    res.json({ messages });
});

app.post("/chats", async (req, res) => {
    const { message } = req.body ?? {};
    if (!message) {
        return res.status(400).json({ error: "message is required" });
    }

    try {
        messages.push({ role: "user", content: message });

        for (let step = 0; step < MAX_STEPS; step++) {
            const aiMessage = await chatCompletionWithTools(messages, tools);
            messages.push(aiMessage);

            // No tool calls -> this is the final answer, we're done.
            if (!aiMessage.tool_calls) {
                return res.json({ reply: aiMessage.content });
            }

            // Run the requested tools SERIALLY (one at a time), then loop.
            for (const call of aiMessage.tool_calls) {
                const fn = fnMap[call.function.name];
                const args = JSON.parse(call.function.arguments || "{}");
                const result = fn ? await fn(args) : { error: `unknown tool: ${call.function.name}` };
                messages.push({
                    role: "tool",
                    tool_call_id: call.id,
                    content: JSON.stringify(result),
                });
            }
        }

        // Ran out of steps without a final answer.
        res.json({ reply: "Sorry, I couldn't finish that in time. Please try again." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "chat completion failed" });
    }
});

app.listen(4002, () => {
    console.log("------ 9.3 tool-calling (serial loop) on http://localhost:4002 ------");
});
