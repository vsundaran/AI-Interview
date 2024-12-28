import { Box, Typography } from "@mui/material";
import CallMadeIcon from '@mui/icons-material/CallMade';
import Graphs from "../../../Graphs";

export default function DifficultGraph() {
    const data = [
        { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 390, pv: 2900, amt: 9400 },
        { name: "Page B", uv: 300, pv: 2900, amt: 9400 },
        { name: "Page B", uv: 400, pv: 2900, amt: 9400 },
        { name: "Page B", uv: 450, pv: 2900, amt: 9400 },
        { name: "Page B", uv: 380, pv: 2900, amt: 9400 },
        { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 390, pv: 2900, amt: 9400 },
        { name: "Page B", uv: 300, pv: 2900, amt: 9400 },
        { name: "Page B", uv: 400, pv: 2900, amt: 9400 },
        { name: "Page B", uv: 450, pv: 2900, amt: 9400 },
        { name: "Page B", uv: 380, pv: 2900, amt: 9400 },
    ];
    return (
        <Box padding={2} borderRadius={2} boxShadow={1}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography className="m-0" color="text.primary" variant="body1">Difficulty Level</Typography>
                <Typography color="success" variant="body2" sx={{ fontWeight: "bold" }}>+10%</Typography>
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
                <CallMadeIcon sx={{ color: "green", fontSize: "12px" }} />
                <Typography sx={{ color: "gray", fontSize: "12px" }} variant="body1">Raises gradually </Typography>
            </Box>
            <Graphs data={data} />
        </Box>
    );
}
