import React from "react";
import _ from "lodash";
import Numeral from "numeral";

import {BarChart, LineChart, Map, MultipleAxesChart} from "./charts";
import * as ChartUtils from "./utils/ChartUtils";
import ChartTypes from "./ChartTypes";

// TODO RCH : important, handle defaults props, prop types, error cases
export default class DatavizRenderer extends React.Component {

    // TODO RCH : move to utils ?
    static getAxisType = (data, axis) => {
        // Check if the majority of a column's cells are numbers
        const rows = data
            .filter(row => row[axis] && row[axis] !== "")
            .map(row => row[axis]);
        // TODO RCH : could be improved
        if(rows.reduce((acc, cell) => !isNaN(cell) ? acc + 1 : acc, 0) >= Math.ceil(rows.length / 2)) {
            return "number";
        } else {
            return "category";
        }
    };

    getChartComponent = () => {
        const {data, settings} = this.props;
        if(!data || !settings)
            return null;

        const chartType = settings.chartType;

        if(chartType === ChartTypes.Bar) {
            return BarChart;
        } else if(chartType === ChartTypes.Line) {
            return LineChart;
        } else if(chartType === ChartTypes.MultipleAxes) {
            return MultipleAxesChart;
        } else if(chartType === ChartTypes.Map) {
            return Map;
        } else {
            return null;
        }
    };

    parseCell = (cell) => {
        // Parse cell as number
        const parsedValue = Numeral(cell).value();
        return !parsedValue || isNaN(parsedValue) ? cell : parsedValue;
    };

    // Convert data from a two dimensional array to an array of object which is more convenient structure for chart rendering
    convertFromJSON = () => {
        const {data, settings} = this.props;
        let columns = _.clone(data[0]);
        // Create a default fake X axis in case of first header column is empty
        if(ChartUtils.hasNoMatchingXAxis(data, settings)) {
            columns[0] = "id";
        }

        return data
            .slice(1, data.length)
            .filter(row => row[0] && row[0] !== "")
            .map(row => _.zipObject(columns, row.map(this.parseCell)));
    };

    renderError() {
        return (
            <div className="wort-lu-dataviz__error">Error : couldn't create chart</div>
        )
    }

    renderChart() {
        const ChartComponent = this.getChartComponent();

        if(ChartComponent) {
            return <ChartComponent {...this.props} data={this.convertFromJSON()} />;
        } else {
            return this.renderError();
        }
    }

    render() {
        return (
            <div className="wort-lu-dataviz">{ this.renderChart() }</div>
        );
    }
}
