import { streamText, Message } from "ai";
//import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { initialMessage } from "@/lib/data";

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY || "",
});

export const runtime = "edge";

const generateId = () => Math.random().toString(36).slice(2, 15);

const buildGoogleGenAIPrompt = (messages: Message[]): Message[] => [
    {
        id: generateId(),
        role: "system", // Usually system for initial instructions
        content: initialMessage.content,
    },
    ...messages.map((message) => ({
        id: message.id || generateId(),
        role: message.role,
        content: message.content,
    }))
];

export async function POST(request: Request) {
    const { messages } = await request.json();
    
    const result = await streamText({
        model: google("gemini-1.5-pro"), // Updated to latest model name
        messages: buildGoogleGenAIPrompt(messages),
        temperature: 0.7,
    });

    return result.toDataStreamResponse();
}