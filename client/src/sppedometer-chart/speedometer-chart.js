import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const SpeedoMeterChart = ({ percentage = 70 }) => {
    const data = [
        { name: "Completed", value: percentage }, // Colored part
        { name: "Remaining", value: 100 - percentage }, // Gray background part
    ];
    const COLORS = ["#82ca9d", "#d3d3d3"]; // Green for percentage, Gray for background
    return (
        <ResponsiveContainer width="100%" height={200}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    startAngle={210} // Start point for symmetry
                    endAngle={-30} // End point for symmetry
                    innerRadius={75} // Adjust inner radius for thin width
                    outerRadius={80} // Adjust outer radius
                    fill="#8884d8"
                    dataKey="value"
                    cornerRadius={10}
                    paddingAngle={0} // No gaps
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        borderRadius: "8px",
                        padding: "4px 8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                    itemStyle={{
                        color: "#333",
                        fontSize: "12px",
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default SpeedoMeterChart;
