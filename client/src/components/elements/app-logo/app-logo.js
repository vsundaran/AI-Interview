import { Box, Typography } from "@mui/material";
import { APP_COLORS } from "../../../theme/colors";

export default function AppLogo({ size = "default", sx = {} }) {
    return (
        <Box display={"flex"} alignItems={"start"} sx={sx}>
            <Typography variant={`${size === "small" ? "body1" : "h6"}`} color={APP_COLORS.PRIMARY}>AI</Typography>
            <Typography variant="caption" color={APP_COLORS.FONT} sx={{ marginTop: "2px", display: size === "small" ? "none" : "block" }}>nterview</Typography>
        </Box>
    )
}