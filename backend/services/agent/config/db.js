import mongoose from "mongoose"

const connectDb=async ()=>{
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/setu-ai"
    try {
       await mongoose.connect(mongoUri) 
       console.log("db connected")
    } catch (error) {
       console.warn(`db connection warning: ${error.message || error}`) 
    }
}

export default connectDb