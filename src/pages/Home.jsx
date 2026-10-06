import React from "react";
import { Link } from "react-router-dom";
import { PlayCircle, Sparkles, Radio } from "lucide-react";

const courses = [
    {
        id: 1,
        title: "Python for Beginners",
        description: "Learn Python programming from scratch.",
        thumbnail: "https://img.youtube.com/vi/_uQrJ0TkZlc/hqdefault.jpg",
        videoId: "_uQrJ0TkZlc",
    },
    {
        id: 2,
        title: "Machine Learning A-Z",
        description: "Hands-on Python & R in Data Science.",
        thumbnail: "https://img.youtube.com/vi/GwIo3gDZCVQ/hqdefault.jpg",
        videoId: "GwIo3gDZCVQ",
    },
    {
        id: 3,
        title: "Web Development Bootcamp",
        description: "Master modern web development from scratch.",
        thumbnail: "https://img.youtube.com/vi/nu_pCVPKzTk/hqdefault.jpg",
        videoId: "nu_pCVPKzTk",
    },
];

const Home = () => {
    return (
        <div className="section-container space-y-16">

            {/* HERO SECTION */}
            <div className="text-center max-w-3xl mx-auto space-y-6">
                <div className="flex justify-center">
                    <Sparkles className="text-primary-500" size={40} />
                </div>

                <h1 className="text-5xl font-extrabold text-white">
                    AI-Powered Learning Experience
                </h1>

                <p className="text-lg text-gray-500 dark:text-gray-400">
                    Learn smarter with real-time engagement tracking,
                    AI proctoring, and performance analytics.
                </p>

                <Link
                    to="/dashboard"
                    className="primary-btn inline-flex items-center gap-2"
                >
                    View Dashboard
                </Link>
            </div>

            {/* LIVE CLASS BANNER */}
            <div className="relative overflow-hidden rounded-3xl bg-indigo-600 p-8 md:p-12 shadow-2xl shadow-indigo-500/20">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl text-center md:text-left space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                            <Radio size={14} />
                            LIVE NOW
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                            Advanced React Performance Masterclass
                        </h2>
                        <p className="text-indigo-100 text-lg opacity-90">
                            Join Professor Elena Vance and 120+ other students in a deep-dive session on React 19 performance patterns.
                        </p>
                        <Link
                            to="/live"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-slate-50 transition-all hover:scale-105 shadow-lg"
                        >
                            Join Session Now
                            <PlayCircle size={20} />
                        </Link>
                    </div>
                    <div className="hidden lg:block relative">
                        <div className="w-64 h-40 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-2xl">
                            <div className="space-y-3">
                                <div className="h-2 w-24 bg-white/20 rounded"></div>
                                <div className="flex gap-2">
                                    <div className="w-10 h-10 rounded-full bg-indigo-400/30"></div>
                                    <div className="space-y-2">
                                        <div className="h-2 w-32 bg-white/20 rounded"></div>
                                        <div className="h-2 w-20 bg-white/10 rounded"></div>
                                    </div>
                                </div>
                                <div className="h-12 w-full bg-indigo-500/30 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/30 blur-3xl rounded-full"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-400/30 blur-3xl rounded-full"></div>
                    </div>
                </div>
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h100v100H0z" fill="url(#a)"/>
                        <defs>
                            <pattern id="a" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="2" cy="2" r="1" fill="#fff"/>
                            </pattern>
                        </defs>
                    </svg>
                </div>
            </div>

            {/* COURSES SECTION */}
            <div>
                <h2 className="text-3xl font-bold mb-10 text-center">
                    Explore Courses
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="glass-card overflow-hidden group transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Thumbnail */}
                            <div className="relative">
                                <img
                                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                                    src={course.thumbnail}
                                    alt={course.title}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center pb-4">
                                    <Link
                                        to={`/course/${course.videoId}`}
                                        className="bg-white text-black px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:scale-105 transition"
                                    >
                                        Start Learning
                                        <PlayCircle size={18} />
                                    </Link>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-3">
                                <h3 className="text-xl font-semibold">
                                    {course.title}
                                </h3>

                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    {course.description}
                                </p>

                                <Link
                                    to={`/course/${course.videoId}`}
                                    className="text-primary-600 font-medium hover:underline"
                                >
                                    Start Course →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Home;
