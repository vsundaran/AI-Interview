import { useState } from 'react';
import { HfInference } from "@huggingface/inference";


// Initialize OpenAI client for Hugging Face API
// const client = new OpenAI({
//     baseURL: 'https://api-inference.huggingface.co/v1',
//     apiKey: process.env.REACT_APP_HUGGING_FACE_KEY, // Replace with your API Key
//     dangerouslyAllowBrowser: true
// });
const client = new HfInference("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");

/**
 * Custom hook for AI Chat interaction
 * @returns {Object} - { chatHistory, sendMessage, loading, error }
 */
const useAIChat = () => {
    const [chatHistory, setChatHistory] = useState([]); // Stores conversation history
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    /**
     * Send a message to the AI and update the conversation history
     * @param {string} userMessage - The user's question or input.
     */
    const sendMessage = async (userMessage) => {
        if (!userMessage.trim()) return;

        // Update local state with user message
        const updatedHistory = [
            ...chatHistory,
            { role: 'user', content: userMessage }
        ];
        setChatHistory(pre => updatedHistory);
        setLoading(true);
        setError(null);

        try {
            const chatCompletion = await client.chatCompletion({
                model: "mistralai/Mistral-7B-Instruct-v0.3",
                messages: updatedHistory,
                max_tokens: 500
            });

            console.log(chatCompletion.generated_text);


            // const chatCompletion = await client.chat.completions.create({
            //     model: 'mistralai/Mistral-7B-Instruct-v0.3',
            //     messages: updatedHistory,
            //     max_tokens: 500
            // });

            // Get AI response
            const aiResponse = chatCompletion.choices[0]?.message?.content || 'No response from AI';

            // Update conversation history with AI response
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { role: 'ai', content: aiResponse }
            ]);
        } catch (err) {
            console.error('Error communicating with AI:', err);
            setError('Failed to fetch AI response');
        } finally {
            setLoading(false);
        }
    };

    return {
        chatHistory,
        sendMessage,
        loading,
        error
    };
};

export default useAIChat;
