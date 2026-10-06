import React, { useState, useEffect } from 'react';
import { Users, Shield, Radio, MessageSquare, Settings, Share2, MoreHorizontal, Maximize } from 'lucide-react';
import LiveChat from '../components/LiveChat';
import WebcamMonitor from '../components/WebcamMonitor';
import EngagementMonitor from '../components/EngagementMonitor';

const LiveClass = () => {
    const [userStatus, setUserStatus] = useState({ isPresent: true, isAttentive: true, mood: 'neutral' });
    const [isLive, setIsLive] = useState(true);
    const [viewerCount, setViewerCount] = useState(124);
    const [currentVideoId, setCurrentVideoId] = useState("nu_pCVPKzTk"); // Default fallback

    useEffect(() => {
        const storedId = localStorage.getItem("liveStreamId");
        if (storedId) {
            setCurrentVideoId(storedId);
        }
    }, []);

    // Simulate viewer count fluctuation
    useEffect(() => {
        const interval = setInterval(() => {
            setViewerCount(prev => prev + (Math.random() > 0.5 ? 1 : -1));
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleStatusChange = (status) => {
        setUserStatus(status);
        console.log('AI Status Update:', status);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 lg:p-8">
            <div className="max-w-[1600px] mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-2 font-bold text-sm animate-pulse">
                            <Radio size={16} />
                            LIVE
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                {localStorage.getItem("liveStreamId") 
                                    ? "Live Session: " + (currentVideoId === "nu_pCVPKzTk" ? "Advanced React Patterns" : "Custom Live Stream")
                                    : "Masterclass: Advanced React Design Patterns & Performance"}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                                <span className="flex items-center gap-1">
                                    <Users size={14} />
                                    {viewerCount} watching
                                </span>
                                <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium">
                                    Hosted by Prof. Elena Vance
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                            <Share2 size={16} />
                            Share
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
                            <Settings size={16} />
                            Settings
                        </button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                    
                    {/* Left & Middle: Video Player & Controls */}
                    <div className="xl:col-span-3 space-y-6">
                        
                        {/* Video Player Area */}
                        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl group border-4 border-slate-200 dark:border-slate-800">
                            <iframe 
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0`}
                                title="Live Stream Content"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                            
                            {/* Overlay Controls */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                                <div className="flex items-center gap-6 text-white">
                                    <Radio className="text-red-500" />
                                    <div className="h-1 w-48 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500 w-full animate-progress"></div>
                                    </div>
                                    <span className="text-sm font-medium">LIVE · 42:15</span>
                                </div>
                                <div className="flex items-center gap-4 text-white">
                                    <Maximize className="cursor-pointer hover:scale-110 transition" />
                                    <MoreHorizontal className="cursor-pointer hover:scale-110 transition" />
                                </div>
                            </div>

                            {/* Engagement Pulse Overlay */}
                            <div className="absolute top-6 left-6 flex items-center gap-3">
                                <div className="bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2 text-white text-xs font-medium">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    Connection: Excellent
                                </div>
                            </div>
                        </div>

                        {/* Interactive Tools / Stats Below Player */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Subject</h4>
                                <p className="text-slate-800 dark:text-slate-200 font-semibold">Render Optimization</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Goal</h4>
                                <p className="text-slate-800 dark:text-slate-200 font-semibold">95% Understanding Score</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Next Milestone</h4>
                                <p className="text-slate-800 dark:text-slate-200 font-semibold">Live Q&A in 15m</p>
                            </div>
                        </div>

                        {/* Description / Resources */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <h3 className="text-xl font-bold mb-4">Lesson description</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Join Professor Elena Vance in this deep-dive session exploring the frontiers of React 19. 
                                We'll cover everything from Server Actions and the useOptimistic hook to complex performance 
                                profiling in large-scale applications. Ensure your webcam is enabled for AI engagement analysis 
                                to qualify for the completion certificate.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: AI Monitor & Chat */}
                    <div className="flex flex-col gap-6 h-[calc(100vh-140px)]">
                        
                        {/* AI Monitoring Section */}
                        <div className="flex flex-col gap-4">
                            <div className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg shadow-indigo-500/20">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold flex items-center gap-2">
                                        <Shield size={18} />
                                        AI Learning Assistant
                                    </h3>
                                    <div className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold">ACTIVE</div>
                                </div>
                                <div className="aspect-video relative rounded-xl overflow-hidden bg-slate-800 ring-4 ring-white/10">
                                    <WebcamMonitor 
                                        isActive={isLive} 
                                        onStatusChange={handleStatusChange} 
                                    />
                                </div>
                            </div>

                            <EngagementMonitor status={userStatus} />
                        </div>

                        {/* Live Chat Section */}
                        <div className="flex-1 min-h-0">
                            <LiveChat />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LiveClass;
