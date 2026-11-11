import Redis from "ioredis"

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379"

const memoryFallback = new Map()

const redis = new Redis(redisUrl, {
    maxRetriesPerRequest: null,
    enableOfflineQueue: false,
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
        console.warn(`Redis not connected (using in-memory fallback): waiting for Redis server at ${redisUrl}`)
        hasLoggedError = true
    }
})

// In-memory fallback methods so authentication and rate limits work even without Redis running
const originalGet = redis.get.bind(redis)
const originalSet = redis.set.bind(redis)
const originalDel = redis.del.bind(redis)
const originalIncr = redis.incr.bind(redis)
const originalTtl = redis.ttl.bind(redis)

redis.get = async (key) => {
    try {
        if (redis.status === "ready") {
            return await originalGet(key)
        }
    } catch (_) {}
    return memoryFallback.get(key) || null
}

redis.set = async (key, val, ...args) => {
    memoryFallback.set(key, typeof val === "string" ? val : JSON.stringify(val))
    try {
        if (redis.status === "ready") {
            return await originalSet(key, val, ...args)
        }
    } catch (_) {}
    return "OK"
}

redis.del = async (key) => {
    memoryFallback.delete(key)
    try {
        if (redis.status === "ready") {
            return await originalDel(key)
        }
    } catch (_) {}
    return 1
}

redis.incr = async (key) => {
    try {
        if (redis.status === "ready") {
            return await originalIncr(key)
        }
    } catch (_) {}
    const cur = parseInt(memoryFallback.get(key) || "0", 10) + 1
    memoryFallback.set(key, String(cur))
    return cur
}

redis.ttl = async (key) => {
    try {
        if (redis.status === "ready") {
            return await originalTtl(key)
        }
    } catch (_) {}
    return 60
}

export default redis
