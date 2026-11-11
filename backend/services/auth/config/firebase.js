import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { cert, initializeApp, getApps } from "firebase-admin/app"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let serviceAccount = null
const keyPath = path.resolve(__dirname, "../serviceAccountKey.json")

if (fs.existsSync(keyPath)) {
  try {
    serviceAccount = JSON.parse(fs.readFileSync(keyPath, "utf-8"))
  } catch (err) {
    console.error("Failed to parse serviceAccountKey.json:", err.message)
  }
} else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    if (fs.existsSync(process.env.FIREBASE_SERVICE_ACCOUNT)) {
      serviceAccount = JSON.parse(fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT, "utf-8"))
    } else {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    }
  } catch (err) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable:", err.message)
  }
}

let app
if (getApps().length > 0) {
  app = getApps()[0]
} else if (serviceAccount) {
  app = initializeApp({
    credential: cert(serviceAccount)
  })
} else {
  console.warn("⚠️ Firebase service account key not found. Place 'serviceAccountKey.json' in backend/services/auth or set FIREBASE_SERVICE_ACCOUNT.")
  app = initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || "setu-734ac"
  })
}

export { app }
