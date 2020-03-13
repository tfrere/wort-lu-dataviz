import React from "react";

export default (props) => {
    const {markers, projection} = props;

    return markers.map((marker, index) => {
        // project the lat,lng to an x,y
        // using the mercator projection
        const [x, y] = projection(marker.coordinates);
        return (
            <circle
                key={index}
                cx={x}
                cy={y}
                r={5}
                fill="red"
                opacity={0.5}
                strokeWidth={0.1}
                onClick={() => console.log(marker["name"])}
            />
        );
    });
}