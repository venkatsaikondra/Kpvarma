import {streamText,Message} from "ai";
import {creatingGoogleGeminiAi} from "@ai-sdk/google"
const google=createGoogleGenerativeAI({
    apikey:process.env.GOOGLE_API_KEY||"",
})
export const runtime="edge",
const generateId=()=>Math.random.toString(36).slice(2,15)
export async function POST(request:Request) {
    const {messages}=await.request.json();
}