import { useEffect, useState } from "react";
// Mui elements
import { Box, Typography } from "@mui/material";

//Colors
import { APP_COLORS } from "../../theme/colors";

// Icons and logo
import AppLogo from "../elements/app-logo/app-logo";
// Redux
import { useDispatch, useSelector } from "react-redux";
//Animation
import { TypeAnimation } from "react-type-animation";
import { SyncLoader, PuffLoader } from "react-spinners";
import { formatAIPrompt } from "../../utills/formatPrompt";

//custom-hooks
import useSilenceChecker from "../custom-hooks/speech";
import useAIChat from "../custom-hooks/useAIChat";
import useToneAnalysis from "../custom-hooks/useToneAnalysis";
import useVoiceRecorder from "../custom-hooks/useVoiceRecorder";

import { useLocation } from "react-router-dom";
import { updateLoading } from "../../redux/slice/loading-slice";
import BodyLanguageAnalyzer from "../elements/body-language-analyzer/body-language-analyzer";

export default function Interview() {
    let jobInfo = useSelector((state) => state.job_info);
    let { candidate, voiceProcessing } = useSelector((state) => state.loading);

    const location = useLocation();
    const DISPATCH = useDispatch()

    useEffect(() => {
        // Check if state contains the triggerEvent flag
        if (location.state?.triggerEvent) {
            startRecording();
        }
        // eslint-disable-next-line
    }, [location.state]);


    const { chatHistory, sendMessage, isLoading } = useAIChat();
    let { startRecording, isSpeaking } = useSilenceChecker()
    let { analyzeTone, toneResult } = useToneAnalysis();


    const { isListening, startListening, text, stopListening } = useVoiceRecorder();

    const handleSend = (input = '', excludeText = false) => {
        if (input.trim()) {
            sendMessage(input, excludeText);
        }
    };

    useEffect(() => {
        if (text) {
            sendMessage(text, false);
            DISPATCH(updateLoading({ loadingState: false, key: "candidate" }));
            DISPATCH(updateLoading({ loadingState: false, key: "voiceProcessing" }))
            analyzeTone(text)
        }
        // eslint-disable-next-line
    }, [text]);

    useEffect(() => {
        // The tone result should save on the backend or context for dashboard
        // eslint-disable-next-line
    }, [toneResult])

    useEffect(() => {
        let quearyString = formatAIPrompt(jobInfo);
        handleSend(quearyString, true);
        // eslint-disable-next-line
    }, []);

    const startVoiceRecogniation = () => {
        startListening();
    }

    const stopVoiceRecogniation = () => {
        stopListening();
        DISPATCH(updateLoading({ loadingState: false, key: "candidate" }))
        DISPATCH(updateLoading({ loadingState: true, key: "voiceProcessing" }))
    };

    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if (candidate && isSpeaking && isListening) {
            //    "User continious the interview"
            if (timer) {
                clearTimeout(timer)
            }
        };
        if (candidate && isSpeaking && !isListening) {
            // "Voice recording started"
            startVoiceRecogniation();
        } else {
            if (!isSpeaking && candidate && isListening) {
                setTimer(perv => setTimeout(() => {
                    // "User not spok for last 10 seconds, recording stoped"
                    stopVoiceRecogniation()
                }, 10000))
            }
        }
        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        };
        // eslint-disable-next-line
    }, [isSpeaking, candidate]);

    return (
        <Box>
            {chatHistory.map((msg, index) => (
                <Box key={`coversation-${index}`}>
                    {/*Candidate Answer */}
                    <Box
                        display={`${msg.role === 'user' ? "flex" : "none"
                            }`}
                        justifyContent={"end"}
                        marginBottom={4}
                    >
                        <Box
                            padding={1}
                            borderRadius={2}
                            bgcolor={APP_COLORS.CHAT_PRIMARY}
                            sx={{ maxWidth: { xs: "90%", md: "70%", lg: "60%" } }}
                        >
                            <Typography variant="body1" color="white">
                                {msg.content || ""}
                            </Typography>
                        </Box>
                    </Box>

                    {/* AI Question */}
                    <Box
                        marginBottom={4}
                        display={`${msg.role !== 'user' ? "flex" : "none"}`}
                    >
                        <Box display={"flex"} alignItems={"start"} gap={1}>
                            <AppLogo size="small" />
                            <Typography variant="body1">

                                {index + 1 === chatHistory.length
                                    ? (
                                        <TypeAnimation
                                            sequence={[`${msg.content || ""}`]}
                                            wrapper="span"
                                            speed={50}
                                            cursor={false}

                                        />
                                    ) : (
                                        `${msg.content || ""}`
                                    )}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ))}

            {/* Loading box */}
            <Box>
                {/*Candidate Loading */}
                <Box
                    display={`${candidate ? "flex" : "none"
                        }`}
                    justifyContent={"end"}
                    marginBottom={4}
                >
                    <Box
                        padding={1}
                        borderRadius={2}
                        bgcolor={APP_COLORS.CHAT_PRIMARY}
                        sx={{ maxWidth: { xs: "90%", md: "70%", lg: "60%" } }}
                    >
                        <Box display={"flex"} gap={1} alignItems={"center"}>
                            <Typography variant="body1" color="white">
                                Recording
                            </Typography>
                            <PuffLoader color="white" size={20} />
                        </Box>
                    </Box>
                </Box>
                {/* candidate audio processing */}
                <Box
                    display={`${voiceProcessing ? "flex" : "none"
                        }`}
                    justifyContent={"end"}
                    marginBottom={4}
                >
                    <Box
                        padding={1}
                        borderRadius={2}
                        bgcolor={APP_COLORS.CHAT_PRIMARY}
                        sx={{ maxWidth: { xs: "90%", md: "70%", lg: "60%" } }}
                    >
                        <Box display={"flex"} gap={1} alignItems={"center"}>
                            <Typography variant="body1" color="white">
                                Precessing Vocals..
                            </Typography>
                            <PuffLoader color="white" size={20} />
                        </Box>
                    </Box>
                </Box>

                {/* AI Loading */}
                <Box
                    marginBottom={4}
                    display={`${isLoading ? "flex" : "none"}`}
                >
                    <Box display={"flex"} alignItems={"start"} gap={1}>
                        <AppLogo size="small" />
                        <Typography variant="body1">
                            <SyncLoader
                                color={`${APP_COLORS?.MEDIUM_GRAY || ""}`}
                                size={10}
                            />
                        </Typography>
                    </Box>
                </Box>
                <BodyLanguageAnalyzer />
            </Box>
        </Box>
    );
}
