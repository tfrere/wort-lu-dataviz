import React from "react";
import * as topoJson from "topojson-client";

export default class D3Map extends React.PureComponent {

    render() {
        const {settings, path} = this.props;
        let featureCollection = Object.values(settings.topoJson.objects)[0].geometries;

        const geojsonFeatures = featureCollection.map(topojsonFeature => {
            return topoJson.feature(
                settings.topoJson,
                topojsonFeature
            );
        });

        const svgMap = geojsonFeatures.map((geojsonFeature, i) => {
            // const cur = data.find(s => {
            //     return s[settings.regionKey] === geojsonFeature.properties[settings.regionKey]
            // });
            // const value =
            //     cur && cur[dataKey] ? cur[dataKey] : "empty";
            // const fillColor = this.state.colorScale(
            //     cur && cur[dataKey] ? cur[dataKey] : "red" // theme.map.undefinedCountryColor
            // );
            const fillColor = "gray";
            //const borderColor = LightenDarkenColor(fillColor, -5);

            return (
                <path
                    key={i}
                    d={path(geojsonFeature)}
                    fill={fillColor}
                    className={`province${geojsonFeature.properties[settings.regionKey]}`}
                />
            );
        });
        const svgCityNames = settings.canShowRegionNames && settings.showRegionNames ? geojsonFeatures.map((geojsonFeature, i) => {
            const [x, y] = path.centroid(geojsonFeature);

            return (
                <text key={i} x={x} y={y} textAnchor={"middle"} fontSize={5}>
                    {geojsonFeature.properties[settings.regionNameAttribute]}
                </text>
            );
        }) : null;

        return (
            <g transform="translate(0,40)" className="new-map">
                {svgMap}
                {svgCityNames}
            </g>
        );
    }
}