import React, { useEffect, createElement } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const StockChart = ({ mappedPrices }) => {
    useEffect(() => {
        const root = am5.Root.new("chartdiv");

        // Set themes
        root.setThemes([am5themes_Animated.new(root)]);

        // Create a stock chart
        const stockChart = root.container.children.push(
            am5xy.XYChart.new(root, {})
        );

        // Create axes
        const valueAxis = stockChart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        );

        const dateAxis = stockChart.xAxes.push(
            am5xy.DateAxis.new(root, {
                baseInterval: { timeUnit: "minute", count: 30 },
                renderer: am5xy.AxisRendererX.new(root, {})
            })
        );

        // Add series
        const valueSeries = stockChart.series.push(
            am5xy.CandlestickSeries.new(root, {
                name: "Market Data",
                valueXField: "date",
                valueYField: "closePrice",
                highValueYField: "highPrice",
                lowValueYField: "lowPrice",
                openValueYField: "openPrice",
                xAxis: dateAxis,
                yAxis: valueAxis,
                tooltip: am5.Tooltip.new(root, {
                    labelText: "Open: {openValueY}\nHigh: {highValueY}\nLow: {lowValueY}\nClose: {valueY}"
                })
            })
        );

        // Set data
        valueSeries.data.setAll(mappedPrices);

        // Add cursor
        stockChart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "zoomX",
            xAxis: dateAxis,
            yAxis: valueAxis
        }));

        // Cleanup on component unmount
        return () => {
            root.dispose();
        };
    }, [mappedPrices]);

    return <div id="chartdiv" style={{ width: "100%", height: "800px" }}></div>;
};

export default StockChart;
