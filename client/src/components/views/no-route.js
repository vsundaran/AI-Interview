import { Box, Typography } from "@mui/material";
import { APP_COLORS } from "../../theme/colors";
import { ColorButtonFilled } from "../elements/button";

//Icons
import Arrow from "@mui/icons-material/KeyboardBackspace";

//Nav
import { useNavigate } from "react-router-dom";

export const NoRoute = () => {
    let Navigate = useNavigate();

    return (
        <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent="center"
            sx={{ width: "100%", height: "calc(100vh - 100px)" }}
        >
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent="center"
                sx={{
                    padding: 5,
                    width: "70vh",
                    height: "70vh",
                    borderRadius: "50% 1% 47% 50%",
                    background: APP_COLORS.LIGHT_BLUE,
                }}
            >
                <Box
                    sx={{
                        padding: 2,
                        width: "100%",
                        background: APP_COLORS.DEFAULT_BACKGROUND,
                    }}
                >
                    <center>
                        <Typography variant="h2"
                            color={APP_COLORS.HEIGH_GRAY}>
                            404
                        </Typography>
                        <Typography variant="h6">Page not found</Typography>
                        <Typography
                            marginY={1}
                            variant="body2"
                            color="text.secondary"
                            sx={{ maxWidth: "70%" }}
                        >
                            The link you clicked may be broken or the page may have been
                            removed or renamed
                        </Typography>
                        <ColorButtonFilled onClick={() => Navigate('/')}
                            startIcon={<Arrow />}
                            variant="contained"
                            sx={{ textTransform: "none" }}
                        >
                            Go Back
                        </ColorButtonFilled>
                    </center>
                </Box>
            </Box>
        </Box>
    );
};
