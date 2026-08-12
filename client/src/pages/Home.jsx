import React from 'react'
import { motion } from 'motion/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import img1 from '../assets/img1.png'

const Home = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-white text-black flex flex-col">
            {/* Background Ambient Glows */}
            <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-100/40 blur-[140px] pointer-events-none" />
            <div className="absolute top-[25%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-100/30 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[5%] left-[15%] w-[45%] h-[45%] rounded-full bg-blue-50/40 blur-[120px] pointer-events-none" />

            <Navbar />

            {/* Hero Section */}
            <main className="max-w-7xl w-full mx-auto px-6 sm:px-8 py-10 sm:py-16 flex-grow z-10 flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left Column: Text & CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="lg:col-span-7 flex flex-col items-start text-left"
                    >
                        {/* Premium Tagline Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-xs font-semibold text-indigo-700 mb-6 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                            ✨ Next-Gen Student Workspace
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-[70px] font-black leading-[1.08] tracking-tight text-gray-900">
                            Supercharge Your <br className="hidden sm:inline" />
                            Exam Prep With <br />
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">AI-Powered Notes</span>
                        </h1>

                        <p className="mt-6 text-gray-500 text-lg sm:text-xl leading-relaxed max-w-xl font-normal">
                            Instantly transform syllabus topics, lecture materials, and complex texts into structured study guides, interactive concepts, and exam-ready worksheets in seconds.
                        </p>

                        {/* Dual Action Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <motion.button
                                whileHover={{
                                    scale: 1.04,
                                    boxShadow: "0 20px 40px rgba(99, 102, 241, 0.15)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 250, damping: 15 }}
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 border border-indigo-500/20 text-white font-bold text-lg shadow-[0_20px_45px_rgba(99,102,241,0.2)] hover:bg-indigo-700 transition-colors cursor-pointer"
                            >
                                Start Generating Free
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-6 py-4 text-gray-600 hover:text-indigo-600 font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Learn How it Works
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </motion.button>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-10 pt-8 border-t border-gray-100 w-full grid grid-cols-3 gap-4">
                            <div>
                                <h4 className="text-xl font-extrabold text-gray-900">50k+</h4>
                                <p className="text-xs text-gray-400 mt-1 font-medium">Sheets Created</p>
                            </div>
                            <div>
                                <h4 className="text-xl font-extrabold text-gray-900">4.9★</h4>
                                <p className="text-xs text-gray-400 mt-1 font-medium">User Rating</p>
                            </div>
                            <div>
                                <h4 className="text-xl font-extrabold text-gray-900">100%</h4>
                                <p className="text-xs text-gray-400 mt-1 font-medium">Syllabus Aligned</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                        className="lg:col-span-5 flex justify-center lg:justify-end"
                    >
                        <div className="relative">
                            {/* Ambient background glow behind image */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 rounded-full blur-2xl filter pointer-events-none scale-90" />
                            <img
                                src={img1}
                                alt="AI Notes Illustration"
                                className="relative w-full max-w-[480px] h-auto object-contain hover:scale-[1.02] transition-transform duration-500 z-10"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="mt-20 sm:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    <FeatureCard
                        icon="✏️"
                        bg="bg-indigo-500/10"
                        border="border-indigo-500/20"
                        title="Smart Study Sheets"
                        description="Context-aware study guides aligned perfectly around syllabus modules."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon="🧬"
                        bg="bg-pink-500/10"
                        border="border-pink-500/20"
                        title="Concept Maps"
                        description="Visualize core relationships, flowcharts, and diagrams automatically."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon="⚡"
                        bg="bg-amber-500/10"
                        border="border-amber-500/20"
                        title="Recall Cards"
                        description="Quick-recall bullet summaries for rapid last-minute exam revisions."
                        delay={0.3}
                    />
                    <FeatureCard
                        icon="📄"
                        bg="bg-emerald-500/10"
                        border="border-emerald-500/20"
                        title="Print-Ready PDFs"
                        description="Export beautifully typeset documents ready for physical review in one click."
                        delay={0.4}
                    />
                </div>
            </main>
            <Footer />
        </div>
    )
}

function FeatureCard({ icon, bg, border, title, description, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delay, ease: 'easeOut' }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="rounded-3xl p-6 bg-black border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col gap-4 group cursor-pointer text-left"
        >
            <div className={`w-12 h-12 rounded-2xl ${bg} ${border} flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-bold tracking-tight text-white/95">{title}</h3>
                <p className="text-sm text-gray-400 mt-2 font-normal leading-relaxed">{description}</p>
            </div>
        </motion.div>
    )
}

export default Home