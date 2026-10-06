import React, { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";
import { Award, Clock, BookOpen, TrendingUp, RefreshCw } from "lucide-react";
import { progressTracker } from "../services/progressTracker";

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        loadData();

        // Auto-refresh every 3 seconds to show real-time updates
        const interval = setInterval(() => {
            loadData();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const loadData = () => {
        const data = progressTracker.getDashboardData();
        console.log('📈 Dashboard Data:', data);
        setDashboardData(data);
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
            progressTracker.reset();
            loadData();
        }
    };

    if (!dashboardData) {
        return <div className="section-container">Loading...</div>;
    }

    const { stats, coursePerformance, weeklyActivity } = dashboardData;

    return (
        <div className="section-container">

            {/* Header */}
            <div className="mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-blue-500 bg-clip-text text-transparent">
                        Student Analytics Dashboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Real-time learning insights and engagement tracking
                    </p>
                </div>
                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                >
                    <RefreshCw size={18} />
                    Reset Progress
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300">
                        <Award size={28} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Score</p>
                        <h3 className="text-2xl font-bold">{stats.totalScore}</h3>
                    </div>
                </div>

                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                        <Clock size={28} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Hours Learned</p>
                        <h3 className="text-2xl font-bold">{stats.totalHours}h</h3>
                    </div>
                </div>

                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                        <BookOpen size={28} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Courses In Progress</p>
                        <h3 className="text-2xl font-bold">{coursePerformance.length}</h3>
                    </div>
                </div>

                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300">
                        <TrendingUp size={28} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Avg Engagement</p>
                        <h3 className="text-2xl font-bold">{stats.avgEngagement}%</h3>
                    </div>
                </div>

            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                {/* Performance Chart */}
                <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold mb-6">
                        Course Performance
                    </h3>

                    {coursePerformance.length > 0 ? (
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={coursePerformance}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="score"
                                        fill="#6366f1"
                                        name="Course Score"
                                        radius={[6, 6, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="engagement"
                                        fill="#22c55e"
                                        name="Engagement %"
                                        radius={[6, 6, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="progress"
                                        fill="#f59e0b"
                                        name="Progress %"
                                        radius={[6, 6, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="h-72 flex items-center justify-center text-gray-500">
                            No course data yet. Start learning to see your progress!
                        </div>
                    )}
                </div>

                {/* Weekly Activity */}
                <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold mb-6">
                        Weekly Learning Activity
                    </h3>

                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weeklyActivity}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="hours"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    name="Hours Spent"
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
