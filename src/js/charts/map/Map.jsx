import React from "react";
import _ from "lodash";
import * as d3 from "d3";

import ChartTitle from "../ChartTitle";
import D3Map from "./D3Map";
import MapMarkers from "./MapMarkers";
import ChartWatermark from "../ChartWatermark";

const mapWidth = 500;
const mapHeight = 350;


export default class Map extends React.Component {

    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.debounceZoom = _.debounce(this.onMapZoomed, 6);
        this.debounceZoomEnd = _.debounce(this.onMapZoomedEnd, 200);
    }

    componentDidMount() {
        this.buildMap();
    }

    state = {
        path: undefined,
        projection: undefined,
        position: {}
    };

    buildMap() {
        const {settings} = this.props;

        const projection = d3
            .geoMercator()
            .scale(settings.zoom)
            .center([settings.lng, settings.lat])
            .translate([500 / 2, 350 / 2])
            .precision(0.1);
        const path = d3.geoPath().projection(projection);

        this.setState({
            path: path,
            projection: projection,
            position: settings.position,
            zoom: settings.canZoom ? this.enableZoom() : undefined
            // colorScale: colorScale
        });
    }

    componentDidUpdate(prevProps) {
        // If map type has changed, reload settings/data and recreate map from scratch
        if(prevProps.settings.mapType !== this.props.settings.mapType) {
            this.buildMap();
        }
    }

    enableZoom = () => {
        const mapRef = this.mapRef.current;
        const d3Selection = d3.select(mapRef);
        // Reset zoom if it was already set
        if(this.state.zoom)
            d3Selection.call(this.state.zoom.transform, d3.zoomIdentity);

        const zoom = d3.zoom().on("zoom", () => {
            this.debounceZoom(d3.event.transform)
        });
        d3Selection.call(zoom);

        return zoom;
    };

    onMapZoomed = (d3ZoomEvent) => {
        this.setState({
            position: {
                x: d3ZoomEvent.x,
                y: d3ZoomEvent.y,
                zoom: d3ZoomEvent.k
            }
        }, this.debounceZoomEnd);
    };

    onMapZoomedEnd = () => {
        // TODO RCH
        // DatavizActions.updateChartSettings({
        //     ...this.props.settings,
        //     position: this.state.position
        // });
    };

    // getColorScale = () => {
    //     return scaleQuantize()
    //         .domain(this.props.settings.dataScale)
    //         .range(this.props.colors);
    // };

    drawGraticule = () => {
        return (
            <path
                d={this.state.path(d3.geoGraticule().step([10, 10])())}
                fill={"none"}
                stroke={this.props.theme.map.graticuleColor}
                className={`graticule line`}
            />
        );
    };

    renderBackground() {
        return (
            <rect
                width="100%"
                height="100%"
                fill={this.props.theme.backgroundColor}
            />
        );
    }

    renderMap() {
        const {theme, settings, data} = this.props;
        const {position, path, projection} = this.state;
        if(!path)
            return null;

        return (
            <g transform={`translate(${position.x}, ${position.y}) scale(${position.zoom})`}>
                {settings.hasGraticule ? this.drawGraticule() : ""}
                {settings.markers ? <MapMarkers markers={settings.markers} projection={projection} /> : ""}
                <D3Map settings={settings} theme={theme} data={data} path={path}/>
            </g>
        );
    }

    render() {
        const {title, theme, source} = this.props;

        return (
            <svg
                width={mapWidth}
                height={mapHeight}
                ref={this.mapRef}
            >
                {this.renderBackground()}
                {ChartTitle(theme, title)}
                {ChartWatermark(theme, source)}
                {this.renderMap()}
            </svg>
        );
    }
}