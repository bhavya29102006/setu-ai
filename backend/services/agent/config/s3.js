import dotenv from "dotenv"
dotenv.config()
import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
    region: process.env.AWS_REGION?.trim() || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID?.trim() || "placeholder_access_key",
        secretAccessKey: (process.env.AWS_SECRET_KEY || process.env.AWS_SECRET_ACCESS_KEY)?.trim() || "placeholder_secret_key"
    }
})
