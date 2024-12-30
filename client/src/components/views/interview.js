import { use, useEffect, useState } from "react";
// Mui elements
import { Box, Typography } from "@mui/material";

//Colors
import { APP_COLORS } from "../../theme/colors";

// Icons and logo
import AppLogo from "../elements/app-logo/app-logo";
// Redux
import { useSelector } from "react-redux";
//Animation
import { TypeAnimation } from "react-type-animation";
import { SyncLoader, PuffLoader } from "react-spinners";
import { formatAIPrompt } from "../../utills/formatPrompt";
import { GET_QUESTIONS } from "../../helper/end-points";

//custom-hooks
import useSpeechToText from "../custom-hooks/speech-to-text";
import { formateQuestions } from "../api-response-formater/questions";
import useSilenceChecker from "./speech";
import { useLocation } from "react-router-dom";

export default function Interview() {
    let [coversation, setConversation] = useState(() => {
        return [
            // the below object will alway be in the array for loading and recording purpose
            // If the candidate is needs to answer, make the message sender as candidate and loading canddiate should true
            // same for the AI
            {
                message_sender: "candidate",
                message: `the below object will alway be in the array for loading and recording purpose
            If the candidate is needs to answer, make the message sender as candidate and loading canddiate should true
            same for the AI`,
            },
            {
                message_sender: "AI",
                message: `the below object will alway be in the array for loading and recording purpose
            If the candidate is needs to answer, make the message sender as candidate and loading canddiate should true
            same for the AI`,
            },
            {
                message_sender: "candidate",
                message: `the below object will alway be in the array for loading and recording purpose
            If the candidate is needs to answer, make the message sender as candidate and loading canddiate should true
            same for the AI`,
            },
            {
                message_sender: "AI",
                message: `the below object will alway be in the array for loading and recording purpose
            If the candidate is needs to answer, make the message sender as candidate and loading canddiate should true
            same for the AI`,
            },
        ];
    });
    let jobInfo = useSelector((state) => state.job_info);

    let [loading, setLoading] = useState({
        AI: false,
        candidate: false,
    });

    const location = useLocation();

    useEffect(() => {
        // Check if state contains the triggerEvent flag
        if (location.state?.triggerEvent) {
            startRecording();
        }
    }, [location.state]);


    let { isListening, startListening, stopListening, text, textReset } = useSpeechToText();
    let { startRecording, stopRecording, isSpeaking, isRecording, vadValue } = useSilenceChecker()

    useEffect(() => {
        setLoading(prev => ({ ...prev, AI: true }));
        let quearyString = formatAIPrompt(jobInfo);
        // GET_QUESTIONS({ inputs: quearyString }, (response) => {
        //     setLoading(prev => ({ ...prev, AI: false }));
        //     console.log(response, "response");
        //     let question = formateQuestions(response);
        //     setConversation(prev => question);
        //     setLoading(prev => ({ ...prev, candidate: true }));
        // });
        setTimeout(() => {
            setLoading(prev => ({ AI: false, candidate: true }));
            startVoiceRecogniation();
        }, 2000);
    }, []);

    const startVoiceRecogniation = () => {
        startListening();
    }

    const stopVoiceRecogniation = () => {
        console.log(text, "text");
        stopListening();
        textReset();
        setLoading(prev => ({ AI: true, candidate: false }))
    };

    let [timer, setTimer] = useState();

    useEffect(() => {
        console.log(isSpeaking, "isSpeaking toggles")
        if (timer) {
            clearTimeout(timer);
        }
        if (!isSpeaking && isListening) {
            setTimer(prev => setTimeout(() => {
                console.log("Timout runs");
                stopVoiceRecogniation();
            }, 5000))
        }
    }, [isSpeaking]);

    return (
        <Box>
            <br />
            vadValue : {vadValue}
            <br />
            isSpeaking : {isSpeaking ? "Yes" : "no"}
            <br />
            {coversation.map((element, index) => (
                <Box key={`coversation-${index}`}>
                    {/*Candidate Answer */}
                    <Box
                        display={`${element?.message_sender === "candidate" ? "flex" : "none"
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
                                {index + 1 === coversation.length
                                    ? (
                                        <TypeAnimation
                                            sequence={[`${element?.message || ""}`]}
                                            wrapper="span"
                                            speed={80}
                                            cursor={false}
                                        />
                                    ) : (
                                        `${element?.message || ""}`
                                    )}
                            </Typography>
                        </Box>
                    </Box>

                    {/* AI Question */}
                    <Box
                        marginBottom={4}
                        display={`${element.message_sender === "AI" ? "flex" : "none"}`}
                    >
                        <Box display={"flex"} alignItems={"start"} gap={1}>
                            <AppLogo size="small" />
                            <Typography variant="body1">

                                {index + 1 === coversation.length
                                    ? (
                                        <TypeAnimation
                                            sequence={[`${element?.message || ""}`]}
                                            wrapper="span"
                                            speed={80}
                                            cursor={false}

                                        />
                                    ) : (
                                        `${element?.message || ""}`
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
                    display={`${loading.candidate ? "flex" : "none"
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

                {/* AI Loading */}
                <Box
                    marginBottom={4}
                    display={`${loading.AI ? "flex" : "none"}`}
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
            </Box>

            {/* <TypeAnimation
                sequence={[`${text || ""}`]}
                wrapper="span"
                speed={80}
                cursor={false}
            /> */}

        </Box>
    );
}
