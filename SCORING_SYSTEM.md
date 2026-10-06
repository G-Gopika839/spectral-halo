# New Scoring System Documentation

## Overview
Each course is scored out of **100 points** based on video completion progress and student behavior.

## Scoring Formula

### Base Formula:
```
Final Score = (Progress Percentage × 100) - (Warnings × 5)
```

### Components:

1. **Progress Score (0-100 points)**
   - Calculated as: `(Watch Time / Video Duration) × 100`
   - Example: If video is 60 minutes and you watch 30 minutes:
     - Progress = (30 / 60) × 100 = 50 points

2. **Warning Penalty (-5 points each)**
   - Each tab switch warning deducts 5 points
   - Maximum 5 warnings before session termination
   - Example: 3 warnings = -15 points

### Calculation Examples:

**Example 1: Perfect Score**
- Video Length: 60 minutes
- Watched: 60 minutes (100%)
- Warnings: 0
- **Score: 100 - (0 × 5) = 100 points**

**Example 2: Partial Progress with Warnings**
- Video Length: 60 minutes
- Watched: 30 minutes (50%)
- Warnings: 2
- **Score: 50 - (2 × 5) = 40 points**

**Example 3: Full Video, Multiple Warnings**
- Video Length: 60 minutes
- Watched: 60 minutes (100%)
- Warnings: 4
- **Score: 100 - (4 × 5) = 80 points**

**Example 4: Low Progress, High Warnings**
- Video Length: 60 minutes
- Watched: 15 minutes (25%)
- Warnings: 5
- **Score: 25 - (5 × 5) = 0 points** (minimum is 0)

## How It's Tracked

### Real-Time Display
Students see their current score on the Course Player page:
- **Score Card**: Shows "Score: X/100"
- **Progress %**: Real-time percentage of video watched
- **Warnings**: Count of warnings (X/5)

### Dashboard Analytics
The student dashboard shows:
- **Total Score**: Sum of all course scores
- **Course Performance**: Individual course scores
- **Engagement**: Visual representation of focus

## Benefits of This System

1. **Encourages Full Completion**: Maximum points for watching entire video
2. **Rewards Focus**: Penalties for distractions discourage tab switching
3. **Fair & Transparent**: Clear formula, visible in real-time
4. **Motivational**: Students can see score improving as they progress

## Technical Implementation

### Files Modified:
1. `CoursePlayer.jsx` - Added `calculateScore()` function
2. `progressTracker.js` - Stores score, duration, warnings

### Key Functions:
```javascript
// Calculate score
const calculateScore = () => {
    const BASE_SCORE = 100;
    const WARNING_PENALTY = 5;
    
    if (videoDuration > 0) {
        const progressPercentage = (currentTime / videoDuration);
        const progressBonus = progressPercentage * BASE_SCORE;
        const score = Math.round(progressBonus - (warnings * WARNING_PENALTY));
        return Math.max(0, score); // Never below 0
    }
    return 0;
};
```

## Future Enhancements

Potential additions:
- Quiz bonus points
- Engagement multipliers
- Time-based bonuses (finishing within timeframe)
- Certificate threshold (e.g., need 80+ to get certificate)
