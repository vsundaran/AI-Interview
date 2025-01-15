// import { useState, useRef } from 'react';

// const useSpeechToText = () => {
//     const [text, setText] = useState('');
//     const [isListening, setIsListening] = useState(false);
//     const recognitionRef = useRef(null); // Store recognition instance

//     const startListening = () => {
//         if (!('webkitSpeechRecognition' in window)) {
//             alert('Web Speech API is not supported in this browser');
//             return;
//         }

//         // Initialize recognition if not already initialized
//         recognitionRef.current = new window.webkitSpeechRecognition();
//         recognitionRef.current.continuous = true;
//         recognitionRef.current.lang = 'en-US';

//         recognitionRef.current.onresult = (event) => {
//             const transcript = Array.from(event.results)
//                 .map((result) => result[0].transcript)
//                 .join('');
//             setText(transcript);
//         };

//         recognitionRef.current.onerror = (event) => {
//             console.error('Speech recognition error:', event.error);
//             stopListening();
//         };

//         recognitionRef.current.onend = () => {
//             console.log('Recognition stopped');
//             setIsListening(false);
//         };

//         recognitionRef.current.start();
//         setIsListening(true);
//     };

//     const stopListening = () => {
//         if (recognitionRef.current) {
//             recognitionRef.current.stop();
//             recognitionRef.current = null; // Clear recognition instance
//         }
//         setIsListening(false);
//     };

//     const textReset = () => {
//         setText('');
//     };

//     return { isListening, text, startListening, stopListening, textReset };
// };

// export default useSpeechToText;

import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const useSpeechToText = () => {
    const [isListening, setIsListening] = useState(false);
    const [finalText, setFinalText] = useState(''); // Store the final transcript
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const startListening = () => {
        if (!browserSupportsSpeechRecognition) {
            alert('Web Speech API is not supported in this browser');
            return;
        }

        SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
        setIsListening(true);
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        setFinalText(transcript); // Capture the current transcript
        resetTranscript(); // Clear the live transcript for the next session
        setIsListening(false);
    };

    const textReset = () => {
        setFinalText('');
    };

    return {
        isListening,
        text: finalText,
        startListening,
        stopListening,
        textReset
    };
};

export default useSpeechToText;
