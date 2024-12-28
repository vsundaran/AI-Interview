import React from "react";
import SpeedoMeterChart from "../../../sppedometer-chart/speedometer-chart";
import { Box, Typography } from "@mui/material";

const OverAllMarks = () => {
    return (
        <Box padding={2} borderRadius={2} boxShadow={1} width={"100%"}>
            <Box>
                <Typography variant="body1">874</Typography>
                <Typography className="m-0" color="text.primary" variant="body1">Difficulty Level</Typography>
            </Box>
            <SpeedoMeterChart />
        </Box>
    );
};

export default OverAllMarks;
