import { useState } from 'react';
import { HfInference } from "@huggingface/inference";
import { useSpeech } from '../../context/SpeechContext';
import useTextToSpeech from './useTextToSpeech';

const client = new HfInference(process.env.REACT_APP_HUGGING_FACE_API_KEY);

/**
 * Custom hook for AI Chat interaction
 * @returns {Object} - { chatHistory, sendMessage, isLoading, error }
 */
const useAIChat = () => {
    const [chatHistory, setChatHistory] = useState([]); // Stores conversation history
    const [isLoading, setIsLoading] = useState(false); // isLoading state
    const [error, setError] = useState(null); // Error state
    // const { startSpeaking } = useSpeech();

    const { speak } = useTextToSpeech();

    /**
     * Send a message to the AI and update the conversation history
     * @param {string} userMessage - The user's question or input.
     */
    const sendMessage = async (userMessage, excludeText = false) => {
        if (!userMessage.trim()) return;

        // Update local state with user message
        const updatedHistory = [
            ...chatHistory,
            { role: 'user', content: userMessage }
        ];
        if (!excludeText) {
            setChatHistory(pre => updatedHistory);
        }
        setIsLoading(true);
        setError(null);

        try {
            const chatCompletion = await client.chatCompletion({
                model: "mistralai/Mistral-7B-Instruct-v0.3",
                messages: [{ role: 'user', content: userMessage }],
                max_tokens: 500
            });

            // Get AI response
            const aiResponse = chatCompletion.choices[0]?.message?.content || 'No response from AI';

            let parsedContent;

            try {
                // If the response is valid JSON
                parsedContent = JSON.parse(aiResponse);
                parsedContent = parsedContent.content || parsedContent; // Fallback
            } catch (e) {
                // If it's plain text
                parsedContent = aiResponse.content || aiResponse;
            }

            // Remove "Question: " and surrounding quotes
            parsedContent = parsedContent.replace(/^Question:\s*/, '').replace(/^"|"$/g, '');

            // Update conversation history with AI response
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { role: 'ai', content: parsedContent }
            ]);

            speak(parsedContent);
        } catch (err) {
            console.error('Error communicating with AI:', err);
            setError('Failed to fetch AI response');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        chatHistory,
        sendMessage,
        isLoading,
        error
    };
};

export default useAIChat;
