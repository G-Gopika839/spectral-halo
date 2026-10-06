import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import QuizOverlay from '../components/QuizOverlay';
import WebcamMonitor from '../components/WebcamMonitor';
import { AnalyticsService } from '../services/analytics';
import { progressTracker } from '../services/progressTracker';
import { AlertTriangle, CheckCircle, Brain, Clock, Eye, EyeOff } from 'lucide-react';

// Quiz questions that appear every 5 minutes
const QUIZ_QUESTIONS_BY_INTERVAL = {
    '_uQrJ0TkZlc': [ // Python video ID
        // Time-based quiz for testing (at 30 seconds)
        {
            time: 30, // 30 seconds
            question: {
                text: "Welcome! What is Python?",
                correctAnswer: 0
            },
            options: ["A programming language", "A snake", "A framework", "A database"]
        },
        {
            time: 120, // 2 minutes (120 seconds)
            question: {
                text: "What are variables used for in Python?",
                correctAnswer: 1
            },
            options: ["To create loops", "To store data values", "To print output", "To import modules"]
        },
        {
            interval: 1, // 5 minutes (300 seconds)
            question: {
                text: "What is the correct file extension for Python files?",
                correctAnswer: 0
            },
            options: [".py", ".python", ".pt", ".js"]
        },
        {
            interval: 2, // 10 minutes (600 seconds)
            question: {
                text: "Which function is used to output text in Python?",
                correctAnswer: 1
            },
            options: ["console.log()", "print()", "echo()", "write()"]
        },
        {
            interval: 3, // 15 minutes (900 seconds)
            question: {
                text: "What keyword is used to define a function in Python?",
                correctAnswer: 2
            },
            options: ["function", "func", "def", "define"]
        },
        {
            interval: 4, // 20 minutes (1200 seconds)
            question: {
                text: "Which data type is mutable in Python?",
                correctAnswer: 0
            },
            options: ["List", "Tuple", "String", "Integer"]
        },
    ],
    'default': [
        {
            interval: 1, // 5 minutes
            question: { text: "Are you paying attention to the course?", correctAnswer: 0 },
            options: ["Yes", "No"]
        },
        {
            interval: 2, // 10 minutes
            question: { text: "Have you understood the content so far?", correctAnswer: 0 },
            options: ["Yes, clearly", "Need review", "Not at all"]
        }
    ]
};

