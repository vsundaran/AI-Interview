import { useState, useRef } from 'react';

const useSpeechToText = () => {
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null); // Store recognition instance
    const silenceTimer = useRef(null); // Store silence timer

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Web Speech API is not supported in this browser');
            return;
        }

        // Initialize recognition if not already initialized
        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0].transcript)
                .join('');
            setText(transcript);

            // Reset silence timer on every result
            resetSilenceTimer();
        };

        recognitionRef.current.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            stopListening();
        };

        recognitionRef.current.onend = () => {
            console.log('Recognition stopped');
            setIsListening(false);
        };

        recognitionRef.current.start();
        setIsListening(true);
        resetSilenceTimer(); // Start silence timer
    };

    const resetSilenceTimer = () => {
        if (silenceTimer.current) {
            clearTimeout(silenceTimer.current);
        }

        silenceTimer.current = setTimeout(() => {
            console.log('No speech detected for 20 seconds. Stopping recognition.');
            stopListening();
        }, 1000 * 20); // 10 seconds timeout
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null; // Clear recognition instance
        }

        if (silenceTimer.current) {
            clearTimeout(silenceTimer.current);
            silenceTimer.current = null; // Clear silence timer
        }

        setIsListening(false);
    };

    return { isListening, text, startListening, stopListening };
};

export default useSpeechToText;
