import { useState } from "react";

// Mui elements
import { Box, Typography } from "@mui/material";

//Colors
import AppLogo from "../app-logo/app-logo";

export default function AIFeedBack() {
    let [coversation, setConversation] = useState(["", "", "", "", ""]);

    return (
        <Box
            padding={2}
            borderRadius={2}
            boxShadow={1}
            maxHeight={"276px"}
            overflow={"scroll"}
            sx={{
                "&::-webkit-scrollbar": {
                    display: "none", // Hide scrollbar for WebKit browsers
                },
                "-ms-overflow-style": "none", // Hide scrollbar for Internet Explorer and Edge
                "scrollbar-width": "none", // Hide scrollbar for Firefox
            }}
        >
            <Box marginBottom={1}>
                <Typography
                    className="m-0"
                    color="text.primary"
                    variant="body1"
                    sx={{ fontSize: "17px" }}
                >
                    AI feedback to improve scores
                </Typography>
            </Box>
            {coversation.map((element, index) => (
                <Box key={`coversation-${index}`}>
                    {/* AI Feedback */}
                    <Box marginBottom={4}>
                        <Box display={"flex"} alignItems={"start"} gap={1}>
                            <AppLogo size="small" />
                            <Typography variant="body1">
                                For the interview UI, I want to make text animations like "chat
                                GPT" text rendering side by side the audio should be play. So,
                                the candidate can see theme
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
