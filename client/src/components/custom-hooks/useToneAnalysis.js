import { useState } from 'react';

const useToneAnalysis = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [toneResult, setToneResult] = useState(null);
    const [error, setError] = useState(null);

    const analyzeTone = async (userMessage = "") => {
        if (!userMessage) return null;

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ inputs: userMessage }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to analyze tone');
            }

            const data = await response.json();
            setToneResult(data);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { analyzeTone, toneResult, isLoading, error };
};

export default useToneAnalysis;
