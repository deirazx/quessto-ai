import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/authSlice';
import { logoutUserApi } from '../api/axios';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [creditsDropdownOpen, setCreditsDropdownOpen] = useState(false);
    const profileRef = useRef(null);
    const creditsRef = useRef(null);

    // Close dropdowns on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (creditsRef.current && !creditsRef.current.contains(event.target)) {
                setCreditsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUserApi();
            dispatch(logoutUser());
            setDropdownOpen(false);
            navigate('/auth');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-4 sticky top-0 z-50">
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="max-w-7xl mx-auto rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 px-6 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
                <div className="flex justify-between items-center">
                    {/* Left Side: Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2"
                        >
                            <h1 className="text-xl font-black bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent flex items-center gap-2">
                                ✨ ExamNotes Ai
                            </h1>
                        </motion.div>
                    </Link>

                    {/* Right Side: Remaining Credits or Login Button */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                {/* Credits Pill with Dropdown */}
                                <div className="relative" ref={creditsRef}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-xl shadow-[0_2px_10px_rgba(255,255,255,0.02)]"
                                    >
                                        <span className="text-sm font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent flex items-center gap-1.5">
                                            ⚡ {user.credits} Credits
                                        </span>
                                        <button
                                            onClick={() => setCreditsDropdownOpen(!creditsDropdownOpen)}
                                            className="flex items-center justify-center ml-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                                            title="Buy Credits"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 transform transition-transform duration-200 ${creditsDropdownOpen ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </motion.div>

                                    {/* Buy More Dropdown */}
                                    <AnimatePresence>
                                        {creditsDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 mt-3 w-64 rounded-xl bg-black/95 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 text-white z-50 backdrop-blur-xl"
                                            >
                                                <h3 className="text-sm font-bold text-gray-200 flex items-center gap-1.5">
                                                    🚀 Buy More Credits
                                                </h3>
                                                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                                                    Running low? Top up your account instantly to keep generating high-quality notes.
                                                </p>

                                                <div className="mt-4 space-y-2">
                                                    <div className="flex justify-between items-center bg-white/5 border border-white/5 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                                                        <span className="text-xs font-semibold text-gray-200">⚡ 50 Credits</span>
                                                        <span className="text-xs font-bold text-indigo-400">$1.99</span>
                                                    </div>
                                                    <div className="flex justify-between items-center bg-white/5 border border-white/5 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                                                        <span className="text-xs font-semibold text-gray-200">⚡ 150 Credits</span>
                                                        <span className="text-xs font-bold text-indigo-400">$4.99</span>
                                                    </div>
                                                </div>

                                                <Link
                                                    to="/buy-credits"
                                                    onClick={() => setCreditsDropdownOpen(false)}
                                                    className="block w-full text-center mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer"
                                                >
                                                    View All Packages
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Profile Dropdown Trigger */}
                                <div className="relative" ref={profileRef}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-extrabold flex items-center justify-center shadow-md hover:shadow-lg transition-all cursor-pointer border border-white/10"
                                    >
                                        {userInitial}
                                    </motion.button>

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {dropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 mt-3 w-52 rounded-xl bg-black/95 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2 text-white z-50 backdrop-blur-xl"
                                            >
                                                <div className="px-4 py-2.5 border-b border-white/5">
                                                    <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Signed in as</p>
                                                    <p className="text-sm font-bold truncate text-gray-200 mt-0.5">{user?.name}</p>
                                                    <p className="text-xs truncate text-gray-400">{user?.email}</p>
                                                </div>
                                                <div className="py-1">
                                                    <Link to="/#" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors">
                                                        📁 My Notes
                                                    </Link>
                                                    <Link to="/#" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors">
                                                        ⚙️ Settings
                                                    </Link>
                                                </div>
                                                <div className="border-t border-white/5 pt-1 mt-1">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
                                                    >
                                                        👋 Logout
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ) : (
                            <Link to="/auth">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-5 py-2 text-sm font-semibold text-black bg-white hover:bg-gray-100 rounded-xl transition-colors shadow-md hover:shadow-lg"
                                >
                                    Login
                                </motion.button>
                            </Link>
                        )}
                    </div>
                </div>
            </motion.nav>
        </div>
    );
};

export default Navbar;
