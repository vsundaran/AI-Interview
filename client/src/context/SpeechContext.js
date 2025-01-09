import React, { createContext, useContext, useRef } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { updateLoading } from '../redux/slice/loading-slice';
import { useDispatch } from 'react-redux';

const SpeechContext = createContext();

export const SpeechProvider = ({ children }) => {
    let DISPATCH = useDispatch();

    let index = 0;
    let chunks = [] // Split into sentences

    const onEnd = () => {
        index++;
        if (index < chunks.length) {
            speakChunk(chunks[index]);
        } else {
            DISPATCH(updateLoading({ loadingState: true, key: "candidate" }))
        }
    };

    const { speak, voices, supported, cancel, speaking } = useSpeechSynthesis({ onEnd });
    const selectedVoice = useRef(null);
    const isInitialized = useRef(false);

    const initializeSpeech = () => {
        if (!isInitialized.current && voices.length > 0) {
            const googleUSVoice = voices.find((voice) => voice.name === 'Google US English');
            if (googleUSVoice) {
                selectedVoice.current = googleUSVoice;
                isInitialized.current = true;
            }
        }
    };

    const speakChunk = (chunk = "") => {
        speak({
            text: chunk,
            voice: selectedVoice.current,
        });
    }

    const startSpeaking = (message = '') => {
        if (!isInitialized.current) {
            console.warn('Speech synthesis is not initialized yet.');
            return;
        }
        chunks = message.match(/[^.!?]+[.!?]+|[^.!?]+/g) || [message]; // Split into sentences
        // const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+/g) || [text]; // Split into sentences
        speakChunk(chunks[index])
    };

    return (
        <SpeechContext.Provider value={{ initializeSpeech, startSpeaking, cancel, speaking, supported }}>
            {children}
        </SpeechContext.Provider>
    );
};

export const useSpeech = () => useContext(SpeechContext);
