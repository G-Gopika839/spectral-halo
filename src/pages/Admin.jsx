import React, { useState, useEffect } from "react";
import {
    Eye,
    AlertTriangle,
    Award,
    CheckCircle,
    XCircle,
    Video,
    Brain,
    Target,
    TrendingUp,
    Shield,
    Camera,
    Clock,
    Link as LinkIcon,
    Radio,
    Save
} from "lucide-react";

const Admin = () => {
    const [liveUrl, setLiveUrl] = useState("");
    const [activeVideoId, setActiveVideoId] = useState("");
    const [saveStatus, setSaveStatus] = useState(null);

    useEffect(() => {
        const storedId = localStorage.getItem("liveStreamId");
        if (storedId) {
            setActiveVideoId(storedId);
        }
    }, []);

    const extractVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : url;
    };

    const handleSaveLive = () => {
        if (!liveUrl) return;
        
        const videoId = extractVideoId(liveUrl);
        if (videoId.length === 11) {
            localStorage.setItem("liveStreamId", videoId);
            setActiveVideoId(videoId);
            setSaveStatus("success");
            setLiveUrl("");
            setTimeout(() => setSaveStatus(null), 3000);
        } else {
            setSaveStatus("error");
            setTimeout(() => setSaveStatus(null), 3000);
        }
    };

    const handleClearLive = () => {
        localStorage.removeItem("liveStreamId");
        setActiveVideoId("");
        setSaveStatus("cleared");
        setTimeout(() => setSaveStatus(null), 3000);
    };

    return (
        <div className="section-container">

            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Platform Administration
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Manage live sessions and monitor platform rules
                </p>
            </div>

            {/* Live Stream Management Tool */}
            <div className="glass-card p-8 mb-8 border-2 border-indigo-500/20 shadow-xl shadow-indigo-500/5">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-lg text-white">
                            <Radio className="w-6 h-6 animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold">Live Stream Control</h2>
                    </div>
                    {activeVideoId && (
                        <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold border border-green-500/20 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                            ACTIVE: {activeVideoId}
                        </div>
                    )}
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Paste YouTube Live URL or Video ID (e.g., https://www.youtube.com/watch?v=...)"
                            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={liveUrl}
                            onChange={(e) => setLiveUrl(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleSaveLive}
                        className="flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-indigo-500/20"
                    >
                        <Save size={18} />
                        Go Live Now
                    </button>
                    {activeVideoId && (
                        <button
                            onClick={handleClearLive}
                            className="px-6 py-3 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 font-bold rounded-xl hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-200"
                        >
                            End Session
                        </button>
                    )}
                </div>

                {saveStatus === "success" && (
                    <p className="mt-4 text-green-600 text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                        <CheckCircle size={16} /> Live stream updated successfully! Students can now join.
                    </p>
                )}
                {saveStatus === "error" && (
                    <p className="mt-4 text-red-600 text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                        <XCircle size={16} /> Invalid YouTube URL or ID. Please check and try again.
                    </p>
                )}
                {saveStatus === "cleared" && (
                    <p className="mt-4 text-gray-600 text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                        <AlertTriangle size={16} /> Live session ended. Fallback stream will be used.
                    </p>
                )}

                <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                    <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70 uppercase font-bold tracking-wider mb-2">Instructions</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Enter the link to a scheduled or active YouTube live broadcast. Our system will automatically extract the video ID and update the Live Class player for all active students.
                    </p>
                </div>
            </div>

            {/* AI Monitoring System */}
            <div className="glass-card p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <Camera className="w-8 h-8 text-indigo-600" />
                    <h2 className="text-2xl font-bold">AI Monitoring System</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Face Detection */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl">
                        <Eye className="w-10 h-10 text-indigo-600 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Face Recognition</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Our AI continuously monitors your presence through webcam to ensure you're actively watching the course.
                        </p>
                    </div>

                    {/* Attention Tracking */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl">
                        <Brain className="w-10 h-10 text-blue-600 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Attention Tracking</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Advanced algorithms detect if you're looking away, distracted, or not paying attention to the content.
                        </p>
                    </div>

                    {/* Emotion Detection */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl">
                        <Target className="w-10 h-10 text-purple-600 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Engagement Analysis</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Real-time emotion detection to gauge your interest level and learning engagement throughout the course.
                        </p>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Note:</strong> All AI processing happens on your device (client-side) to ensure your privacy and security.
                    </p>
                </div>
            </div>

            {/* Scoring System */}
            <div className="glass-card p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <Award className="w-8 h-8 text-green-600" />
                    <h2 className="text-2xl font-bold">Scoring System (Out of 100)</h2>
                </div>

                <div className="space-y-6">
                    {/* Score Formula */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl">
                        <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-400">Score Formula:</h3>
                        <div className="text-center py-4">
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                Score = (Progress × 100) - (Warnings × 5) + (Correct Quizzes × 5)
                            </p>
                        </div>
                    </div>

                    {/* How to Earn Points */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <TrendingUp className="text-green-600" />
                            How to Earn Points
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-green-700 dark:text-green-400">Watch the Entire Video</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Your base score is calculated from how much of the video you've watched.
                                        100% progress = 100 base points.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-green-700 dark:text-green-400">Answer Quizzes Correctly</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Each correct quiz answer gives you +5 bonus points. Multiple quizzes can boost your score above 100!
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-green-700 dark:text-green-400">Stay Focused</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Keep your attention on the video. Look at the screen and engage with the content to avoid penalties.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-green-700 dark:text-green-400">Maintain Presence</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Stay in front of the webcam. Your face should be visible throughout the learning session.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* How to Lose Points */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <AlertTriangle className="text-red-600" />
                            Penalties (How You Lose Points)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-red-700 dark:text-red-400">Switching Tabs/Windows</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        <strong>-5 points per warning.</strong> Navigating to other websites or switching tabs is strictly prohibited.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-red-700 dark:text-red-400">Looking Away</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        <strong>-5 points per warning.</strong> Prolonged inattentiveness or looking away from the screen.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-red-700 dark:text-red-400">Face Not Detected</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        <strong>-5 points per warning.</strong> Leaving the camera view or covering the webcam.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-red-700 dark:text-red-400">Skipping Video</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Video skipping is disabled. You must watch the full content sequentially.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Platform Rules */}
            <div className="glass-card p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-bold">Platform Rules & Regulations</h2>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 rounded">
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                        <div>
                            <h4 className="font-semibold">Webcam Must Be Active</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Your webcam must be turned on and functioning throughout the entire course session. The camera automatically pauses when you pause the video.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 rounded">
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                        <div>
                            <h4 className="font-semibold">No Tab Switching</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                <strong className="text-red-600">Strictly Prohibited:</strong> Do not navigate to other websites, check social media, or switch browser tabs during the course. This will result in immediate warnings and score penalties.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 rounded">
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                        <div>
                            <h4 className="font-semibold">Complete All Quizzes</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Quizzes appear at regular intervals. You must answer them to continue. Correct answers boost your score with +5 bonus points each.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 rounded">
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                        <div>
                            <h4 className="font-semibold">No Video Skipping</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Fast-forwarding is disabled. You must watch the video from start to finish sequentially. Attempting to skip will rewind the video.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 rounded">
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                        <div>
                            <h4 className="font-semibold">Stay Engaged</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Maintain eye contact with the screen. Prolonged distraction or looking away will trigger attention warnings and reduce your engagement score.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 rounded">
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">6</div>
                        <div>
                            <h4 className="font-semibold">One Session Per Course</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Your progress is tracked per session. Refreshing the page or starting over will not reset penalties or improve your score.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tips for Maximum Score */}
            <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                    <Target className="w-8 h-8 text-purple-600" />
                    <h2 className="text-2xl font-bold">Tips for Maximum Score</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                        <Clock className="w-8 h-8 text-purple-600 mb-3" />
                        <h4 className="font-semibold mb-2">Watch Completely</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Complete 100% of the video to get full base points (100 points). Every second counts!
                        </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                        <Brain className="w-8 h-8 text-purple-600 mb-3" />
                        <h4 className="font-semibold mb-2">Answer All Quizzes</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Each correct answer = +5 points. Get all quizzes right to exceed 100 points!
                        </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                        <Eye className="w-8 h-8 text-purple-600 mb-3" />
                        <h4 className="font-semibold mb-2">Stay Focused</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Avoid warnings by keeping your eyes on the screen. Zero warnings = full points retained!
                        </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                        <Shield className="w-8 h-8 text-purple-600 mb-3" />
                        <h4 className="font-semibold mb-2">Follow All Rules</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Stay on the course page, don't switch tabs, and keep your webcam on for best results.
                        </p>
                    </div>
                </div>

                <div className="mt-6 p-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl">
                    <h4 className="font-bold text-xl mb-2">🎯 Perfect Score Example:</h4>
                    <p className="text-sm opacity-90">
                        Watch 100% of video (100 points) + Answer 4 quizzes correctly (4 × 5 = 20 points) + Zero warnings (0 penalties)
                        = <strong className="text-2xl">120 points!</strong>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Admin;
