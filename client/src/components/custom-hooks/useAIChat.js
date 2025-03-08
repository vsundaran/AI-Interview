import { useState } from 'react';
import { HfInference } from "@huggingface/inference";
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
            // const chatCompletion = await client.chatCompletion({
            //     model: "mistralai/Mistral-7B-Instruct-v0.3",
            //     messages: [{ role: 'user', content: userMessage }],
            //     max_tokens: 500
            // });
            const response = await fetch(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${'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'}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: "deepseek/deepseek-r1:free",
                        messages: [{ role: "user", content: userMessage }],
                        stream: false, // Enable streaming
                    }),
                }
            );

            // Get the response body as a readable stream
            // if (!response.body) return;
            // const reader = response.body.getReader();
            // const decoder = new TextDecoder("utf-8");
            // let fullText = "";

            // Get AI response
            const aiResponse = response.choices[0]?.message?.content || 'No response from AI';

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

            // Play audio and update chat history after audio starts
            speak(parsedContent, () => {
                setChatHistory((prevHistory) => [
                    ...prevHistory,
                    { role: 'ai', content: parsedContent }
                ]);
                setIsLoading(false);
            });

            // // Update conversation history with AI response
            // setChatHistory((prevHistory) => [
            //     ...prevHistory,
            //     { role: 'ai', content: parsedContent }
            // ]);

        } catch (err) {
            console.error('Error communicating with AI:', err);
            setError('Failed to fetch AI response');
        }
        // finally {

        // }
    };

    return {
        chatHistory,
        sendMessage,
        isLoading,
        error
    };
};

export default useAIChat;
