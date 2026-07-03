// Step 9.5 — ALL product + recipe tools, tool-call loop with PARALLEL execution.
// Same loop as 9.4, but when the model requests several tools in ONE step,
// we fire them all at once with Promise.all instead of awaiting one at a time.
// (The model still returns tool_calls in one message — this is about how WE run them.)
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
            "You are a helpful shopping and recipe assistant. Use the tools to fetch real data. When you need several independent pieces of data, request all those tools together so they can run in parallel.",
    },
];

// Run one tool call and return its tool-role message.
async function runToolCall(call) {
    const fn = fnMap[call.function.name];
    const args = JSON.parse(call.function.arguments || "{}");
    const result = fn
        ? await fn(args)
        : { error: `unknown tool: ${call.function.name}` };
    return {
        role: "tool",
        tool_call_id: call.id,
        content: JSON.stringify(result),
    };
}

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

            // Parallel: run all requested tools at once, then push results in order.
            const toolMessages = await Promise.all(
                aiMessage.tool_calls.map(runToolCall)
            );
            messages.push(...toolMessages);
        }

        res.json({ reply: "Sorry, I couldn't finish that in time. Please try again." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "chat completion failed" });
    }
});

app.listen(4004, () => {
    console.log("------ 9.5 all tools (parallel loop) on http://localhost:4004 ------");
});
