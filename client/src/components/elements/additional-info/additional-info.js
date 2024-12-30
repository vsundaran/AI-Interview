import * as React from "react";
import Box from "@mui/material/Box";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { APP_COLORS } from "../../../theme/colors";
import { ColorButton } from "../button";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../redux/slice/job-info-slice";

export default function AdditionalInfo() {
    let jobInfo = useSelector((state) => state.job_info);
    let DISPATCH = useDispatch();


    const handleUpdate = (event, key) => {
        DISPATCH(updateField({ string: event.target.value, key }));
    };

    return (
        // <form onSubmit={handleSubmit}>
        <Box>
            <Box marginBottom={2}>
                <center>
                    <Typography variant="button" sx={{ color: APP_COLORS.PRIMARY }}>
                        Your Privacy is Our Priority
                    </Typography>
                </center>
                <Typography variant="body1" marginTop={2}>
                    We never store or share your data. The information you provide, such
                    as your name and last project details, is used solely to generate
                    interview questions tailored to your profile. Once the interview
                    session is complete, your data is not retained.
                    <br /> Feel confident and focus on your preparation! 🚀
                </Typography>
            </Box>
            <Stack spacing={2}>
                <Box sx={{ display: { xs: "block", md: "flex" }, gap: 4 }}>
                    <TextField
                        value={jobInfo?.name || ""}
                        size="small"
                        fullWidth
                        label="Name"
                        variant="standard"
                        onChange={(event) => handleUpdate(event, "name")}
                    />
                    <TextField
                        value={jobInfo?.lastProjectName || ""}
                        sx={{ marginTop: { md: 0, xs: 2 } }}
                        size="small"
                        fullWidth
                        label="Last Project Name"
                        variant="standard"
                        onChange={(event) => handleUpdate(event, "lastProjectName")}
                    />
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel>Required interview type (Technical or HR)</FormLabel>
                        <RadioGroup
                            row
                            value={jobInfo?.interviewType || ""}
                            onChange={(event) => handleUpdate(event, "interviewType")}
                        >
                            <FormControlLabel
                                value="Tech"
                                control={<Radio />}
                                label="Technical"
                            />
                            <FormControlLabel value="HR" control={<Radio />} label="HR" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <TextField value={jobInfo?.jobDescription || ""}
                        fullWidth
                        label="Job description (copy and past)"
                        multiline
                        maxRows={100}
                        onChange={(event) => handleUpdate(event, "jobDescription")}
                    />
                </Box>
                {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <ColorButton sx={{ marginTop: 2 }} type="submit" variant="outlined">
                            Start Interview
                        </ColorButton>
                    </Box> */}
            </Stack>
        </Box>
    );
}
