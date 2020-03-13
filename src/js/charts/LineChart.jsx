import React from 'react';

import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label,
} from "recharts";
import ChartTitle from "./ChartTitle";
import ChartWatermark from "./ChartWatermark";
import * as ChartUtils from "../utils/ChartUtils";

export default class LineChart extends React.Component {

    render() {
        const {title, theme, source, data, settings} = this.props;
        // TODO RCH : apply this auto check for all charts
        const xAxis = ChartUtils.hasNoMatchingXAxis(data, settings) ? "id"  : settings.axis.x.value;

        return (
            <ResponsiveContainer width="100%">
                <ComposedChart data={data} margin={{
                    top: 65,
                    right: 0,
                    left: 0,
                    bottom: 40
                }}>
                    {ChartTitle(theme, title)}
                    {ChartWatermark(theme, source)}
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <XAxis dataKey={xAxis}>
                        <Label value={settings.axis.x.label} offset={0} position="bottom" />
                    </XAxis>
                    <YAxis>
                        <Label value={settings.axis.y.label} angle={-90} position="left" offset={-10} />
                    </YAxis>
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
                    { settings.axis.y.value.map((axisY, i) => <Line key={i} type="monotone" dataKey={axisY} stroke="#8884d8" />)}
                </ComposedChart>
            </ResponsiveContainer>
        );
    }
}
