import Redis from "ioredis"

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379"

const redis = new Redis(redisUrl, {
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
        console.warn(`Redis not connected: waiting for Redis server at ${redisUrl}`)
        hasLoggedError = true
    }
})

export default redis
