import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getMyNotesApi, getDownloadPdfUrl } from '../api/axios';

const MyNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await getMyNotesApi();
                setNotes(data.notes || []);
            } catch (err) {
                console.error("Failed to load user files:", err);
                setError(err.response?.data?.message || err.message || "Failed to load guides.");
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    const handleDownload = (e, noteId) => {
        e.stopPropagation(); // Prevent card click navigation
        window.open(getDownloadPdfUrl(noteId), '_blank');
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-white text-black flex flex-col">
            {/* Background Glows */}
            <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-100/30 blur-[140px] pointer-events-none" />
            <div className="absolute top-[25%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-100/20 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[5%] left-[15%] w-[45%] h-[45%] rounded-full bg-blue-50/30 blur-[120px] pointer-events-none" />

            <Navbar />

            <main className="max-w-6xl w-full mx-auto px-6 sm:px-8 py-10 sm:py-16 flex-grow z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-8 text-left">
                    <div>
                        <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 bg-clip-text text-transparent">
                            My Study Library
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">Access all your previously generated study packs and PDF exports.</p>
                    </div>

                    <Link to="/generate">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-[0_10px_25px_-5px_rgba(99,102,241,0.3)] hover:bg-indigo-700 transition-colors cursor-pointer"
                        >
                            + Generate New Notes
                        </motion.button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm font-semibold text-gray-400 mt-4">Loading your notes...</span>
                    </div>
                ) : error ? (
                    <div className="p-6 rounded-2xl bg-red-50 border border-red-200/50 text-red-700 max-w-md mx-auto text-center mt-10">
                        <p className="font-semibold text-sm">Error: {error}</p>
                    </div>
                ) : notes.length === 0 ? (
                    /* Empty state */
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md mx-auto text-center py-20 bg-gray-50/50 border border-gray-100 rounded-3xl p-8"
                    >
                        <span className="text-5xl">📁</span>
                        <h3 className="text-xl font-bold mt-6 text-gray-800">Your Library is Empty</h3>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                            You haven't generated any study notes yet. Enter a topic parameters to compile your first AI Study guide sheet.
                        </p>
                        <Link to="/generate">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="mt-6 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md cursor-pointer"
                            >
                                Generate First Pack
                            </motion.button>
                        </Link>
                    </motion.div>
                ) : (
                    /* Notes Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note, index) => (
                            <motion.div
                                key={note._id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -4, shadow: "0 20px 40px rgba(0,0,0,0.04)" }}
                                onClick={() => navigate(`/notes/${note._id}`)}
                                className="bg-white border border-gray-100 hover:border-indigo-150 p-6 rounded-3xl shadow-[0_10px_35px_-10px_rgba(0,0,0,0.02)] transition-all cursor-pointer text-left flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap mb-4">
                                        <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold ${
                                            note.revisionMode === 'comprehensive' 
                                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-100/50'
                                                : 'bg-pink-50 text-pink-700 border border-pink-100/50'
                                        }`}>
                                            {note.revisionMode === 'comprehensive' ? 'Comprehensive' : 'Quick Summary'}
                                        </span>
                                        <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-200/50 capitalize">
                                            {note.examType} Target
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors">
                                        {note.topic}
                                    </h3>
                                    
                                    {note.extraInfo && (
                                        <p className="text-xs text-gray-400 mt-2 line-clamp-2 italic">
                                            "{note.extraInfo}"
                                        </p>
                                    )}
                                </div>

                                <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-between">
                                    <span className="text-[10px] font-semibold text-gray-400">
                                        {new Date(note.createdAt).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => handleDownload(e, note._id)}
                                            className="p-2 rounded-xl bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-100 text-gray-500 transition-all cursor-pointer"
                                            title="Download PDF"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </button>
                                        <button
                                            className="px-3 py-2 rounded-xl bg-gray-950 hover:bg-indigo-600 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                                        >
                                            Read 📖
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default MyNotes;
