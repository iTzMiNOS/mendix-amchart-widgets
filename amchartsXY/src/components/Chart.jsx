import React, { createElement } from 'react';
import { useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

let counter = 0;
function Chart({ widgetItemsList }) {

  const chartId = `chartdivxy-${counter}`;
  counter += 1;

  useLayoutEffect(() => {
    let root = am5.Root.new(chartId);

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout
      })
    );

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        numberFormatter: am5.NumberFormatter.new(root, {
          numberFormat: "#,###.00'$'",
        })
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 20 // Adjust this value to ensure labels don't overlap
        }),
        categoryField: "itemCat"
      })
    );

    let itemCatList = [];
    widgetItemsList.forEach(({ _, itemCat }) => {
      itemCatList.push({
        itemCat
      });
    });
    xAxis.data.setAll(itemCatList);

    // Create series
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "itemVal",
        categoryXField: "itemCat"
      })
    );
    series.data.setAll(widgetItemsList);

    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    return () => {
      root.dispose();
    };
  }, [chartId, widgetItemsList]);

  return (
    <div id={chartId} style={{ width: "500px", height: "500px" }}></div>
  );
}

export default Chart;
