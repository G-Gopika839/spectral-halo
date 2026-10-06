# Score & Progress Update - Debugging Guide

## 🔧 What I Fixed

### 1. **Added Real-Time Score Debugging**
- Console logs score every 10 seconds
- Shows all calculation components

### 2. **Dashboard Auto-Refresh**
- Dashboard now updates every 3 seconds
- No need to manually refresh page

## 🧪 How to Test This

### Step 1: Open Browser Console
```
1. Open course player page
2. Press F12 to open DevTools
3. Go to "Console" tab
4. Watch for score updates
```

### Step 2: Watch Video & Monitor
```
1. Start Python video
2. Watch console for:
   📊 Score Update: {
       currentTime: 10,
       videoDuration: 671,  (example)
       progressPercent: 1,
       warnings: 0,
       quizBonus: 0,
       finalScore: 1
   }
```

### Step 3: Check What You Should See

**At 10 seconds:**
- **Progress:** ~1-2% (depends on video length)
- **Score:** ~1-2 points
- **Console output:** Score update logged

**At 60 seconds (after quiz):**
- **Quiz appears!**
- Answer correctly → **+5 points**
- **Progress:** ~10-15% (example for 10min video)
- **Score:** Progress points + Quiz bonus

**After 1 warning:**
- **Score decreases by 5**
- Console shows: `warnings: 1`

## 📊 Score Formula Breakdown

```javascript
Base Progress Score = (CurrentTime / VideoDuration) × 100
Warning Penalty = Warnings × 5
Quiz Bonus = CorrectQuizzes × 5

Final Score = Progress - Penalties + Bonuses
```

### Examples:

**Example 1: 30 seconds of 600-second video, no warnings, 1 quiz**
```
Progress: (30 / 600) × 100 = 5 points
Warnings: 0 × 5 = 0
Quiz: 1 × 5 = 5
Score: 5 - 0 + 5 = 10 points ✅
```

**Example 2: 150 seconds of 600-second video, 2 warnings, 2 quizzes**
```
Progress: (150 / 600) × 100 = 25 points
Warnings: 2 × 5 = -10
Quiz: 2 × 5 = 10
Score: 25 - 10 + 10 = 25 points ✅
```

## 🐛 Common Issues & Solutions

### Issue 1: Score Shows 0
**Why:** Video duration not loaded yet
**Check:** Console should show `videoDuration: 0`
**Solution:** Wait 2-3 seconds for video to fully load

### Issue 2: Score Not Updating
**Check Console For:**
```javascript
// Should see every 10 seconds:
📊 Score Update: { ... }
```
**If NOT showing:**
- Refresh page
- Check if video is actually playing
- Look for JavaScript errors in console

### Issue 3: Dashboard Not Updating
**Check:**
```javascript
// Should see every 3 seconds in console:
📈 Dashboard Data: { stats: {...}, coursePerformance: [...] }
```
**If NOT updating:**
- Go back to course page
- Navigate away and back to dashboard
- Check localStorage: `localStorage.getItem('student_progress')`

### Issue 4: Progress Always 0%
**Why:** VideoDuration is 0
**Fix:**
```javascript
// In console, check:
playerRef.current.getDuration()  // Should return video length in seconds
```

## 🎯 Verification Checklist

Open console and watch a video for 2 minutes, then check:

- [ ] Console shows score updates every 10 seconds
- [ ] Score increases as time progresses
- [ ] Quiz at 60 seconds appears
- [ ] Answering quiz adds +5 to score
- [ ] Tab switching adds warning and decreases score by 5
- [ ] Dashboard auto-updates (check every 3 seconds)
- [ ] Dashboard shows correct total score
- [ ] Progress % matches watch time
- [ ] Engagement % = 100 - (warnings × 5)

## 🔍 Deep Debugging

If still having issues, run in console:

```javascript
// Check localStorage data
JSON.parse(localStorage.getItem('student_progress'))

// Check current session
{
  time: playerRef.current?.getCurrentTime(),
  duration: playerRef.current?.getDuration(),
  state: playerRef.current?.getPlayerState()
}
```

## 💡 Expected Behavior

### On Course Player:
- Score updates in real-time (every second)
- Shows as "X/100" format
- Can exceed 100 with quiz bonuses

### On Dashboard:
- Updates automatically every 3 seconds
- Shows total score from all courses
- Graph shows 3 bars: Score, Engagement, Progress
- Weekly activity updates for current day

## 🚨 If Nothing Works

1. **Reset Everything:**
   ```javascript
   localStorage.clear();
   location.reload();
   ```

2. **Check for Errors:**
   - Look for red errors in console
   - Check Network tab for failed requests

3. **Verify Video ID:**
   - Make sure using correct YouTube video ID
   - Test with: `_uQrJ0TkZlc` (Python video)
