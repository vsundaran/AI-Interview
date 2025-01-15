import React, { createContext, useContext, useState } from 'react';
import { updateLoading } from '../redux/slice/loading-slice';
import { useDispatch } from 'react-redux';

const SpeechContext = createContext();

export const SpeechProvider = ({ children }) => {
    const DISPATCH = useDispatch();
    let [speaking, setSpeaking] = useState(false)

    const startSpeaking = (message = '') => {
        /* global responsiveVoice */
        responsiveVoice.speak(message, "UK English Male", {
            onend: () => {
                DISPATCH(updateLoading({ loadingState: true, key: "candidate" }));
                setSpeaking(false)
            },
            onerror: () => {
                DISPATCH(updateLoading({ loadingState: true, key: "candidate" }));
                setSpeaking(false)
            },
        });
        setSpeaking(true)
    };
    return (
        <SpeechContext.Provider value={{ startSpeaking, speaking }}>
            {children}
        </SpeechContext.Provider>
    );
};

export const useSpeech = () => useContext(SpeechContext);
