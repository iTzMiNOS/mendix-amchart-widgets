import React, { useLayoutEffect } from 'react';
import { createElement } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";

let counter = 0;
function Chart({ widgetItemsList }) {

  const chartId = `chartdiv-${counter}`;
  counter += 1;
  console.log("chartId",chartId);

  useLayoutEffect(() => {
    let root = am5.Root.new(chartId);
    let chart = root.container.children.push( 
    am5percent.PieChart.new(root, {}));


    let series = chart.series.push(
    am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "itemVal",
        categoryField: "itemCat",
        alignLabels: false
    })
    );
    series.data.setAll(widgetItemsList);

    series.labels.template.setAll({
      fontSize: 12,
      text: "{category}",
      textType: "circular",
      inside: true,
      radius: 10,
      fill: am5.color(0xffffff)
    })

    return () => {
      root.dispose();
    };
  }, [chartId, widgetItemsList]);

  return (
    <div id={chartId} style={{ width: "500px", height: "500px" }}></div>
  );
}
export default Chart;