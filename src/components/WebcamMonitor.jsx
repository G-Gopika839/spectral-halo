import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Camera, AlertCircle, Video, VideoOff } from 'lucide-react';

const WebcamMonitor = ({ onStatusChange, isActive = true }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [initializationError, setInitializationError] = useState(null);
    const [stream, setStream] = useState(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        const loadModels = async () => {
            try {
                const MODEL_URL = '/models';
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
                ]);
                setIsModelLoaded(true);
            } catch (err) {
                console.error("Failed to load models:", err);
                setInitializationError("Failed to load AI models. Please refresh.");
            }
        };

        loadModels();
    }, []);

    // Start/stop video based on isActive prop
    useEffect(() => {
        if (isModelLoaded) {
            if (isActive) {
                startVideo();
            } else {
                stopVideo();
            }
        }

        return () => {
            stopVideo();
        };
    }, [isActive, isModelLoaded]);

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((videoStream) => {
                setStream(videoStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = videoStream;
                }
            })
            .catch((err) => {
                console.error("Camera access denied:", err);
                setInitializationError("Camera permission denied.");
            });
    };

    const stopVideo = () => {
        // Stop all video tracks to turn off camera
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }

        // Clear video element
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        // Clear detection interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const handleVideoPlay = () => {
        if (!videoRef.current || !canvasRef.current || !isActive) return;

        const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
        faceapi.matchDimensions(canvasRef.current, displaySize);

        // Clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(async () => {
            if (!videoRef.current || !isActive) return;

            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();

            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            // Clear canvas
            if (canvasRef.current) {
                canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }

            // Analyze detections
            if (detections.length > 0) {
                const expression = detections[0].expressions;
                const status = {
                    isPresent: true,
                    isAttentive: true,
                    mood: expression.asSortedArray()[0].expression
                };
                onStatusChange(status);
            } else {
                onStatusChange({ isPresent: false, isAttentive: false, mood: null });
            }

        }, 2000); // Check every 2 seconds
    };

    return (
        <div className="relative w-full rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
            <div className="absolute top-2 left-2 z-10 bg-black/50 px-2 py-1 rounded text-xs text-white flex items-center">
                {isActive ? (
                    <>
                        <Video className="w-3 h-3 mr-1 text-green-400" />
                        {isModelLoaded ? "AI Active" : "Loading Models..."}
                    </>
                ) : (
                    <>
                        <VideoOff className="w-3 h-3 mr-1 text-red-400" />
                        Camera Paused
                    </>
                )}
            </div>

            {initializationError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-red-500 z-20 p-4 text-center">
                    <AlertCircle className="w-8 h-8 mb-2 block mx-auto" />
                    {initializationError}
                </div>
            )}

            {!isActive && !initializationError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-gray-400 z-20">
                    <div className="text-center">
                        <VideoOff className="w-12 h-12 mb-2 mx-auto" />
                        <p>Camera Off (Video Paused)</p>
                    </div>
                </div>
            )}

            <video
                ref={videoRef}
                autoPlay
                muted
                onPlay={handleVideoPlay}
                width="320"
                height="240"
                className="w-full h-auto object-cover opacity-80"
            />
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
        </div>
    );
};

export default WebcamMonitor;
