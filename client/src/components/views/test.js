import React, { useState } from 'react';
import useTextToSpeech from '../custom-hooks/useTextToSpeech';

const TextToSpeechComponent = () => {
    const [text, setText] = useState('');
    const { speak, isLoading, error } = useTextToSpeech();

    const handleSpeak = () => {
        speak(text);
    };

    return (
        <div>
            <h2>Text-to-Speech</h2>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to convert to speech"
                rows={4}
                cols={50}
            />
            <button onClick={handleSpeak} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Speak'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default TextToSpeechComponent;
