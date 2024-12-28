import RoundedChart from "../../../chart-rounded";
import { Box, Typography } from "@mui/material";

export default function EyeContactChart() {
    return (
        <Box padding={2} borderRadius={2} boxShadow={1}>
            <Box>
                <Typography variant="body1">874</Typography>
                <Typography className="m-0" color="text.primary" variant="body1">Difficulty Level</Typography>
            </Box>
            <RoundedChart />
        </Box>
    )
}