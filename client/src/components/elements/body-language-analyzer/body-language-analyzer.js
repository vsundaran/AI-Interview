import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

const BodyLanguageAnalyzer = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    let [timer, setTimer] = useState(null);

    useEffect(() => {
        // Load Face-api.js models
        const loadModels = async () => {
            const MODEL_URL = "/models"; // Path to face-api.js models
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
                await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
                await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
                await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
                console.log("Models loaded successfully");
            } catch (error) {
                console.error("Error loading models:", error);
            }
        };
        loadModels();

        setTimer(
            setInterval(() => {
                console.log("analyzeFace trigger");
                analyzeFace();
            }, 10000)
        );

        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line
    }, []);

    const analyzeFace = async () => {
        if (webcamRef.current && webcamRef.current.video.readyState === 4) {
            const video = webcamRef.current.video;
            const displaySize = { width: 640, height: 480 };
            canvasRef.current.width = displaySize.width;
            canvasRef.current.height = displaySize.height;

            // Step 1: Draw the current video frame on a canvas
            const ctx = canvasRef.current.getContext("2d");
            ctx.drawImage(video, 0, 0, displaySize.width, displaySize.height);

            // Step 2: Convert the canvas to an image (data URL)
            const imageUrl = canvasRef.current.toDataURL("image/jpeg"); // You can choose the image format
            // const imageUrl = "/logo3.png"; // You can choose the static image

            // Step 3: Pass the image URL to fetchImage
            const image = await faceapi.fetchImage(imageUrl); // Now passing a valid image URL

            const detections = await faceapi
                .detectAllFaces(image)
                .withFaceLandmarks()
                .withFaceExpressions();
            console.log("detections", detections); // Log detections

            // Clear canvas and draw detections
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
                const expressionScore = calculateExpressionScore(
                    detections[0]?.expressions
                );

                console.log("Head Position Score:", headPositionScore);
                console.log("Eye Contact Score:", eyeContactScore);
                console.log("Expression Score:", expressionScore);

                const bodyLanguageScore =
                    (headPositionScore + eyeContactScore + expressionScore) / 3;
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
        const tiltAmount =
            Math.abs(nosePosition.y - leftEyePosition.y) +
            Math.abs(nosePosition.y - rightEyePosition.y);

        // Return a score based on tilt
        return tiltAmount < tiltThreshold ? 1 : 0; // 1 for good posture, 0 for bad posture
    }

    // Simple method to calculate eye contact score
    function calculateEyeContact(landmarks) {
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();

        const leftEyeCenter = leftEye
            .reduce((acc, point) => acc.add(point), new faceapi.Point(0, 0))
            .div(leftEye.length);
        const rightEyeCenter = rightEye
            .reduce((acc, point) => acc.add(point), new faceapi.Point(0, 0))
            .div(rightEye.length);

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

    return (
        <div
            style={{ display: "flex", flexDirection: "column", alignItems: "end" }}
        >
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "50%",
                    overflow: "hidden",
                    height: "150px",
                    width: "150px",
                }}
            >
                <Webcam
                    ref={webcamRef}
                    style={{
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
                <canvas
                    ref={canvasRef}
                    style={{
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                    }}
                />
            </div>
        </div>
    );
};

export default BodyLanguageAnalyzer;
