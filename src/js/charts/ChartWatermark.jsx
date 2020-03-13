import React from "react";

export const ChartWatermark = (theme, source) => {
    return (
        <g transform={`translate(0, 330)`}>
            <rect
                fill={theme.watermark.backgroundColor}
                width={150 + source.title.length * 5}
                height={20}
            />
            <g transform={`translate(5, 2)`}>
                <symbol id="w-logo" viewBox="0 0 90 69">
                    <title>Luxemburger Wort</title>
                    <path
                        fill={theme.watermark.logoColor}
                        d="M82.2,56.9c0,2.2-2.7,4.6-4.9,4.6c-6.7,0-12.4-13.7-20.5-13.7c-1.3,0-2.4,0-3.5,0.3v-0.3c5.1-3,9.7-8.1,9.7-15.1
          c0-10.2-10.2-14.6-10.2-21.3c0-4.3,4.9-8.6,8.1-8.6c4.3,0,5.7,3.8,5.9,7.8c0,5.9,2.4,11.6,10.8,12.7l0,0
          c-5.4,2.7-11.3,5.9-11.3,13.5C66.3,48.5,82.2,49.3,82.2,56.9 M41,57.9c-5.7,0-13.7-10.2-20.2-11.3v-0.3
          c12.1-3.2,18.1-10.2,18.1-24.3c0-4.6-1.1-9.2-2.7-13.5c1.6-2.2,4.3-3.8,6.7-3.8c3,0,6.2,1.3,8.1,3.8c-4,5.1-8.1,10.8-8.1,18.1
          c0,3.8,2.4,7.3,4.9,10.2c2.4,3,4.9,5.7,4.9,8.6C52.5,50.9,45.8,57.9,41,57.9 M79.5,23.4c1.1,0,2.2,0,3.5,0c1.9,0,4.9-0.3,7-0.5v-1.3
          c-0.8,0-1.6,0.3-2.7,0.3c-2.7,0-3.2-2.2-3.5-7.5C83.3,4.9,75.7,0,67.6,0c-7,0-11.3,2.2-16.2,7.8C49.9,3.5,47.7,0,43.1,0
          c-4,0-6.2,4.3-7.8,7.8C31.5,2.2,26.1,0,20.7,0C8.6,0,0,8.6,0,20.7s12.4,12.1,12.4,16.4c0,3-4.9,5.7-7.5,5.7H4.3v1.6
          c5.4,0,15.4-7.3,15.4-16.7c0-11.3-12.4-11.6-12.4-18.9c0-3.2,3.8-6.2,6.2-6.2c6.5,0,8.9,8.1,8.9,22.4c0,12.4-0.8,17.8-3,21.3
          c-1.6-0.5-3.2-0.5-4-0.5c-8.6,0-14,11.3-15.1,18.6l1.6,0.3c0.5-3.2,1.6-7,5.1-7c7.5,0,12.7,11.3,22.4,11.3c4.6,0,8.1-2.7,10.8-5.1
          c2.7-2.7,4.6-5.1,5.7-5.1c1.6,0,4,2.7,7,5.1c3,2.7,7,5.1,12.1,5.1c11,0,23.4-13.2,23.4-25.1C88.4,31.5,76,31,76,26.4
          C76.8,25.6,77.9,24.8,79.5,23.4"
                    />
                </symbol>
                <use
                    fill={theme.watermark.logoColor}
                    xlinkHref={`#w-logo`}
                    width="15px"
                    height="15px"
                />
                <text
                    transform={`translate(21.5, 11)`}
                    fill={theme.watermark.textColor}
                    fontFamily={"Fira Sans"}
                    fontSize={"10px"}
                >
                    Luxemburger Wort | Source :&nbsp;
                    <a
                        fill={theme.watermark.linkColor}
                        rel="noreferrer noopener"
                        target="_blank"
                        href={source.url}
                    >
                        {source.title}
                    </a>
                </text>
            </g>
        </g>
    );
};

export default ChartWatermark;