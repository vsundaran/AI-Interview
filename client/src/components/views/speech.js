import React, { useEffect, useRef, useState } from 'react';
import vad from 'voice-activity-detection';
import { useLocation } from 'react-router-dom';


export const useSilenceChecker = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [vadValue, setVadValue] = useState(0);
    const audioContextRef = useRef(null);
    const isStartedRef = useRef(false);


    async function startRecording() {
        try {
            if (!isStartedRef.current) {
                // Create AudioContext after user interaction
                window.AudioContext = window.AudioContext || window.webkitAudioContext;
                audioContextRef.current = new AudioContext();
                isStartedRef.current = true;
            }

            // Request Microphone Access
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Start VAD with stream and audioContext
            vad(audioContextRef.current, stream, {
                onVoiceStart: () => {
                    // console.log('Voice detected');
                    setIsSpeaking(true);
                },
                onVoiceStop: () => {
                    // console.log('Voice stopped');
                    setIsSpeaking(false);
                },
                onUpdate: (val) => {
                    setVadValue(val);
                },
            });

            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    }

    function stopRecording() {
        if (audioContextRef.current) {
            audioContextRef.current.close();
            setIsRecording(false);
            isStartedRef.current = false;
        }
    }

    return { startRecording, stopRecording, isRecording, isSpeaking, vadValue }
};

export default useSilenceChecker;