const CoursePlayer = () => {
    const { videoId } = useParams();
    const [playerState, setPlayerState] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [isProctoringActive, setIsProctoringActive] = useState(false);
    const [userStatus, setUserStatus] = useState({ isPresent: true, isAttentive: true, mood: 'neutral' });
    const [warnings, setWarnings] = useState(0);
    const [penaltyApplied, setPenaltyApplied] = useState(false);
    const [completedIntervals, setCompletedIntervals] = useState(new Set());
    const [quizScore, setQuizScore] = useState(0); // Track quiz bonuses
    const playerRef = useRef(null);

    // Calculate score using useMemo for instant updates
    const currentScore = useMemo(() => {
        const BASE_SCORE = 100;
        const WARNING_PENALTY = 5;

        let score = 0;

        // Calculate progress score based on watch time vs video duration
        if (videoDuration > 0) {
            const progressPercentage = (currentTime / videoDuration);
            score = progressPercentage * BASE_SCORE;
        }

        // Deduct for warnings
        score -= (warnings * WARNING_PENALTY);

        // Add quiz bonuses
        score += quizScore;

        const finalScore = Math.max(0, Math.round(score));

        return finalScore;
    }, [currentTime, videoDuration, warnings, quizScore]);

    // Initialize Analytics
    useEffect(() => {
        AnalyticsService.init('user-123', videoId);

        return () => {
            const report = AnalyticsService.getReport();
            const finalScore = currentScore;
            console.log("Session Report:", report);
            console.log("Final Score:", finalScore);

            // Save progress to dashboard
            progressTracker.updateCourseProgress(videoId, {
                courseName: "Python for Beginners",
                score: finalScore,
                watchTime: currentTime,
                videoDuration: videoDuration,
                quizzesTaken: report.quizzesTaken || 0,
                quizzesPassed: report.correctAnswers || 0,
                warnings: warnings
            });

            AnalyticsService.cleanup();
        };
    }, [videoId, currentTime, videoDuration, warnings, quizScore, currentScore]);

    const handleVideoStateChange = (event) => {
        setPlayerState(event.data);
        if (event.data === 2) { // Paused
            AnalyticsService.logPause();
        }
    };

    const handleTimeUpdate = (time) => {
        setCurrentTime(time);

        const quizList = QUIZ_QUESTIONS_BY_INTERVAL[videoId] || QUIZ_QUESTIONS_BY_INTERVAL['default'];

        // Check for time-based quizzes (e.g., at 60 seconds)
        const timeBasedQuiz = quizList.find(q => {
            if (q.time) {
                const timeSinceQuiz = Math.abs(time - q.time);
                return timeSinceQuiz < 2 && !completedIntervals.has(`time-${q.time}`);
            }
            return false;
        });

        if (timeBasedQuiz && !activeQuiz) {
            setActiveQuiz(timeBasedQuiz);
            return;
        }

        // Check for 5-minute interval quizzes
        // Don't show interval quizzes in the first 30 seconds
        if (time >= 30) {
            const currentInterval = Math.floor(time / 300) + 1; // 300 seconds = 5 minutes
            const timeInInterval = time % 300;

            // Show quiz at the start of each 5-minute interval (within first 2 seconds)
            if (timeInInterval < 2 && !completedIntervals.has(currentInterval) && !activeQuiz) {
                const quiz = quizList.find(q => q.interval === currentInterval);

                if (quiz) {
                    setActiveQuiz(quiz);
                }
            }
        }
    };

    const handleQuizAnswer = (isCorrect) => {
        AnalyticsService.logQuizResult(isCorrect);

        if (activeQuiz) {
            // Mark quiz as completed
            if (activeQuiz.time) {
                // Time-based quiz
                setCompletedIntervals(prev => new Set([...prev, `time-${activeQuiz.time}`]));
            } else if (activeQuiz.interval) {
                // Interval-based quiz (5-minute intervals)
                const currentInterval = Math.floor(currentTime / 300) + 1;
                setCompletedIntervals(prev => new Set([...prev, currentInterval]));
            }
        }

        // Add bonus points for correct answers - update immediately
        if (isCorrect) {
            setQuizScore(prev => {
                const newScore = prev + 5;
                console.log('✅ Quiz Correct! New quiz bonus:', newScore);
                return newScore;
            });
        }

        // Close the quiz overlay
        setActiveQuiz(null);
    };

    // Monitor User Status & Tab Switching
    useEffect(() => {
        let warningInterval;

        if (isProctoringActive && (!userStatus.isAttentive || !userStatus.isPresent)) {
            warningInterval = setInterval(() => {
                setWarnings(prev => {
                    const newCount = prev + 1;

                    if (newCount >= 5 && !penaltyApplied) {
                        alert("Warning limit exceeded. Final assessment score will be reduced.");

                        // Reduce score (example: minus 20 points)
                        setSessionScore(prevScore => Math.max(prevScore - 20, 0));

                        setPenaltyApplied(true);
                    }

                    return newCount;
                });
            }, 5000);
        }

        return () => clearInterval(warningInterval);
    }, [isProctoringActive, userStatus, penaltyApplied]);


    // Tab Switching detection with Progressive Alerts
    useEffect(() => {
        const checkTabFocus = () => {
            if (document.hidden) {
                setWarnings(prev => {
                    const newCount = prev + 1;

                    // Progressive alert messages
                    if (newCount <= 4) {
                        alert(`⚠️ Warning ${newCount}/5: Please do not switch tabs during the course!`);
                    } else if (newCount === 5) {
                        alert("⚠️ FINAL WARNING: Session will be terminated in 30 seconds. You have exceeded the warning limit!");

                        // Show confirm dialog but also set forced redirect
                        setTimeout(() => {
                            alert("Session Terminated due to excessive tab switching. Redirecting to home page...");
                        }, 2000);

                        // Force redirect after 30 seconds no matter what
                        setTimeout(() => {
                            window.location.href = '/';
                        }, 30000); // 30 seconds
                    }

                    return newCount;
                });
            }
        };
        document.addEventListener("visibilitychange", checkTabFocus);
        return () => document.removeEventListener("visibilitychange", checkTabFocus);
    }, []);

    const handleWebcamStatus = (status) => {
        setUserStatus(status);
        setIsProctoringActive(true);
        // Additional proctoring logic (e.g. pause video) can be added here
    };

    const handleVideoReady = (event) => {
        playerRef.current = event.target;
        const duration = event.target.getDuration();
        setVideoDuration(duration);
        console.log("Video Duration:", duration, "seconds");
    };

    return (
        <div className="section-container">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

                {/* LEFT SIDE - Video Section */}
                <div className="xl:col-span-2 space-y-6">

                    {/* Warning Banner */}
                    {warnings > 0 && (
                        <div className="glass-card border border-red-400 bg-red-50/60 dark:bg-red-900/20 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                <AlertTriangle />
                                <span className="font-semibold">
                                    Warning {warnings}/5 – Stay focused or session will terminate.
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Video Player */}
                    <div className="relative glass-card p-4">
                        <VideoPlayer
                            videoId={videoId}
                            onStateChange={handleVideoStateChange}
                            onReady={handleVideoReady}
                            getCurrentTime={handleTimeUpdate}
                        >
                            {activeQuiz && (
                                <QuizOverlay
                                    question={activeQuiz.question}
                                    options={activeQuiz.options}
                                    onAnswer={handleQuizAnswer}
                                />
                            )}

                            {!userStatus.isAttentive && isProctoringActive && (
                                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full flex items-center animate-pulse z-10 shadow-lg">
                                    <EyeOff className="w-4 h-4 mr-2" />
                                    Distracted
                                </div>
                            )}
                        </VideoPlayer>
                    </div>

                    {/* Course Info */}
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            AI Learning Module
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Video ID: {videoId}
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                        <div className="glass-card p-5 flex items-center gap-3">
                            <CheckCircle className="text-green-500" />
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <p className="font-semibold">Active</p>
                            </div>
                        </div>

                        <div className="glass-card p-5 flex items-center gap-3">
                            <Clock className="text-blue-500" />
                            <div>
                                <p className="text-sm text-gray-500">Time</p>
                                <p className="font-semibold">{Math.floor(currentTime)}s</p>
                            </div>
                        </div>

                        <div className="glass-card p-5 flex items-center gap-3">
                            <Brain className="text-purple-500" />
                            <div>
                                <p className="text-sm text-gray-500">Score</p>
                                <p className="font-semibold">{currentScore}/100</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT SIDE - Monitoring Panel */}
                <div className="space-y-6">

                    {/* Webcam */}
                    <div className="glass-card p-4">
                        <WebcamMonitor
                            onStatusChange={handleWebcamStatus}
                            isActive={playerState === 1} // YouTube player state: 1 = playing, 2 = paused
                        />
                    </div>

                    {/* Analytics Panel */}
                    <div className="glass-card p-6">
                        <h3 className="text-xl font-semibold mb-6">
                            Session Analytics
                        </h3>

                        <div className="space-y-5">

                            <div className="flex justify-between">
                                <span className="text-gray-500">Engagement</span>
                                <span className={`font-semibold ${userStatus.isAttentive ? "text-green-500" : "text-red-500"}`}>
                                    {userStatus.isAttentive ? "High" : "Low"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Warnings</span>
                                <span className="font-semibold text-red-500">
                                    {warnings}/5
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Progress</span>
                                <span className="font-semibold">
                                    {videoDuration > 0 ? Math.round((currentTime / videoDuration) * 100) : 0}%
                                </span>
                            </div>

                        </div>

                        {/* Proctoring Box */}
                        <div className="mt-6 p-4 rounded-xl bg-yellow-100/60 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="text-yellow-600" />
                                <span className="font-semibold text-yellow-800 dark:text-yellow-300">
                                    Proctoring Active
                                </span>
                            </div>

                            <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                Webcam AI tracking is enabled.
                            </p>

                            <div className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                                Status: {userStatus.isPresent
                                    ? userStatus.isAttentive
                                        ? "Focused"
                                        : "Distracted"
                                    : "Absent"}
                                {userStatus.mood && ` • Mood: ${userStatus.mood}`}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

};

export default CoursePlayer;
