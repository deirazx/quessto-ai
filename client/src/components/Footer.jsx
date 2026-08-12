import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full bg-[#09090B] text-gray-400 border-t border-white/5 mt-24">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    {/* Brand Info */}
                    <div className="md:col-span-5 flex flex-col items-start gap-4">
                        <Link to="/" className="flex items-center gap-2">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center gap-2"
                            >
                                <h2 className="text-xl font-black bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent flex items-center gap-2">
                                    ✨ ExamNotes Ai
                                </h2>
                            </motion.div>
                        </Link>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-sm text-left">
                            Supercharge your studies. Generate syllabus-aligned AI study notes, diagrams, and worksheets in seconds.
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-left">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Product</h4>
                            <Link to="/#" className="text-sm hover:text-white transition-colors">Features</Link>
                            <Link to="/buy-credits" className="text-sm hover:text-white transition-colors">Pricing</Link>
                            <Link to="/#" className="text-sm hover:text-white transition-colors">FAQ</Link>
                        </div>
                        {/* Column 2 */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Resources</h4>
                            <Link to="/#" className="text-sm hover:text-white transition-colors">Guides</Link>
                            <Link to="/#" className="text-sm hover:text-white transition-colors">Templates</Link>
                            <Link to="/#" className="text-sm hover:text-white transition-colors">API Docs</Link>
                        </div>
                        {/* Column 3 */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Company</h4>
                            <Link to="/#" className="text-sm hover:text-white transition-colors">About Us</Link>
                            <Link to="/#" className="text-sm hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="/#" className="text-sm hover:text-white transition-colors">Terms</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} ExamNotes Ai. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">GitHub</a>
                        <a href="#" className="hover:text-white transition-colors">Discord</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
