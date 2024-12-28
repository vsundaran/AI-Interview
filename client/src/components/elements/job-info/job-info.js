import * as React from "react";
//MUI
import Box from "@mui/material/Box";
import { Stack, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
//UI
import { ColorButton } from "../button";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../redux/slice/job-info-slice";
// router
import { useNavigate } from "react-router-dom";

export default function JobInfo() {

    let jobInfo = useSelector(state => state.job_info);
    let DISPATCH = useDispatch();
    let Navigate = useNavigate();

    const handleSubmit = (event) => {
        event?.preventDefault();
        Navigate('/interview')
    };
    const handleUpdate = (event, key) => {
        DISPATCH(updateField({ string: event.target.value, key }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Box sx={{ display: { xs: "block", md: "flex" }, gap: 4 }}>
                    <TextField
                        value={jobInfo?.jobRole || ""}
                        size="small"
                        fullWidth
                        label="Job role"
                        variant="standard"
                        required
                        onChange={(event) => handleUpdate(event, "jobRole")}
                    />
                </Box>
                <Box sx={{ marginTop: "2rem !important" }}>
                    <FormControl>
                        <FormLabel>Experienced *</FormLabel>
                        <RadioGroup row value={jobInfo?.experienced || ""}
                            onChange={(event) => handleUpdate(event, "experienced")}
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box
                    sx={{
                        display: { xs: "block", md: "flex" },
                        gap: 4,
                        margin: 0,
                    }}
                >
                    <TextField sx={{ display: jobInfo?.experienced == "yes" ? "block" : "none" }}
                        value={jobInfo?.yearsOfExperience || ""}
                        size="small"
                        fullWidth
                        label="Years of experience"
                        variant="standard"
                        required={jobInfo?.experienced == "yes"}
                        onChange={(event) => handleUpdate(event, "yearsOfExperience")}
                    />
                    <TextField
                        value={jobInfo?.Technology || ""}
                        sx={{ marginTop: { md: 0, xs: 2 } }}
                        size="small"
                        fullWidth
                        label="Technolagy (optional)"
                        variant="standard"
                        onChange={(event) => handleUpdate(event, "Technology")}
                    />
                </Box>
                <Box
                    sx={{
                        display: { xs: "block", md: "flex" },
                        gap: 4,
                        margin: 0,
                    }}
                >
                    <TextField
                        value={jobInfo?.skills || ""}
                        // sx={{ marginTop: { md: 0, xs: 2 } }}
                        size="small"
                        fullWidth
                        label="Skills (optional)"
                        variant="standard"
                        onChange={(event) => handleUpdate(event, "skills")}
                    />
                </Box>
                <Box
                    sx={{
                        display: { xs: "block", md: "flex" },
                        gap: 4,
                        margin: 0,
                    }}
                >
                    <TextField
                        value={jobInfo?.companyName || ""}
                        // sx={{ marginTop: { md: 0, xs: 2 } }}
                        size="small"
                        fullWidth
                        label="Company Name (Target company)"
                        variant="standard"
                        required
                        onChange={(event) => handleUpdate(event, "companyName")}
                    />
                    <TextField
                        value={jobInfo?.salaryLevel || ""}
                        sx={{ marginTop: { md: 0, xs: 2 } }}
                        size="small"
                        fullWidth
                        label="Salary Level"
                        variant="standard"
                        required
                        onChange={(event) => handleUpdate(event, "salaryLevel")}
                    />
                </Box>
                <Box
                    sx={{
                        display: { xs: "block", md: "flex" },
                        gap: 4,
                        margin: 0,
                    }}
                >
                    <TextField
                        value={jobInfo?.degree || ""}
                        // sx={{ marginTop: { md: 0, xs: 2 } }}
                        size="small"
                        fullWidth
                        label="Degree"
                        variant="standard"
                        onChange={(event) => handleUpdate(event, "degree")}
                    />
                    <TextField
                        value={jobInfo?.education || ""}
                        sx={{ marginTop: { md: 0, xs: 2 } }}
                        size="small"
                        fullWidth
                        label="Education"
                        variant="standard"
                        onChange={(event) => handleUpdate(event, "education")}
                    />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <ColorButton sx={{ marginTop: 2 }} type="submit" variant="outlined">Start Interview</ColorButton>
                </Box>
            </Stack>
        </form>
    );
}
