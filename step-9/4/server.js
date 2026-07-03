// Step 9.4 — ALL product + recipe tools, SERIAL TOOL-CALL LOOP.
// Same loop shape as 9.3, but now the model has the full toolset to work with.
// Within a single step, multiple requested tools are run one after another (serial).
import express from "express";
import "dotenv/config";
import { chatCompletionWithTools } from "../../ai/7-chat-completion-with-tools.js";
import { productTools, productFns } from "./services/product-services/services.js";
import { recipeTools, recipeFns } from "./services/recipes-services/services.js";

const tools = [...productTools, ...recipeTools];
const fnMap = { ...productFns, ...recipeFns };

const MAX_STEPS = 6;

const app = express();
app.use(express.json());

const messages = [
    {
        role: "system",
        content:
            "You are a helpful shopping and recipe assistant. Use the tools to fetch real data. List tools return only basic fields, so call a single-item tool to get details. Chain tool calls as needed to fully answer the user.",
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

            if (!aiMessage.tool_calls) {
                return res.json({ reply: aiMessage.content });
            }

            // Serial: run each requested tool in order, awaiting one before the next.
            for (const call of aiMessage.tool_calls) {
                const fn = fnMap[call.function.name];
                const args = JSON.parse(call.function.arguments || "{}");
                const result = fn
                    ? await fn(args)
                    : { error: `unknown tool: ${call.function.name}` };
                messages.push({
                    role: "tool",
                    tool_call_id: call.id,
                    content: JSON.stringify(result),
                });
            }
        }

        res.json({ reply: "Sorry, I couldn't finish that in time. Please try again." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "chat completion failed" });
    }
});

app.listen(4003, () => {
    console.log("------ 9.4 all tools (serial loop) on http://localhost:4003 ------");
});
