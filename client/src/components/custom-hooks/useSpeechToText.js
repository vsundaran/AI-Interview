import { useEffect, useState } from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useVoiceRecorder from './useVoiceRecorder';

const useSpeechToText = ({ text }) => {
    const [isListening, setIsListening] = useState(false);
    const [finalText, setFinalText] = useState(''); // Store the final transcript
    // const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const { isRecording, error, startRecording, stopRecording, audioBlob } = useVoiceRecorder();

    const startListening = () => {
        startRecording();
        setIsListening(true);
    };

    const stopListening = () => {
        stopRecording()
        setIsListening(false);
    };

    const textReset = () => {
        setFinalText('');
    };

    useEffect(() => {
        if (isRecording) return null
        const convertSpeechToText = async (audioBlob) => {
            const formData = new FormData();
            formData.append('file', audioBlob);

            try {
                const response = await fetch(
                    'https://api-inference.huggingface.co/models/openai/whisper-base',

                    {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_API_KEY}`,
                            'Content-Type': 'application/json',
                        },
                        body: formData,
                    }
                );
                console.log('Transcription:', response.data.text);
                setFinalText(prev => response.data.text)
            } catch (error) {
                console.error('Error:', error);
            }
        };
        convertSpeechToText(audioBlob);
    }, [audioBlob])

    return {
        isListening,
        text: finalText,
        startListening,
        stopListening,
        textReset
    };
};

export default useSpeechToText;
