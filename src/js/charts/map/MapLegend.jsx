import * as d3 from "d3";
import React from "react";

export default (props) => {
    const {colors, theme, width} = props;
    
    const color = d3
        .scaleThreshold()
        .domain(d3.range(0, 10))
        .range(colors);

    const x = d3
        .scaleLinear()
        .domain([0, 10])
        .rangeRound([width - 170, width - 20]);

    const rectangles = color.range().map(d => {
        d = color.invertExtent(d);
        if (d[0] == null) d[0] = x.domain()[0];
        if (d[1] == null) d[1] = x.domain()[1];
        return (
            <>
                <text
                    x={x(d[0])}
                    y={22}
                    fill={theme.textColor}
                    fontSize={10}
                    textAnchor={"middle"}
                >
                    {d[0]}
                </text>
                <rect
                    height="8"
                    x={x(d[0])}
                    width={x(d[1]) - x(d[0])}
                    fill={color(d[0])}
                />
                <rect
                    height="13"
                    x={x(d[0])}
                    width={1}
                    fill={theme.textColor}
                />
            </>
        );
    });

    return (
        <g
            fill={theme.backgroundColor}
            transform={"translate(" + 20 + "," + 20 + ")"}
        >
            <text
                className="caption"
                x={x.range()[0]}
                y={-6}
                fill={theme.textColor}
                textAnchor="start"
                fontWeight="900"
                fontSize={10}
            >
                {legendTitle}
            </text>
            {rectangles}
        </g>
    );
};