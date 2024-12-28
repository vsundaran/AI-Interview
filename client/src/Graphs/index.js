import { Box } from "@mui/material";
import { APP_COLORS } from "../theme/colors";
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function Graphs({ data = [], width = "100%" }) {
    // Modify data to include custom labels for the x-axis
    const labeledData = data.map((item, index) => ({
        ...item,
        label: `Ques ${index + 1}`, // Add a custom label for each point
    }));
    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "200px",
                maxHeight: "300px",
                overflow: "hidden",
            }}
        >
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={labeledData} width={200} height={200}>
                    <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }} // Adjust font size
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
                    <Line type="monotone" dataKey="uv" stroke={APP_COLORS.PRIMARY} strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}
