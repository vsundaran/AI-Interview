import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "United States", value: 60 },
    { name: "Turkey", value: 20 },
    { name: "Spain", value: 15 },
    { name: "Other", value: 5 },
];

const COLORS = ["#204fc7", "#93a8e5", "#bfcbef", "#dee5f7"];

const RoundedChart = () => {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={75} // Adjust inner radius for thin width
                    outerRadius={80} // Adjust outer radius
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    cornerRadius={10} // Add rounded corners
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
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
            </PieChart>
        </ResponsiveContainer>
    );
};

export default RoundedChart;
