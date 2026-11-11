import { signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, googleProvider } from '../../utils/firebase'
import api from '../../utils/axios'
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { setUserdata } from '../redux/userSlice';
import SideBar from '../components/SideBar';
import ChatArea from '../components/ChatArea';
import Artifact from '../components/Artifact';

function Home() {
    const { userData } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loginError, setLoginError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async (token) => {
        try {
            console.log("Sending token to backend /api/auth/login...")
            const { data } = await api.post("/api/auth/login", { token })
            console.log("Backend login success! User data:", data)
            dispatch(setUserdata(data))
        } catch (error) {
            console.error("Backend login API error:", error)
            const msg = error.response?.data?.message || error.message || "Could not reach backend."
            setLoginError(`Backend Error: ${msg}. (Make sure Gateway is running on port 8000 and Auth Service on port 8001)`)
        }
    }

    const googleLogin = async () => {
        setLoginError("")
        setLoading(true)
        try {
            console.log("Opening Google Sign-In popup with Firebase...")
            const data = await signInWithPopup(auth, googleProvider)
            console.log("Firebase Google login successful:", data.user?.email)
            const token = await data.user.getIdToken(true)
            await handleLogin(token)
        } catch (err) {
            console.error("Firebase Sign-In Error:", err)
            if (err.code === "auth/popup-closed-by-user") {
                setLoginError("Login popup was closed before completing sign-in.")
            } else if (err.code === "auth/popup-blocked") {
                setLoginError("Browser blocked the Google popup! Please enable popups for http://localhost:5173.")
            } else if (err.code === "auth/unauthorized-domain") {
                setLoginError("Firebase Project Domain Error: 'localhost' is not added to Authorized Domains in Firebase Console for project 'setu-734ac'.")
            } else if (err.code === "auth/network-request-failed") {
                setLoginError("Network connection to Firebase failed. Check your internet connection or ad-blocker.")
            } else {
                setLoginError(`Google Sign-In failed (${err.code || 'error'}): ${err.message}`)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='h-screen flex bg-[#0d0f14] text-white overflow-hidden'>
            <SideBar />
            <ChatArea />
            <Artifact />

            {!userData && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur'>
                    <div className='w-[360px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5 shadow-2xl'>
                        <div className='flex flex-col gap-1'>
                            <h2 className='text-[18px] font-semibold text-slate-100 tracking-tight'>Welcome to CortexAI</h2>
                            <p className='text-[13px] text-slate-400'>Please login with Google to continue using the app.</p>
                        </div>

                        {loginError && (
                            <div className='bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-xs leading-relaxed break-words'>
                                ⚠️ {loginError}
                            </div>
                        )}

                        <button
                            disabled={loading}
                            className='w-full flex items-center justify-center gap-3 py-[12px] rounded-xl text-sm font-medium text-black/90 bg-white hover:bg-gray-100 active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-50'
                            onClick={googleLogin}
                        >
                            <FcGoogle size={18} />
                            {loading ? "Signing in with Google..." : "Continue With Google"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home
