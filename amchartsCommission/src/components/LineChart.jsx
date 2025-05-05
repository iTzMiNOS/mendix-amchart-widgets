import React, { useLayoutEffect, useRef, createElement } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const LineChart = ({data }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current);

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX:true
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "timestamp",
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        xAxis: xAxis
      }));
      cursor.lineY.set("visible", false);

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "price",
        fill: am5.color(0x7a94ff),
        stroke: am5.color(0x002de7),
        categoryXField: "timestamp",
        tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{valueY}"
        })
      })
    );

    series.fills.template.setAll({
      fillOpacity: 0.6,
      visible: true
    });

    series.strokes.template.setAll({
      strokeWidth: 3,
    });


    const formattedData = data.map(item => ({
        price: item.itemVal,
        timestamp: new Date(item.itemCat.split('/').reverse().join('-')).toISOString().slice(0, 10) // Convert to YYYY-MM-DD format
    }));
    
    const pricesArray = formattedData.map(item => ({
        price: item.price
    }));
    const timestampsArray = formattedData.map(item => ({
        timestamp: item.timestamp
    }));
    console.log("formattedDataLine",formattedData);
    series.data.setAll(formattedData);

    yAxis.data.setAll(pricesArray);

    xAxis.data.setAll(timestampsArray);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdivsa" style={{ width: "100%", height: "240px" }} ref={chartRef}></div>;
};

export default LineChart;