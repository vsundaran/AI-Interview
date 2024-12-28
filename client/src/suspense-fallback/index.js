import { Box } from "@mui/material";
import { RotateLoader } from "react-spinners";

//Theme
import { APP_COLORS } from "../theme/colors";

export const Loading = () => {
    return (
        <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent="center"
            sx={{ width: "100%", height: "calc(100vh - 100px)" }}
        >
            <RotateLoader
                size={10}
                color={APP_COLORS.MEDIUM_GRAY}
            />
        </Box>
    );
};
