export const AnalyticsService = {
    data: {
        userId: null,
        courseId: null,
        totalWatchTime: 0,
        pauses: 0,
        rewinds: 0,
        quizzesTaken: 0,
        correctAnswers: 0,
        tabSwitches: 0,
        emotionLogs: [],
        startTime: null,
    },

    init(userId, courseId) {
        this.data.userId = userId;
        this.data.courseId = courseId;
        this.data.startTime = Date.now();
        this.data.totalWatchTime = 0;

        // Start tracking tab visibility
        document.addEventListener("visibilitychange", this.handleVisibilityChange);
    },

    handleVisibilityChange() {
        if (document.hidden) {
            AnalyticsService.data.tabSwitches++;
            console.log("Tab switched! Count:", AnalyticsService.data.tabSwitches);
        }
    },

    logPause() {
        this.data.pauses++;
    },

    logQuizResult(isCorrect) {
        this.data.quizzesTaken++;
        if (isCorrect) this.data.correctAnswers++;
    },

    getReport() {
        return {
            ...this.data,
            sessionDuration: (Date.now() - this.data.startTime) / 1000 // seconds
        };
    },

    cleanup() {
        document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    }
};
