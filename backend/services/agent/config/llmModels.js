import path from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatOpenRouter } from "@langchain/openrouter"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, "../.env") })
dotenv.config({ path: path.resolve(__dirname, "../../.env") })
dotenv.config({ path: path.resolve(__dirname, "../../../.env") })
dotenv.config()

export const getGroqModel = () => {
    const apiKey = (process.env.GROQ_API_KEY || "").replace(/['"]/g, "").trim()
    return new ChatGroq({
        apiKey: apiKey || "gsk_placeholder_key",
        model: "openai/gpt-oss-120b"
    })
}

export const getGeminiModel = () => {
    const apiKey = (process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || "").replace(/['"]/g, "").trim()
    return new ChatGoogleGenerativeAI({
        apiKey: apiKey || "dummy_google_api_key",
        model: "gemini-2.5-flash"
    })
}

export const getOpenRouterModel = () => {
    const apiKey = (process.env.OPENROUTER_API_KEY || "").replace(/['"]/g, "").trim()
    return new ChatOpenRouter({
        apiKey: apiKey || "dummy_openrouter_api_key",
        model: "deepseek/deepseek-chat",
        temperature: 0,
        maxTokens: 2500
    })
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
