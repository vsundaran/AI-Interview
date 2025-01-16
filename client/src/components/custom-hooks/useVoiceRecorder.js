import { useState, useEffect, useRef } from "react";

const useVoiceRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [error, setError] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]);
    const [audioBlob, setAudioBlob] = useState(null);

    const [text, setText] = useState("");

    // Start recording
    const startRecording = async () => {
        try {
            // Request microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);

            // Collect audio chunks as they are available
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.current?.push(event.data);
                }
            };

            // On stop, create a blob URL from the audio chunks
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
                setAudioBlob(audioBlob);
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
                audioChunks.current = [];
            };

            mediaRecorderRef?.current?.start();
            setIsRecording(true);
        } catch (err) {
            setError("Microphone access denied or not available.");
        }
    };

    // Stop recording
    const stopRecording = () => {
        if (mediaRecorderRef?.current) {
            mediaRecorderRef?.current?.stop();
            setIsRecording(false);
        }
    };

    // Cleanup when component unmounts
    useEffect(() => {
        return () => {
            if (mediaRecorderRef?.current) {
                mediaRecorderRef?.current?.stream?.getTracks()?.forEach((track) => track?.stop());
            }
        };
    }, []);

    useEffect(() => {
        if (!audioBlob) return; // Exit if no audioBlob

        const convertSpeechToText = async (audioBlob, retries = 5, delay = 5000) => {
            const formData = new FormData();
            formData.append("file", audioBlob);

            for (let attempt = 0; attempt < retries; attempt++) {
                try {
                    const response = await fetch(
                        "https://api-inference.huggingface.co/models/openai/whisper-base",
                        {
                            headers: {
                                Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_API_KEY}`,
                            },
                            method: "POST",
                            body: audioBlob,
                        }
                    );
                    const result = await response.json();

                    if (result.error && result.error.includes("loading")) {
                        // If the model is still loading, wait and retry
                        const estimatedTime = result.estimated_time || delay / 1000; // Use estimated_time if provided
                        console.warn(
                            `Model is loading, retrying in ${estimatedTime} seconds...`
                        );
                        await new Promise((resolve) =>
                            setTimeout(resolve, estimatedTime * 1000)
                        );
                    } else {
                        // Success
                        setText(result.text || "No transcription available.");
                        return;
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }

            // If all retries fail
            setText("Error transcribing audio after multiple attempts.");
            setError("Failed to process audio.");
        };

        convertSpeechToText(audioBlob);
    }, [audioBlob]);

    const textReset = () => {
        setAudioBlob(null);
        setText("");
    };

    return {
        isListening: isRecording,
        audioUrl,
        audioBlob,
        error,
        startListening: startRecording,
        stopListening: stopRecording,
        text,
        textReset,
    };
};

export default useVoiceRecorder;
