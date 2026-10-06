// Student Progress Tracking Service
class ProgressTracker {
    constructor() {
        this.storageKey = 'student_progress';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.storageKey)) {
            const initialData = {
                totalScore: 0,
                totalWatchTime: 0, // in seconds
                coursesCompleted: 0,
                totalQuizzesTaken: 0,
                totalQuizzesPassed: 0,
                totalWarnings: 0,
                courses: {}, // courseId -> { score, watchTime, quizzes, engagement, completed }
                dailyActivity: this.initializeDailyActivity(),
            };
            localStorage.setItem(this.storageKey, JSON.stringify(initialData));
        }
    }

    initializeDailyActivity() {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return days.map(day => ({ day, hours: 0 }));
    }

    getData() {
        return JSON.parse(localStorage.getItem(this.storageKey));
    }

    saveData(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    // Update course progress
    updateCourseProgress(courseId, sessionData) {
        const data = this.getData();

        if (!data.courses[courseId]) {
            data.courses[courseId] = {
                score: 0,
                watchTime: 0,
                quizzesTaken: 0,
                quizzesPassed: 0,
                engagement: 100,
                completed: false,
                name: sessionData.courseName || courseId,
                videoDuration: sessionData.videoDuration || 0
            };
        }

        const course = data.courses[courseId];

        // Store the previous values to calculate differences
        const prevScore = course.score;
        const prevWatchTime = course.watchTime;

        // Update course stats (replace with latest session values, not add)
        course.score = sessionData.score || 0;
        course.watchTime = sessionData.watchTime || 0;
        course.videoDuration = sessionData.videoDuration || course.videoDuration;
        course.quizzesTaken = sessionData.quizzesTaken || 0;
        course.quizzesPassed = sessionData.quizzesPassed || 0;

        // Calculate engagement (reduce for warnings)
        if (sessionData.warnings !== undefined) {
            course.engagement = Math.max(0, 100 - (sessionData.warnings * 5));
        }

        // Update totals (adjust by differences)
        data.totalScore = data.totalScore - prevScore + course.score;
        data.totalWatchTime = data.totalWatchTime - prevWatchTime + course.watchTime;
        data.totalWarnings = (data.totalWarnings || 0) - (course.totalWarnings || 0) + (sessionData.warnings || 0);
        course.totalWarnings = sessionData.warnings || 0;

        // Update daily activity (add to today)
        const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
        const dayIndex = today === 0 ? 6 : today - 1; // Convert to Mon=0, Sun=6
        const hoursDiff = ((course.watchTime - prevWatchTime) / 3600); // Convert seconds to hours
        data.dailyActivity[dayIndex].hours += hoursDiff;

        this.saveData(data);
    }

    // Get formatted data for dashboard
    getDashboardData() {
        const data = this.getData();

        // Format course data for charts
        const courseData = Object.values(data.courses).map(course => ({
            name: course.name,
            score: Math.round(course.score), // Show actual course score
            engagement: Math.round(course.engagement),
            progress: course.videoDuration > 0
                ? Math.round((course.watchTime / course.videoDuration) * 100)
                : 0
        }));

        // Calculate averages
        const avgEngagement = courseData.length > 0
            ? Math.round(courseData.reduce((sum, c) => sum + c.engagement, 0) / courseData.length)
            : 0;

        return {
            stats: {
                totalScore: Math.round(data.totalScore),
                totalHours: Math.round((data.totalWatchTime / 3600) * 10) / 10, // Round to 1 decimal
                coursesCompleted: data.coursesCompleted,
                avgEngagement: avgEngagement
            },
            coursePerformance: courseData,
            weeklyActivity: data.dailyActivity.map(day => ({
                ...day,
                hours: Math.round(day.hours * 10) / 10
            }))
        };
    }

    // Clear all data
    reset() {
        localStorage.removeItem(this.storageKey);
        this.init();
    }
}

export const progressTracker = new ProgressTracker();
