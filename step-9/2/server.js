import express from "express";
import "dotenv/config";
import { chatCompletionWithTools } from "../../ai/7-chat-completion-with-tools.js";
import { productTools, productFns } from "./services/product-services/services.js";
import { recipeTools, recipeFns } from "./services/recipes-services/services.js";

const tools = [...productTools, ...recipeTools];
const fnMap = { ...productFns, ...recipeFns };

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log("===>", req.url, req.method);
    next();
});

const messages = [
    {
        role: "system",
        content:
            "You are a helpful shopping and recipe assistant. When the user asks about products or recipes, use the available tools to fetch real data before answering.",
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

        const aiMessage = await chatCompletionWithTools(messages, tools);
        messages.push(aiMessage);

        if ((Array.isArray(aiMessage.tool_calls) && aiMessage.tool_calls.length == 0) || !aiMessage.tool_calls) {
            return res.json({ reply: aiMessage.content });
        }

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

        const finalMessage = await chatCompletionWithTools(messages);
        messages.push(finalMessage);
        res.json({ reply: finalMessage.content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "chat completion failed" });
    }
});

app.listen(4001, () => {
    console.log("------ 9.2 tool-calling (no loop) on http://localhost:4001 ------");
});
