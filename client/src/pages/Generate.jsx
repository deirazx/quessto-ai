import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { generateNotesApi } from '../api/axios';
import { setUser } from '../redux/authSlice';

const Generate = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        topic: '',
        revisionMode: 'comprehensive', // 'comprehensive' or 'quick'
        examType: 'university', // 'school', 'university', 'competitive', 'self'
        includeDiagrams: true,
        extraInfo: ''
    });

    const [isSimulating, setIsSimulating] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [loadingProgress, setLoadingProgress] = useState(0);

    const topicSuggestions = [
        'Data Structures & Algorithms',
        'Quantum Physics',
        'Organic Chemistry',
        'World War II History',
        'Microeconomics Basics'
    ];

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.topic.trim()) return;

        setIsSimulating(true);
        setLoadingProgress(10);
        setStatusText('Initializing AI Note Engine...');

        // Start progress simulation
        let currentProgress = 10;
        const interval = setInterval(() => {
            if (currentProgress < 90) {
                currentProgress += Math.floor(Math.random() * 8) + 3;
                if (currentProgress > 90) currentProgress = 90;
                setLoadingProgress(currentProgress);

                // Update text based on current progress
                if (currentProgress < 35) {
                    setStatusText('Parsing subject syllabus requirements...');
                } else if (currentProgress < 60) {
                    setStatusText('Generating high-yield academic chapters...');
                } else if (currentProgress < 85) {
                    setStatusText('Structuring visual concepts and vector diagrams...');
                } else {
                    setStatusText('Compiling final print-ready PDF pack...');
                }
            }
        }, 800);

        try {
            // Make the actual API call
            const data = await generateNotesApi(formData);
            
            clearInterval(interval);
            setLoadingProgress(100);
            setStatusText('Success! Your study pack is ready.');

            // Update user credits in redux store
            if (user && data.remainingCredits !== undefined) {
                dispatch(setUser({ ...user, credits: data.remainingCredits }));
            }

            setTimeout(() => {
                setIsSimulating(false);
                
                // Reset form
                setFormData({
                    topic: '',
                    revisionMode: 'comprehensive',
                    examType: 'university',
                    includeDiagrams: true,
                    extraInfo: ''
                });
                
                navigate(`/notes/${data.note._id}`);
            }, 1000);
        } catch (error) {
            clearInterval(interval);
            setIsSimulating(false);
            console.error("Notes generation failed:", error);
            alert(`❌ Error generating notes: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-white text-black flex flex-col">
            {/* Background Ambient Glows */}
            <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-100/30 blur-[140px] pointer-events-none" />
            <div className="absolute top-[25%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-100/20 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[5%] left-[15%] w-[45%] h-[45%] rounded-full bg-blue-50/30 blur-[120px] pointer-events-none" />

            <Navbar />

            {/* Main content */}
            <main className="max-w-6xl w-full mx-auto px-6 sm:px-8 py-10 sm:py-16 flex-grow z-10 flex flex-col justify-center items-center">
                <AnimatePresence mode="wait">
                    {isSimulating ? (
                        /* Simulated Generation Screen */
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4 }}
                            className="w-full max-w-xl bg-black border border-white/10 rounded-3xl p-8 text-white text-center shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center py-16"
                        >
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                {/* Rotating progress indicator */}
                                <div className="absolute inset-0 rounded-full border-4 border-white/5 border-t-indigo-500 border-r-purple-500 animate-spin" />
                                <span className="text-3xl animate-bounce">✨</span>
                            </div>
                            
                            <h3 className="text-2xl font-black mt-8 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                                Crafting Your AI Study Pack
                            </h3>
                            <p className="text-sm text-gray-400 mt-2 max-w-xs mx-auto">{statusText}</p>
                            
                            {/* Bar loading element */}
                            <div className="w-full bg-white/5 h-2.5 rounded-full mt-10 overflow-hidden border border-white/5 relative">
                                <motion.div 
                                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full absolute left-0 top-0"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${loadingProgress}%` }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>
                            <span className="text-xs font-bold text-gray-500 mt-3">{loadingProgress}% Complete</span>
                        </motion.div>
                    ) : (
                        /* Configuration Form */
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4 }}
                            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                        >
                            {/* Form Column */}
                            <div className="lg:col-span-8 bg-black border border-white/10 rounded-3xl p-6 sm:p-8 text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                                <div className="mb-6">
                                    <h2 className="text-3xl font-black bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                                        Configure Your AI Pack
                                    </h2>
                                    <p className="text-sm text-gray-400 mt-1">Specify your topic parameters to compile custom exam notes.</p>
                                </div>

                                <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                                    {/* Topic Input */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider text-left">Subject or Topic Name</label>
                                        <input 
                                            type="text"
                                            required
                                            value={formData.topic}
                                            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                            placeholder="e.g. Quantum Mechanics, Photosynthesis, French Revolution"
                                            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white placeholder-gray-500"
                                        />
                                        
                                        {/* Suggestions */}
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {topicSuggestions.map((suggestion) => (
                                                <button
                                                    key={suggestion}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, topic: suggestion })}
                                                    className="text-xs px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/5 transition-all text-gray-300 cursor-pointer"
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Revision Mode Selection */}
                                    <div className="flex flex-col gap-3">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider text-left">Revision Depth</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Comprehensive Card */}
                                            <div 
                                                onClick={() => setFormData({ ...formData, revisionMode: 'comprehensive' })}
                                                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex items-start gap-3 ${
                                                    formData.revisionMode === 'comprehensive' 
                                                        ? 'bg-indigo-600/10 border-indigo-500' 
                                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                }`}
                                            >
                                                <span className="text-2xl mt-0.5">📖</span>
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-200">Comprehensive Pack</h4>
                                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">Detailed explanations, module concepts, and revision Q&As.</p>
                                                </div>
                                            </div>

                                            {/* Quick Card */}
                                            <div 
                                                onClick={() => setFormData({ ...formData, revisionMode: 'quick' })}
                                                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex items-start gap-3 ${
                                                    formData.revisionMode === 'quick' 
                                                        ? 'bg-indigo-600/10 border-indigo-500' 
                                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                }`}
                                            >
                                                <span className="text-2xl mt-0.5">⚡</span>
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-200">Quick Recall Sheet</h4>
                                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">Condensed definitions, formula cards, and rapid-recall bullet summaries.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Exam Type Target */}
                                    <div className="flex flex-col gap-2.5">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider text-left">Target Exam Type</label>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'school', label: 'High School / Board' },
                                                { id: 'university', label: 'University / College' },
                                                { id: 'competitive', label: 'Competitive Entrance' },
                                                { id: 'self', label: 'General / Self-Study' }
                                            ].map((exam) => (
                                                <button
                                                    key={exam.id}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, examType: exam.id })}
                                                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                                        formData.examType === exam.id
                                                            ? 'bg-white text-black border-white'
                                                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                                                    }`}
                                                >
                                                    {exam.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Include Diagrams */}
                                    <div className="flex justify-between items-center bg-white/5 border border-white/5 p-4 rounded-2xl">
                                        <div className="flex flex-col text-left">
                                            <span className="text-sm font-bold text-gray-200">Include Concept Diagrams</span>
                                            <span className="text-xs text-gray-400 mt-0.5">Auto-generates flowchart visual layouts.</span>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={() => setFormData({ ...formData, includeDiagrams: !formData.includeDiagrams })}
                                            className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${formData.includeDiagrams ? 'bg-indigo-600' : 'bg-gray-700'}`}
                                        >
                                            <motion.div 
                                                className="w-4 h-4 bg-white rounded-full shadow-md"
                                                layout
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                style={{ marginLeft: formData.includeDiagrams ? '24px' : '0px' }}
                                            />
                                        </button>
                                    </div>

                                    {/* Additional Focus Detail */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider text-left">Extra Instructions (Optional)</label>
                                        <textarea 
                                            value={formData.extraInfo}
                                            onChange={(e) => setFormData({ ...formData, extraInfo: e.target.value })}
                                            placeholder="Focus on Newton's equations, ignore history detail..."
                                            rows={3}
                                            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white placeholder-gray-500 resize-none"
                                        />
                                    </div>

                                    {/* Form Submit */}
                                    <div className="flex items-center justify-end gap-3 pt-2">
                                        <button 
                                            type="button" 
                                            onClick={() => navigate('/')}
                                            className="px-5 py-3 text-sm font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit"
                                            className="px-6 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-[0_10px_25px_-5px_rgba(99,102,241,0.4)] hover:bg-indigo-700 transition-colors cursor-pointer"
                                        >
                                            Generate AI Notes (12 Credits)
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Summary Preview Column (Right Side) */}
                            <div className="lg:col-span-4 bg-gray-50 border border-gray-100 rounded-3xl p-6 text-gray-800 text-left sticky top-24 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200/80 pb-3">
                                    Spec Sheet Preview
                                </h3>
                                
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Target Topic</span>
                                        <p className="text-sm font-bold text-gray-700 mt-0.5 truncate">
                                            {formData.topic || 'Not specified'}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Revision Depth</span>
                                        <p className="text-sm font-semibold text-gray-700 mt-0.5">
                                            {formData.revisionMode === 'comprehensive' ? 'Comprehensive Study Pack' : 'Quick Recall Bullet Sheet'}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Exam Target</span>
                                        <p className="text-sm font-semibold text-gray-700 mt-0.5 capitalise capitalize">
                                            {formData.examType} target
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Concept Layouts</span>
                                        <p className="text-sm font-semibold text-gray-700 mt-0.5">
                                            {formData.includeDiagrams ? 'Enabled (Auto Flowcharts)' : 'Disabled'}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-semibold text-gray-500">Available Credits</span>
                                            <span className="font-bold text-gray-800">⚡ {user?.credits || 0}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm mt-1">
                                            <span className="font-semibold text-gray-500">Cost</span>
                                            <span className="font-bold text-indigo-600">⚡ 12 Credits</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
};

export default Generate;
