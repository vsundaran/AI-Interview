import React, { createContext, useContext, useRef } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const SpeechContext = createContext();

export const SpeechProvider = ({ children }) => {
    const { speak, voices, supported, cancel, speaking } = useSpeechSynthesis();
    const selectedVoice = useRef(null);
    const isInitialized = useRef(false);

    const initializeSpeech = () => {
        if (!isInitialized.current && voices.length > 0) {
            const googleUSVoice = voices.find(voice => voice.name === 'Google US English');
            if (googleUSVoice) {
                selectedVoice.current = googleUSVoice;
                isInitialized.current = true;
            }
        }
    };

    const startSpeaking = (message = '') => {
        if (!isInitialized.current) {
            console.warn('Speech synthesis is not initialized yet.');
            return;
        }
        // speak({
        //     text: message,
        //     voice: selectedVoice.current,
        //     onEnd: () => {
        //         console.log("Completed")
        //     }
        // });

        if (!isInitialized.current) {
            console.warn('Speech synthesis is not initialized yet.');
            return;
        }

        const chunks = message.match(/[^.!?]+[.!?]+|[^.!?]+/g) || [message]; // Split into sentences

        let index = 0;
        console.log(chunks, "chunks")
        const speakNextChunk = () => {
            if (index < chunks.length) {
                speak({
                    text: chunks[index],
                    voice: selectedVoice.current,
                    onEnd: () => {
                        index++;
                        speakNextChunk(); // Speak next chunk after current one ends
                    },
                });
            }
        };
        speakNextChunk();
    };

    return (
        <SpeechContext.Provider value={{ initializeSpeech, startSpeaking, cancel, speaking, supported }}>
            {children}
        </SpeechContext.Provider>
    );
};

export const useSpeech = () => useContext(SpeechContext);
