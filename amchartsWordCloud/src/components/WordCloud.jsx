import { createElement } from "react";
import React, { useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";

function WordCloud(widgetColor, widgetStrings) {

    let root = am5.Root.new("wcChartDiv");
    
    var wc = root.container.children.push(am5wc.WordCloud.new(root, {
        rotationThreshold: 0.7,
        maxCount: 200,
        minWordLength: 2,
        minFontSize: am5.percent(0.5),
        maxFontSize: am5.percent(30),
        text: widgetStrings
        }));

        series.labels.template.setAll({
            fontFamily: "Courier New",
            fill: am5.color(widgetColor)
          });
}
