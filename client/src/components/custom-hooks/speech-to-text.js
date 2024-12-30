import { useState, useRef } from 'react';

const useSpeechToText = () => {
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null); // Store recognition instance

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
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null; // Clear recognition instance
        }
        setIsListening(false);
    };

    const textReset = () => {
        setText('');
    };

    return { isListening, text, startListening, stopListening, textReset };
};

export default useSpeechToText;
