import React, { useEffect, useState } from "react";
import useVoiceRecorder from "../custom-hooks/useVoiceRecorder";

const VoiceRecorder = () => {
    const { isRecording, audioUrl, error, startRecording, stopRecording, audioBlob } = useVoiceRecorder();
    const [text, setText] = useState("");

    useEffect(() => {
        if (!audioBlob) return; // Exit if no audioBlob

        const convertSpeechToText = async (audioBlob) => {
            const formData = new FormData();
            formData.append("file", audioBlob);

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
                console.log(result, "result");
                setText(result.text || "No transcription available.");
            } catch (error) {
                console.error("Error:", error);
                setText("Error transcribing audio.");
            }
        };

        convertSpeechToText(audioBlob);
    }, [audioBlob]);

    return (
        <div>
            <h1>Voice Recorder</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={startRecording} disabled={isRecording}>
                Start Recording
            </button>
            <button onClick={stopRecording} disabled={!isRecording}>
                Stop Recording
            </button>
            {audioUrl && (
                <div>
                    <h2>Recorded Audio:</h2>
                    <audio src={audioUrl} controls />
                    <p>
                        Audio URL:{" "}
                        <a href={audioUrl} target="_blank" rel="noopener noreferrer">
                            {audioUrl}
                        </a>
                    </p>
                </div>
            )}
            <div>
                <h2>Transcription:</h2>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default VoiceRecorder;
