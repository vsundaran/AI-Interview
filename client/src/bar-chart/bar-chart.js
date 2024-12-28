import { Box } from "@mui/material";
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Ques 1", value: 100 },
    { name: "Ques 2", value: 150 },
    { name: "Ques 3", value: 120 },
    { name: "Ques 4", value: 110 },
    { name: "Ques 5", value: 90 },
    { name: "Ques 6", value: 80 },
    { name: "Ques 7", value: 70 },
];

const SquareChart = () => {
    return (
        <Box sx={{ width: "100%", height: 200 }}>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data} barCategoryGap="20%">
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: "8px", // Rounded corners for tooltip
                            padding: "4px 8px", // Smaller padding
                            border: "1px solid #ccc", // Optional: border style
                            backgroundColor: "#ffffff", // Optional: background color
                            boxShadow: "0 2px 2px rgba(120, 120, 120, 0.1)", // Optional: subtle shadow
                        }}
                        itemStyle={{
                            color: "#333", // Text color
                            fontSize: "12px", // Adjust font size
                        }}

                    />
                    <Bar
                        dataKey="value"
                        fill="#1565c0"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default SquareChart;
