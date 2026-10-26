import Redis from "ioredis"

const redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
    retryStrategy(times) {
        return Math.min(times * 1000, 5000)
    }
})

let hasLoggedError = false

redis.on("connect", () => {
    hasLoggedError = false
    console.log("Redis connected successfully")
})

redis.on("error", (err) => {
    if (!hasLoggedError) {
        console.warn("Redis not connected: waiting for Redis server at " + (process.env.REDIS_URL || "localhost:6379"))
        hasLoggedError = true
    }
})

export default redis