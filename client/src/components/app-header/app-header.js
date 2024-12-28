import React from "react";
// MUI Elements
import { Avatar, Box } from "@mui/material";

// Logo and icons
import AppLogo from "../elements/app-logo/app-logo";

export default function AppHeader() {
    return (
        <Box zIndex={100}
            top={0}
            paddingY={1}
            position={"sticky"}
            width={"100%"}
            bgcolor={"#ffffffed"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"end"}
            borderBottom={"1px solid #eaeaea"}
        >
            <AppLogo sx={{ width: "auto" }} />
            <Avatar
                alt="User"
                src="https://media.licdn.com/dms/image/v2/D4D08AQE5GxVsMBA2vw/croft-frontend-shrinkToFit1024/croft-frontend-shrinkToFit1024/0/1636398674059?e=2147483647&v=beta&t=HNXXMj4_BJOtgI1SjdwaLthc1N1CzTqAs_AkCKTkK7I"
            />
        </Box>
    );
}
