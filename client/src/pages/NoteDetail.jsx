import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getNoteByIdApi, getDownloadPdfUrl } from '../api/axios';

const NoteDetail = () => {
    const { noteId } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                const data = await getNoteByIdApi(noteId);
                setNote(data.note);
            } catch (err) {
                console.error("Failed to load study guide details:", err);
                setError(err.response?.data?.message || err.message || "Failed to load study notes.");
            } finally {
                setLoading(false);
            }
        };
        fetchNoteDetails();
    }, [noteId]);

    const formatBoldText = (text) => {
        if (!text) return '';
        // Split by markdown bold tags **some text**
        const parts = text.split(/\*\*([^*]+)\*\*/g);
        return parts.map((part, i) => {
            if (i % 2 === 1) {
                return <strong key={i} className="font-extrabold text-gray-900">{part}</strong>;
            }
            return part;
        });
    };

    const renderMarkdown = (text) => {
        if (!text) return null;
        const lines = text.split("\n");
        let inCodeBlock = false;
        let codeLines = [];

        return lines.map((line, idx) => {
            const trimmed = line.trim();

            // Handle code blocks (e.g. ASCII diagrams or programming code)
            if (trimmed.startsWith("```")) {
                if (inCodeBlock) {
                    inCodeBlock = false;
                    const codeContent = codeLines.join("\n");
                    codeLines = [];
                    return (
                        <pre key={`code-${idx}`} className="bg-gray-50 border border-gray-150 rounded-2xl p-4 text-xs font-mono text-gray-700 overflow-x-auto my-4 text-left leading-relaxed">
                            <code>{codeContent}</code>
                        </pre>
                    );
                } else {
                    inCodeBlock = true;
                    return null;
                }
            }

            if (inCodeBlock) {
                codeLines.push(line);
                return null;
            }

            // Headers
            if (trimmed.startsWith("# ")) {
                return (
                    <h1 key={idx} className="text-3xl sm:text-4xl font-black text-gray-900 mt-8 mb-4 border-b border-gray-100 pb-3 text-left">
                        {trimmed.replace("# ", "")}
                    </h1>
                );
            }
            if (trimmed.startsWith("## ")) {
                return (
                    <h2 key={idx} className="text-2xl font-extrabold text-gray-800 mt-6 mb-3 text-left">
                        {trimmed.replace("## ", "")}
                    </h2>
                );
            }
            if (trimmed.startsWith("### ")) {
                return (
                    <h3 key={idx} className="text-xl font-bold text-gray-800 mt-5 mb-2 text-left">
                        {trimmed.replace("### ", "")}
                    </h3>
                );
            }

            // Lists
            if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                const bulletContent = trimmed.replace(/^[\*\-]\s+/, "");
                return (
                    <li key={idx} className="list-disc ml-6 text-gray-600 my-1.5 leading-relaxed text-left">
                        {formatBoldText(bulletContent)}
                    </li>
                );
            }

            // Horizontal dividers
            if (trimmed === "---") {
                return <hr key={idx} className="my-8 border-gray-100" />;
            }

            // Blank lines
            if (trimmed.length === 0) {
                return <div key={idx} className="h-2" />;
            }

            // Standard Paragraph
            return (
                <p key={idx} className="text-gray-650 my-3 leading-relaxed text-left">
                    {formatBoldText(trimmed)}
                </p>
            );
        });
    };

    const handleDownload = () => {
        if (!note) return;
        window.open(getDownloadPdfUrl(note._id), '_blank');
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-white text-black flex flex-col">
            {/* Background Glows */}
            <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-100/30 blur-[140px] pointer-events-none" />
            <div className="absolute top-[25%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-100/20 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[5%] left-[15%] w-[45%] h-[45%] rounded-full bg-blue-50/30 blur-[120px] pointer-events-none" />

            <Navbar />

            <main className="max-w-6xl w-full mx-auto px-6 sm:px-8 py-10 sm:py-16 flex-grow z-10">
                {/* Back to Library Navigation */}
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4 text-left">
                    <Link to="/my-notes" className="text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1.5 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Library
                    </Link>

                    <span className="text-xs font-bold text-gray-400">
                        Generated {note && new Date(note.createdAt).toLocaleDateString()}
                    </span>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm font-semibold text-gray-400 mt-4">Compiling worksheet...</span>
                    </div>
                ) : error ? (
                    <div className="p-6 rounded-2xl bg-red-50 border border-red-200/50 text-red-700 max-w-md mx-auto text-center mt-10">
                        <p className="font-semibold text-sm">Error Loading Pack: {error}</p>
                        <Link to="/my-notes" className="text-xs font-bold underline mt-3 block">Return to Library</Link>
                    </div>
                ) : (
                    /* Workspace grid split */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Side: Note content Sheet */}
                        <div className="lg:col-span-8 bg-white border border-gray-150/70 rounded-3xl p-6 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.03)] min-h-[500px]">
                            {renderMarkdown(note.content)}
                        </div>

                        {/* Right Side: Operations bar */}
                        <div className="lg:col-span-4 bg-gray-50 border border-gray-100 rounded-3xl p-6 text-left sticky top-24 shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
                            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200/80 pb-3">
                                File Properties
                            </h3>
                            
                            <div className="mt-4 space-y-4">
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Subject Title</span>
                                    <p className="text-sm font-bold text-gray-800 mt-0.5 leading-snug">
                                        {note.topic}
                                    </p>
                                </div>

                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Revision Mode</span>
                                    <p className="text-sm font-semibold text-gray-700 mt-0.5">
                                        {note.revisionMode === 'comprehensive' ? 'Comprehensive Guide' : 'Quick Summary Pack'}
                                    </p>
                                </div>

                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Exam Category</span>
                                    <p className="text-sm font-semibold text-gray-700 mt-0.5 capitalize">
                                        {note.examType} level
                                    </p>
                                </div>

                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Layout Diagrams</span>
                                    <p className="text-sm font-semibold text-gray-700 mt-0.5">
                                        {note.includeDiagrams ? 'Active (ASCII flowcharts)' : 'Disabled'}
                                    </p>
                                </div>

                                {note.extraInfo && (
                                    <div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Special Rules</span>
                                        <p className="text-xs text-gray-500 mt-0.5 italic leading-relaxed">
                                            "{note.extraInfo}"
                                        </p>
                                    </div>
                                )}

                                <div className="pt-6 border-t border-gray-200 flex flex-col gap-3">
                                    <motion.button
                                        onClick={handleDownload}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-bold text-sm shadow-[0_10px_25px_-5px_rgba(99,102,241,0.4)] hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download PDF
                                    </motion.button>

                                    <Link to="/generate" className="w-full">
                                        <button className="w-full py-3 rounded-2xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold text-xs transition-colors cursor-pointer">
                                            Create Another Pack
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default NoteDetail;
