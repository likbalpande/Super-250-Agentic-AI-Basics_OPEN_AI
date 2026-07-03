import express from "express";
import "dotenv/config";
import { chatCompletion } from "../../ai/5-chat-completion.js";

const app = express();
app.use(express.json());

const messages = [
    {
        role: "system",
        content:
            "You are a helpful assistant that answers concisely. Answer in shortest response. Act like a friend. Don't add any formatting. If required, ask a question.",
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

        const result = await chatCompletion(messages);
        const reply = result.choices[0].message.content;

        messages.push({ role: "assistant", content: reply });
        res.json({ reply });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "chat completion failed" });
    }
});

app.listen(3000, () => {
    console.log("------ Server listening on http://localhost:3000 ------");
});
