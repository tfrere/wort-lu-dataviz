import React from "react";

const ChartTitle = (theme, title) => {
    return (
        <g transform={`translate(5, 30)`}>
            <text
                className="recharts-title"
                fill={theme.textColor}
                fontSize={"18px"}
                fontWeight={"900"}
            >
                {title}
            </text>
        </g>
    );
};

export default ChartTitle;