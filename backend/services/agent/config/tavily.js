import { TavilySearch } from "@langchain/tavily";
import dotenv from "dotenv"
dotenv.config()

export const searchTool = new TavilySearch({
  tavilyApiKey: process.env.TAVILY_API_KEY || "tvly-placeholder-key",
  maxResults: 5,
  topic: "general",
  includeImages: true
});
