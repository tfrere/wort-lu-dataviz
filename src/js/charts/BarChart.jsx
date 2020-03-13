import React from 'react';

import {
    Bar, ComposedChart, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import DatavizRenderer from "../DatavizRenderer";
import ChartTitle from "./ChartTitle";
import ChartWatermark from "./ChartWatermark";
import * as ChartUtils from "../utils/ChartUtils";


export default class BarChart extends React.Component {

    renderXAxisLabel = () => (
        <Label value={this.props.settings.axis.x.label} offset={0} position="bottom" />
    );

    renderYAxisLabel = () => (
        <Label value={this.props.settings.axis.y.label} angle={-90} position="left" offset={-10} />
    );

    renderVerticalChart = () => {
        const {data, settings} = this.props;
        const xAxis = ChartUtils.hasNoMatchingXAxis(data, settings) ? "id" : settings.axis.x.value[0];
        const xAxisType = DatavizRenderer.getAxisType(data, xAxis);
        const yAxis = settings.axis.y.value;
        const stacked = settings.layout === "stacked";

        return [
            <XAxis key="xAxis" dataKey={xAxis} type={xAxisType}>
                {this.renderXAxisLabel()}
            </XAxis>,
            <YAxis key="yAxis">
                {this.renderYAxisLabel()}
            </YAxis>,
            yAxis.map((axis, i) => <Bar key={i} dataKey={axis} fill="#8884d8" stackId={stacked ? "stack" : ""}/>)
        ];
    };

    renderHorizontalChart = () => {
        const {data, settings} = this.props;
        const xAxis = ChartUtils.hasNoMatchingXAxis(data, settings) ? "id" : settings.axis.x.value;
        const xAxisType = DatavizRenderer.getAxisType(data, xAxis);
        const yAxis = settings.axis.y.value[0];
        const yAxisType = DatavizRenderer.getAxisType(data, yAxis);
        const stacked = settings.layout === "stacked";

        return [
            <XAxis key="xAxis" type={xAxisType}>
                {this.renderXAxisLabel()}
            </XAxis>,
            <YAxis key="yAxis" dataKey={yAxis} type={yAxisType}>
                {this.renderYAxisLabel()}
            </YAxis>,
            xAxis.map((axis, i) => <Bar key={i} dataKey={axis} fill="#8884d8" stackId={stacked ? "stack" : ""}/>)
        ];
    };

    render() {
        const {title, theme, source, data, settings} = this.props;

        // recharts orientation is somehow inverted
        const orientation = settings.orientation === "horizontal" ? "vertical" : "horizontal";

        return (
            <ResponsiveContainer width="100%" >
                <ComposedChart
                    data={data}
                    layout={orientation}
                    margin={{
                        top: 65,
                        right: 0,
                        left: 0,
                        bottom: 40
                    }}
                >
                    {ChartTitle(theme, title)}
                    {ChartWatermark(theme, source)}
                    <CartesianGrid strokeDasharray="4 4"/>
                    <Tooltip/>
                    <Legend
                        align="right"
                        verticalAlign="bottom"
                        layout="vertical"
                        width={110}
                        iconType="circle"
                        iconSize={10}
                        wrapperStyle={{
                            paddingLeft: "20px",
                            bottom: "80px"
                        }}
                    />
                    { settings.orientation === "horizontal" ? this.renderHorizontalChart() : this.renderVerticalChart() }
                </ComposedChart>
            </ResponsiveContainer>
        );
    }
}
