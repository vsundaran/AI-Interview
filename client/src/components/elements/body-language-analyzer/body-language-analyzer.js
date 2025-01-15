import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { FaceMesh } from "@mediapipe/face_mesh";
import logo from '../../../assets/images/logo.jpg'

const BodyLanguageAnalyzer = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [toneScore, setToneScore] = useState(null);

    useEffect(() => {
        // Load Face-api.js models
        const loadModels = async () => {
            const MODEL_URL = "/models"; // Path to face-api.js models
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
                await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
                await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
                await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
                console.log("Models loaded successfully");
            } catch (error) {
                console.error("Error loading models:", error);
            }
        };


        loadModels();
    }, []);

    const analyzeFace = async () => {
        console.log("Analyzing face...");

        if (
            webcamRef.current &&
            webcamRef.current.video.readyState === 4
        ) {
            console.log("Video is ready. Starting analysis...");

            const video = webcamRef.current.video;
            const displaySize = { width: 640, height: 480 };
            canvasRef.current.width = displaySize.width;
            canvasRef.current.height = displaySize.height;

            console.log(`/logo3.png`, "Logo")

            // Use the image from the public folder (already tested as accessible)
            const image = await faceapi.fetchImage('/logo3.png'); // Correct path from public folder
            const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceExpressions();

            console.log("detections", detections); // Log detections

            // Clear canvas and draw detections
            const ctx = canvasRef.current.getContext("2d");
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            faceapi.draw.drawDetections(canvasRef.current, detections);
            faceapi.draw.drawFaceLandmarks(canvasRef.current, detections);

            // Handle expression analysis
            if (detections[0]?.expressions) {
                const expressions = detections[0].expressions;
                console.log("Facial Expressions:", expressions);
            }

            // Handle face landmarks and calculate scores
            const landmarks = detections[0]?.landmarks;
            if (landmarks) {
                const headPositionScore = calculateHeadPosition(landmarks);
                const eyeContactScore = calculateEyeContact(landmarks);
                const expressionScore = calculateExpressionScore(detections[0]?.expressions);

                console.log("Head Position Score:", headPositionScore);
                console.log("Eye Contact Score:", eyeContactScore);
                console.log("Expression Score:", expressionScore);

                const bodyLanguageScore = (headPositionScore + eyeContactScore + expressionScore) / 3;
                console.log("Overall Body Language Score:", bodyLanguageScore);
            }
        }
    };

    // Simple method to calculate head position (posture)
    function calculateHeadPosition(landmarks) {
        const nose = landmarks.getNose();
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();

        const nosePosition = nose[3]; // Tip of the nose
        const leftEyePosition = leftEye[3];
        const rightEyePosition = rightEye[3];

        // Check the tilt of the head based on nose and eyes positions
        const tiltThreshold = 10; // Arbitrary threshold for tilt angle
        const tiltAmount = Math.abs(nosePosition.y - leftEyePosition.y) + Math.abs(nosePosition.y - rightEyePosition.y);

        // Return a score based on tilt
        return tiltAmount < tiltThreshold ? 1 : 0; // 1 for good posture, 0 for bad posture
    }

    // Simple method to calculate eye contact score
    function calculateEyeContact(landmarks) {
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();

        const leftEyeCenter = leftEye.reduce((acc, point) => acc.add(point), new faceapi.Point(0, 0)).div(leftEye.length);
        const rightEyeCenter = rightEye.reduce((acc, point) => acc.add(point), new faceapi.Point(0, 0)).div(rightEye.length);

        const angle = Math.abs(leftEyeCenter.x - rightEyeCenter.x);

        const eyeContactThreshold = 15;
        return angle < eyeContactThreshold ? 1 : 0; // 1 for good eye contact, 0 for no eye contact
    }

    // Simple method to calculate expression score (positive emotions)
    function calculateExpressionScore(expressions) {
        const positiveExpressions = ["happy", "surprised", "neutral"];
        const negativeExpressions = ["angry", "sad", "disgusted", "fearful"];

        let score = 0;

        positiveExpressions.forEach((expr) => {
            if (expressions[expr] > 0.5) score += 0.5; // Arbitrary value, you can adjust
        });

        negativeExpressions.forEach((expr) => {
            if (expressions[expr] > 0.5) score -= 0.5; // Arbitrary value, you can adjust
        });

        return score;
    }

    const analyzeTone = async (text) => {
        const response = await fetch(
            "https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/YOUR_INSTANCE_ID/v3/tone?version=2017-09-21",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${btoa("apikey:YOUR_API_KEY")}`,
                },
                body: JSON.stringify({ text }),
            }
        );
        const data = await response.json();
        setToneScore(data.document_tone.tones);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button onClick={analyzeFace}>Analyze Face</button>
            <h1>Body Language Analyzer</h1>
            <div style={{ position: "relative" }}>
                <Webcam
                    ref={webcamRef}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 640,
                        height: 480,
                    }}
                />
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 640,
                        height: 480,
                    }}
                />
            </div>
            <button
                onClick={() =>
                    analyzeTone(
                        "This is a sample text to analyze tone. Please replace it with speech transcription."
                    )
                }
            >
                Analyze Tone
            </button>
            {toneScore && (
                <div>
                    <h3>Tone Analysis:</h3>
                    {toneScore.map((tone, index) => (
                        <p key={index}>
                            {tone.tone_name}: {Math.round(tone.score * 100)}%
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BodyLanguageAnalyzer;
