import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
dotenv.config()
import cors from "cors"
import cookieParser from "cookie-parser"
import { getCurrentUser } from "./controllers/user.controller.js"
import protect from "./middleware/auth.middleware.js"
import { proxyWithHeader } from "./utils/proxyWithHeader.js"
import morgan from "morgan"
const port = process.env.PORT || 8000
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173"
const authService = process.env.AUTH_SERVICE || "http://localhost:8001"
const chatService = process.env.CHAT_SERVICE || "http://localhost:8002"
const agentService = process.env.AGENT_SERVICE || "http://localhost:8003"
const billingService = process.env.BILLING_SERVICE || "http://localhost:8004"

const app = express()
app.use(cors({
    origin: frontendUrl,
    credentials: true
}))
app.use(morgan("dev"))
app.use(cookieParser())
app.use("/api/auth", proxy(authService))
app.use("/api/chat", protect, proxyWithHeader(chatService))
app.use("/api/agent", protect, proxyWithHeader(agentService))
app.use("/api/billing", protect, proxyWithHeader(billingService))
app.get("/api/me", protect, getCurrentUser)
app.get("/", (req, res) => {
    res.json({ message: "hello from gateway v5", status: "healthy" })
})

app.listen(port,()=>{
    console.log(`gateway started at ${port}`)
})
