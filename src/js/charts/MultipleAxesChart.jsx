import React from 'react';

import {
    ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from "recharts";
import DatavizRenderer from "../DatavizRenderer";
import ChartTitle from "./ChartTitle";
import ChartWatermark from "./ChartWatermark";


export default class MultipleAxesChart extends React.Component {

    renderYAxis(axis, position) {
        const {value, chartType} = axis;

        if(chartType === "bar") {
            return <Bar dataKey={axis.value} barSize={20} fill='#413ea0' yAxisId={position}/>;
        } else {
            return <Line dataKey={value} type='monotone' stroke='#ff7300' yAxisId={position}/>;
        }
    }

    render() {
        const {title, theme, source, data, settings} = this.props;

        return (
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} margin={{
                    top: 65,
                    right: 0,
                    left: 0,
                    bottom: 40
                }}>
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
                    <XAxis dataKey={settings.axis.x.value} axisType={DatavizRenderer.getAxisType(data, settings.axis.x.value)}>
                        <Label value={settings.axis.x.label} offset={0} position="bottom" />
                    </XAxis>
                    <YAxis yAxisId="left" axisType={DatavizRenderer.getAxisType(data, settings.axis.y.left.value)}>
                        <Label value={settings.axis.y.left.label} angle={-90} position="left" offset={-10} />
                    </YAxis>
                    <YAxis yAxisId="right" axisType={DatavizRenderer.getAxisType(data, settings.axis.y.right.value)} orientation="right">
                        <Label value={settings.axis.y.right.label} angle={-90} position="right" offset={-10} />
                    </YAxis>
                    { this.renderYAxis(settings.axis.y.left, "left") }
                    { this.renderYAxis(settings.axis.y.right, "right") }
                </ComposedChart>
            </ResponsiveContainer>
        );
    }
}
