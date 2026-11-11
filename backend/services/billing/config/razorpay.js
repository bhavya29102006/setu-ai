import Razorpay from "razorpay"
import dotenv from "dotenv"
dotenv.config()

let razorpay = null
try {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
        key_secret: process.env.RAZORPAY_KEY_SECRET || "dummy_secret"
    })
} catch (err) {
    console.warn("Razorpay initialization warning:", err.message)
}

export default razorpay
