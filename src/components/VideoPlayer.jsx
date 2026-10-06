import React, { useRef, useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId, onStateChange, onReady, children, getCurrentTime }) => {
    const playerRef = useRef(null);
    const [maxWatchedTime, setMaxWatchedTime] = useState(0);

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
            controls: 0, // Disable default YouTube controls to prevent seeking
            disablekb: 1, // Disable keyboard controls
            fs: 0, // Disable fullscreen
        },
    };

    const _onReady = (event) => {
        playerRef.current = event.target;
        if (onReady) onReady(event);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current && getCurrentTime && typeof getCurrentTime === 'function') {
                try {
                    const currentTime = playerRef.current.getCurrentTime();
                    const playerState = playerRef.current.getPlayerState();

                    // Only check for skipping when video is actually playing (state 1)
                    if (playerState === 1) {
                        // Update max watched time
                        if (currentTime > maxWatchedTime) {
                            setMaxWatchedTime(currentTime);
                        }

                        // Prevent skipping forward - increased threshold to 5 seconds to avoid false positives
                        // This accounts for buffering and minor time jumps
                        if (currentTime > maxWatchedTime + 5) {
                            playerRef.current.seekTo(maxWatchedTime, true);
                            alert('⚠️ Skipping ahead is not allowed. Please watch the entire video.');
                        }
                    }

                    getCurrentTime(currentTime);
                } catch (e) {
                    // Player might not be ready
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [getCurrentTime, maxWatchedTime]);

    return (
        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg bg-black relative">
            <YouTube
                videoId={videoId}
                opts={opts}
                onReady={_onReady}
                onStateChange={onStateChange}
                className="w-full h-full"
                iframeClassName="w-full h-full"
            />

            {/* Custom Play/Pause Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 bg-black/50 p-3 rounded-lg">
                <button
                    onClick={() => playerRef.current?.playVideo()}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                    ▶ Play
                </button>
                <button
                    onClick={() => playerRef.current?.pauseVideo()}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                    ⏸ Pause
                </button>
                <span className="text-white ml-auto">
                    Progress: {Math.floor(maxWatchedTime / 60)}:{String(Math.floor(maxWatchedTime % 60)).padStart(2, '0')}
                </span>
            </div>

            {children}
        </div>
    );
};

export default VideoPlayer;
