import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Typography } from "@mui/material";

import { APP_COLORS } from "../../theme/colors";
import JobInfo from "../elements/job-info/job-info";
import AdditionalInfo from "../elements/additional-info/additional-info";
import useSpeechToText from "../custom-hooks/speech-to-text";

import { useEffect } from "react"

export default function Home() {
    //states
    const [value, setValue] = React.useState("1");

    //event handlers
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let { isListening, startListening, stopListening, text } = useSpeechToText()

    useEffect(() => {
        setTimeout(() => {
            startListening();
        }, 5000)
    }, [])

    return (
        <Box>
            <Typography variant="h6" sx={{ color: APP_COLORS.PRIMARY }}>Welcome to the AI Interview Preparation Tool!</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium', }}>To ensure you get the most relevant and tailored interview questions, please provide accurate and detailed job information.</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium', }}>Enter your own job profile details, including role, experience level, education, and key skills.</Typography>

            <Box boxShadow={1} padding={2} marginTop={2}>
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList onChange={handleChange}>
                                <Tab label="Job Info" value="1" />
                                <Tab label="Additional Info" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <JobInfo />
                        </TabPanel>
                        <TabPanel value="2">
                            <AdditionalInfo />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Box>
            <br />

            SPEECH <br />
            {
                isListening ? "Listening" : "Start"
            }
            <br />
            {
                text
            }
            <br />
            <Button onClick={() => startListening()}>
                start recording
            </Button>
            <br />
            <br />
        </Box>
    );
}
