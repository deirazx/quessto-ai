import React, { useEffect } from 'react'
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc"
import { auth, provider } from '../utils/firebase'
import { signInWithPopup } from 'firebase/auth'
import { googleAuth, getCurrentUser } from '../api/axios'

const Auth = () => {

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            const User = response.user;
            const displayName = User.displayName;
            const email = User.email;

            const data = await googleAuth({
                name: displayName,
                email: email
            });

            console.log("Backend Auth success:", data);
        } catch (error) {
            console.error("Auth error:", error.response?.data || error.message);
        }
    }


    return (
        <div className='relative min-h-screen overflow-hidden bg-white text-black px-6 sm:px-8 py-6 flex flex-col justify-between'>
            {/* Background Ambient Glows */}
            <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-100/40 blur-[140px] pointer-events-none" />
            <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-100/30 blur-[140px] pointer-events-none" />
            <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-50/40 blur-[120px] pointer-events-none" />

            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className='max-w-7xl w-full mx-auto rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 px-8 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                <div>
                    <h1 className='text-2xl font-black bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent flex items-center gap-2'>
                        ✨ ExamNotes Ai
                    </h1>
                    <p className='text-xs text-gray-400 mt-1'>Ai-powered exam-oriented notes & revision</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/5 text-xs text-gray-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
                    v1.0 Live
                </div>
            </motion.header>

            {/* Main Section */}
            <main className='max-w-7xl w-full mx-auto py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center z-10 my-auto'>

                {/* LEFT CONTENT */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col items-start"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs font-semibold text-gray-700 mb-6 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        AI Engine Ready
                    </div>

                    <h1 className='text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight bg-gradient-to-br from-black via-gray-800 to-black/90 bg-clip-text text-transparent'>
                        Unlock Smart <br />
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">AI Study Notes</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-lg text-gray-600 leading-relaxed font-normal">
                        Generate comprehensive syllabus-oriented notes, exam sheets, visual diagrams, and conceptual charts in seconds. Create and download clean, print-ready PDFs instantly.
                    </p>

                    <motion.button
                        onClick={handleGoogleAuth}
                        whileHover={{
                            y: -8,
                            rotateX: 6,
                            rotateY: -6,
                            scale: 1.04,
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 250, damping: 15 }}
                        className="mt-10 px-8 py-4 rounded-2xl flex items-center gap-3.5 bg-black border border-white/10 text-white font-semibold text-lg shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] transition-shadow duration-300 cursor-pointer"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <FcGoogle size={24} style={{ transform: "translateZ(10px)" }} />
                        <span style={{ transform: "translateZ(10px)" }}>Continue with Google</span>
                    </motion.button>

                    <div className="mt-8 p-4 rounded-2xl bg-black/5 border border-black/5 max-w-xl">
                        <p className="text-sm font-semibold text-gray-800">
                            🎁 Special Offer: Get <span className="text-indigo-600 font-bold">50 FREE credits</span> on signup
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Start generating exam guides, charts, and high-quality revision cards instantly. No cards required.
                        </p>
                    </div>
                </motion.div>

                {/* RIGHT CONTENT - FEATURES GRID */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 w-full'>
                    <Feature
                        icon='🎁'
                        title='50 Free Credits'
                        des='Get started immediately with 50 complimentary credits. No credit card required.'
                    />
                    <Feature
                        icon='⚡'
                        title='AI Exam Notes'
                        des='Convert syllabus topics and lecture notes into structured study sheets instantly.'
                    />
                    <Feature
                        icon='📊'
                        title='Smart Visuals'
                        des='Automatically generate flowcharts, mind maps, and diagrams to grasp concepts faster.'
                    />
                    <Feature
                        icon='📄'
                        title='Clean PDF Exports'
                        des='Export your notes to beautifully typeset, print-friendly PDFs in one click.'
                    />
                </div>

            </main>

            {/* Footer */}
            <footer className="w-full text-center text-xs text-gray-400 border-t border-black/5 pt-6 z-10 max-w-7xl mx-auto">
                © {new Date().getFullYear()} ExamNotes Ai. Powered by advanced artificial intelligence.
            </footer>
        </div>
    )
}

function Feature({ icon, title, des }) {
    return (
        <motion.div
            whileHover={{ y: -10, rotateX: 6, rotateY: -6, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className='relative rounded-2xl p-6 bg-gradient-to-br from-black/95 via-black/85 to-black/95 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.3)] text-white group flex flex-col justify-between min-h-[200px]'
            style={{ transformStyle: "preserve-3d" }}
        >
            <div style={{ transform: "translateZ(30px)" }} className="flex flex-col gap-4">
                <div className='w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-2xl shadow-inner'>
                    {icon}
                </div>
                <div>
                    <h3 className='text-lg font-bold tracking-tight text-white/95'>{title}</h3>
                    <p className='text-sm text-gray-400 mt-2 font-normal leading-relaxed'>{des}</p>
                </div>
            </div>

            {/* Ambient card interior glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none group-hover:opacity-100 transition-opacity duration-500 opacity-0" />
        </motion.div>
    )
}

export default Auth
