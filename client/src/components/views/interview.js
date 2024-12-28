import { useEffect, useState } from "react";

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

export default function Interview() {
    let [coversation, setConversation] = useState(() => {
        return [
            // the below object will alway be in the array for loading and recording purpose
            // If the candidate is needs to answer, make the message sender as candidate and loading canddiate should true
            // same for the AI
            // {
            //     message_sender: "candidate",
            //     message: ``,
            // },
        ];
    });
    let jobInfo = useSelector((state) => state.job_info);

    let [loading, setLoading] = useState({
        AI: false,
        candidate: true,
    });

    let { isListening, startListening, stopListening, text } = useSpeechToText()

    useEffect(() => {
        setLoading(prev => ({ ...prev, AI: true }));
        let quearyString = formatAIPrompt(jobInfo);
        GET_QUESTIONS({ inputs: quearyString }, (response) => {
            setLoading(prev => ({ ...prev, AI: false }));
            console.log(response, "response");
            if (response?.type == "success") {
                let question = response?.result || [];
                //formating for the UI functionalities
                question.forEach((element, index) => {
                    let conversationBundle = {}
                    conversationBundle["message"] = element?.generated_text
                    conversationBundle["message_sender"] = "AI"
                    question[index] = conversationBundle
                });
                question.push({
                    message_sender: "candidate",
                    message: ``,
                });
                setLoading(prev => ({ ...prev, candidate: true }));
                setConversation(prev => question);

            }
        })
    }, []);

    return (
        <Box>
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
                            {index + 1 === coversation.length && loading.candidate ? (
                                <Box display={"flex"} gap={1} alignItems={"center"}>
                                    <Typography variant="body1" color="white">
                                        Recording
                                    </Typography>
                                    <PuffLoader color="white" size={20} />
                                </Box>
                            ) : null}
                            <Typography variant="body1" color="white">
                                {index + 2 === coversation.length
                                    // && !loading.candidate &&
                                    // !loading.AI
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
                                {index + 1 === coversation.length && loading.AI ? (
                                    <SyncLoader
                                        color={`${APP_COLORS?.MEDIUM_GRAY || ""}`}
                                        size={10}
                                    />
                                ) : null}
                                {index + 2 === coversation.length
                                    //  && !loading.AI &&
                                    // !loading.candidate 
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
        </Box>
    );
}
