import dotenv from "dotenv"
dotenv.config()
import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatOpenRouter } from "@langchain/openrouter"

let groqInstance = null
let geminiInstance = null
let openrouterInstance = null

export const getGroqModel = () => {
    if (!groqInstance) {
        groqInstance = new ChatGroq({
            apiKey: process.env.GROQ_API_KEY || "gsk_placeholder_key",
            model: "openai/gpt-oss-120b"
        })
    }
    return groqInstance
}

export const getGeminiModel = () => {
    if (!geminiInstance) {
        geminiInstance = new ChatGoogleGenerativeAI({
            apiKey: process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || "dummy_google_api_key",
            model: "gemini-2.5-flash"
        })
    }
    return geminiInstance
}

export const getOpenRouterModel = () => {
    if (!openrouterInstance) {
        openrouterInstance = new ChatOpenRouter({
            apiKey: process.env.OPENROUTER_API_KEY || "dummy_openrouter_api_key",
            model: "deepseek/deepseek-chat",
            temperature: 0,
            maxTokens: 2500
        })
    }
    return openrouterInstance
}

export const getModel = async (agent) => {
    switch (agent) {
        case "chat":
            return getGroqModel()
        case "search":    
            return getGroqModel()
        case "coding": 
            return getOpenRouterModel() 
        case "imageAnalyzer": 
            return getGeminiModel()   
        default:
            return getGroqModel()
    }
}
