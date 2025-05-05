import React, { useEffect } from "react";
import { createElement } from "react";
import "./ui/AmchartsWordCloud.css";
import UseGetData from "./hooks/UseGetData";
import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";

export function AmchartsWordCloud(props) {
    if(props.widgetData.status === 'available'){
        const {
            widgetItemsList,
            widgetColor,
            widgetWidth,
            widgetHeight,
            callOnClickCloud 
        } = UseGetData(props);

        useEffect(() => {
            let root = am5.Root.new("wcChartDiv");

            let series = root.container.children.push(am5wc.WordCloud.new(root, {
                categoryField: "itemCat",
                valueField: "itemVal",
              }));

            series.data.setAll(widgetItemsList);

            series.labels.template.setAll({
                fontFamily: "Courier New",
                fill: am5.color(widgetColor)
            });

            return () => {
                root.dispose();
            };
        }, ["wcChartDiv", widgetItemsList]);

        return (
            <div role="button" onClick={callOnClickCloud}>
                <div id='wcChartDiv' style={{ width: widgetWidth, height: widgetHeight }}></div>
            </div>
        );
    }
}