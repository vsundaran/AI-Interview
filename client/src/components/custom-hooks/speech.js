import { useRef, useState } from 'react';
import vad from 'voice-activity-detection';

export const useSilenceChecker = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [vadValue, setVadValue] = useState(0);
    const audioContextRef = useRef(null);
    const isStartedRef = useRef(false);

    const NOISE_THRESHOLD = 0.9; // Adjust based on your environment

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
                    // Only set isSpeaking to true if vadValue exceeds the threshold
                    if (vadValue > NOISE_THRESHOLD) {
                        setIsSpeaking(true);
                    }
                },
                onVoiceStop: () => {
                    setIsSpeaking(false);
                },
                onUpdate: (val) => {
                    setVadValue(val);

                    // Dynamically handle noise filtering in case voice detection is too sensitive
                    if (val > NOISE_THRESHOLD && !isSpeaking) {
                        setIsSpeaking(true);
                    } else if (val <= NOISE_THRESHOLD && isSpeaking) {
                        setIsSpeaking(false);
                    }
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

    return { startRecording, stopRecording, isRecording, isSpeaking, vadValue };
};

export default useSilenceChecker;
