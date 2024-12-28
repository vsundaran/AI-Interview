import { Box, Skeleton } from "@mui/material";
import React from "react";


export const BoxLoader = ({ isLoading = false }) => {
    return (
        <Box display={isLoading ? "block" : "none"}>
            <Skeleton variant="rectangular" sx={{ fontSize: "1rem", marginBottom: 1 }} />
            <Skeleton variant="rectangular" sx={{ fontSize: "1rem", marginBottom: 1 }} />
            <Skeleton variant="rectangular" sx={{ fontSize: "1rem", marginBottom: 1 }} />
            <Skeleton variant="rectangular" sx={{ fontSize: "1rem", marginBottom: 1 }} />
        </Box>
    )
}